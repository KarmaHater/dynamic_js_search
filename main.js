 var data =
$(document).ready(function(){

  function Search (){
    this.searchResultsBox = $("#search-results");
    this.searchInput = $("#search");
    this.data = null
  }

  Search.prototype = {
    init: function() {
      this.bindEvents();
      this.loadData();
    },
    bindEvents: function() {
      this.searchInput.on('keyup', function(e) {
        this.filter(e);
      }.bind(this))
    },
    loadData: function() {
      $.ajax({
        url: "data.json"
      })
      .success(function(data) {
        this.data = data
        this.all(data)
      }.bind(this))
      .error(function( xhr, error ) {
        console.log(error);
      }.bind(this));
    },
    all: function(data) {
      for (var i = this.data.length - 1; i >= 0; i--) {
        var temp = this.result(this.data[i]);
        this.searchResultsBox.append(temp);
      };
    },
    filter: function() {
      this.resetResults()
      var val = this.searchInput.val()
      var myExp = new RegExp(val, "i");

      for (var i = this.data.length - 1; i >= 0; i--) {
        if (this.data[i].name.search(myExp) != -1) {
          var temp = this.result(this.data[i]);
          this.searchResultsBox.append(temp);
        };
      };
    },
    result: function(content) {
      var source = $("#search-results-temp").html()
      var template = Handlebars.compile(source);
      return template(content);
    },
    resetResults: function() {
      this.searchResultsBox.html('');
    }
  };
  var search = new Search
  search.init();
})