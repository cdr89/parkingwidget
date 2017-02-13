(function() {
	
	function loadJSON() { // load JSON in hard-code way because Chrome blocks calls to local file
		return {
			 "vendor" : {
			   "name": "ParkinGo",
			   "departureAirport": "Bergamo Orio al Serio",
			   "map": "http://lorempixel.com/370/390",
			   "features": [
				"Parcheggio ParkinGo della tipologia selezionata",
				"Navetta da/per aeroporto 24h",
				"Vigilanza e custodia del mezzo 24h",
				"Ripristino gratuito del calo di batteria della tua auto"
			   ],
			  },
			  "parkings": [{
				"id": 123,
				"indoor": false,
				"insurance": false,
				"price": "13.56 EUR"
			  }, {
				"id": 456,
				"indoor": false,
				"insurance": true,
				"price": "18.99 EUR"
			  }, {
				"id": 243,
				"indoor": true,
				"insurance": true,
				"price": "23.56 EUR"
			  }, {
				"id": 700,
				"indoor": true,
				"insurance": false,
				"price": "16.49 EUR"
			  }],
			  "dictionary": {
				"bookYourParking": "Prenota il tuo parcheggio a",
				"featuresTitle": "Sono inclusi i seguenti servizi:",
				"indoorSpace": "Posto auto coperto",
				"outdoorSpace": "Posto auto scoperto",
				"insuranceIncluded": "Assicurazione inclusa",
				"insuranceExcluded": "Assicurazione esclusa"
			  }
		};
	}
	
	function loadCSS(){
		var css_link = $("<link>", { 
			rel: "stylesheet", 
			type: "text/css", 
			href: "parking-widget.css" 
		});
		css_link.appendTo('head');
	}
	
	function detailsHandler(){
		$("#park-more").click(function(){
			$("#park-more").hide();
			$(".details").show();
		});
		$("#park-less").click(function(){
			$("#park-more").show();
			$(".details").hide();
		});
	}
	
	function updateUI(jsonModel){
		$("#header h2").html(jsonModel.vendor.name);
		$("#park-descr").html(jsonModel.dictionary.bookYourParking + " " + jsonModel.vendor.departureAirport);
		$("#parkimg").attr("src", jsonModel.vendor.map);
		
		appendFeatures(jsonModel);
	}
	
	function appendFeatures(jsonModel){
		$("#features h4").html(jsonModel.dictionary.featuresTitle);
		$.each(jsonModel.vendor.features, function(index, feature) {
            $("#features ul").append('<li>' + feature + '</li>');
		});
	}
	
	function updateParkings(jsonModel){
		var currentRowElement;
		
		$.each(jsonModel.parkings, function(index, parking) {
			if(index % 2 == 0){
				currentRowElement = appendNewParkRow();
			}
			var parkingItem = createParkingItem(parking, jsonModel.dictionary);
            currentRowElement.append(parkingItem);
		});
	}
	
	function appendNewParkRow(){
		var rowElement = $('<div>', { class: "row" });
		$("#parkings-container").append(rowElement);
		
		return rowElement;
	}
	
	function createParkingItem(parking, dictionary){
		return "<div class=\"resp-col-50 parking-item\">"+
					"<span class=\"parking-id\">" + parking.id + "</span>" +
					"<p class=\"parking-indoor\">" + getIndoor (parking, dictionary) + "</p>" +
					"<p class=\"parking-insurance\">" + getInsurance (parking, dictionary) + "</p>" +
					"<p class=\"parking-price\">" + parking.price + "</p>" +
				"</div>";
	}
	
	function getIndoor (parking, dictionary){
		if(parking.indoor){
			return dictionary.indoorSpace;
		}else{
			return dictionary.outdoorSpace;
		}
	}	
	
	function getInsurance (parking, dictionary){
		if(parking.insurance){
			return dictionary.insuranceIncluded;
		}else{
			return dictionary.insuranceExcluded;
		}
	}
	
	function parkingItemHandler(){
		$(".parking-item").click(function(){
			var parkId = $(this).find(".parking-id").html();
			// deselect all parking items
			$(".parking-item").removeClass("selected-parking");
			// select the current parking
			$(this).addClass("selected-parking");
			addToShoppingCart(parkId);
		});
	}
	
	function addToShoppingCart(parkId){
		alert("Added to shopping cart the parking with id: " + parkId);
	}
	
	function appendWidgetCode(){
		var widgetCode = "<div id=\"container\">" +
						"\r\n\t\t\t<div class=\"row\">" +
						"\r\n\t\t\t\t<div id=\"header\" class=\"col-100\">" +
						"\r\n\t\t\t\t\t<h2><\/h2>" +
						"\r\n\t\t\t\t<\/div>" +
						"\r\n\t\t\t<\/div>" +
						"\r\n\r\n\t\t\t<div class=\"row\">" +
						"\r\n\t\t\t\t<div id=\"park-descr\" class=\"col-70\">" +
						"\r\n\t\t\t\t<\/div>" +
						"\r\n\t\t\t\t<div class=\"col-30 right-align\">" +
						"\r\n\t\t\t\t\t<a id=\"park-more\" href=\"#\">Mostra dettagli<\/a>" +
						"\r\n\t\t\t\t<\/div>" +
						"\r\n\t\t\t<\/div>" +
						"\r\n\r\n\t\t\t<div class=\"row details\">" +
						"\r\n\t\t\t\t<div id=\"leftimg\" class=\"col-50\">" +
						"\r\n\t\t\t\t\t<img id=\"parkimg\" class=\"respimg\"\/>" +
						"\r\n\t\t\t\t<\/div>" +
						"\r\n\t\t\t\t<div id=\"features\" class=\"col-50\">" +
						"\r\n\t\t\t\t\t<h4><\/h4>" +
						"\r\n\t\t\t\t\t<ul>" +
						"\r\n\t\t\t\t\t<\/ul>" +
						"\r\n\t\t\t\t<\/div>" +
						"\r\n\t\t\t<\/div>" +
						"\r\n\t\r\n\t\t\t<div id=\"park-less-container\" class=\"row details\">" +
						"\r\n\t\t\t\t<div class=\"col-50\">" +
						"\r\n\t\t\t\t<\/div>" +
						"\r\n\t\t\t\t<div id=\"park-less\" class=\"col-50 right-align\">" +
						"\r\n\t\t\t\t\t<a href=\"#\">Nascondi dettagli<\/a>" +
						"\r\n\t\t\t\t<\/div>\r\n\t\t\t<\/div>" +
						"\r\n\r\n\t\t\t<div id=\"parkings-container\">" +
						"\r\n\t\t\t<\/div>" +
						"\r\n\t\t<\/div>";
		$("#parkingwidget").append(widgetCode);
	}

	/******** Main function ********/
	jQuery(document).ready(function($) { 
		// Load the CSS
		loadCSS();
		
		// Appends the widget code to the #parkingwidget element
		appendWidgetCode();
		
		// handle details show/hide
		detailsHandler();

		// Load the JSON and update the UI
		var jsonModel = loadJSON();
		updateUI(jsonModel);
		updateParkings(jsonModel);
		
		// handle the selection of a parking item
		parkingItemHandler();
	});			


})();
