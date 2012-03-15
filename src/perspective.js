// the Perspective module
(function(globals) {

  var perspective = globals.Perspective = {};
  
  perspective.cabinet = function cabinet(angle, scale) {
    return function(point) {
      return { x: point.x + (scale * point.z * Math.cos(angle)),
               y: point.y + (scale * point.z * Math.sin(angle)),
               color: point.color, size: point.size };
    }
  }
  
})(window);
