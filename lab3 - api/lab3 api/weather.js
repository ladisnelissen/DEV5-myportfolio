
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

        document.querySelector(".weather").innerHTML = "It is "+ temp + "°C and it is " + weather + " in " + location;
    }
    
    getBooks(temp) {
        let book = "";

        switch(temp) {
            case temp < 0:
                book = "https://www.goodreads.com/book/show/18143.The_Great_Gatsby";
                break;
            case temp < 10:
                book = "https://www.goodreads.com/book/show/18143.The_Great_Gatsby";
                break;
            case temp < 20:
                book = "https://www.goodreads.com/book/show/18143.The_Great_Gatsby";
                break;
            case temp < 30:
                book = "https://www.goodreads.com/book/show/18143.The_Great_Gatsby";
                break;
        }
    }

    //fetch data from gutenburg api
   fetchBooks() {
        let url = `http://gutendex.com/books`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                let name = data.results[0].title;
                document.querySelector(".title").innerHTML = name;
            });

        
        }
}
