
export default class Weather {
    constructor() {
        this.lat = 0;
        this.lon = 0;
        navigator.geolocation.getCurrentPosition(this.getCoords.bind(this));
    }

    getCurrentPosition(position) {
        
    }
}
