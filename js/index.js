// TODAY ELEMNTS //
let todayName = document.getElementById('day')
let monthName = document.getElementById('month')
let monthNum = document.getElementById('monthNum')
let todayLocation = document.getElementById('location')
let todaytemp = document.getElementById('temp')
let icon = document.getElementById('icon')
let text = document.getElementById('text')
let humidity = document.getElementById('humidity')
let windSpeed = document.getElementById('wind-speed')
let windDir = document.getElementById('wind-dir')
let searchInput = document.getElementById('search')


//NEXTDAY ///
let nextday = document.getElementsByClassName('day')
let nextMaxTemp = document.getElementsByClassName('max-temp')
let nextMinTemp = document.getElementsByClassName('min-temp')
let nextText = document.getElementsByClassName('text')
let nexticon = document.getElementsByClassName('icon')



async function getData(cityName) {
    let API = `https://api.weatherapi.com/v1/forecast.json?key=472a450eeee347aaad000058241603&q=${cityName}&days=3`

    let response = await fetch(API)
    let data = await response.json()
    console.log(data);
    return data
}


function DisplayData(data) {

    let date = new Date()

    todayName.innerHTML = date.toLocaleDateString('en-US', { weekday: "long" })
    monthName.innerHTML = date.toLocaleDateString('en-US', { month: "long" })
    monthNum.innerHTML = date.getDate()

    todayLocation.innerHTML = data.location.name
    todaytemp.innerHTML = data.current.temp_c + ' °C'
    icon.setAttribute('src', data.current.condition.icon)
    humidity.innerHTML = data.current.humidity + "%"
    text.innerHTML = data.current.condition.text

    windSpeed.innerHTML = data.current.wind_kph
    windDir.innerHTML = data.current.wind_dir

}

function DisplayNextData(data) {
    let nextdata = data.forecast.forecastday

    for (let i = 0; i < 2; i++) {
        let nextDate = new Date(nextdata[i + 1].date)

        nextday[i].innerHTML = nextDate.toLocaleDateString("en-us", { weekday: 'long' })
        nextMaxTemp[i].innerHTML = nextdata[i + 1].day.maxtemp_c+ ' °C'
        nextMinTemp[i].innerHTML = nextdata[i + 1].day.mintemp_c+ ' °C'
        nextText[i].innerHTML = nextdata[i + 1].day.condition.text
        nexticon[i].setAttribute('src', nextdata[i + 1].day.condition.icon)

    }

}



async function startApp(city = 'alexandria') {

    const weatherData = await getData(city)
    DisplayData(weatherData)
    DisplayNextData(weatherData)
    

   

}

startApp()

searchInput.addEventListener('input', function () {


    if (searchInput.value.length>=3) 
    {
        startApp(searchInput.value)
    }
   
})


