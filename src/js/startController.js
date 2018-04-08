/**
 * Star game controller
 */

import config from '../config';
import mapStyles from './mapStyles';

export class StartController {
    
    // Constructor
    constructor() {
        
        this.citiesPlaced = 0;
        this.kmLeft = config.INITIAL_KM_LEFT;
        this.map = this.initMap();
        
    }
    
    // Initializad google map
    initMap() {
        
        // Create new map object
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 4,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            styles: mapStyles
        });
        
        // Geolocalize Europe to center map
        var geocoder = new google.maps.Geocoder();
        var location = "Europa";
        geocoder.geocode( { 'address': location }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);
            } else {
                console.log('Could not find location: ' + location);
            }
        });

        // Show initial scores
        document.querySelector('.game-info__cities-score').innerHTML = `Cities placed <b>${this.citiesPlaced}</b>`
        document.querySelector('.game-info__kmLeft-score').innerHTML = `<b>${this.kmLeft}</b> km left`
        document.querySelector('.game-messages__message').innerHTML = `Wellcome to <b>Cities Quiz</b>!`
        return map;

    }
 }