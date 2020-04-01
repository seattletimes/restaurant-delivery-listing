//var paywall = require("./lib/paywall");
//setTimeout(() => paywall(12345678), 5000);

require("component-responsive-frame/child");

var $ = require("./lib/qsa");

var filterNav = $.one("select.neighborhood-filter");

console.log(filterNav);
var rows = $(".listings p");
console.log(rows);
rows = rows.map(function(r) {
  return {
    element: r,
    neighborhood: r.getAttribute("data-neighborhood").split(";")
    
  };


});


var intersect = function(a, b) {
  for (var i = 0; i < a.length; i++) {
    for (var j = 0; j < b.length; j++) {
      if (a[i] == b[j]) return true;
    }
  }
};

filterNav.addEventListener("change", function() {
  var neighborhood = $(`[name="neighborhood-filter"]:checked`).map(e => e.value);
  

  rows.forEach(function(item) {
    var matched = true;
    if (neighborhood.length && !intersect(neighborhood, item.neighborhood)) matched = false;
    

    item.element.classList[matched ? "remove" : "add"]("hidden");
  });

});

