// the Perspective module
(function(globals) {

  var perspective = globals.Perspective = {};
  
  // example: Perspective.cabinet(Math.PI/6, 0.5);
  perspective.cabinet = function cabinet(angle, scale) {
    return function(point) {
      return { x: point.x + (scale * point.z * Math.cos(angle)),
               y: point.y + (scale * point.z * Math.sin(angle)),
               color: point.color, size: point.size };
    }
  }
  
  perspective.projection = function projection( d ) {
    return function(point) {
      return { x: point.x * ( d / point.z),
               y: point.y * ( d / point.z),
               color: point.color, size: point.size };
    };
  }
  
})(window);
