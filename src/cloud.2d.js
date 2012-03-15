// the cloud.2d module
(function(globals) {

  // provides an instantiateable canvas
  function construct(points) {

    // privates
    var

    cloud2d = {};

    cloud2d.getModel = function getModel() {
      var p = -1,
          v = -1;
      return {
        resetPoints  : function resetPoints() { 
          p = -1;
        },
        hasNextPoint : function hasNextPoint() {
          return p+1 < points.length;
        },
        getNextPoint : function getNextPoint() {  // TODO: add boundary check
          p++;
          // make a deep copy, we don't want to expose our actual model points
          return { x: points[p].x, y: points[p].y,
                   size: points[p].size, color: points[p].color };
        },
        resetVertices : function resetVertices() {
          v = -1;
        },
        hasNextVertex : function hasNextVertex() {
          return v+1 < points.length;
        },
        getNextVertex : function getNextVertex() {
          v++;
          var begin_idx = v,
              end_idx   = v+1 < points.length ? v+1 : 0;
          // TODO: add some config about vertices for size and color
          return { begin : {x: points[begin_idx].x, y:points[begin_idx].y},
                   end   : {x: points[end_idx].x,   y:points[end_idx].y  },
                   size  : 1,
                   color : points[begin_idx].color };
        }
      }
    }
    
    return cloud2d;
  }

  var Cloud2D = globals.Cloud2D = {};
  
  Cloud2D.create = function create(p) { return construct(p); }
  
})(window);
