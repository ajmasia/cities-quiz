export class ScoresController {

    constructor(gameController, pubsub) {
        
        this.gameController = gameController;

        // Subscribe to score events 
        pubsub.subscribe('cityFound', message => {
            console.log('scoresController:', message)
            this.updateCitiesFoundScore();
        });
        pubsub.subscribe('kmLeftChange', message => {
            console.log('scoresController:', message)
            this.updateKmLeftScore();
        });
    }

    // Update cities found score
    updateCitiesFoundScore() {

        // Update cities score div
        document.querySelector('.game-info__cities-score').innerHTML = `Cities placed <b>${this.gameController.citiesPlaced}</b>`;

        // Show message
        swal({
                title: "Good Job!",
                text: `Great! You placed your marker at ${this.gameController.distance} km`,
                icon: "success"
            })
            .then((willDelete) => {
                this.gameController.initializeButtons();
                this.gameController.initializeRound();
            });

    }

    // Update km left score
    updateKmLeftScore() {

        // Update km left score
        if (this.gameController.kmLeft < 0) {
            document.querySelector('.game-info__kmLeft-score').innerHTML = `<b>0</b> km left`
        } else {
            document.querySelector('.game-info__kmLeft-score').innerHTML = `<b>${this.gameController.kmLeft}</b> km left`
        }
    }

}