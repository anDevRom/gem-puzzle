import Session from './session-class.js';
import cleanBody from './cleanBody-function.js';

export default class Congratulation {
  constructor(time, count) {
    this.minutes = time.minutes;
    this.seconds = time.seconds;
    this.count = count;
  }

  createCongrMessage() {
    const congrMessage = document.createElement('div');
    congrMessage.classList.add('congratulation-message-block');

    const header = document.createElement('h1');
    header.textContent = 'Great, you win!';
    congrMessage.append(header);

    const subHeader = document.createElement('p');
    subHeader.style.margin = '30px 0';
    subHeader.textContent = 'Score:';
    congrMessage.append(subHeader);

    const message = document.createElement('p');
    message.textContent = `${this.count} turns | ${this.minutes} minutes, ${this.seconds} seconds`;
    congrMessage.append(message);

    return congrMessage;
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
    document.body.append(this.createCongrMessage(), this.createBtn('BACK TO MENU'));
  }
}
