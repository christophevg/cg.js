(function(globals) {
  
  globals.plane = function plane(s, t, sp, tp, c, width) {
    s  = s  || 100;
    t  = t  || 100;
    sp = sp ||   4;
    tp = tp ||   4;
    c  = c  || "blue";
    w  = w  || 2;
    
    var cloud = Cloud.create(),
        shape = Shape.create(cloud),
        s_ = s / sp,
        t_ = t / tp;

    var i = 0;
    for(var w=0; w<=sp; w++) {
      for(var h=0; h<=tp; h++) {
        cloud.add( {x:w*s_, y:0, z:h*t_} );
        // add vertex to next in line
        if( h != tp ) {
          shape.add({begin:i, end:i+1, color:c, size:width});
        }
        // add vertex to next in adjacent line
        if( w != sp ) {
          shape.add({begin:i, end:i+1+sp, color:c, size:width});
        }
        i++;
      }
    }

    return shape;
  }
  
})(Shapes);
