(function(globals) {
  
    // provides an instantiateable canvas
  function construct() {
    // private
    var shapes           = [], 
        applyTranslation = function translation(item) { return item; },
        applyRotation    = function rotation(item) { return item; },
        group            = {}, // self reference
        s                = -1; // internal counter for iterating over shapes

    // exposed functionality
    group.add = function add(shape) {
      shapes.push(shape);
      return group;
    }
    
    group.setTranslation = function setTranslation(translation) {
      applyTranslation = function applyTranslation(shape) {
        if( typeof shape.x != "undefined" ) {
          return { x     : shape.x + translation.x,
                   y     : shape.y + translation.y,
                   z     : shape.z + translation.z,
                   color : shape.color,
                   size  : shape.size };
        } else {
          return { begin : { x: shape.begin.x + translation.x,
                             y: shape.begin.y + translation.y,
                             z: shape.begin.z + translation.z },
                   end   : { x: shape.end.x + translation.x,
                             y: shape.end.y + translation.y,
                             z: shape.end.z + translation.z },
                   color : shape.color, 
                   size  : shape.size };
        }
      };
    }

    group.setRotation = function setRotation(rotation) {
      applyRotation = function applyRotation(shape) {
        if( typeof shape.x != "undefined" ) {
          var point = 
            Transformations.rotateDegs(rotation)
              .x(Matrix.create( [ [ shape.x, shape.y, shape.z ] ] )
              .transpose());

          return { x     : point.getRows()[0][0],
                   y     : point.getRows()[1][0],
                   z     : point.getRows()[2][0],
                   color : shape.color,
                   size  : shape.size };
        } else {
          var begin = Transformations.rotateDegs(rotation)
              .x(Matrix.create( [ [ shape.begin.x, shape.begin.y, shape.begin.z ] ] )
              .transpose()),
            end = Transformations.rotateDegs(rotation)
              .x(Matrix.create( [ [ shape.end.x, shape.end.y, shape.end.z ] ] )
              .transpose());

          return { begin : { x: begin.getRows()[0][0],
                             y: begin.getRows()[1][0],
                             z: begin.getRows()[2][0] },
                   end   : { x: end.getRows()[0][0],
                             y: end.getRows()[1][0],
                             z: end.getRows()[2][0] },
                   color : shape.color, 
                   size  : shape.size };
        }
      }
    }
    
    group.reset = function reset() { 
      s = -1;
    }

    group.hasNext = function hasNext() {
      return s+1 < shapes.length || shapes[s].hasNext();
    }

    group.getNext = function getNext() {
      if(! group.hasNext()) { return; }
      if( s == -1 || ! shapes[s].hasNext() ) {
        s++;
        shapes[s].reset();
      }
      var item = shapes[s].getNext();
      var transformed = applyRotation(applyTranslation(item));
      return transformed;
    }

    return group;
  }
  

  globals.group = function group() { return construct(); }

})(Shapes);
