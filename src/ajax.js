(function(globals) {

  var xmlhttp,
  
      init = function init() {
        xmlhttp = null;
        if(window.XMLHttpRequest) {
          // code for IE7+, Firefox, Chrome, Opera, Safari
          xmlhttp=new XMLHttpRequest();
        } else if (window.ActiveXObject) {
          // code for IE6, IE5
          xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        } else {
          alert("Your browser does not support XMLHTTP!");
        }
      }
  
  // exposing our namespace
  ajax = globals.Ajax = {};

  ajax.fetch = function fetch(url) {
    xmlhttp.open("GET", url, false );
    xmlhttp.send(null);
    return xmlhttp.responseText;
  }
  
  init();
  
})(window);
