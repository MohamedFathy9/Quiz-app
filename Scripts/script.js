document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.querySelector(".start-btn");
  const popupInfo = document.querySelector(".popup-info");
  const exitBtn = document.querySelector(".exit-btn");
  const main = document.querySelector(".main");
  const continueBtn = document.querySelector(".continue-btn");
  const quizSection = document.querySelector(".quiz-section");
  const quizBox = document.querySelector(".quiz-box");
  const resultBox = document.querySelector(".result-box");
  const tryAgainBtn = document.querySelector(".tryAgain-btn");
  const goHomeBtn = document.querySelector(".goHome-btn");

  let questionCount = 0;
  let questionNumb = 1;
  let userScore = 0;
  let questionTimer;
  let timeLimit = 10;
  let timeRemaining = timeLimit;
  let timerDisplay = document.querySelector(".timer");

  startBtn.addEventListener("click", () => {
    popupInfo.classList.add("active");
    main.classList.add("active");
  });

  exitBtn.addEventListener("click", () => {
    popupInfo.classList.remove("active");
    main.classList.remove("active");
  });

  continueBtn.addEventListener("click", () => {
    quizSection.classList.add("active");
    popupInfo.classList.remove("active");
    main.classList.remove("active");
    quizBox.classList.add("active");
    showQuestions(0);
    questionCounter(1);
    headerScore();
    startTimer();
  });

  tryAgainBtn.addEventListener("click", () => {
    quizBox.classList.add("active");
    nextBtn.classList.remove("active");
    resultBox.classList.remove("active");

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);
    headerScore();
    startTimer();
  });

  goHomeBtn.addEventListener("click", () => {
    quizSection.classList.remove("active");
    nextBtn.classList.remove("active");
    resultBox.classList.remove("active");

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);
    headerScore();
    startTimer();
  });

  const nextBtn = document.querySelector(".next-btn");

  nextBtn.addEventListener("click", () => {
    if (questionCount < questions.length - 1) {
      questionCount++;
      showQuestions(questionCount);
      questionNumb++;
      questionCounter(questionNumb);
      nextBtn.classList.remove("active");
      resetTimer();
    } else {
      showResultBox();
    }
  });

  const optionList = document.querySelector(".option-list");

  function showQuestions(index) {
    const questionText = document.querySelector(".question-text");
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

    let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
                      <div class="option"><span>${questions[index].options[1]}</span></div>
                      <div class="option"><span>${questions[index].options[2]}</span></div>
                      <div class="option"><span>${questions[index].options[3]}</span></div>`;

    optionList.innerHTML = optionTag;
    const option = document.querySelectorAll(".option");

    option.forEach((optionElement) => {
      optionElement.addEventListener("click", () =>
        optionSelected(optionElement)
      );
    });

    startTimer();
  }

  function startTimer() {
    timeRemaining = timeLimit;
    timerDisplay.textContent = `Time left: ${timeRemaining}s`;

    if (questionTimer) {
      clearInterval(questionTimer);
    }

    questionTimer = setInterval(() => {
      timeRemaining--;
      timerDisplay.textContent = `Time left: ${timeRemaining}s`;

      if (timeRemaining <= 0) {
        clearInterval(questionTimer);
        handleTimeOut();
      }
    }, 1000);
  }

  function resetTimer() {
    clearInterval(questionTimer);
    startTimer();
  }

  function handleTimeOut() {
    const correctAnswer = questions[questionCount].answer;
    const allOptions = optionList.children.length;

    for (let i = 0; i < allOptions; i++) {
      if (optionList.children[i].textContent == correctAnswer) {
        optionList.children[i].setAttribute("class", "option correct");
      }
    }

    for (let i = 0; i < allOptions; i++) {
      optionList.children[i].classList.add("disabled");
    }

    nextBtn.classList.add("active");

    setTimeout(() => {
      nextBtn.click();
    }, 1000);
  }

  function optionSelected(answer) {
    clearInterval(questionTimer);

    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let allOptions = optionList.children.length;

    if (userAnswer == correctAnswer) {
      answer.classList.add("correct");
      userScore += 1;
      headerScore();
    } else {
      answer.classList.add("incorrect");

      for (let i = 0; i < allOptions; i++) {
        if (optionList.children[i].textContent == correctAnswer) {
          optionList.children[i].setAttribute("class", "option correct");
        }
      }
    }

    for (let i = 0; i < allOptions; i++) {
      optionList.children[i].classList.add("disabled");
    }

    nextBtn.classList.add("active");
  }

  function questionCounter(index) {
    const questionTotal = document.querySelector(".question-total");
    questionTotal.textContent = `${index} of ${questions.length} Questions`;
  }

  function headerScore() {
    const headerScoreText = document.querySelector(".header-score");
    headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
  }

  function showResultBox() {
    quizBox.classList.remove("active");
    resultBox.classList.add("active");
    const scoreText = document.querySelector(".score-text");
    scoreText.textContent = `Your Score ${userScore} out of ${questions.length}`;

    const circularProgress = document.querySelector(".circular-progress");
    const progressValue = document.querySelector(".progress-value");
    let progressStartValue = -1;
    let progressEndValue = (userScore / questions.length) * 100;
    let speed = 20;

    let progress = setInterval(() => {
      progressStartValue++;

      progressValue.textContent = `${progressStartValue}%`;
      circularProgress.style.background = `conic-gradient(#c40094 ${
        progressStartValue * 3.6
      }deg, rgba(255,255,255,0.1) 0deg)`;

      if (progressStartValue == progressEndValue) {
        clearInterval(progress);
      }
    }, speed);
  }
});
