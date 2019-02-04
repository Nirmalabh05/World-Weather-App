'use strict';

var weatherConditions = new XMLHttpRequest(); //request data from a web server
var weatherForecast = new XMLHttpRequest();
var cObj;
var fObj;

function loadWeather(){
    
	var cityOrCountryName = document.getElementById('cityOrCountryName').value;
	var conditionsPath = "https://api.apixu.com/v1/current.json?key=cdabb6ccf2724d3cb4b143537181207&q="+cityOrCountryName+"";
	var forecastPath = "https://api.apixu.com/v1/forecast.json?key=cdabb6ccf2724d3cb4b143537181207&q="+cityOrCountryName+" &days=7";

	// AJAX REQUEST FOR THE CURRENT CONDITIONS
	weatherConditions.open('GET', conditionsPath, true);// 'open sets the parameters'
	weatherConditions.responseType = 'text';//to make sure everything is working correctly.
	weatherConditions.send(null); //'send' activates it.

	// AJAX REQUEST FOR THE FORECAST CONDITIONS
	weatherForecast.open('GET', forecastPath, true);
	weatherForecast.responseType = 'text';
	weatherForecast.send(null);

}// end function

weatherConditions.onload = function(){
	if (weatherConditions.status===200) {//to check wheteher the load is successfull or not
		cObj = JSON.parse(weatherConditions.responseText);
		console.log(cObj);
        var conditionText = cObj.current.condition.text;
		document.getElementById('location').innerHTML = cObj.location.name +", "+cObj.location.country;
		document.getElementById('weather').innerHTML = conditionText;
		document.getElementById('temperature').innerHTML = cObj.current.temp_c+"&#176"+"C";
        
        if( conditionText == 'Partly cloudy' || conditionText == 'Cloudy'){
            document.getElementById('imageBackground').style.backgroundImage = "url('images/cloudy.jpg')";
        }
        else if(conditionText == 'Sunny'){
            document.getElementById('imageBackground').style.backgroundImage = "url('images/sunny.jpg')";
        }
        else if(conditionText == 'Mist'){
            document.getElementById('imageBackground').style.backgroundImage = "url('images/mist.jpg')";
        }
        else if(conditionText == 'Patchy rain possible' || conditionText == 'Light rain'){
            document.getElementById('imageBackground').style.backgroundImage = "url('images/rain.jpg')";
        }
        else if(conditionText == 'Patchy snow possible' || conditionText == 'Patchy light snow' || conditionText == 'Patchy heavy snow' || conditionText == 'Light snow'){
            document.getElementById('imageBackground').style.backgroundImage = "url('images/snow.jpg')";
        }
        else if(conditionText == 'Patchy sleet possible'){
            document.getElementById('imageBackground').style.backgroundImage = "url('images/sleet.jpg')";
        }
        else if(conditionText == 'Freezing fog' || conditionText == 'Fog'){
            document.getElementById('imageBackground').style.backgroundImage = "url('images/fog.jpg')";
        }
        else if(conditionText == 'Clear'){
            document.getElementById('imageBackground').style.backgroundImage = "url('images/clear.jpg')";
        }
        else if(conditionText == 'Moderate or heavy rain with thunder' || conditionText == 'Patchy light rain with thunder'){
            document.getElementById('imageBackground').style.backgroundImage = "url('images/thunder.jpg')";
        }
	}//end if
}// end function

weatherForecast.onload = function(){
	if (weatherForecast.status===200) {
		fObj = JSON.parse(weatherForecast.responseText);
		console.log(fObj);

		//Day1
		var d = new Date();
    	var weekday = new Array(7);
    	weekday[0] = "Sunday";
   	 	weekday[1] = "Monday";
    	weekday[2] = "Tuesday";
    	weekday[3] = "Wednesday";
    	weekday[4] = "Thursday";
    	weekday[5] = "Friday";
    	weekday[6] = "Saturday";
		//document.getElementById('r1c1').innerHTML = fObj.forecast.forecastday["0"].date;
		document.getElementById('r1c1').innerHTML = weekday[d.getDay()];
		document.getElementById('r1c3').innerHTML = fObj.forecast.forecastday[0].day.avgtemp_c+"&#176"+"C";
		//document.getElementById('r1c4').innerHTML = fObj.forecast.forecastday["0"].day.mintemp_c+"&#176"+"C";
		var imagePath = fObj.forecast.forecastday["0"].day.condition.icon;
		document.getElementById('r1c2').src = imagePath;

		//Day2
		document.getElementById('r2c1').innerHTML = weekday[d.getDay()+1];
		document.getElementById('r2c3').innerHTML = fObj.forecast.forecastday[1].day.avgtemp_c+"&#176"+"C";
		//document.getElementById('r2c4').innerHTML = fObj.forecast.forecastday["1"].day.mintemp_c+"&#176"+"C";
		var imagePath = fObj.forecast.forecastday["1"].day.condition.icon;
		document.getElementById('r2c2').src = imagePath;

		//Day3
		document.getElementById('r3c1').innerHTML = weekday[d.getDay()+2];
		document.getElementById('r3c3').innerHTML = fObj.forecast.forecastday[2].day.avgtemp_c+"&#176"+"C";
		//document.getElementById('r3c4').innerHTML = fObj.forecast.forecastday["2"].day.mintemp_c+"&#176"+"C";
		var imagePath = fObj.forecast.forecastday["2"].day.condition.icon;
		document.getElementById('r3c2').src = imagePath;
	}//end if
}// end function