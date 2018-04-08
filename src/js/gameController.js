/**
 * Play game controller class
 */

// Import needed libraries
import config from '../config';
import citiesList from './capitalCities';


export class GameController {
    // Initialize new object
    constructor(startController) {

        this.map = startController.map;
        this.citiesPlaced = startController.citiesPlaced;
        this.kmLeft = startController.kmLeft;
        this.markers = [];
        this.randomCity = this.randomCity(citiesList.cities);
        this.citieRound = 0;

        this.buttons = document.getElementsByClassName('btn');
        this.nextButton = document.querySelector('.game-buttons__next');
        this.placeButton = document.querySelector('.game-buttons__place');
        if (this.placeButton != null) this.addButtonEventListener();

        this.initializeButtons();
        this.initializeRound();
    }

    /**
     * Initizalize round
     */

    initializeRound() {

        var myLatlng = new google.maps.LatLng(40.433067, -3.700742);

        this.deleteMarkers();
        var marker = this.addMarker(myLatlng);

        // Show new round message
        document.querySelector('.game-messages__message').innerHTML = `Select the location of <b>${this.randomCity[this.citieRound].capitalCity}</b>`;

    }

    /**
     * Place button clieck event
     */

    addButtonEventListener() {

        this.placeButton.addEventListener('click', event => {
            
            // Get positions
            var currentMarkerPosition = this.markers[0].position;

            console.log('Current marker position:', currentMarkerPosition.lat().toFixed(6), currentMarkerPosition.lng().toFixed(6));

            // Calulate distance
            var cityPositionInCurrentRound = new google.maps.LatLng(this.randomCity[this.citieRound].lat, this.randomCity[this.citieRound].long);

            console.log('City posiotion in current round:', cityPositionInCurrentRound.lat().toFixed(6), cityPositionInCurrentRound.lng().toFixed(6));

            // Show city objetive
            this.addCitieMarker(cityPositionInCurrentRound);

            // Calculate distance
            var distance = Math.round(google.maps.geometry.spherical.computeDistanceBetween(
                currentMarkerPosition, cityPositionInCurrentRound) / 1000, 0);
            console.log('Distance: ', distance);

            // Show rate message
            document.querySelector('.game-messages__message').innerHTML = `Your rate ${distance} km`;

            // Score update
            if (distance <= config.SUCCESSFUL_DISTANCE) {

                // Increase cities placed scores
                this.citiesPlaced++;

                // Update cities score div
                document.querySelector('.game-info__cities-score').innerHTML = `Cities placed <b>${this.citiesPlaced}</b>`;

                // Show message
                swal({
                        title: "Good Job!",
                        text: `Great! You placed marker at ${distance} km`,
                        icon: "success"
                    })
                    .then((willDelete) => {
                        this.initializeButtons();
                        this.initializeRound();
                    });

            }

            // Decrement km left scores
            this.kmLeft = this.kmLeft - distance;

            // Update km left score
            document.querySelector('.game-info__kmLeft-score').innerHTML = `<b>${this.kmLeft}</b> km left`

            // Check round game state
            if (this.citieRound < this.randomCity.length - 1) {
                this.citieRound++;
            } else {
                this.citieRound = 0;
            }

            // Check game state
            if (this.kmLeft > 0) {
                this.showNextButton();
                this.nextButton.addEventListener('click', event => {
                    this.initializeButtons();
                    this.initializeRound();
                })
            } else {
                this.gameOver();
            }

        });

    }

    /**
     * Auziliar methods
     */

    // Add marker to map method
    addMarker(location) {
        var marker = new google.maps.Marker({
            position: location,
            title: "Your place",
            draggable: true,
            animation: google.maps.Animation.DROP,
            map: this.map,
            icon: '../assets/meMarker.png'
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

    // Add marker to map method
    addCitieMarker(location) {
        var marker = new google.maps.Marker({
            position: location,
            title: `${this.randomCity[this.citieRound].capitalCity}`,
            animation: google.maps.Animation.DROP,
            map: this.map,
            icon: '../assets/citieMarker.png'
        });

        this.markers.push(marker);
    }

    // Clear markers method
    clearMarkers() {

        for (let i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(null);
        }

    }

    deleteMarkers() {
        this.clearMarkers();
        this.markers = [];
    }

    // Randomize citie method
    randomCity(data) {

        for (let i = data.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [data[i], data[j]] = [data[j], data[i]];
        }

        return data;

    }

    // Initialize buttons
    initializeButtons() {
        for (var i = 0; i < this.buttons.length; i++) {
            this.buttons[i].classList.remove('inactive');
        }

        this.nextButton.classList.add('inactive');
    }

    // Show next button
    showNextButton() {

        for (var i = 0; i < this.buttons.length; i++) {
            this.buttons[i].classList.remove('inactive');
        }

        this.placeButton.classList.add('inactive');
    }

    // Game over
    gameOver() {
        // Game over
        console.log('Game over');

        // Change score state
        document.querySelector('.game-info__kmLeft-score').innerHTML = `<b>0</b> km left`;

        document.querySelector('.game-messages__message').innerHTML = `You don't have any more km`;

        swal({
            title: "GAME OVER",
            text: `Press ok button to play again`
        })
        .then((willDelete) => {
            location.reload();
        });
    }
}