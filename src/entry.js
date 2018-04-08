import boostrap from 'bootstrap';
import css from './scss/styles.scss';
import swal from 'sweetalert';

import { PubSub } from 'pubsub-js';
import { StartController } from './js/startController';
import { GameController } from './js/gameController';
import { ScoresController } from './js/scoresController';



document.addEventListener('DOMContentLoaded', () => {
    
    let startController = new StartController();
    let gameController = new GameController(startController, PubSub);
    let scoresController = new ScoresController(gameController, PubSub);
    console.log('Game running!');
});