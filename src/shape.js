// the Shape module
(function(globals) {

  // provides an instantiateable canvas
  function construct(cloud, vertices) {

    // privates
    var v = -1, // internal counter for iterator

    // exposed object
    shape = {};

    shape.type = "vertex";

    shape.size = function size() {
      return vertices.length;
    }

    shape.applyTransformation = function applyTransformation(transformation) {
      cloud.applyTransformation(transformation);
    }

    shape.applyTranslation = function applyTranslation(translation) {
      cloud.applyTranslation(translation);
    },
    
    shape.get = function get(idx) {
      if(idx >= vertices.length) { return; }
      return { begin: cloud.get(vertices[idx].begin), 
               end:   cloud.get(vertices[idx].end), 
               color: vertices[idx].color, size: vertices[idx].size };
    }

    shape.reset = function reset() { 
      p = -1;
    }

    shape.hasNext = function hasNext() {
      return p+1 < vertices.length;
    }

    shape.getNext = function getNext() {
      if(!shape.hasNext()) { return; }
      p++;
      // make a deep copy, we don't want to expose our actual model points
      return shape.get(p);
    }
    
    return shape;
  }

  var Shape = globals.Shape = {};
  
  Shape.create = function create(c, v) { return construct(c, v); }
  
})(window);
