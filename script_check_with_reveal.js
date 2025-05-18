
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
    div.innerHTML += `<button onclick="checkQuestion(${i})">Check Answer</button>`;
    div.innerHTML += `<div id="feedback${i}" class="feedback"></div>`;
    container.appendChild(div);
  });
}

function checkQuestion(index) {
  const q = quizData[index];
  const checked = [...document.querySelectorAll(\`input[name=q\${index}]:checked\`)].map(cb => parseInt(cb.value));
  const correct = q.correct.sort().join(",");
  const selected = checked.sort().join(",");
  const feedback = document.getElementById(`feedback${index}`);

  if (correct === selected) {
    feedback.innerHTML = "<span style='color: green;'>Correct!</span>";
  } else {
    let correctOptions = q.correct.map(i => String.fromCharCode(97 + i)).join(", ");
    feedback.innerHTML = `<span style='color: red;'>Incorrect. Try again.</span><br><em>Correct answers: ${correctOptions}</em>`;
  }
}

document.addEventListener("DOMContentLoaded", createQuiz);
