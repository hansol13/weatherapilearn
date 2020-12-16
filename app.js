const submitButton = document.getElementById('submitButton');
const inputValue = document.getElementById('inputValue');
const name = document.getElementById('name');
const description = document.getElementById('description');
const temperature = document.getElementById('temperature');

const apiKey='b0d3665fa96a54474abc0ed03c78afa5';

submitButton.addEventListener('click',function(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&appid='+apiKey+'&units=metric')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let nameValue = data['name'];
        let temp = data['main']['temp']; // currently in kelvins
        let desc = data['weather'][0]['description'];

        name.innerHTML = nameValue;
        description.innerHTML = desc;
        temperature.innerHTML = temp.toFixed(2) + "°C";

    })
    .catch(err => alert('invalid city name'))
});

document.getElementById('changeModeButton').addEventListener('click', function(){
    let currentSetting = this.value;
    let currentTemp = document.getElementById("temperature").innerText;
    // console.log(this.value);
    // console.log(parseFloat(currentTemp));

    if(currentSetting =="°C") {
        // to farenheit
        let newTemperature = (parseFloat(currentTemp)*9/5 + 32).toFixed(2).toString();
        let newSetting = "°F";
        document.getElementById("temperature").innerHTML = newTemperature+"°F";
        document.getElementById("changeModeButton").value = newSetting;
    } else { 
        // to celcius
        let newTemperature = ((parseFloat(currentTemp)- 32) *5/9).toFixed(2).toString();
        let newSetting = "°C";
        document.getElementById("temperature").innerHTML = newTemperature+"°C";
        document.getElementById("changeModeButton").value = newSetting;
    }
    
});


function init(){

    const showInitData = (position) => {

        let lat =  position.coords.latitude;
        let long = position.coords.longitude;
        
        console.log("Your current position is:");
        console.log(`Latitude : ${lat}` + `Longitude: ${long}`);
        fetch(`https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&lat=${lat}&lon=${long}&units=metric`)
            .then(response => response.json())
            .then(data => {
                console.log('api data:');
                console.log(data);

                let receivedTemperature = data['main']['temp'];
                let receivedDescription = data['weather'][0]['description'];
                description.innerHTML = receivedDescription;
                temperature.innerHTML = receivedTemperature.toFixed(2) + "°C";
            })
            .catch(err => alert('could not get data'));        
    }

    const errorAlert = (err) =>{
        document.getElementById('position').innerHTML = ERROR;
        console.warn(`ERROR(${err.code}): ${err.message}`);

    }

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showInitData, errorAlert)
    } else {
        alert("Cannot authorize geolocation");
    }
}


