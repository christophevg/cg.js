(function(globals) {
  var
  
  print = function print(msg) {
    document.writeln( msg + "<br>" );
  }
  
  has = function has(obj, method) {
    return typeof obj[method] != "undefined";
  }
  
  fail = function fail(result, expected, message) {
    message += "<br>\nexpected:<br>\n";
    message += has(expected, "toString") ? expected.toString() : expected;
    message += "<br>\nbut got:<br>\n";
    message += has(result, "toString") ? result.toString() : result;
    return message;
  }
  
  test = globals.Test = {};
  
  test.assertTrue = function assertTrue(result, message) {
    print( result ? "OK" : message );
  }
  
  test.assertEquals = function assertEquals(result, expected, message) {
    var outcome = has(result, "equals") ?
      result.equals(expected) : result == expected;
    print( outcome ? "OK" : fail(result, expected, message));
  }

})(window);
