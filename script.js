
let quizData = [];

fetch('examen_quiz_data.json')
  .then(response => response.json())
  .then(data => {
    quizData = data;
    createQuiz();
  });

function createQuiz() {
  const container = document.getElementById("quiz-container");
  quizData.forEach((q, i) => {
    const div = document.createElement("div");
    div.classList.add("question");
    div.innerHTML = `<p><strong>Q${i + 1}:</strong> ${q.question}</p>`;
    q.options.forEach((opt, j) => {
      const id = `q${i}_opt${j}`;
      div.innerHTML += `
        <div class="options">
          <label><input type="checkbox" name="q${i}" value="${j}" id="${id}">${opt}</label>
        </div>`;
    });
    container.appendChild(div);
  });
}

function submitQuiz() {
  let score = 0;
  quizData.forEach((q, i) => {
    const checked = [...document.querySelectorAll(`input[name=q${i}]:checked`)].map(cb => parseInt(cb.value));
    const correct = q.correct.sort().join(",");
    const selected = checked.sort().join(",");
    if (correct === selected) score++;
  });
  document.getElementById("result").textContent = `Your score: ${score}/${quizData.length}`;
}
