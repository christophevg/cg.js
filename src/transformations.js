(function(globals) {
  
  var 
      toRads = function toRads(deg) {
        return deg / 180 * Math.PI;
      },

      cache = {},
  
      transformations = globals.Transformations = {};

  transformations.rotateDegs = function rotateDegs(rotation) {
    var key = "rotateDegs(" + rotation.x+","+rotation.y+","+rotation.z+")", c;
    if( c = cache[key] ) { return c; }
    c = transformations.rotateRads({x: toRads(rotation.x),
                                    y: toRads(rotation.y),
                                    z: toRads(rotation.z)});
    cache[key] = c;
    return c;
  }
  
  transformations.rotateRads = function rotateRads(rotation) {
    var key = "rotateRads(" + rotation.x+","+rotation.y+","+rotation.z+")", c;
    if( c = cache[key] ) { return c; }
    var sinx = Math.sin(rotation.x), cosx = Math.cos(rotation.x),
        siny = Math.sin(rotation.y), cosy = Math.cos(rotation.y),
        sinz = Math.sin(rotation.z), cosz = Math.cos(rotation.z);
    c = Matrix.create( [
      [ cosy*cosz, -1*cosx*sinz+sinx*siny*cosz, sinx*sinz+cosx*siny*cosz ],
      [ cosy*sinz, cosx*cosz+sinx*siny*sinz, -1*sinx*cosz+cosx*siny*sinz ],
      [ -1*siny, sinx*cosy, cosx*cosy ]
    ] );
    cache[key] = c;
    return c;
  }
  
})(window);
