
export default class Weather {
    constructor(api_key) {
        this.apiKey = api_key;
    
        if(localStorage.getItem("weather") && Date.now() - localStorage.getItem("weather") < 3600000) {
            this.weather = JSON.parse(localStorage.getItem("weather"));
        } else {
            this.getLocation();
        }
    }

    getLocation() {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getWeather.bind(this));
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    getWeather(position) {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        //use url to fetch weather data from weatherapi with metric units
        let url = `https://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${lat},${lon}&aqi=no`;

        
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.weather = data;
                localStorage.setItem("weather", JSON.stringify(data));
                localStorage.setItem("weatherTime", Date.now());
                this.displayWeather(data);
            });

    }

    displayWeather(data) {
        const temp = Math.round(((data.current.temp_f)-32)*(5/9));
        const weather = data.current.condition.text;
        const location = data.location.country;
        //execute getBooks function
        this.getBooks(temp);

        document.querySelector(".weather").innerHTML = "It is "+ temp + "°C and it is " + weather + " in " + location;
    }
    
    getBooks(temp) {
        let movie = "";

        switch(temp) {
            case temp < 0:
                movie = "https://www.goodreads.com/book/show/18143.The_Great_Gatsby";
                break;
            case temp < 10:
                movie = "https://www.goodreads.com/book/show/18143.The_Great_Gatsby";
                break;
            case temp < 20:
                movie = "https://www.goodreads.com/book/show/18143.The_Great_Gatsby";
                break;
            case temp < 30:
                movie = "https://www.goodreads.com/book/show/18143.The_Great_Gatsby";
                break;
        }
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '744050e180msh434911057e03b99p1dc403jsnc1ec10613d3c',
                'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
            }
        };
        
        fetch('https://imdb8.p.rapidapi.com/title/find?q=rebels', options)
            .then(response => response.json())
            .then(data => {
                let movie = data[0][results][title];})
                
            .catch(err => console.error(err));
    }

}
