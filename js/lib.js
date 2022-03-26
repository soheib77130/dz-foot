//
// lib/lib.js
//
var Question = function (questionObj) {
  this.value = {
    text: "Question",
    answers: []
  };

  this.selectedAnswer = null;
  this.html = null;
  this.questionText = null;
  this.questionAnswers = null;
  this.questionFeedback = null;

  this.value = Object.assign(this.value, questionObj);

  this.onQuestionAnswered = ({ detail }) => {
    this.selectedAnswer = {
      value: detail.answer,
      html: detail.answerHtml
    };
    this.update();

    document.dispatchEvent(
      new CustomEvent("question-answered", {
        detail: {
          question: this,
          answer: detail.answer
        }
      })
    );
  };

  this.create = function () {
    this.html = document.createElement("div");
    this.html.classList.add("question");

    this.questionText = document.createElement("h2");
    this.questionText.textContent = this.value.text;

    this.questionAnswers = document.createElement("div");
    this.questionAnswers.classList.add("answers");

    for (let i = 0; i < this.value.answers.length; i++) {
      const ansObj = this.value.answers[i];
      let answer = createAnswer(ansObj);

      answer.onclick = (ev) => {
        if (this.selectedAnswer !== null) {
          this.selectedAnswer.html.classList.remove("selected");
        }

        answer.classList.add("selected");

        this.html.dispatchEvent(
          new CustomEvent("question-answered", {
            detail: {
              answer: ansObj,
              answerHtml: answer
            }
          })
        );
      };

      this.questionAnswers.appendChild(answer);
    }

    this.questionFeedback = document.createElement("div");
    this.questionFeedback.classList.add("question-feedback");

    this.html.appendChild(this.questionText);
    this.html.appendChild(this.questionAnswers);
    this.html.appendChild(this.questionFeedback);

    this.html.addEventListener("question-answered", this.onQuestionAnswered);

    return this.html;
  };

  this.disable = function () {
    this.html.classList.add("disabled");
    this.html.onclick = (ev) => {
      ev.stopPropagation();
    };

    this.html.removeEventListener("question-answered", this.onQuestionAnswered);

    let answers = this.html.querySelectorAll(".answer");
    for (let i = 0; i < answers.length; i++) {
      let answer = answers[i];
      answer.onclick = null;
    }
  };

  this.remove = function () {
    let children = this.html.querySelectorAll("*");
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      this.html.removeChild(child);
    }

    this.html.removeEventListener("question-answered", this.onQuestionAnswered);

    this.html.parentNode.removeChild(this.html);
    this.html = null;
  };

  this.update = function () {
    let correctFeedback, incorrectFeedback;
    this.html = this.html || document.createElement("div");

    correctFeedback = "Bonne réponse";
    incorrectFeedback = "mauvais reponse";

    if (this.selectedAnswer !== null) {
      if (this.selectedAnswer.value.isCorrect) {
        this.html.classList.add("correct");
        this.html.classList.remove("incorrect");
        this.questionFeedback.innerHTML = correctFeedback;
      } else {
        this.html.classList.add("incorrect");
        this.html.classList.remove("correct");
        this.questionFeedback.innerHTML = incorrectFeedback;
      }
    }
  };

  function createAnswer(obj) {
    this.value = {
      text: "Answer",
      isCorrect: false
    };

    this.value = Object.assign(this.value, obj);

    this.html = document.createElement("button");
    this.html.classList.add("answer");

    this.html.textContent = this.value.text;

    return this.html;
  }
};

//
// main.js
//

let questionsData = [
  {
    text: "Comment s'apelle l'entraineur et le selectionneur de l'équipe ?",
    answers: [
      {
        text: "Djamel Maladie",
        isCorrect: false
      },
      {
        text: "Djamel Belmadi",
        isCorrect: true
      },
      {
        text: "Vahid Halilhodžić",
        isCorrect: false
      },
      {
        text: "jamel bailemadie",
        isCorrect: false
      }
    ]
  },
  {
    text: "Qui est l'actuel capitaine de l'équipe d'Algérie",
    answers: [
      {
        text: "Riyad Mahrez",
        isCorrect: true
      },
      {
        text: "Islam Slimani",
        isCorrect: false
      },
      {
        text: "Rais M'BOLHI",
        isCorrect: false
      },
      {
        text: "Facile c'est Djamel belmadi",
        isCorrect: false
      }
    ]
  },
  {
    text: "Dans quel Club a déja Jouer Riyad Mahrez",
    answers: [
      {
        text: "Leicester City et le Havre",
        isCorrect: true
      },
      {
        text: "Manchester United et Le Havre",
        isCorrect: false
      },
      {
        text: "AC Milan",
        isCorrect: false
      },
      {
        text: "Paris saint-germain",
        isCorrect: false
      }
    ]
  },
  {
    text: "Comme se Nomme l'Hymne Nationale De L'Algérie",
    answers: [
      {
        text: "casse à main",
        isCorrect: false
      },
      {
        text: "Kassaman ou Qasaman",
        isCorrect: true
      },
      {
        text: "L'algerienne",
        isCorrect: false
      },
      {
        text: "Quasa",
        isCorrect: false
      }
    ]
  },
  {
    text: "Quel a été le résultat du match Angleterre-Algérie en Coupe du monde 2010 ?",
    answers: [
      {
        text: "2-1 Pour l'Algérie",
        isCorrect: false
      },
      {
        text: "1-2 Pour l'angleterre",
        isCorrect: false
      },
      {
        text: "il y a eu match Nul (0-0)",
        isCorrect: true
      },
      {
        text: "1-1",
        isCorrect: false
      }
    ]
  },
  {
    text: "En quelle Aneés L'algérie a gagné la CAN (Coupe d'afrique des Nations)",
    answers: [
      {
        text: "2019 et 1992",
        isCorrect: false
      },
      {
        text: "1988 et 2017",
        isCorrect: false
      },
      {
        text: "1990 et 2019",
        isCorrect: true
      }
    ]
  },
  {
    text: "Quel nom porte le stade où évolue habituellement l'équipe nationale algérienne ?",
    answers: [
      {
        text: "Stade Olympique 5 Juillet 1962",
        isCorrect: true
      },
      {
        text: "Le stade birouana tlemcen",
        isCorrect: false
      },
      {
        text: "stade Hamoud Bouhalem",
        isCorrect: false
      },
      {
        text: "Mustapha Tchaker",
        isCorrect: true
      }
    ]
  },
  {
    text: "Lors de la coupe du monde 2014 Contre Qui L'Algérie s'est faite élimine en 8/1 de finale",
    answers: [
      {
        text: "Suéde",
        isCorrect: false
      },
      {
        text: "Angleterre",
        isCorrect: false
      },
      {
        text: "Allemagne",
        isCorrect: true
      },
      {
        text: "italie",
        isCorrect: false
      }
    ]
    
  },
   {
    text: "Qui L'Algérie a battu en tirs au but En Quart de Finale Lors de la Coupe Arabe De 2021",
    answers: [
      {
        text: "La tunisie",
        isCorrect: false
      },
      {
        text: "Le Qatar",
        isCorrect: false
      },
      {
        text: "L'égypte",
        isCorrect: false
      },
      {
        text: "Le Maroc",
        isCorrect: true
      }
    ]
    
  },
  {
    text: "Quel est le pays que l'algérie a battu 16fois ",
    answers: [
      {
        text: "Tunisie",
        isCorrect: true
      },
      {
        text: "Libye",
        isCorrect: false
      },
      {
        text: "Yémen",
        isCorrect: true
      },
      {
        text: "Bénin",
        isCorrect: false
      }
    ]
  }
];


let questions = [];
let score = 0,
  answeredQuestions = 0;
let appContainer = document.getElementById("questions-container");
let scoreContainer = document.getElementById("score-container");
scoreContainer.innerHTML = `Score: ${score}/${questionsData.length}`;


function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

shuffle(questionsData);


for (var i = 0; i < questionsData.length; i++) {
  let question = new Question({
    text: questionsData[i].text,
    answers: questionsData[i].answers
  });

  appContainer.appendChild(question.create());
  questions.push(question);
}

document.addEventListener("question-answered", ({ detail }) => {
  if (detail.answer.isCorrect) {
    score++;
  }

  answeredQuestions++;
  scoreContainer.innerHTML = `Score: ${score}/${questions.length}`;
  detail.question.disable();

  if (answeredQuestions == questions.length) {
    setTimeout(function () {
      alert(`Quiz terminer \n voici ton score finale: ${score}/${questions.length}`);
    }, 100);
  }
});

console.log(questions, questionsData);
