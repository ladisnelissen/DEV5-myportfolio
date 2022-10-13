
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

        document.querySelector(".weather").innerHTML = "It is "+ temp + "°C in " + location;
    }
    
    getBooks(temp) {
        let movie;

        //store current temperatur in celcius
        let tempCelcius = Math.round(((temp.current.temp_f)-32)*(5/9));


        if(tempCelcius < 0) {
            movie = "Ice Age";
        } else if(tempCelcius < 10) {
            movie = "Spring Breakers";
        } else {
            movie = "Baywatch";
        }


    
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '744050e180msh434911057e03b99p1dc403jsnc1ec10613d3c',
                'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
            }
        };
        
        fetch(`https://imdb8.p.rapidapi.com/title/find?q=${movie}`, options)
            .then(response => response.json())
            .then(data => {
                //console log title of movie
                let duration = data.results[0].runningTimeInMinutes;
                //convert duration to hours and minutes
                let hours = Math.floor(duration / 60);
                let minutes = duration % 60;
                let movieTitle = data.results[0].title;
                //display movie title and duration
                document.querySelector(".title").innerHTML = "You should watch " + movieTitle + 
                " which is " + hours + " hours and " + minutes + " minutes long.";
                

                let app = document.getElementById('app');
                //set app background image to movie image
                app.style.backgroundImage = "url(" + data.results[0].image.url + ")";
                //set app background size to cover
                app.style.backgroundPosition = "center";
                //set app background repeat to no-repeat
                app.style.backgroundRepeat = "no-repeat";
                //set app background size to cover
                app.style.backgroundSize = "cover";
            

                }
            )
            .catch(err => console.error(err));
    }

}
