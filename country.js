jQuery(document).ready(function() {
	            //-------------------------------SELECT CASCADING-------------------------//
	            var selectedCountry = (selectedRegion = selectedCity = "");
	            var BATTUTA_KEY = "00000000000000000000000000000000";
	            url =
	                "https://battuta.medunes.net/api/country/all/?key=" +
	                BATTUTA_KEY +
	                "&callback=?";
	            jQuery.getJSON(url, function(data) {
	                console.log(data);
	                jQuery.each(data, function(index, value) {
	                    // APPEND OR INSERT DATA TO SELECT ELEMENT.
	                    jQuery("#country").append(
	                        '<option value="' + value.code + '">' + value.name + "</option>"
	                    );
	                });
	            });
	            jQuery("#country").change(function() {
	                selectedCountry = this.options[this.selectedIndex].text;
	                countryCode = jQuery("#country").val();
	                url =
	                    "https://battuta.medunes.net/api/region/" +
	                    countryCode +
	                    "/all/?key=" +
	                    BATTUTA_KEY +
	                    "&callback=?";
	                jQuery.getJSON(url, function(data) {
	                    jQuery("#region option").remove();
	                    jQuery('#region').append('<option value="">Please select your region</option>');
	                    jQuery.each(data, function(index, value) {
	                        // APPEND OR INSERT DATA TO SELECT ELEMENT.
	                        jQuery("#region").append(
	                            '<option value="' + value.region + '">' + value.region + "</option>"
	                        );
	                    });
	                });
	            });
	            jQuery("#region").on("change", function() {
	                selectedRegion = this.options[this.selectedIndex].text;
	                countryCode = jQuery("#country").val();
	                region = jQuery("#region").val();
	                url =
	                    "https://battuta.medunes.net/api/city/" +
	                    countryCode +
	                    "/search/?region=" +
	                    region +
	                    "&key=" +
	                    BATTUTA_KEY +
	                    "&callback=?";
	                jQuery.getJSON(url, function(data) {
	                    console.log(data);
	                    jQuery("#city option").remove();
	                    jQuery('#city').append('<option value="">Please select your city</option>');
	                    jQuery.each(data, function(index, value) {
	                        // APPEND OR INSERT DATA TO SELECT ELEMENT.
	                        jQuery("#city").append(
	                            '<option value="' + value.city + '">' + value.city + "</option>"
	                        );
	                    });
	                });
	            });
	            // city selected --> update location string
	            jQuery("#city").on("change", function() {
	                selectedCity = this.options[this.selectedIndex].text;
	                jQuery("#location").html(
	                    "Locatation: Country: " +
	                    selectedCountry +
	                    ", Region: " +
	                    selectedRegion +
	                    ", City: " +
	                    selectedCity
	                );
	            });
	        });
