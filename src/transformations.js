(function(globals) {
  
  var 
      toRads = function toRads(deg) {
        return deg / 180 * Math.PI;
      },
  
      transformations = globals.Transformations = {};
  
  transformations.rotateXdeg = function rotateXdeg(deg) {
    return transformations.rotateXrads(toRads(deg));
  }
  
  transformations.rotateXrads = function rotateXrads(rads) {
    return Matrix.create( [ [ 1, 0, 0 ],
                            [ 0, Math.cos(rads), -1 * Math.sin(rads) ],
                            [ 0, Math.sin(rads), Math.cos(rads) ] ] );
  }

  transformations.rotateYdeg = function rotateYdeg(deg) {
    return transformations.rotateYrads(toRads(deg));
  }
  
  transformations.rotateYrads = function rotateYrads(rads) {
    return Matrix.create( [ [ Math.cos(rads), 0, Math.sin(rads) ],
                            [ 0, 1, 0 ],
                            [ -1 * Math.sin(rads), 0, Math.cos(rads) ] ] );
  }

  transformations.rotateZdeg = function rotateZdeg(deg) {
    return transformations.rotateZrads(toRads(deg));
  }
  
  transformations.rotateZrads = function rotateZrads(rads) {
    return Matrix.create( [ [ Math.cos(rads), -1 * Math.sin(rads), 0 ],
                            [ Math.sin(rads), Math.cos(rads), 0 ],
                            [ 0, 0, 1 ] ] );
  }
  
  transformations.rotateDegs = function rotateDegs(rotation) {
    return transformations.rotateRads({x: toRads(rotation.x),
                                       y: toRads(rotation.y),
                                       z: toRads(rotation.z)});
  }
  
  transformations.rotateRads = function rotateRads(rotation) {
    var sinx = Math.sin(rotation.x), cosx = Math.cos(rotation.x),
        siny = Math.sin(rotation.y), cosy = Math.cos(rotation.y),
        sinz = Math.sin(rotation.z), cosz = Math.cos(rotation.z);
    return Matrix.create( [
      [ cosy*cosz, -1*cosx*sinz+sinx*siny*cosz, sinx*sinz+cosx*siny*cosz ],
      [ cosy*sinz, cosx*cosz+sinx*siny*sinz, -1*sinx*cosz+cosx*siny*sinz ],
      [ -1*siny, sinx*cosy, cosx*cosy ]
    ] );
  }
  
})(window);
