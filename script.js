const container = document.getElementById("container");
const search = document.createElement("div");
search.classList.add("search");
const searchBar = document.createElement("input");
searchBar.type = "search";
searchBar.placeholder = "Recherchez un pays/ville";
const searchButton = document.createElement("button");

const title = document.createElement("h1");
title.textContent = "Weather App";
const card = document.createElement("div");
card.classList.add("card");
search.append(searchBar,searchButton);
card.append(title, search);
const cardResponse = document.createElement("div");
cardResponse.classList.add("card-response");
container.appendChild(card);



async function getWeather(){
    try{
        cardResponse.replaceChildren();
        const url =
        "https://weather.visualcrossing.com"+
        "/VisualCrossingWebServices/rest/services/timeline/"+searchBar.value+
        "?unitGroup=us&include=current&elements=datetime,temp,humidity,windspeed,conditions";
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Weather API error: ${response.status}`);
        }

        const data = await response.json();

        const temp = document.createElement("div");
        temp.textContent = "Temp: "+ data.currentConditions.temp + "°F";
        temp.classList.add("temp");
        const humidity = document.createElement("div");
        humidity.textContent = "humidity: "+ data.currentConditions.humidity;
        humidity.classList.add("humidity");
        const windSpeed = document.createElement("div");
        windSpeed.textContent = "windSpeed: "+ data.currentConditions.windspeed;
        windSpeed.classList.add("wind-speed");
        cardResponse.append(temp, humidity, windSpeed)
        card.appendChild(cardResponse);
        let isCelsius = false;
        const unit = document.createElement("div");
        unit.classList.add("units");
        unit.onclick  = () =>{
            if (!isCelsius){
                let calcul = Math.round(((parseFloat(data.currentConditions.temp) - 32) * 5/9)*10) /10;
                temp.textContent = "Temp: "+ calcul + "°C";
                isCelsius = true;
            }
            else{
                temp.textContent = "Temp: "+ data.currentConditions.temp + "°F";
                isCelsius = false;
            }
            
            
        }
        unit.textContent = "°C/°F";
        cardResponse.appendChild(unit);
    }
    catch{
        console.log(console.error);
        cardResponse.textContent = "Erreur lors de la récupération de la météo.";
    }
}

//function pour convertir en °C

//rapatrier : Temp, Fells Like, Wind Speed, Humidity, Units
searchButton.addEventListener("click", (event)=>{
    event.preventDefault();
    getWeather();
});







