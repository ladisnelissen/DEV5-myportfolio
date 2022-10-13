
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
        this.getBooks(data);

        document.querySelector(".weather").innerHTML = "It is "+ temp + "°C and it is " + weather + " in " + location;
    }
    
    getBooks(temp) {
        
        let movie;

        switch(temp) {
            case temp < 0:
                movie = "Turist";
                break;
            case temp < 10:
                movie = "Autumn Dreams";
                break;
            case temp < 20:
                movie = "Prom";
                break;
            case temp < 30:
                movie = "Midsommar";
                break;
        }

    
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '744050e180msh434911057e03b99p1dc403jsnc1ec10613d3c',
                'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
            }
        };
        
        fetch(`https://imdb8.p.rapidapi.com/title/find?q=Spring`, options)
            .then(response => response.json())
            .then(data => {
                //console log title of movie
                let title = data.results[0].title;
                console.log(data.results[0].image.url);
                let app = querySelector("#app");
                //set app background image to movie image
                app.style.backgroundImage = "url(" + data.results[0].image.url + ")";
                //set app background size to cover
                app.style.backgroundSize = "cover";
                //set app background position to center
                app.style.backgroundPosition = "center";
                //set app background repeat to no-repeat
                app.style.backgroundRepeat = "no-repeat";

                let putData = document.querySelector(".title");
                putData.innerHTML = title;

                }
            )
            .catch(err => console.error(err));
    }

}
