import cleanBody from './cleanBody-function.js';
import Session from './session-class.js';

export default class Score {
  constructor(results) {
    this.results = JSON.parse(results);
  }

  createContentWrapper() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('score-content-wrapper');
  }

  createTextForTableCell(text, column, row) {
    const contentForCell = document.createElement('p');
    contentForCell.classList.add('text-for-cell');
    contentForCell.textContent = text;
    contentForCell.style.gridColumnStart = column;
    contentForCell.style.gridRowStart = row;
    return contentForCell;
  }

  createResultsTable() {
    this.resultsTable = document.createElement('div');
    this.resultsTable.classList.add('score-results-table');
    this.resultsTable.append(this.createTextForTableCell('POSITION', 1, 1));
    this.resultsTable.append(this.createTextForTableCell('RESULT', 2, 1));
    this.resultsTable.append(this.createTextForTableCell('TIME', 3, 1));
    for (let i = 0; i < 10; i++) {
      const rowNumber = i + 1;
      if (this.results[i] === undefined) {
        this.resultsTable.append(this.createTextForTableCell(`${rowNumber}`, 1, rowNumber + 1));
        this.resultsTable.append(this.createTextForTableCell('-', 2, rowNumber + 1));
        this.resultsTable.append(this.createTextForTableCell('-', 3, rowNumber + 1));
      } else {
        this.resultsTable.append(this.createTextForTableCell(`${rowNumber}`, 1, rowNumber + 1));
        this.resultsTable.append(this.createTextForTableCell(`${this.results[i].counterOfTurns}`, 2, rowNumber + 1));
        this.resultsTable.append(this.createTextForTableCell(`${this.results[i].time.minutes} : ${this.results[i].time.seconds}`, 3, rowNumber + 1));
      }
    }
  }

  createBtn(name) {
    const btn = document.createElement('button');
    btn.classList.add('button');
    btn.textContent = name;
    btn.addEventListener('click', () => {
      cleanBody();
      const newSession = new Session();
      newSession.start();
    });
    return btn;
  }

  show() {
    this.createContentWrapper();
    this.createResultsTable();
    this.wrapper.append(this.resultsTable);
    this.wrapper.append(this.createBtn('BACK TO MENU'));
    document.body.append(this.wrapper);
  }
}
