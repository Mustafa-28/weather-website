const APIKey = "067f1b6331c9c149ac7c3b7c9894816f"
const weatherCard = document.getElementById("weather-card")

document.addEventListener("submit", async event =>{
    event.preventDefault();
    const city = document.getElementById("cityInput").value.trim()
     try{
         response = await (await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`))
        if(city){
        data = await response.json()
        displayweather(data)
        console.log(data)
     }else{
        throw new Error("Please enter a city")
     }
     }catch(error){
        displayerror(error)
     }   
})

function displayerror(erorr){
    weatherCard.textContent = ""
    erorrMessage = document.createElement("p")
    erorrMessage.textContent = erorr
    weatherCard.appendChild(erorrMessage)
    weatherCard.style.display = "flex"
}

function displayweather(data){
weatherCard.textContent = ""
const {name: city,
       main:{temp, humidity },
       weather: [{description, id}]} = data
       cityName = document.createElement("h1")
       tempDisplay = document.createElement("p")
       humidityDisplay = document.createElement("p")
       discDisplay = document.createElement("p")
       emojiDisplay = document.createElement("p")

       cityName.textContent = city
       tempDisplay.textContent = `${(temp-272.15).toFixed(1)}°C`
       humidityDisplay.textContent = `humidity: ${humidity}%`
       discDisplay.textContent = description
       emojiDisplay.textContent = displayEmoji(id)
       
       weatherCard.appendChild(cityName)
       weatherCard.appendChild(tempDisplay)
       weatherCard.appendChild(humidityDisplay)
       weatherCard.appendChild(discDisplay)
       weatherCard.appendChild(emojiDisplay)

       cityName.classList.add("city")
       tempDisplay.classList.add("temp")
       humidityDisplay.classList.add("humidity")
       discDisplay.classList.add("description")
       emojiDisplay.classList.add("emoji")
       weatherCard.style.display = "flex"
}

function displayEmoji(id){
    switch(true){
        case(id>=200 && id < 600):
            return "🌧️"
            break
        case(id>=600 && id < 700):
            return "❄️"
        case(id >= 700 && id < 800):
            return "🌫️"
        case(id == 800):
            return "☀️"
        case(id >= 801 && id < 810):
            return "☁️"
        default:
            return " "
        }
}
