(function(globals) {

  var controlpoints = [],
      cache = {},

      bki = function bki(k, i, t) {
              if( k == 0 ) { return controlpoints[i]; }
              var c;
              if( c = cache["bki("+k+i+t+")"] ) { return c; }
              var t2   = 1-t,
                  bki1 = bki(k-1, i-1, t),
                  bki2 = bki(k-1, i,   t),
                  bx   = t2 * bki1[0] + t * bki2[0],
                  by   = t2 * bki1[1] + t * bki2[1],
                  bz   = t2 * bki1[2] + t * bki2[2];
              cache["bki("+k+i+t+")"] = [bx,by,bz];
              return [bx,by,bz];
            },

      bezier = globals.Bezier = {};

  bezier.curve = function curve(points, steps, col, width) {
    var cloud = Cloud.create(),
        shape = Shape.create(cloud),
        step  = 1 / steps;

    // initialize controlpoints
    controlpoints = [];
    for(var i=0; i<points.length;i++) {
      controlpoints.push( [points[i].x, points[i].y, points[i].z] );
    }

    // calculate intermediate points and add vertices
    for(var t=0;t<=steps;t++) {
      var p = bki(3, 3, t*step);
      cloud.add({ x:p[0], y:p[1], z:p[2], color: col, size: width });
      if(t>0) {
        shape.add( {begin:t-1, end:t, color: col, size: width } );
      }
    }

    return shape;
  }

  bezier.surface = function surface(points, steps_t, steps_s, col, width) {
    var cloud  = Cloud.create(),
        shape  = Shape.create(cloud),
        step_t = 1 / steps_t,
        step_s = 1 / steps_s,
        curves = []

    // initialize cached controlpoints
    for(var i=0; i<points.length;i++) {
      curves[i] = [];
      for(var j=0; j<points[i].length;j++ ) {
        curves[i].push( [points[i][j].x, points[i][j].y, points[i][j].z] );
      }
    }

    // for each step in direction s
    var i=0;
    for(var s=0;s<steps_s;s++) {
      // for each set of cached controlpoints
      var cps = [];
      for(var d=0;d<curves.length;d++) {
        // determine point, which is in its turn a controlpoint
        controlpoints = curves[d];
        cache = [];
        cps.push(bki(3,3,s*step_s));
      }
      // use temp controlpoints to define actual points
      controlpoints = cps;
      cache = [];
      for(var t=0;t<steps_t;t++) {
        var p = bki(3, 3, t*step_t);
        cloud.add({ x:p[0], y:p[1], z:p[2], color: col, size: width });
        // add vertex to previous point on this curve
        if(t>0) {
          shape.add( {begin:i-1, end:i, color: col, size: width } );
        }
        // add vertex to point on previous curve
        if(s>0) {
          shape.add( {begin:i, end:i-steps_t, color: col, size: width } );
        }
        i++;
      }
    }

    return shape;
  }

})(Shapes);
