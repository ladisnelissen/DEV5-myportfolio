
export default class Weather {
    constructor(api_key) {
        this.apiKey = api_key;
    
        if(localStorage.getItem("weather") && Date.now() - localStorage.getItem("weather") < 600000) {
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
        //use url to fetch weather data from weatherapi
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


        
}
