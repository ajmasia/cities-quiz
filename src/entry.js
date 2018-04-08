import boostrap from 'bootstrap';
import css from './scss/styles.scss';
import swal from 'sweetalert';

import { StartController } from './js/startController';
import { GameController } from './js/gameController';


document.addEventListener('DOMContentLoaded', () => {
    
    let startController = new StartController();
    let gameController = new GameController(startController);
    console.log('Game running!');
});