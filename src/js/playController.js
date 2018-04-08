/**
 * Play game controller
 */
import config from '../config';
import citiesList from './capitalCities';

export class PlayController {
    // Initialize new object
    constructor(startController) {

        this.map = startController.map;
        this.citiesPlaced = startController.citiesPlaced;
        this.kmLeft = startController.kmLeft;
        this.markers = [];
        this.randomCity = this.randomCity(citiesList.cities);
        this.citieRound = 0;

        this.buttonStart = document.querySelector('.game-buttons__start');
        this.buttonPlace = document.querySelector('.game-buttons__place');
        if (this.buttonPlace != null) this.addButtonEventListener();

        this.initializeButtons();
        this.initializeRound();
    }

    // Add click event to play button
    addButtonEventListener() {

        this.buttonPlace.addEventListener('click', event => {

            // Get current marker position
            var currentMarkerPosition = this.markers[0].position;

            console.log('Current marker position:', currentMarkerPosition.lat().toFixed(6), currentMarkerPosition.lng().toFixed(6));

            // Show city objetive



            // Calulate distance
            var cityPositionInCurrentRound = new google.maps.LatLng(this.randomCity[this.citieRound].lat, this.randomCity[this.citieRound].long);

            console.log('City posotion in current round:', cityPositionInCurrentRound.lat().toFixed(6), cityPositionInCurrentRound.lng().toFixed(6));

            var distance = google.maps.geometry.spherical.computeDistanceBetween(
                currentMarkerPosition, cityPositionInCurrentRound) / 1000;
            console.log('Distance: ', distance);

            // Calculate new scoers
            if (distance <= config.SUCCESSFUL_DISTANCE) {
                this.citiesPlaced++;
                document.querySelector('.game-info__cities-score').innerHTML = `Cities placed <b>${this.citiesPlaced}</b>`;
                swal('Good Job!', `Great! You placed marker at ${distance} km`, 'success');
            }

            this.kmLeft = this.kmLeft - Math.round(distance, 0)
            document.querySelector('.game-info__kmLeft-score').innerHTML = `<b>${this.kmLeft}</b> km left`


            // New round
            if (this.citieRound < this.randomCity.length - 1) {

                this.citieRound++;

            } else {

                this.citieRound = 0;

            }

            // Check game state
            if (this.kmLeft >= config.SUCCESSFUL_DISTANCE) {
                this.initializeButtons();
                this.initializeRound();

            } else {

                console.log('Game over');

                document.querySelector('.game-info__kmLeft-score').innerHTML = `<b>0</b> km left`;

                document.querySelector('.game-messages__message').innerHTML = `Game over! You've placed ${this.citiesPlaced} cities correctly`;

                var buttons = document.getElementsByClassName('btn');
                for (var i = 0; i < buttons.length; i++) {
                    buttons[i].classList.remove('inactive');
                }

                this.buttonPlace.classList.add('inactive');


            }

        });

    }

    // Initialize new game round
    initializeRound() {

        var myLatlng = new google.maps.LatLng(40.433067, -3.700742);

        this.clearMarkers();
        this.markers = [];
        var marker = this.addMarker(myLatlng);

        // Show new round message
        document.querySelector('.game-messages__message').innerHTML = `Select the location of <b>${this.randomCity[this.citieRound].capitalCity}</b>`;

    }

    // Add marker to map method
    addMarker(location) {
        var marker = new google.maps.Marker({
            position: location,
            title: "Begin here!",
            draggable: true,
            map: this.map
        });

        google.maps.event.addListener(
            marker,
            'dragend',
            function () {
                marker.setPosition(marker.getPosition());
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

    initializeButtons() {
        var buttons = document.getElementsByClassName('btn');
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove('inactive');
        }

        this.buttonStart.classList.add('inactive');
    }

}