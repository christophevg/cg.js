(function(globals) {

  function construct(M) {
    var rows   = M.length,
        cols   = M[0].length,
        matrix = {};
    
    matrix.getWidth = function getWidth() {
      return cols;
    }
    
    matrix.getHeight = function getHeight() {
      return rows;
    }
    
    matrix.getRows = function getRows() {
      return M;
    }
    
    matrix.toString = function toString() {
      var string = "";
      for(var row=0; row<rows; row++ ) {
        for(var col=0; col<cols; col++ ) {
          string += M[row][col] + " ";
        }
        string += "<br>\n";
      }
      return string;
    }
    
    matrix.equals = function equals(M2) {
      if( matrix.getWidth() != M2.getWidth() || 
          matrix.getHeight() != M2.getHeight() )
      {
        return false;
      }
      var sum = [];
      for(var row=0; row<rows; row++ ) {
        sum[row] = [];
        for(var col=0; col<cols; col++ ) {
          if( M[row][col].toFixed(10) != 
              M2.getRows()[row][col].toFixed(10) )
          { 
            return false;
          }
        }
      }
      return true;
    }
    
    matrix.add = function add(M2) {
      var sum = [];
      for(var row=0; row<rows; row++ ) {
        sum[row] = [];
        for(var col=0; col<cols; col++ ) {
          sum[row].push(M[row][col] + M2.getRows()[row][col]);
        }
      }
      return construct(sum);
    }

    matrix.transpose = function transpose() {
      var transposed = [];
      for(var col=0; col<cols; col++ ) {
        transposed[col] = [];
        for(var row=0; row<rows; row++ ) {
          transposed[col].push(M[row][col]);
        }
      }
      return construct(transposed);
    }

    matrix.x = function x(M2) {
      var product = [];
      for(var row=0; row<rows; row++ ) {
        product[row] = [];
        for(var col=0; col<M2.getWidth(); col++ ) {
          var sum = 0;
          for(var i=0; i<cols; i++) {
            sum += M[row][i] * M2.getRows()[i][col];
          }
          product[row].push(sum);
        }
      }
      return construct(product);
    }
    
    return matrix;
  }
  
  var
  
  matrix = globals.Matrix = {};
  
  matrix.create = function create(m) {
    return construct(m);
  }
  
})(window);