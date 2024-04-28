class Interpreter {
  constructor(terminal) {
    this.terminal = terminal;
    this.commands = {
      "profile": this.profile.bind(this),
      "contact": this.contact.bind(this),
      "links": this.links.bind(this),
      "clear": this.clear.bind(this),
      "cls": this.clear.bind(this),
      "history": this.history.bind(this),
      "projects": this.projects.bind(this),
      "project": this.projects.bind(this),
    };

    this.projects = {
      "this": {
        callback: this.projectThis.bind(this),
        description: "This website.",
      },
      "heatmap": {
        callback: this.projectHeatmap.bind(this),
        description: "osu! heatmap generator.",
      },
      "uiua": {
        callback: this.projectUiua.bind(this),
        description: "Various Uiua modules.",
      },
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
        o.text("Hello! I'm Ernestas, a generalist software engineer - always ready to bend computers to my will, take on interesting challenges, improve and learn new things along the way.");
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
        o.text("2014 - 2018");
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

  async projects(args) {
    if (args.length > 0) {
      const projectName = args[0];
      const project = this.projects[projectName];
      if (!project) {
        await this.terminal.output(o => {
          o.line(o => {
            o.text("Project not found: ");
            o.muted(projectName);
          });
        });
        return Promise.resolve();
      }

      await project.callback();
      return Promise.resolve();
    }

    await this.terminal.output(o => {
      o.blankLine();
      o.line(o => {
        o.largeText("Projects");
        o.lineBreak();
        o.text("Some of the personal projects I have worked on.");
      });
      o.separator();
      const longestProjectName = Math.max(...Object.keys(this.projects).map(name => name.length));
      for (const [name, project] of Object.entries(this.projects)) {
        o.line(o => {
          o.link(name, () => {
            this.terminal.animateInput(`project ${name}`);
          });
          o.text(" ".repeat(longestProjectName - name.length));
          o.muted(" - ");
          o.text(project.description);
        });
      }
      o.blankLine();
    });

    return Promise.resolve();
  }

  async projectThis() {
    await this.terminal.output(o => {
      o.blankLine();
      o.line(o => {
        o.largeText("This website");
      });
      o.separator();
      o.line(o => {
        o.text("This website was created as a personal project to showcase my skills and experience. It is a simple faux-terminal that can execute commands and display information about me. ");
      });
      o.blankLine();
      o.line(o => {
        o.text("While I'm not a wizard at using the command line, I can find my way around it. I really like the aesthetic of the terminal and I felt like it would be an original take on a personal website. ");
        o.text("I'm not sure if it's the best or even a user friendly user experience, but it's definitely fun to use and I hope it conveys my technical background well.");
      });
      o.blankLine();
      o.line(o => {
        o.text("The website is built using plain vanilla HTML, CSS and JavaScript - no frameworks, no transpilers. ");
        o.text("While I am familiar with the cutting-edge technologies for web development, they would be an overkill for a project like this and I chose not to use them.");
      });
      o.blankLine();
      o.line(o => {
        o.text("I hope the typing animation was enough to convey that you can type in commands on your own, you don't have to just follow links. ");
        o.text("If you're even a little bit familiar with Linux terminal commands, there might be something hidden waiting for you.");
      });
      o.blankLine();
    });

    return Promise.resolve();
  }

  async projectHeatmap() {
    await this.terminal.output(o => {
      o.blankLine();
      o.line(o => {
        o.largeText("osu! heatmap generator");
      });
      o.separator();
      o.line(o => {
        o.text("See the website here: ");
        o.link("https://osu-heatmap.ekga.me/", () => {
          window.open("https://osu-heatmap.ekga.me/");
        });
      });
      o.blankLine();
      o.line(o => {
        o.text("osu! beatmaps are an unusual art form - they combine circles and sliders to represent a song for a rhythm game. ");
        o.text("Sometimes interesting patterns emerge from following a strict set of rules for placing circles and sliders on the playfield. ");
        o.text("Other time, the mappers go above and beyond and use the playfield to hide a specific image using gameplay elements. ");
        o.text("This website generates a heatmap of gameplay elements to reveal those patterns.");
      });
      o.blankLine();
      o.line(o => {
        o.text("Unfortunately, most beatmaps are designed to be pretty free flowing and don't have any interesting patterns to reveal. ");
        o.text("In those cases it may still be useful for mappers to see the playfield usage, to make sure the corners are properly used and the patterns are not crowded in one place when it's not intended.");
      });
      o.blankLine();
    });
    return Promise.resolve();
  }

  async projectUiua() {
    await this.terminal.output(o => {
      o.blankLine();
      o.line(o => {
        o.largeText("Uiua modules");
      });
      o.separator();
      o.line(o => {
        o.link("Uiua", () => {
          window.open("https://uiua.org/");
        });
        o.text(" is a programming language, that I've been fascinated with for a while now. ");
        o.text("It's a stack based, array oriented language that uses glyphs for array operations, executes from right-to-left, does not use variables and so on. ");
        o.text("I've never used anything quite like it before, but it's a lot of fun. ");
      });
      o.blankLine();
      o.line(o => {
        o.text("Most people would consider it to be esoteric and it is a challenge to use it, but it taught me a new programming paradigm that I've found useful in traditional programming too. ");
        o.text("Even though at first glance it just looks like a fancy calculator, it has native functionality for things like managing the file system, multithreading and working with sockets.");
      });
      o.blankLine();
      o.line(o => {
        o.text("I have made it my mission to use this language for practical and complex applications. In the process I've created a handful of modules and experimental programs: ");
      });

      const modules = [
        {
          name: "uiua-json",
          link: "https://github.com/ekgame/uiua-json",
          description: "JSON parser and serializer.",
        },
        {
          name: "uiua-http",
          link: "https://github.com/ekgame/uiua-http",
          description: "HTTP request builder and response parser.",
        },
        {
          name: "uiua-uri-parser",
          link: "https://github.com/ekgame/uiua-uri-parser",
          description: "URI parser and serializer.",
        },
        {
          name: "uiua-base64",
          link: "https://github.com/ekgame/uiua-base64",
          description: "Base64 encoder and decoder.",
        },
        {
          name: "uiua-websocket",
          link: "https://github.com/ekgame/uiua-websocket",
          description: "Experimental websocket client.",
        },
      ]

      const longestModuleName = Math.max(...modules.map(module => module.name.length));
      modules.forEach(module => {
        o.line(o => {
          o.link(module.name, () => {
            window.open(module.link);
          });
          o.text(" ".repeat(longestModuleName - module.name.length));
          o.muted(" - ");
          o.text(module.description);
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

  lineBreak() {
    this.line.appendChild(document.createElement('br'));
    return this;
  }

  build() {
    return this.line;
  }
}

class TerminalOutputBuilder {
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

  scrollToBottom() {
    this.terminalElement.parentElement.scroll(0, this.terminalElement.scrollHeight);
  }

  async output(builder) {
    const outputBuilder = new TerminalOutputBuilder();
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

    this.scrollToBottom();

    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, delay);
    });
  }

  outputImmediate(builder) {
    const outputBuilder = new TerminalOutputBuilder();
    builder(outputBuilder);
    const buffer = outputBuilder.getBuffer();
    buffer.forEach(element => {
      this.addElement(element);
    });
    this.scrollToBottom();
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
    this.scrollToBottom();
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