import boostrap from 'bootstrap';
import css from './scss/styles.scss';
import { StartController } from './js/startController';
import { PlayController } from './js/playController';


document.addEventListener('DOMContentLoaded', () => {
    let startController = new StartController();
    let playController = new PlayController(startController);
})