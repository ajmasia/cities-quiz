/**
 * Play game controller
 */

import citiesList from './capitalCities';

export class PlayController {
    // Initialize new object
    constructor(startController) {

        this.map = startController.map;
        this.markers = [];
        this.button = document.querySelector('.game-buttons__place');
        this.randomCity = this.randomCity(citiesList.cities);
        this.citieRound = 0;
        this.placedCoords = '';
        if (this.button != null) this.addButtonEventListener();
        this.initializeRound();
    }

    // Add click event to play button
    addButtonEventListener() {
        
        this.button.addEventListener('click', event => {
            if (this.citieRound < this.randomCity.length - 1) {
                this.citieRound++;
            } else {
                this.citieRound = 0;
            }
            console.log(this.placedCoords);
            // Show city objetive
            // Calulate distance
            // Calculate new scoers

            this.initializeRound();
        });
    
    }

    // Initialize new game round
    initializeRound() {

        var myLatlng = new google.maps.LatLng(40.433067, -3.700742);

        this.clearMarkers();
        this.addMarker(myLatlng);
        
        // Show new round message
        document.querySelector('.game-messages__message').innerHTML = `Select the location of <b>${this.randomCity[this.citieRound].capitalCity}</b>`;
        console.log(this.placedCoords);

    }

    // Add marker to map method
    addMarker(location) {
        var marker = new google.maps.Marker({
            position: location,
            title: "Begin here!",
            draggable: true,
            map: this.map
        });

        var coords = google.maps.event.addListener(
            marker,
            'drag',
            function(e) {
                var lat = marker.position.lat().toFixed(6);
                var lng = marker.position.lng().toFixed(6);
                console.log(lat, lng);
            }
        );
        
        this.markers.push(marker);
    }

    // Clear markers method
    clearMarkers() {
        
        for (let i = 0; i < this.markers.length; i++) {
          this.markers[i].setMap(null);
        }

    }

    // Randomize citie method
    randomCity(data) {
        
        for (let i = data.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [data[i], data[j]] = [data[j], data[i]];
        }
        
        return data;
    
    }

    roundCityLocation() {

    }
    
}