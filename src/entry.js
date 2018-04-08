import boostrap from 'bootstrap';
import css from './scss/styles.scss';
import swal from 'sweetalert';

import { StartController } from './js/startController';
import { PlayController } from './js/playController';


document.addEventListener('DOMContentLoaded', () => {
    
    let startController = new StartController();
    let playController = new PlayController(startController);
    console.log('Game running!');

    var startButton = document.querySelector('.game-buttons__start');
    
    startButton.addEventListener('click', event => {
        let startController = new StartController();
        let playController = new PlayController(startController);
        console.log('Game running again!');
    });

});