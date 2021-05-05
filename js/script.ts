export {};

const wordEle = document.getElementById("word");
const wrongLettersEle = <HTMLDivElement>(
  document.getElementById("wrong-letters")
);
const playAgainBtn = document.getElementById("play-again");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");

const figureParts = document.querySelectorAll(".figure-part");

let words = [
  "application",
  "apple",
  "google",
  "Microsoft",
  "amazon",
  "hangman",
  "life",
  "team",
  "samsung",
  "human",
  "hostel",
  "nepal",
  "javascript",
  "python",
];

let selectedWord = words[Math.floor(Math.random() * words.length)];
// // let selectedWord = words[11];
// console.log("🚀 ~ file: script.ts ~ line 30 ~ selectedWord", selectedWord);

const correctLetters = [];
const wrongLetters = [];

// Show hidden word
const displayWord = () => {
  wordEle.innerHTML = `
  ${selectedWord
    .split("")
    .map(
      (letter) =>
        `
            <span class="letter"> 
                ${correctLetters.includes(letter) ? letter : ""}
            </span>
        `
    )
    .join("")}
  `;

  //Removing the line break with regx
  const innerWord = wordEle.innerText.replace(/\n/g, "");

  if (innerWord === selectedWord) {
    finalMessage.innerText = "😃 Congratulations! You Won 😃 ";
    popup.style.display = "flex";
  }
};

const showNofication = () => {
  console.log("show notification");
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
};

const updateWrongLettersEle = () => {
  wrongLettersEle.innerHTML = `
  ${wrongLetters.length > 0 ? `<p>Wrong</P>` : ""}
  ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;

  //Display Parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;
    if (index < errors) {
      part.classList.add("show");
    } else {
      part.classList.remove("show");
    }
  });

  //Check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "Oh no! You Lost  😒";
    popup.style.display = "flex";
  }
};

//Key press action listener
window.addEventListener("keydown", (e) => {
  // e.keycode this is the key code a= 65 and z=90 only listening to a-z
  // keyCode is Deprecated
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNofication();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLettersEle();
      } else {
        showNofication();
      }
    }
  }
});

//restart game

playAgainBtn.addEventListener("click", () => {
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();
  updateWrongLettersEle();
  popup.style.display = "none";
});

displayWord();
