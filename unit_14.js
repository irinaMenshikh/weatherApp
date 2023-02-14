const param = {
  "url": "https://api.openweathermap.org/data/2.5/",
  "appid": "2faadd5f047d4243aa72cb15d9de67a4"
}

let cityArr = {
  "Kyiv": 703448,
  "Lviv": 702550,
  "Cherkasy": 710791,
  "Uman": 690688,
  "Zolotonosha": 686875
}

let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function createSelect() {
  let selectContainer = document.querySelector(".city-select-container");
  let select = document.createElement("select");
  select.className = "select-city font";

  for (let key in cityArr) {
    let option = document.createElement("option");
    option.className = "option-city";
    option.value = cityArr[key];
    option.textContent = key;
    select.append(option);
    selectContainer.append(select);
  }
  getSelectVal(select);
}
createSelect();

function getSelectVal(select) {
  let selectValue = '';
  select.addEventListener('change', function (e) {
    console.log("Changed to: " + e.target.value)
    selectValue = e.target.value;
    getWeather(selectValue);
  })

}

function getWeather(cityId) {
  fetch(`${param['url']}weather?id=${cityId}&appid=${param['appid']}`)
    .then(function (resp) {
      return resp.json()
    })
    .then(function (data) {
      showWeather(data.main.temp, data.sys['country'], data.name, data.weather[0]['description'], data.clouds.all, data.wind.speed, data.main.humidity, data.weather[0]['icon'], data.main.pressure, data.sys['sunrise'], data.sys['sunset']);
    })
}

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function getUserTime(t) {
  let Y = t.getFullYear();
  let M = addZero(t.getMonth() + 1);
  let D = addZero(t.getDate());
  let d = days[t.getDay()];

  showUserTime(d, D, M, Y);
}

getUserTime(new Date());

function showUserTime(weekDay, day, month, year) {
  document.querySelector(".week-day").innerHTML = weekDay + ", ";
  document.querySelector(".day").innerHTML = day;
  document.querySelector(".month").innerHTML = month;
  document.querySelector(".year").innerHTML = year;
}

function showWeather(temp, country, city, weatherDescription, clouds, wind, humidity, icon, pressure, sunrise, sunset) {
  document.querySelector(".temp").innerHTML = Math.round(temp - 273.15);
  document.querySelector(".country").innerHTML = country + ", ";
  document.querySelector(".city-name").innerHTML = city;
  document.querySelector(".weather-description").innerHTML = weatherDescription;
  document.querySelector(".clouds").innerHTML = clouds + " &#x25";
  document.querySelector(".wind-speed").innerHTML = Math.round(wind) * 3.6 + " km/h";
  document.querySelector(".humidity-percent").innerHTML = humidity + " &#x25";
  document.querySelector(".pressure").innerHTML = (pressure * 133, 3) + " mmHg";
  let weatherIcon = document.querySelector(".icon");
  weatherIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + icon + "@2x.png");
  let timeSunrise = new Date(sunrise * 1000);
  document.querySelector(".sunrise").innerHTML = timeSunrise.getHours() + "." + addZero(timeSunrise.getMinutes()) + " a.m";
  let timeSunset = new Date(sunset * 1000);
  document.querySelector(".sunset").innerHTML = timeSunset.getHours() + "." + addZero(timeSunset.getMinutes()) + " p.m";

}

getWeather(cityArr["Kyiv"]);