import cleanBody from './cleanBody-function.js';
import Game from './game-class.js';
import Score from './score-class.js';

export default class Session {
  constructor() {
    this.sizeField = 4;
    this.puzzles = {
      3: [
        '1', '2', '3', '4', '5', '6', '7', '8', 'X',
      ],
      4: [
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', 'X',
      ],
      5: [
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', 'X',
      ],
      6: [
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', 'X',
      ],
      7: [
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', 'X',
      ],
      8: [
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', 'X',
      ],
    };
  }

  _getCorrectState() {
    return this.puzzles[this.sizeField].slice();
  }

  _createRandomState(state) {
    state = state.slice();
    return state.sort(() => Math.random() - 0.5);
  }

  changeSizeFiled(value) {
    this.sizeField = value;
  }

  createParametersForGame() {
    const correctState = this._getCorrectState();
    const randomState = this._createRandomState(correctState);

    return {
      sizeField: this.sizeField,
      correctState,
      stateOfField: randomState,
      time: {
        minutes: 0,
        seconds: 0,
      },
      counterOfTurns: 0,
    };
  }

  createGame() {
    const parameters = this.createParametersForGame();
    const game = new Game(parameters);
    game.start();
  }

  openSizeMenu() {
    const blockMenu = document.createElement('div');

    const btn3x3 = document.createElement('button');
    const btn4x4 = document.createElement('button');
    const btn5x5 = document.createElement('button');
    const btn6x6 = document.createElement('button');
    const btn7x7 = document.createElement('button');
    const btn8x8 = document.createElement('button');

    blockMenu.classList.add('menu-container');
    document.body.appendChild(blockMenu);

    btn4x4.textContent = '4 x 4';
    btn4x4.classList.add('button');
    btn3x3.textContent = '3 x 3';
    btn3x3.classList.add('button');
    btn5x5.textContent = '5 x 5';
    btn5x5.classList.add('button');
    btn6x6.textContent = '6 x 6';
    btn6x6.classList.add('button');
    btn7x7.textContent = '7 x 7';
    btn7x7.classList.add('button');
    btn8x8.textContent = '8 x 8';
    btn8x8.classList.add('button');

    blockMenu.appendChild(btn4x4);
    blockMenu.appendChild(btn3x3);
    blockMenu.appendChild(btn5x5);
    blockMenu.appendChild(btn6x6);
    blockMenu.appendChild(btn7x7);
    blockMenu.appendChild(btn8x8);

    blockMenu.addEventListener('click', (event) => {
      if (event.target.className === 'button') {
        this.sizeField = Number(event.target.textContent[0]);
      }
      cleanBody();
      this.start();
    });
  }

  openScore() {
    if (localStorage.getItem('results') === null) {
      const score = new Score('[]');
      score.show();
    } else {
      const score = new Score(localStorage.getItem('results'));
      score.show();
    }
  }

  start() {
    const blockMenu = document.createElement('div');

    const btnNewGame = document.createElement('button');
    const btnContinue = document.createElement('button');
    const btnScore = document.createElement('button');
    const btnFieldSize = document.createElement('button');

    blockMenu.classList.add('menu-container');
    document.body.appendChild(blockMenu);

    btnNewGame.textContent = 'NEW GAME';
    btnNewGame.classList.add('button');
    btnContinue.textContent = 'CONTINUE';
    btnContinue.classList.add('button');
    btnScore.textContent = 'SCORE';
    btnScore.classList.add('button');
    btnFieldSize.textContent = 'FIELD SIZE';
    btnFieldSize.classList.add('button');

    blockMenu.appendChild(btnNewGame);
    blockMenu.appendChild(btnContinue);
    blockMenu.appendChild(btnScore);
    blockMenu.appendChild(btnFieldSize);

    btnNewGame.addEventListener('click', () => {
      cleanBody();
      this.createGame();
    });

    btnContinue.addEventListener('click', () => {
      cleanBody();
      if (localStorage.getItem('savedGame')) {
        const parameters = JSON.parse(localStorage.getItem('savedGame'));
        const game = new Game(parameters);
        game.start();
      } else {
        alert('NO SAVED GAME!');
        const session = new Session();
        session.start();
      }
    });

    btnFieldSize.addEventListener('click', () => {
      cleanBody();
      this.openSizeMenu();
    });

    btnScore.addEventListener('click', () => {
      cleanBody();
      this.openScore();
    });
  }
}
