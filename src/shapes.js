(function(globals) {
  
  var
  
  shapes = globals.Shapes = {};
  
  shapes.line = function line(from, to, c, w) {
    from = from || {x:  0, y:  0, z:  0};
    to   = to   || {x:100, y:100, z:100};
    c    = c || "blue";
    w    = w || 2;
    
    var cloud = Cloud.create( [ {x:from.x, y:from.y, z:from.z, color:c, size:w},
                                {x:to.x,   y:to.y,   z:to.z,   color:c, size:w},
                              ] );
    var shape = Shape.create( cloud, [ { begin:0, end:1, color: c, size:w} ] );
    return shape;
  }
  
  shapes.cube = function cube(s, c, w) {
    s = s || 100;
    c = c || "blue";
    w = w || 2;

    var cloud = Cloud.create( [ {x:0, y:0, z:0, color:c, size:w}, // 0
                                {x:s, y:0, z:0, color:c, size:w}, // 1
                                {x:s, y:s, z:0, color:c, size:w}, // 2
                                {x:0, y:s, z:0, color:c, size:w}, // 3
                                {x:0, y:0, z:s, color:c, size:w}, // 4
                                {x:s, y:0, z:s, color:c, size:w}, // 5
                                {x:s, y:s, z:s, color:c, size:w}, // 6
                                {x:0, y:s, z:s, color:c, size:w}  // 7
                              ] );

    var shape = Shape.create( cloud, 
                              [ { begin:0, end:1, color:c, size:w },
                                { begin:1, end:2, color:c, size:w },
                                { begin:2, end:3, color:c, size:w },
                                { begin:3, end:0, color:c, size:w },
                                { begin:4, end:5, color:c, size:w },
                                { begin:5, end:6, color:c, size:w },
                                { begin:6, end:7, color:c, size:w },
                                { begin:7, end:4, color:c, size:w },
                                { begin:0, end:4, color:c, size:w },
                                { begin:1, end:5, color:c, size:w },
                                { begin:2, end:6, color:c, size:w },
                                { begin:3, end:7, color:c, size:w }
                              ] );
    return shape;
  }

})(window);
