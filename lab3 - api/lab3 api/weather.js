
export default class Weather {
    constructor(api_key) {
        this.apiKey = api_key;
    
        if(localStorage.getItem("weather") && Date.now() - localStorage.getItem("weather") < 600000) {
            this.weather = JSON.parse(localStorage.getItem("weather"));
        } else {
            this.getLocation();
        }
    }

   
        
}
