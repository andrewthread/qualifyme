var x = document.getElementById("demo");

$("#getlocal").click(function(){
    $("#getlocal").hide();
});

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function traverseJson(json,adminLevel){
    for (var i=0; i<json.results[0].address_components.length; i++) {
            for (var b=0;b<json.results[0].address_components[i].types.length;b++) {
                if (json.results[0].address_components[i].types[b] == adminLevel) {
                    //this is the object you are looking for
                    return json.results[0].address_components[i];
                    break;
                }
            }
        }
}

function showPosition(position) {

  phone = decodeURIComponent(getUrlParameter('phone'));

if(getUrlParameter('county')){
  county = decodeURIComponent(getUrlParameter('county'));
  adminLevel = "administrative_area_level_2";
  locType = "city";
  locExample = "Streator, IL";
}

if(getUrlParameter('township')){
  county = decodeURIComponent(getUrlParameter('township'));
  adminLevel = "administrative_area_level_3";
  locType = "full address";
  locExample = "912 N. Shabbona St., Streator IL";
}

aa = decodeURIComponent(getUrlParameter('aa'));

county = county.split(',');

lat = position.coords.latitude;
log = position.coords.longitude;

var json = "https://maps.googleapis.com/maps/api/geocode/json?&key=AIzaSyCSXhvHQJlLixd41ZqI_IvOw9AcmNfAEbQ&latlng=" + position.coords.latitude + "," + position.coords.longitude;   

$.getJSON(json, function (json) {

towns = county;

var address = traverseJson(json, adminLevel);

var i = -1; 
while(address.long_name != towns[i]){
  i++;
    if (address.long_name == towns[i]){
      x.innerHTML = "<p class=\"green\"><i class=\"material-icons\">thumb_up</i> Based on your current location in " + address.long_name + ", <b>you are eligible for membership</b>. Please review all qualifications to determine if you fully qualify.</p>";
      break;
    }
    else if (i > towns.length){
    x.innerHTML =  "<p class=\"bluealert\"><i class=\"material-icons\">pause_circle_outline</i>We placed you in " + address.long_name + ", based on your location. <br/><b>Lets try your current " + locType +".</b> <input placeholder=\"i.e. " + locExample + "\" id=\"zip\" name=\"zip\" type=\"text\"/> <button id=\"getlocal\" onclick=\"checkAgain(towns, aa, adminLevel, phone, lat, log)\">Submit</button></p>";  
      break;
    }
}


});
}

function checkAgain(towns, aa, adminLevel, phone, lat, log){

var y = document.getElementById("zip").value;

var json = "https://maps.googleapis.com/maps/api/geocode/json?&key=AIzaSyCSXhvHQJlLixd41ZqI_IvOw9AcmNfAEbQ&components=administrative_area:" + aa + "&components=country:US&address=" + y;

$.getJSON(json, function (json) {

var address = traverseJson(json, adminLevel);

var request = {
    location: new google.maps.LatLng(json.results[0].geometry.location.lat, json.results[0].geometry.location.lng),
    rankBy: google.maps.places.RankBy.DISTANCE,
    name: "credit+union",
    keyword: 'credit+union',
    types: ['finance']
};

var count;

function callback(results, status) {

    if (status == google.maps.places.PlacesServiceStatus.OK) {

      count = results.length;

        for (var i = 0; i < results.length; i++) {

            var request = { placeId: results[i].place_id };

            service.getDetails(request, detailsCallback);
        }
              
    }
}

var j = 0;
var placeTable = "<table>";

function detailsCallback(place, status) {
      
      j++;

  if (status == google.maps.places.PlacesServiceStatus.OK) {

      placeTable += "<tr><td><a href=\"" + place.website + "\">" + place.name + "</a></td><td>" + place.vicinity + "</td></tr>";

      if(j === count){
      
      container.innerHTML += placeTable + "</table>";            
    }
  }
}

var i = -1; 
while(address.long_name != towns[i]){
  i++;
if (address.long_name == towns[i]){
  x.innerHTML = "<p class=\"green\"><i class=\"material-icons\">thumb_up</i> Based on your current location in " + address.long_name + ", <b>you are eligible for membership</b>. Please review all qualifications to determine if you fully qualify.</p>";
  break;
}else if (i > towns.length){

  x.innerHTML =  "<p class=\"redalert\"><i class=\"material-icons\">highlight_off</i> Sorry you are not eligible at this time, based on your current location in <b>" + address.long_name +"</b>. You may still qualify though, please see the full terms to learn more. If this location is wrong please call us at " + phone + " to determine your membership status. <br/><br/><b>Do you qualify for these credit unions?</b><br/>Here are a few nearby credit unions you may be eligible to join.</p><div id=\"results\"></div></p>";
  var container = document.getElementById('results');

  var service = new google.maps.places.PlacesService(container);
  service.nearbySearch(request, callback);
  break;
}
}



});

}