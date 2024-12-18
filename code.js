// Data structure for age groups and questions (5 questions per group)
const questions = {
  "10-19": [
    { frequency: 250, decibel: 20, answer: "both" },
    { frequency: 500, decibel: 30, answer: "both" },
    { frequency: 1000, decibel: 40, answer: "both" },
    { frequency: 2000, decibel: 50, answer: "both" },
    { frequency: 4000, decibel: 60, answer: "both" },
  ],
  "20-29": [
    { frequency: 250, decibel: 20, answer: "both" },
    { frequency: 500, decibel: 30, answer: "both" },
    { frequency: 1000, decibel: 40, answer: "both" },
    { frequency: 2000, decibel: 50, answer: "both" },
    { frequency: 4000, decibel: 60, answer: "both" },
  ],
  "30-39": [
    { frequency: 250, decibel: 20, answer: "both" },
    { frequency: 500, decibel: 30, answer: "both" },
    { frequency: 1000, decibel: 40, answer: "both" },
    { frequency: 2000, decibel: 50, answer: "both" },
    { frequency: 4000, decibel: 60, answer: "both" },
  ],
  "40-49": [
    { frequency: 250, decibel: 20, answer: "both" },
    { frequency: 500, decibel: 30, answer: "both" },
    { frequency: 1000, decibel: 40, answer: "both" },
    { frequency: 2000, decibel: 50, answer: "both" },
    { frequency: 4000, decibel: 60, answer: "both" },
  ],
  "50-59": [
    { frequency: 250, decibel: 20, answer: "both" },
    { frequency: 500, decibel: 30, answer: "both" },
    { frequency: 1000, decibel: 40, answer: "both" },
    { frequency: 2000, decibel: 50, answer: "both" },
    { frequency: 4000, decibel: 60, answer: "both" },
  ],
  "60+": [
    { frequency: 250, decibel: 20, answer: "both" },
    { frequency: 500, decibel: 30, answer: "both" },
    { frequency: 1000, decibel: 40, answer: "both" },
    { frequency: 2000, decibel: 50, answer: "both" },
    { frequency: 4000, decibel: 60, answer: "both" },
  ],
};

let currentQuestionIndex = 0;
let userAge = 0;
let userAnswers = [];

// Show the Main Page
document.getElementById("main-page").style.display = "block";

// Start Test Button
document.getElementById("start-test-btn").addEventListener("click", () => {
  document.getElementById("main-page").style.display = "none";
  document.getElementById("user-details-page").style.display = "block";
});

// User Details Form
document.getElementById("user-details-form").addEventListener("submit", (e) => {
  e.preventDefault();
  userAge = parseInt(document.getElementById("age").value);
  document.getElementById("user-details-page").style.display = "none";
  document.getElementById("instructions-page").style.display = "block";
});

// Start Test Instructions Button
document.getElementById("start-test-btn-2").addEventListener("click", () => {
  document.getElementById("instructions-page").style.display = "none";
  document.getElementById("hearing-test-page").style.display = "block";
  loadQuestion();
});

// Load the current question based on age
function loadQuestion() {
  const ageGroup = getAgeGroup(userAge);
  const question = questions[ageGroup][currentQuestionIndex];

  document.getElementById("question-text").textContent = `Can you hear a ${question.frequency}Hz sound at ${question.decibel}dB?`;
  // Placeholder for the audio file
  // const audio = new Audio(`path/to/${question.frequency}Hz_${question.decibel}dB.mp3`);
  // audio.play();

  document.getElementById("next-btn").style.display = "none";
}

// Get Age Group based on user input
function getAgeGroup(age) {
  if (age >= 10 && age <= 19) return "10-19";
  if (age >= 20 && age <= 29) return "20-29";
  if (age >= 30 && age <= 39) return "30-39";
  if (age >= 40 && age <= 49) return "40-49";
  if (age >= 50 && age <= 59) return "50-59";
  return "60+";
}

// Record the answer and move to the next question
document.querySelectorAll(".option-btn").forEach((button) => {
  button.addEventListener("click", (e) => {
    const answer = e.target.getAttribute("data-answer");
    userAnswers.push(answer);

    if (currentQuestionIndex < 4) {
      currentQuestionIndex++;
      loadQuestion();
    } else {
      showResult();
    }
  });
});

// Show the results after completing the test
function showResult() {
  document.getElementById("hearing-test-page").style.display = "none";
  document.getElementById("conclusion-page").style.display = "block";

  let resultText = "Your hearing test results:\n";

  // Basic scoring logic
  let correctAnswers = 0;
  for (let i = 0; i < userAnswers.length; i++) {
    const ageGroup = getAgeGroup(userAge);
    if (userAnswers[i] === questions[ageGroup][i].answer) {
      correctAnswers++;
    }
  }

  if (correctAnswers === 5) {
    resultText += "Good Hearing.";
  } else if (correctAnswers >= 3) {
    resultText += "Possible Hearing Issues.";
  } else {
    resultText += "Severe Hearing Loss.";
  }

  document.getElementById("test-results").textContent = resultText;
}
