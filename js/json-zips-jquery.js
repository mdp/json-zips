$(document).ready(function() {
  if (($("input.json-zips-zipcode").size() + $("input.json-zips-city").size() + $("input.json-zips-state").size()) >= 3){
    ComSquarepushJsonzips.listen_to_fields();          
  }
});
var ComSquarepushJsonzips = function() {
	return {
	  all_zips : [],
	  curent_segment : null,
	  loaded_segment : null,
	  current_zip : null,
	  loaded_zip : null,
	  update_fields: function(){
	    if (this.all_zips[this.current_zip]){
	      $("input.json-zips-city")[0].value = this.all_zips[this.current_zip].city
	      $("input.json-zips-state")[0].value = this.all_zips[this.current_zip].state
	    }
	  },
	  listen_to_fields: function(){
	    $("input.json-zips-zipcode").keyup(function() {
	      if(this.value.length >= 3){
	        ComSquarepushJsonzips.current_segment = this.value.substr(0,3)
	        if (ComSquarepushJsonzips.loaded_segment != ComSquarepushJsonzips.current_segment){
	          ComSquarepushJsonzips.get_zips_for(ComSquarepushJsonzips.current_segment);
	          ComSquarepushJsonzips.loaded_segment = ComSquarepushJsonzips.current_segment
          }
	      }
	      if(this.value.length >= 5){
	        ComSquarepushJsonzips.current_zip = this.value.substr(0,5)
	        if (ComSquarepushJsonzips.loaded_zip != ComSquarepushJsonzips.current_zip){
	          ComSquarepushJsonzips.update_fields();
	          ComSquarepushJsonzips.loaded_zip = ComSquarepushJsonzips.current_zip
          }
	      }
	    });
	  },
	  get_zips_for: function(zip_segment){
	    $.getJSON("http://json-zips.googlecode.com/svn/trunk/zips/basic/" + zip_segment + ".json?callback=?");
    },
		load_zips : function(zips) {
		  this.all_zips = zips
		  this.update_fields();
		}
	};
}();