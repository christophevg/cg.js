// the Cloud module
(function(globals) {

  // provides an instantiateable canvas
  function construct(points) {
    points = points || [];

    // privates
    var p = -1, // internal counter for iterator
        
    // exposed object
    cloud = {};

    cloud.clear = function clear() {
      points = [];
    }

    cloud.add = function add(point) {
      points.push(point);
    }
    
    cloud.applyTransformation = function applyTransformation(transformation) {
      for(var p in points) {
        points[p] = transformation(points[p]);
      }
    }

    cloud.applyTranslation = function applyTranslation(translation) {
      cloud.applyTransformation( function(point) {
        return { x: point.x + translation.x,
                 y: point.y + translation.y,
                 z: point.z + translation.z,
                 color: point.color,
                 size : point.size };
      } );
    },

    cloud.applyRotation = function applyRotation(rotation) {
      cloud.applyTransformation( function(point) {
        
        var result = 
        Transformations.rotateDegs(rotation)
          .x(Matrix.create( [ [ point.x, point.y, point.z ] ] )
              .transpose());

        return { x: result.getRows()[0][0],
                 y: result.getRows()[1][0],
                 z: result.getRows()[2][0],
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
