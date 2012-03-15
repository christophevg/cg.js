// the Cloud module
(function(globals) {

  // provides an instantiateable canvas
  function construct(points) {

    // privates
    var p = -1, // internal counter for iterator
        transformations = [],
        
    // exposed object
    cloud = {};

    cloud.type = "point";

    cloud.addTransformation = function addTransformation(transformation) {
      transformations.push(transformation);
    }

    cloud.addTranslation = function addTranslation(translation) {
      cloud.addTransformation( function(point) {
        return { x: point.x + translation.x,
                 y: point.y + translation.y,
                 z: point.z + translation.z,
                 color: point.color,
                 size : point.size };
      } );
    },

    cloud.reset = function reset() { 
      p = -1;
    }
    
    cloud.size = function size() {
      return points.length;
    }

    cloud.get = function get(idx) {
      if(idx >= points.length) { return; }
      var point = { x: points[idx].x, y: points[idx].y, z: points[idx].z,
                    size: points[idx].size, color: points[idx].color };
      for(var t in transformations) {
        point = transformations[t](point);
      }
      return point;
    }

    cloud.hasNext = function hasNext() {
      return p+1 < points.length;
    }

    cloud.getNext = function getNext() {
      if(!cloud.hasNext()) { return; }
      p++;
      // make a deep copy, we don't want to expose our actual model points
      return cloud.get(p);
    }
    
    return cloud;
  }

  var Cloud = globals.Cloud = {};
  
  Cloud.create = function create(p) { return construct(p); }
  
})(window);
