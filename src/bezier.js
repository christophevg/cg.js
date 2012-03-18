(function(globals) {

  var controlpoints = [],
      bki = function bki(k, i, t) {
              if( k == 0 ) { return controlpoints[i]; }
              var t2   = 1-t,
                  bki1 = bki(k-1, i-1, t),
                  bki2 = bki(k-1, i,   t),
                  bx   = t2 * bki1[0] + t * bki2[0],
                  by   = t2 * bki1[1] + t * bki2[1],
                  bz   = t2 * bki1[2] + t * bki2[2];
              return [bx,by,bz];
            },

      bezier = globals.Bezier = {};

  bezier.curve = function curve(points, steps, col, width) {
    var cloud = Cloud.create(),
        shape = Shape.create(cloud),
        step  = 1 / steps;

    controlpoints = [];

    // initialize controlpoints
    for(var i=0; i<points.length;i++) {
      controlpoints.push( [points[i].x, points[i].y, points[i].z] );
    }

    for(var t=0;t<=steps;t++) {
      var p = bki(3, 3, t*step);
      cloud.add({ x:p[0], y:p[1], z:p[2], color: col, size: width });
      if(t>0) {
        shape.add( {begin:t-1, end:t, color: col, size: width } );
      }
    }

    return shape;
  }

  bezier.surface = function surface( controls, step, sp, tp, c, width) {
    var cloud = Cloud.create(),
        shape = Shape.create(cloud);

    // TODO

    return shape;
  }

})(Shapes);
