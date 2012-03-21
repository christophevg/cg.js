(function(globals) {

  var cache = {},

      bki = function bki(k, i, t, ps) {
              if( k == 0 ) {
                var point = ps.get(i);
                return [ point.x, point.y, point.z ];
              }
              var c;
              if( c = cache["bki("+k+i+t+")"] ) { return c; }
              var t2   = 1-t,
                  bki1 = bki(k-1, i-1, t, ps),
                  bki2 = bki(k-1, i,   t, ps),
                  bx   = t2 * bki1[0] + t * bki2[0],
                  by   = t2 * bki1[1] + t * bki2[1],
                  bz   = t2 * bki1[2] + t * bki2[2];
              cache["bki("+k+i+t+")"] = [bx,by,bz];
              return [bx,by,bz];
            },

      bezier = globals.Bezier = {};

  // factory method with private scope for private members
  bezier.curve = function curve(points, steps, col, width) {

    // privates
    var controlpoints = Cloud.create(), // the defining control points
        cloud = Cloud.create(),         // the generated point cloud
        shape = Shape.create(cloud),    // the shape instance
        step  = 1 / steps;              // size of 1 step

    // when dealing with points, we provide our controlpoints
    shape.getPoints = function getPoints() {
      return controlpoints;
    }

    // when changes have been made to our (control)points, we need to
    // regenerate the actual point cloud
    shape.refresh = function refresh() {
      cloud.clear();
      // calculate intermediate points
      for(var t=0;t<=steps;t++) {
        var p = bki(3, 3, t*step, controlpoints);
        cloud.add({ x:p[0], y:p[1], z:p[2], color: col, size: width });
      }
    }

    // initialize controlpoints
    for(var i=0; i<points.length;i++) {
      points[i].color = col;
      points[i].size  = width;
      controlpoints.add(points[i]);
    }
    
    // initialize the vertices (these don't change when transformed)
    for(var t=1;t<=steps;t++) {
      shape.add( {begin:t-1, end:t, color: col, size: width } );
    }
    
    shape.refresh();

    return shape;
  }

  bezier.surface = function surface(points, steps_t, steps_s, col, width) {
    // privates
    var controlpoints = Cloud.create(),  // the defining control points
        cloud  = Cloud.create(),         // the generated point cloud
        shape  = Shape.create(cloud),    // the shape instance
        step_t = 1 / steps_t,            // size of 1 step in 1 direction 
        step_s = 1 / steps_s,            // size of 1 step in other direction
        curves = [],                     // groups of controlpoints
        cps    = Cloud.create()          // cloud with dynamic controlpoints

    // when dealing with points, we provide our controlpoints
    shape.getPoints = function getPoints() {
      return controlpoints;
    }

    // when changes have been made to our (control)points, we need to
    // regenerate the actual point cloud
    shape.refresh = function refresh() {
      
      // initialize cached sets of controlpoints
      for(var i=0; i<points.length; i++) {
        curves[i].clear()
        curves[i].add(controlpoints.get(i));
        curves[i].add(controlpoints.get(i+4));
        curves[i].add(controlpoints.get(i+8));
        curves[i].add(controlpoints.get(i+12));
      }
      
      cloud.clear();
      // for each step in direction s
      for(var s=0; s<=steps_s; s++) {
        // create a temp cloud of controlpoints
        cps.clear();
        for(var d=0; d<curves.length; d++) {
          // determine point, which is in its turn a controlpoint
          cache = {};
          var p = bki(3, 3, s*step_s, curves[d]);
          cps.add({ x:p[0], y:p[1], z:p[2], color: col, size: width });
        }
        // use temp controlpoints to define actual points
        for(var t=0; t<=steps_t; t++) {
          cache = {};
          var p = bki(3, 3, t*step_t, cps);
          cloud.add({ x:p[0], y:p[1], z:p[2], color: col, size: width });
        }
      }
    }
    
    // initialize controlpoints cloud
    for(var i=0; i<points.length; i++) {
      for(var j=0; j<points[i].length; j++) {
        points[i][j].color = col;
        points[i][j].size  = width;
        controlpoints.add(points[i][j]);
      }
      // prepare a group to store 
      curves[i] = Cloud.create();
    }
    
    // initialize the vertices (these don't change when transformed)
    var i=0;
    for(var s=0; s<=steps_s; s++) {
      for(var t=0; t<=steps_t; t++) {
        // add vertex to previous point on curve
        if(t>0) {
          shape.add( {begin:i-1, end:i, color: col, size: width } );
        }
        // add vertex to point on previous curve
        if(s>0) {
          shape.add( {begin:i, end:i-steps_s-1, color: col, size: width } );
        }
        i++;
      }
    }

    shape.refresh();
    
    return shape;
  }

})(Shapes);
