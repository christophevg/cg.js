// the canvas module
(function(globals) {

  // provides an instantiateable canvas
  function construct(id) {

    // privates
    var

    htmlElement = document.getElementById(id),
    context     = htmlElement.getContext("2d"),

    // we use a Y-axis pointing up
    // Y ^
    //   |
    //   +--> X
    convertPoint = function convertPoint(point) {
      point.y = htmlElement.height - point.y;
    },
    
    // renders a point
    renderPoint = function renderPoint(point) {
      convertPoint(point);
      context.fillStyle = point.color;
      context.fillRect(point.x-point.size/2, point.y-point.size/2,
                       point.size, point.size);
    },

    renderVertex = function renderVertex(vertex) {
      convertPoint(vertex.begin);
      convertPoint(vertex.end);
      context.strokeStyle = vertex.color;
      context.lineWidth   = vertex.size;
      context.moveTo(vertex.begin.x, vertex.begin.y);
      context.lineTo(vertex.end.x, vertex.end.y);
      context.stroke();
    },

    canvas = {};

    canvas.render = function render(model) {
      model.reset();
      while(model.hasNext()) {
        var item = model.getNext();
        switch(model.type) {
          case "point" : renderPoint(item);  break;
          case "vertex": renderVertex(item); break;
          default:
            console.log( "unknown rendering type: " + mode.type );
        }
      }
    }
    
    canvas.renderVertices = function renderVertices(model) {
      model.resetVertices();
      while(model.hasNextVertex()) {
        renderVertex(model.getNextVertex());
      }
    }
    
    return canvas;
  }

  var Canvas = globals.Canvas = {};
  
  Canvas.get = function get(id) { return construct(id); }
  
})(window);
