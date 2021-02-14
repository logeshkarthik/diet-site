<html><head></head><body><pre style="word-wrap: break-word; white-space: pre-wrap;">(function($){
"use strict";

	$("#main-nav-toggle").on('click', function () {

		$(this).toggleClass('on');
		$("#responsive-main-menu").toggleClass("active");

	});

	// FLEX SLIDER TESTIMONIALS
	if ($(".flexslider-tes")[0]) {
		$('.flexslider-tes').flexslider(
			{
				"directionNav": false,
				"controlNav": true,
				"animation": "slide",
				"prevText": "",
				"nextText": ""
			}
		);
	}

	// FUN FACTS NUMBER ANIMATION
	var funfacts = $(".section-fun-facts");
	var factsLoaded = false;
	if(funfacts[0]){
		$(window).on("scroll",function(){
			var _offsetTop = $(this).scrollTop() - funfacts.offset().top;
			if(!factsLoaded){
				if(_offsetTop &gt; -570){
					funfacts.find(".single-fun-fact__number").each(function(){
						var _this = $(this) , _num = 0 , _timer;
						var _numTotal = _this.data('number');
						_timer = setInterval(function(){
							if(_num &gt;= _numTotal)
								clearInterval(_timer);
							_this.find('.fact__number--nbr').html(_num);
							_num++;
						},30);
					});
					factsLoaded = true;
				}
			}
			//Remove event scrool after skills and Fun Facts loaded
			if(factsLoaded)
				$(this).off("scroll");
		})
	}

	// WOW ANIMATIONS
	if ($(".wow")[0]) {
		new WOW().init();
	}

	// SMOOTH SCROLL
	$('a[href*="#"]:not([href="#"])').on('click', function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &amp;&amp; location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: target.offset().top
				}, 1000);
				return false;
			}
		}
	});

	// JS MAP //
	if ($('#map').length &gt; 0) {

	
			// Create and Initialise the Map (required) our google map below
			google.maps.event.addDomListener(window, 'load', init);
        	function init() {
            // Basic options for a simple Google Map
            // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
            var mapOptions = {
				// How zoomed in you want the map to start at (always required)
				zoom: 14,
			scrollwheel: false,
			// The latitude and longitude to center the map (always required)
			center: new google.maps.LatLng(40.730610, -73.935242), // New York
			// How you would like to style the map.
			// This is where you would paste any style found on [Snazzy Maps][1].
			// copy the Styles from Snazzy maps,  and paste that style info after the word "styles:"
			styles:
				[
								{
						"featureType": "administrative",
					"elementType": "labels",
					"stylers": [
										{
						"visibility": "off"
							}
						]
					},
								{
						"featureType": "landscape",
					"elementType": "all",
					"stylers": [
										{
						"visibility": "on"
							}
						]
					},
								{
						"featureType": "poi.attraction",
					"elementType": "labels",
					"stylers": [
										{
						"visibility": "on"
							}
						]
					},
								{
						"featureType": "poi.business",
					"elementType": "all",
					"stylers": [
										{
						"visibility": "on"
							}
						]
					},
								{
						"featureType": "poi.business",
					"elementType": "labels",
					"stylers": [
										{
						"visibility": "on"
							}
						]
					},
								{
						"featureType": "poi.business",
					"elementType": "labels.icon",
					"stylers": [
										{
						"visibility": "off"
							}
						]
					},
								{
						"featureType": "poi.government",
					"elementType": "labels",
					"stylers": [
										{
						"visibility": "on"
							}
						]
					},
								{
						"featureType": "poi.school",
					"elementType": "all",
					"stylers": [
										{
						"visibility": "on"
							}
						]
					},
								{
						"featureType": "poi.school",
					"elementType": "labels",
					"stylers": [
										{
						"visibility": "off"
							}
						]
					},
								{
						"featureType": "road",
					"elementType": "all",
					"stylers": [
										{
						"visibility": "on"
							}
						]
					},
								{
						"featureType": "road",
					"elementType": "labels",
					"stylers": [
										{
						"visibility": "off"
							}
						]
					}
				]
			};
			var mapElement = document.getElementById('map');
			// Create the Google Map using out element and options defined above
			var map = new google.maps.Map(mapElement, mapOptions);
			// Following section, you can create your info window content using html markup
			var contentString = '&lt;div id="content"&gt;' +
				'&lt;div id="siteNotice"&gt;' +
				'&lt;/div&gt;' +
				'&lt;h1 id="firstHeading" class="firstHeading"&gt;Uluru&lt;/h1&gt;' +
				'&lt;div id="bodyContent"&gt;' +
				'&lt;p&gt;&lt;b&gt;Uluru&lt;/b&gt;, also referred to as &lt;b&gt;Ayers Rock&lt;/b&gt;, is a large ' +
					'sandstone rock formation in the southern part of the ' +
					'Northern Territory, central Australia. It lies 335&amp;#160;km (208&amp;#160;mi) ' +
					'south west of the nearest large town, Alice Springs; 450&amp;#160;km ' +
					'(280&amp;#160;mi) by road. Kata Tjuta and Uluru are the two major ' +
					'features of the Uluru - Kata Tjuta National Park. Uluru is ' +
					'sacred to the Pitjantjatjara and Yankunytjatjara, the ' +
					'Aboriginal people of the area. It has many springs, waterholes, ' +
					'rock caves and ancient paintings. Uluru is listed as a World ' +
				'Heritage Site.&lt;/p&gt;' +
				'&lt;p&gt;Attribution: Uluru, &lt;a href="http://en.wikipedia.org/w/index.php?title=Uluru&amp;oldid=297882194"&gt;' +
				'http://en.wikipedia.org/w/index.php?title=Uluru&lt;/a&gt; ' +
				'(last visited June 22, 2009).&lt;/p&gt;' +
				'&lt;/div&gt;' +
				'&lt;/div&gt;';
			// Define the image to use for the map marker (58 x 44 px)
			var image = 'http://www.google.com/mapfiles/marker.png';
			// Define the Lattitude and Longitude for the map location
			var myLatLng = new google.maps.LatLng(40.730610, -73.935242);
			// Define the map marker characteristics
				var mapMarker = new google.maps.Marker({
					position: myLatLng,
				map: map,
				icon: image,
				title: 'Frostbyte Interactive'
			});
			// Following Lines are needed if you use the Info Window to display content when map marker is clicked
				var infowindow = new google.maps.InfoWindow({
					content: contentString
			});
			// Following line turns the marker, into a clickable button and when clicked, opens the info window
				google.maps.event.addListener(mapMarker, 'click', function () {
					infowindow.open(map, mapMarker);
			});
		}
	}

 console.log("NutritionPro") ;
})(jQuery)

</pre></body></html>