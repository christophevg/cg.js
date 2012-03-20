// the canvas module
(function(globals) {

  // provides an instantiateable canvas
  function construct(id) {

    // privates
    var

    htmlElement = document.getElementById(id),
    context     = htmlElement.getContext("2d"),
    perspective = Perspective.cabinet(5*Math.PI/6, 0.5),

    // we use a Y-axis pointing up
    // Y ^
    //   |
    //   +--> X
    convertPoint = function convertPoint(point) {
      point = perspective(point);
      
      // center 0,0
      point.x = htmlElement.width/2  + point.x;
      point.y = htmlElement.height/2 - point.y;
      return point;
    },
    
    // renders a point
    renderPoint = function renderPoint(point) {
      point = convertPoint(point);
      context.fillStyle = point.color;
      context.fillRect(point.x-point.size/2, point.y-point.size/2,
                       point.size, point.size);
    },

    renderVertex = function renderVertex(vertex) {
      vertex.begin = convertPoint(vertex.begin);
      vertex.end   = convertPoint(vertex.end);
      context.beginPath();
      context.strokeStyle = vertex.color;
      context.lineWidth   = vertex.size;
      context.moveTo(vertex.begin.x, vertex.begin.y);
      context.lineTo(vertex.end.x, vertex.end.y);
      context.stroke();
      context.closePath();
    },

    canvas = {};

    canvas.setPerspective = function setPerspective(p) {
      perspective = p;
    }
    
    canvas.clear = function clear() {
      context.fillStyle = "white";
      context.fillRect(0,0,htmlElement.width,htmlElement.height);
    }

    canvas.render = function render(model) {
      model.reset();
      canvas.clear();
      while(model.hasNext()) {
        var item = model.getNext();
        if( typeof item.x != "undefined" ) {
          renderPoint(item);
        } else {
          renderVertex(item);
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
