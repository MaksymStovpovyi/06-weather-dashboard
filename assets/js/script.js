let cityName = 'Toronto';

document.getElementById('search-btn').addEventListener( 'click', (e) => {
    e.preventDefault();
    cityName = document.getElementById('search-city').value;
    getOne(cityName);
    getFive(cityName);
    cityList(cityName);
})

// GET one day
function getOne (atr) {
    
    let ulr = `https://api.openweathermap.org/data/2.5/weather?q=${atr}&appid=3058b8e0dab683dade99f6a9ab474de8`;
    fetch(ulr)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
    
        let icon = data.weather[0].icon;
        let iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`
        let date = new Date(data.dt * 1000);
        
        let title = `
        <h2>${data.name} (${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()})
        <img src="${iconUrl}"></h2>
        <p>Temp: ${data.main.temp} °F</p>
        <p>Wind: ${data.wind.speed} MPH</p>
        <p>Humidity: ${data.main.humidity} %</p>
        `;

        document.getElementsByClassName('city-info-title')[0].innerHTML = title;
    })
}

// GET five days
function getFive (atr) {
    let fiveDaysElem = document.querySelector('.five-days');
    fiveDaysElem.innerHTML = '';

    let ulr = `https://api.openweathermap.org/data/2.5/forecast?q=${atr}&appid=3058b8e0dab683dade99f6a9ab474de8`;
    fetch(ulr)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {

        for (let i = 0; i < data.list.length; i ++) {
            if (data.list[i].dt_txt.includes('12')) {

                let date = new Date(data.list[i].dt * 1000);

                let icon = data.list[i].weather[0].icon;
                let iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`

                
                let div = document.createElement('div');
                div.innerHTML = `
                <h3>${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}</h3>
                <img src="${iconUrl}">
                <p>Temp: ${data.list[i].main.temp} °F</p>
                <p>Wind: ${data.list[i].wind.speed} MPH</p>
                <p>Humidity: ${data.list[i].main.humidity} %</p>
                `;

                fiveDaysElem.appendChild(div);
            }
        }
    })
}

// City List
function cityList(atr) {

    
    let ul = document.querySelector('ul');
    ul.innerText = '';

    let arrLS = [];
    if (!localStorage.historyList) {
        localStorage.setItem('historyList', JSON.stringify([]));
        arrLS = JSON.parse(localStorage.getItem('historyList'));
        arrLS.unshift(atr);
        localStorage.setItem('historyList', JSON.stringify(arrLS));
        console.log(arrLS);
    } else {
        arrLS = JSON.parse(localStorage.getItem('historyList'));
        arrLS.unshift(atr);
        if (arrLS.length > 15) {
            arrLS.pop();
        }
        localStorage.setItem('historyList', JSON.stringify(arrLS));
        console.log(arrLS);
    }

    for (let i = 0; i < arrLS.length; i++) {
        ul.appendChild(document.createElement('li')).innerText = arrLS[i];
        console.log('step ' + i + 1);
    }
}