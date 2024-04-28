class Interpreter {
  constructor(terminal) {
    this.terminal = terminal;
    this.commands = {
      "profile": this.profile,
      "contact": this.contact,
      "links": this.links,
      "clear": this.clear,
      "cls": this.clear,
      "history": this.history,
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
        o.largeText("Ernestas Kluonis");
      });
      o.separator();
      o.line(o => {
        o.text("Software Engineer");
        o.muted(" / ");
        o.text("Full Stack Developer");
      });
      o.line(o => {
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
        o.text("JavaScript");
        o.muted(" / ");
        o.text("TypeScript");
      });
      o.separator();
      o.line(o => {
        o.text("Hello! I'm Ernestas, a generalist software engineer - always ready to bend computers to my will, take on interesting challanges, improve and learn new things along the way.");
      });
      o.blankLine();
      o.line(o => {
        o.text("One of the most important things for me is to create software that is easy to maintain, understand and use. I have developed my own principles of clean code that I follow in every project I work on.");
      });
      o.separator();
      o.line(o => {
        o.link("History", () => {
          this.terminal.animateInput("history");
        });
        o.muted(" / ");
        o.link("Projects", () => {
          this.terminal.animateInput("projects");
        });
        o.muted(" / ");
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

  async history(args) {
    await this.terminal.output(o => {
      o.blankLine();
      o.line(o => {
        o.text("2015 - 2018");
        o.muted(" / ");
        o.text("Student at Kaunas University of Technology.");
      });
      o.line(o => {
        o.text("Studied software engineering, graduated with a Bachelor's degree.");
      });
      o.separator();
      o.line(o => {
        o.text("2018 - present");
        o.muted(" / ");
        o.text("Developer at ");
        o.link("PrestaRock", () => {
          window.open("https://prestarock.com/");
        });
      });
      o.line(o => {
        o.text("Started as a junior developer, worked my way up to a mid-level developer.");
        o.blankLine();
        o.text("I work on a variety of projects, mostly large e-commerce websites on the PrestaShop platform. My work involves both front-end and back-end development, implementing new features - large and small, fixing bugs.");
        o.blankLine();
        o.text("I have developed new technologies on my own time to facilitate working with PrestaShop and developing new modules. I have also introduced the company to new technologies such as the Vue.js framework, which is now used regularly.");
      });
      o.blankLine();
    });
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

  blankLine() {
    const lineBreak = document.createElement('div');
    lineBreak.classList.add('line-break');
    this.line.appendChild(lineBreak);
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
    this.blankLine();
    this.add(document.createElement('hr'));
    this.blankLine();
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