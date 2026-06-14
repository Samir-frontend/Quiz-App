const questions = [
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks Text Markup Language", "Hyper Tool Markup Language"],
    answer: 0
  },
  {
    question: "Which language is used to style web pages?",
    options: ["HTML", "jQuery", "CSS", "XML"],
    answer: 2
  },
  {
    question: "Inside which HTML element do we put JavaScript?",
    options: ["<js>", "<scripting>", "<javascript>", "<script>"],
    answer: 3
  }
];

let currentQuestion = 0;
let score = 0;
let selectedOption = null;

function startQuiz() {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("quizScreen").style.display = "block";
  loadQuestion();
}

function loadQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("question").innerText = q.question;
  document.getElementById("error").innerText = "";
  document.getElementById("questionCount").innerText = `Question ${currentQuestion + 1} of ${questions.length}`;
  selectedOption = null;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach((option, index) => {
    const div = document.createElement("div");
    div.classList.add("option");
    div.innerText = option;
    div.onclick = () => selectOption(index, div);
    optionsDiv.appendChild(div);
  });

  const progress = (currentQuestion / questions.length) * 100;
  document.getElementById("progressBar").style.width = progress + "%";
}

function selectOption(index, element) {
  document.querySelectorAll(".option").forEach(el => el.classList.remove("selected"));
  element.classList.add("selected");
  selectedOption = index;
}

function nextQuestion() {
  if (selectedOption === null) {
    document.getElementById("error").innerText = "⚠ Please select an answer!";
    return;
  }

  if (selectedOption === questions[currentQuestion].answer) score++;
  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    document.getElementById("progressBar").style.width = "100%";
    document.querySelector(".quiz-box").innerHTML = `
      <div class="result">
        <h2>Quiz Completed! 🎉</h2>
        <div class="score">${score}/${questions.length}</div>
        <p>${score === questions.length ? "Perfect Score! 🏆" : score >= 2 ? "Good Job! 👍" : "Keep Practicing! 💪"}</p>
        <button onclick="location.reload()" style="margin-top:20px; padding:12px 30px; background:#007bff; color:white; border:none; border-radius:8px; font-size:16px; cursor:pointer; width:100%;">Play Again 🔄</button>
      </div>
    `;
  }
}