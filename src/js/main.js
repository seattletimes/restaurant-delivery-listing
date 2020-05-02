//var paywall = require("./lib/paywall");
//setTimeout(() => paywall(12345678), 5000);

require("component-responsive-frame/child");

var $ = require("./lib/qsa");

var filterNav = $.one("select.neighborhood-filter");
var search_bar = document.querySelector("#search-bar");

var search = function() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("search-bar");
  filter = input.value.toUpperCase();
  table = document.getElementById("listings");
  tr = table.getElementsByClassName("restaurant");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    txtValue = tr[i].textContent || tr[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      tr[i].style.display = "";
    } else {
      tr[i].style.display = "none";
    }
  }

}

var rows = $(".listings p");
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

search_bar.addEventListener("keydown", function(e) {
  if(e.keyCode == 13) {
    e.preventDefault();
    return false;
  } else {
    search();
  }
});