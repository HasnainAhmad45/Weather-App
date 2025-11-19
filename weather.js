const apikey="8c77042e721109158ba07b30a4a48e55";
const apiurl="https://api.openweathermap.org/data/2.5/weather?units=metric&q="
let search=document.getElementById("in")
let pic=document.getElementById("img")
async function check_weather(city) {
    const response=await fetch(apiurl+city+`&appid=${apikey}`)
    var data=await response.json();
    console.log(data)
    document.createElement
    document.getElementById("city").innerHTML=data.name
    document.getElementById("temp").innerHTML=Math.round(data.main.temp)+"°C"
    document.getElementById("w-speed").innerHTML=data.wind.speed+" kmph"
    document.getElementById("humid").innerHTML=data.main.humidity+"%"
    if(data.weather[0].main=="Clouds"){
        pic.src="./icons/cloud-png-isolated-transparent-background_191095-18057.avif"
    }
    else if(data.weather[0].main=="Clear"){
        pic.src="./icons/pexels-photo-96622.webp"
    }
    else if(data.weather[0].main=="Rain"){
        pic.src="./icons/weather-icon-with-rain-cloud-with-water-drops_107791-17374.jpg"
    }
    else if(data.weather[0].main=="Drizzle"){
        pic.src="./iccons/raindrops-misted-on-a-windscreen.jpg"
    }
}
let btn=document.getElementById("btn-1")
btn.addEventListener("click",()=>{
    check_weather(search.value);
})

