class Interpreter {
  constructor(terminal) {
    this.terminal = terminal;
    this.commands = {
      "profile": this.profile,
      "contact": this.contact,
      "links": this.links,
      "clear": this.clear,
      "cls": this.clear,
    };
  }

  async execute(command) {
    command = command.trim();
    if (command.length === 0) {
      return Promise.resolve();
    }

    const args = command.split(' ');
    const commandName = args[0];
    const callback = this.commands[commandName];
    if (callback) {
      await callback.call(this, args.slice(1));
    } else {
      await this.terminal.output(o => {
        o.line(o => {
          o.text("Command not found: ");
          o.muted(commandName)
        });
      });
    }

    return Promise.resolve();
  }

  async profile(args) {
    await this.terminal.output(o => {
      o.blankLine();
      o.line(o => {
        o.centered();
        o.largeText("Ernestas Kluonis");
      });
      o.blankLine();
      o.separator();
      o.blankLine();
      o.line(o => {
        o.centered();
        o.text("Software Engineer");
        o.muted(" / ");
        o.text("Full Stack Developer");
      });
      o.line(o => {
        o.centered();
        o.text("PHP");
        o.muted(" / ");
        o.text("HTML");
        o.muted(" / ");
        o.text("CSS");
        o.muted(" / ");
        o.text("Java");
        o.muted(" / ");
        o.text("Kotlin");
      });
      o.line(o => {
        o.centered();
        o.text("JavaScript");
        o.muted(" / ");
        o.text("TypeScript");
      });
      o.blankLine();
      o.separator();
      o.blankLine();
      o.line(o => {
        o.centered();
        o.link("Contact", () => {
          this.terminal.animateInput("contact");
        });
        o.muted(" / ");
        o.link("Links", () => {
          this.terminal.animateInput("links");
        });
      });
      o.blankLine();
    });
    
    return Promise.resolve();
  }

  async contact(args) {
    await this.terminal.output(o => {
      o.blankLine();
      o.line(o => {
        o.text("Email: ");
        o.link("ekgame1@gmail.com", () => {
          window.open("mailto:ekgame1@gmail.com");
        });
      });
      o.blankLine();
    });
    return Promise.resolve();
  }

  async links(args) {
    await this.terminal.output(o => {
      o.blankLine();
      o.line(o => {
        o.text("GitHub: ");
        o.link("ekgame", () => {
          window.open("https://github.com/ekgame");
        });
      });
      o.line(o => {
        o.text("Twitter: ");
        o.link("ekgame_", () => {
          window.open("https://twitter.com/ekgame_");
        });
      });
      o.blankLine();
    });

    return Promise.resolve();
  }

  async clear(args) {
    await this.terminal.clear();
    return Promise.resolve();
  }
}

class LineBuilder {
  constructor() {
    this.line = document.createElement('div');
    this.line.classList.add('line');
  }

  centered() {
    this.line.classList.add('centered');
    return this;
  }

  largeText(text) {
    const span = document.createElement('span');
    span.textContent = text;
    span.classList.add('large-text');
    this.line.appendChild(span);
    return this;
  }

  text(text) {
    const span = document.createElement('span');
    span.textContent = text;
    this.line.appendChild(span);
    return this;
  }

  muted(text) {
    const span = document.createElement('span');
    span.textContent = text;
    span.classList.add('muted');
    this.line.appendChild(span);
    return this;
  }

  link(text, callback) {
    const span = document.createElement('span');
    span.textContent = text;
    span.classList.add('link');
    span.addEventListener('click', callback);
    this.line.appendChild(span);
    return this;
  }

  input() {
    const span = document.createElement('span');
    span.classList.add('input');
    span.contentEditable = 'plaintext-only';
    this.line.appendChild(span);
    return this;
  }

  build() {
    return this.line;
  }
}

class TerminalOutoutBuilder {
  constructor() {
    this.buffer = [];
  }

  add(element) {
    this.buffer.push(element);
  }

  getBuffer() {
    return this.buffer;
  }

  blankLine() {
    const blankLine = document.createElement('div');
    blankLine.classList.add('line');
    this.add(blankLine);
  }

  separator() {
    this.add(document.createElement('hr'));
  }

  line(callback) {
    const lineBuilder = new LineBuilder();
    callback(lineBuilder);
    this.add(lineBuilder.build());
  }

  input() {
    this.line(o => {
      o.text("ernestas");
      o.muted(":~$ ");
      o.input();
    });
  }
}

class Terminal {

  constructor() {
    this.interpreter = new Interpreter(this);
    this.terminalElement = document.querySelector('#terminal');
    this.inputElement = null;
    this.isAnimationRunning = false;
    this.isExecuting = false;

    this.addInputLine();
  }

  async addInputLine() {
    return this.output(o => {
      o.input();
    });
  }

  addElement(element) {
    this.terminalElement.appendChild(element);
    if (element.querySelector('.input')) {
      this.inputElement = element.querySelector('.input');
    }
  }

  async output(builder) {
    const outputBuilder = new TerminalOutoutBuilder();
    builder(outputBuilder);
    const buffer = outputBuilder.getBuffer();
    let delay = 0;
    const delayAdd = 50;
    buffer.forEach(element => {
      element.classList.add('reveal');
      element.style.animationDelay = `${delay}ms`;
      delay += delayAdd;
      this.addElement(element);
    });
    delay += delayAdd;

    this.terminalElement.parentElement.scroll(0, this.terminalElement.scrollHeight);

    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, delay);
    });
  }

  outputImmediate(builder) {
    const outputBuilder = new TerminalOutoutBuilder();
    builder(outputBuilder);
    const buffer = outputBuilder.getBuffer();
    buffer.forEach(element => {
      this.addElement(element);
    });
    this.terminalElement.parentElement.scroll(0, this.terminalElement.scrollHeight);
  }

  getInputElement() {
    return this.inputElement;
  }

  freezeInput() {
    const inputElement = this.getInputElement();
    inputElement.contentEditable = 'false';
  }

  async clear() {
    // TODO: animate
    this.terminalElement.innerHTML = '';
    return Promise.resolve();
  }

  async animateRemoveInput() {
    const inputElement = this.getInputElement();
    return new Promise(resolve => {
      const interval = setInterval(() => {
        if (inputElement.textContent.length === 0) {
          clearInterval(interval);
          resolve();
        } else {
          inputElement.textContent = inputElement.textContent.slice(0, -1);
        }
      }, 25);
    });
  }

  async animateAddInput(text) {
    const inputElement = this.getInputElement();
    return new Promise(resolve => {
      const interval = setInterval(() => {
        if (inputElement.textContent === text) {
          clearInterval(interval);
          resolve();
        } else {
          inputElement.textContent = text.slice(0, inputElement.textContent.length + 1);
        }
      }, 50);
    });
  }

  async animateInput(input) {
    if (this.isAnimationRunning || this.isExecuting) {
      return;
    }

    this.isAnimationRunning = true;
    this.freezeInput();
    await this.animateRemoveInput();
    await this.animateAddInput(input);
    this.isAnimationRunning = false;

    await this.submitInput();
    return Promise.resolve();
  }

  async submitInput() {
    const inputElement = this.getInputElement();
    const command = inputElement.textContent;
    this.freezeInput();
    this.isExecuting = true;
    await this.interpreter.execute(command);
    this.addInputLine();
    this.isExecuting = false;
  }
}

const terminal = new Terminal();

document.addEventListener('DOMContentLoaded', async () => {
  await terminal.animateInput("profile");
});

document.addEventListener('keydown', async (event) => {
  if (event.key === 'Enter') {
    event.stopPropagation();
    event.preventDefault();
    await terminal.submitInput();
    return;
  }
  terminal.getInputElement().focus();
});