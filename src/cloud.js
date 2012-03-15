// the Cloud module
(function(globals) {

  // provides an instantiateable canvas
  function construct(points) {

    // privates
    var p = -1, // internal counter for iterator

    // exposed object
    cloud = {};

    cloud.type = "point";

    cloud.reset = function reset() { 
      p = -1;
    }
    
    cloud.size = function size() {
      return points.length;
    }

    cloud.get = function get(idx) {
      if(idx >= points.length) { return; }
      return { x: points[idx].x, y: points[idx].y,
               size: points[idx].size, color: points[idx].color };
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
