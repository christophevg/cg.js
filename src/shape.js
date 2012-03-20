// the Shape module
(function(globals) {

  // provides an instantiateable canvas
  function construct(cloud, vertices) {
    vertices = vertices || [];

    // privates
    var v = -1, // internal counter for iterator

    // exposed object
    shape = {};

    shape.add = function add(vertex) {
      vertices.push(vertex);
    }
    
    shape.refresh = function refresh() {
      // by default the we don't need to do anything
      // some shapes use their cloud to store controlpoints
      // after applying a transformation to their could, they need to 
      // recalculate their actual points
      // they can implement this method and the next to intervene in this
      // process.
    }
    
    shape.getVertices = function() { return vertices; }
    
    shape.getPoints = function getPoints() {
      // by default we operate on the actual cloud of points
      // some shapes use this to store their controlpoints and refresh their
      // points
      return cloud;
    }

    shape.applyTransformation = function applyTransformation(transformation) {
      shape.getPoints().applyTransformation(transformation);
      shape.refresh();
    }

    shape.applyTranslation = function applyTranslation(translation) {
      shape.getPoints().applyTranslation(translation);
      shape.refresh();
    },

    shape.applyRotation = function applyRotation(rotation) {
      shape.getPoints().applyRotation(rotation);
      shape.refresh();
    },
    
    shape.get = function get(idx) {
      if(idx >= vertices.length) { return; }
      return { begin : cloud.get(vertices[idx].begin), 
               end   : cloud.get(vertices[idx].end), 
               color : vertices[idx].color, 
               size  : vertices[idx].size };
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
