let cards = [];
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
for (let i = 0; i < 6; i++) {
  const letter = letters[Math.floor(Math.random() * letters.length)];
  cards = [...cards, letter, letter];
}

for (let i = 0; i < cards.length; i++) {
  const removed = cards.splice(Math.floor(Math.random() * cards.length), 1);
  cards = cards.concat(removed);
}

const boardEl = document.querySelector(".board");
boardEl.innerHTML = cards
  .map((card) => `<div class="card">${card}</div>`)
  .join("\n");

let moves = 0;
let matches = 0;
let selections = [];
boardEl.addEventListener("click", function (e) {
  if (e.target.className === "board") return;
  if (selections.length === 2) return;

  const target = e.target;
  if (target.className.includes("done")) return;

  if (target.className.includes("open")) return;

  const clicked = target.textContent;
  selections.push(clicked);
  target.classList.add("open");

  document.querySelector(".moves").textContent = ++moves;

  if (selections.length === 2) {
    const [first, second] = selections;
    const openCards = document.querySelectorAll(".open");

    if (first === second) {
      document.querySelector(".matches").textContent = ++matches;

      for (let i = 0; i < openCards.length; i++) {
        openCards[i].classList.add("match");
      }
    }
    setTimeout(function () {
      for (let i = 0; i < openCards.length; i++) {
        openCards[i].classList.remove("open");
        if (first === second) {
          openCards[i].classList.add("done");
        }
      }
      selections = [];
    }, 1000);
  }
});
