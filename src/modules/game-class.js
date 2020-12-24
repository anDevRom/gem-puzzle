import Session from './session-class.js';
import cleanBody from './cleanBody-function.js';
import Congratulation from './congratulation-class.js';
import createMatrix from './createMatrix-function.js';
import getCoordinatesOfElement from './getCoordinatesOfElement.js';
import BackImage from "../img/1.jpg"
import SoundClick from "../sounds/s1.mp3"

export default class Game {
  constructor(parameters) {
    this.sizeField = parameters.sizeField;
    this.correctState = parameters.correctState;
    this.stateOfField = parameters.stateOfField;
    this.time = parameters.time;
    this.counterOfTurns = parameters.counterOfTurns;
    this.soundON = false;
  }

  createMatrix() {
    this.matrix = createMatrix(this.correctState, this.sizeField);
  }

  renderPuzzlesField() {
    this.createMatrix();
    this.sound = document.createElement('audio');
    this.sound.src = '1ed6293e68fead8a031f53dd028f070f.mp3';
    document.body.append(this.sound);
    this.field = document.createElement('div');
    this.field.classList.add('puzzles-field', `puzzles-field_${this.sizeField}`);
    //
    for (let i = 0; i < Math.pow(this.sizeField, 2); i++) {
      const cell = document.createElement('div');
      cell.setAttribute('id', `cell-${i + 1}`);
      cell.classList.add('cell');
      this.field.append(cell);
      cell.addEventListener('dragover', (event) => {
        event.preventDefault();
      });

      cell.addEventListener('drop', () => {
        if (cell.classList.contains('empty-cell')) {
          const indexOfPuzzle = this.stateOfField.indexOf(this.activePuzzle.textContent);
          const availableTurn = this.getAvailableTurn(this.activePuzzle);
          if (availableTurn) {
            switch (availableTurn) {
              case 'up':
                this.stateOfField.splice(indexOfPuzzle, 1, 'X');
                this.stateOfField.splice(indexOfPuzzle - this.sizeField, 1, this.activePuzzle.textContent);
                this.activePuzzle.setAttribute('data-row', `${Number(this.activePuzzle.dataset.row) - 1}`);
                break;
              case 'right':
                this.stateOfField.splice(indexOfPuzzle, 1, 'X');
                this.stateOfField.splice(indexOfPuzzle + 1, 1, this.activePuzzle.textContent);
                this.activePuzzle.setAttribute('data-column', `${Number(this.activePuzzle.dataset.column) + 1}`);
                break;
              case 'down':
                this.stateOfField.splice(indexOfPuzzle, 1, 'X');
                this.stateOfField.splice(indexOfPuzzle + this.sizeField, 1, this.activePuzzle.textContent);
                this.activePuzzle.setAttribute('data-row', `${Number(this.activePuzzle.dataset.row) + 1}`);
                break;
              case 'left':
                this.stateOfField.splice(indexOfPuzzle, 1, 'X');
                this.stateOfField.splice(indexOfPuzzle - 1, 1, this.activePuzzle.textContent);
                this.activePuzzle.setAttribute('data-column', `${Number(this.activePuzzle.dataset.column) - 1}`);
                break;
            }
            setTimeout(() => {
              this.changePuzzlePositionDD(this.activePuzzle);
              this.counterOfTurns++;
              this.updateStat();
              this.checkState();
            }, 0);
          }
        }
      });
    }
    //
    document.body.appendChild(this.field);
  }

  renderPuzzles() {
    let counter = 0;
    for (let row = 1; row <= this.sizeField; row++) {
      for (let column = 1; column <= this.sizeField; column++) {
        if (this.stateOfField[counter] === 'X') {
          const _emptyCell = document.querySelector(`#cell-${counter + 1}`);
          _emptyCell.classList.add('empty-cell');
          counter++;
          continue;
        }
        const cellForPuzzle = document.querySelector(`#cell-${counter + 1}`);
        const puzzle = document.createElement('div');
        puzzle.classList.add('puzzle');
        puzzle.setAttribute('data-row', row);
        puzzle.setAttribute('data-column', column);
        puzzle.textContent = this.stateOfField[counter];
        //

        //
        const coordinates = getCoordinatesOfElement(this.matrix, puzzle.textContent);
        puzzle.style.backgroundImage = "url('../src/img/1.jpg')"
        puzzle.style.backgroundSize = `${this.field.clientWidth}px, ${this.field.clientWidth}px`;
        puzzle.style.backgroundPosition = `top -${(coordinates.row - 1) * ((this.field.clientHeight) / this.sizeField)}px
                                                    left -${(coordinates.column - 1) * ((this.field.clientWidth) / this.sizeField)}px`;
        //
        cellForPuzzle.appendChild(puzzle);
        counter++;

        //
        puzzle.addEventListener('mousedown', () => {
          const emptyCell = document.querySelector('.empty-cell');
          if (this.getAvailableTurn(puzzle)) {
            puzzle.setAttribute('draggable', true);
          }
        });

        puzzle.addEventListener('dragstart', () => {
          setTimeout(() => {
            puzzle.classList.add('hide');
          }, 0);
          this.activePuzzle = puzzle;
        });

        puzzle.addEventListener('dragend', () => {
          puzzle.classList.remove('hide');
          puzzle.setAttribute('draggable', false);
        });

        puzzle.addEventListener('click', (event) => {
          const indexOfPuzzle = this.stateOfField.indexOf(event.target.textContent);
          const availableTurn = this.getAvailableTurn(puzzle);

          if (availableTurn) {
            const metricsOfPuzzle = {
              top: `${puzzle.offsetTop}px`,
              left: `${puzzle.offsetLeft}px`,
              width: `${puzzle.clientWidth}px`,
              height: `${puzzle.clientWidth}px`,
            };

            puzzle.style.width = metricsOfPuzzle.width;
            puzzle.style.height = metricsOfPuzzle.height;

            switch (availableTurn) {
              case 'up':
                this.stateOfField.splice(indexOfPuzzle, 1, 'X');
                this.stateOfField.splice(indexOfPuzzle - this.sizeField, 1, event.target.textContent);
                puzzle.setAttribute('data-row', `${Number(puzzle.dataset.row) - 1}`);

                break;
              case 'right':
                this.stateOfField.splice(indexOfPuzzle, 1, 'X');
                this.stateOfField.splice(indexOfPuzzle + 1, 1, event.target.textContent);
                puzzle.setAttribute('data-column', `${Number(puzzle.dataset.column) + 1}`);

                break;
              case 'down':
                this.stateOfField.splice(indexOfPuzzle, 1, 'X');
                this.stateOfField.splice(indexOfPuzzle + this.sizeField, 1, event.target.textContent);
                puzzle.setAttribute('data-row', `${Number(puzzle.dataset.row) + 1}`);

                break;
              case 'left':
                this.stateOfField.splice(indexOfPuzzle, 1, 'X');
                this.stateOfField.splice(indexOfPuzzle - 1, 1, event.target.textContent);
                puzzle.setAttribute('data-column', `${Number(puzzle.dataset.column) - 1}`);

                break;
            }

            this.changePuzzlePosition(puzzle, availableTurn, metricsOfPuzzle);
            this.counterOfTurns++;
            this.updateStat();
            this.checkState();
          }
        });
      }
    }
  }

  renderStatistics() {
    const blockStat = document.createElement('div');
    blockStat.classList.add('stat-container');

    const timer = document.createElement('div');
    timer.setAttribute('id', 'timer');
    timer.textContent = `Time ${this.time.minutes} : ${this.time.seconds}`;
    blockStat.appendChild(timer);

    const counterOfTurns = document.createElement('div');
    counterOfTurns.setAttribute('id', 'counter-of-turns');
    counterOfTurns.textContent = `Turn ${this.counterOfTurns}`;
    blockStat.appendChild(counterOfTurns);

    document.body.appendChild(blockStat);
  }

  renderOptions() {
    const blockOpt = document.createElement('div');
    blockOpt.classList.add('options-block');

    const btnSave = document.createElement('button');
    btnSave.classList.add('button');
    btnSave.textContent = 'SAVE';
    blockOpt.appendChild(btnSave);

    const btnSnd = document.createElement('button');
    btnSnd.classList.add('button');
    btnSnd.textContent = 'SOUND';
    blockOpt.appendChild(btnSnd);

    const btnMenu = document.createElement('button');
    btnMenu.classList.add('button');
    btnMenu.textContent = 'NEW GAME';
    blockOpt.appendChild(btnMenu);

    btnMenu.addEventListener('click', () => {
      this.exit();
    });
    btnSave.addEventListener('click', () => {
      this.save();
    });
    btnSnd.addEventListener('click', () => {
      this.soundON = !this.soundON;
    });

    document.body.appendChild(blockOpt);
  }

  getAvailableTurn(puzzle) {
    const indexOfPuzzle = this.stateOfField.indexOf(puzzle.textContent);
    const indexOfEmptyCell = this.stateOfField.indexOf('X');
    const availableTurns = {
      up: Number(puzzle.dataset.row) !== 1,
      right: Number(puzzle.dataset.column) !== this.sizeField,
      down: Number(puzzle.dataset.row) !== this.sizeField,
      left: Number(puzzle.dataset.column) !== 1,
    };

    for (const turn of Object.keys(availableTurns)) {
      if (availableTurns[turn] === true) {
        switch (turn) {
          case 'up':
            if (this.stateOfField[indexOfPuzzle - this.sizeField] === 'X') {
              return 'up';
            }
            break;
          case 'right':
            if (this.stateOfField[indexOfPuzzle + 1] === 'X') {
              return 'right';
            }
            break;
          case 'down':
            if (this.stateOfField[indexOfPuzzle + this.sizeField] === 'X') {
              return 'down';
            }
            break;
          case 'left':
            if (this.stateOfField[indexOfPuzzle - 1] === 'X') {
              return 'left';
            }
            break;
        }
      }
    }
    return false;
  }

  changePuzzlePosition(puzzle, turn, metric) {
    const emptyCell = document.querySelector('.empty-cell');
    const startPos = puzzle.parentElement;
    puzzle.style.position = 'absolute';
    puzzle.style.top = metric.top;
    puzzle.style.left = metric.left;
    switch (turn) {
      case 'up':
        puzzle.style.transitionDuration = '200ms';
        puzzle.style.transitionProperty = 'top';
        puzzle.style.top = `${parseFloat(puzzle.style.top) - this.field.clientHeight / this.sizeField}px`;
        break;
      case 'down':
        puzzle.style.transitionDuration = '200ms';
        puzzle.style.transitionProperty = 'top';
        puzzle.style.top = `${parseFloat(puzzle.style.top) + this.field.clientHeight / this.sizeField}px`;
        break;
      case 'left':
        puzzle.style.transitionDuration = '200ms';
        puzzle.style.transitionProperty = 'left';
        puzzle.style.left = `${parseFloat(puzzle.style.left) - this.field.clientWidth / this.sizeField}px`;
        break;
      case 'right':
        puzzle.style.transitionDuration = '200ms';
        puzzle.style.transitionProperty = 'left';
        puzzle.style.left = `${parseFloat(puzzle.style.left) + this.field.clientWidth / this.sizeField}px`;
        break;
    }
    setTimeout(() => {
      puzzle.style.position = '';
      puzzle.style.transitionDuration = '';
      puzzle.style.transitionProperty = '';
      emptyCell.append(puzzle);
      this.playAudio(this.sound);
      emptyCell.classList.remove('empty-cell');
      startPos.classList.add('empty-cell');
    }, 200);
  }

  changePuzzlePositionDD(puzzle) {
    const emptyCell = document.querySelector('.empty-cell');
    const startPos = puzzle.parentElement;
    emptyCell.append(puzzle);
    this.playAudio(this.sound);
    emptyCell.classList.remove('empty-cell');
    startPos.classList.add('empty-cell');
  }

  playAudio(file) {
    if (this.soundON) {
      file.currentTime = 0;
      file.play();
    }
  }

  updateStat() {
    document.querySelector('#counter-of-turns').textContent = `Turn ${this.counterOfTurns}`;
    document.querySelector('#timer').textContent = `Time ${this.time.minutes} : ${this.time.seconds}`;
  }

  checkState() {
    if (this.correctState.join(' ') === this.stateOfField.join(' ')) {
      this.updateScore();
      const congr = new Congratulation(this.time, this.counterOfTurns);
      cleanBody();
      congr.show();
    }
  }

  updateScore() {
    if (localStorage.getItem('results') === null) {
      const results = [];
      results.push({ counterOfTurns: this.counterOfTurns, time: this.time });
      localStorage.setItem('results', JSON.stringify(results));
    } else {
      const results = JSON.parse(localStorage.getItem('results'));
      results.push({ counterOfTurns: this.counterOfTurns, time: this.time });
      results.sort((a, b) => a.counterOfTurns - b.counterOfTurns);
      localStorage.setItem('results', JSON.stringify(results));
    }
  }

  start() {
    this.renderStatistics();
    this.renderPuzzlesField();
    this.renderPuzzles();
    this.renderOptions();

    this.timer = setInterval(() => {
      this.time.seconds++;
      if (this.time.seconds === 60) {
        this.time.seconds = 0;
        this.time.minutes++;
      }
      this.updateStat();
    }, 1000);
  }

  exit() {
    clearInterval(this.timer);
    const session = new Session();
    cleanBody();
    session.start();
  }

  save() {
    const state = {
      sizeField: this.sizeField,
      correctState: this.correctState,
      stateOfField: this.stateOfField,
      time: this.time,
      counterOfTurns: this.counterOfTurns,
    };
    clearInterval(this.timer);
    localStorage.setItem('savedGame', JSON.stringify(state));
    cleanBody();
    const session = new Session();
    session.start();
  }
}
