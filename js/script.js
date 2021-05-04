var wordEle = document.getElementById("word");
var wrongLettersEle = (document.getElementById("wrong-letters"));
var playAgainBtn = document.getElementById("play-again");
var popup = document.getElementById("popup-container");
var notification = document.getElementById("notification-container");
var finalMessage = document.getElementById("final-message");
var figureParts = document.querySelectorAll(".figure-part");
var words = [
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
var selectedWord = words[Math.floor(Math.random() * words.length)];
// let selectedWord = words[11];
console.log("🚀 ~ file: script.ts ~ line 30 ~ selectedWord", selectedWord);
var correctLetters = [];
var wrongLetters = [];
// Show hidden word
var displayWord = function () {
    wordEle.innerHTML = "\n  " + selectedWord
        .split("")
        .map(function (letter) {
        return ("\n            <span class=\"letter\"> \n                " + (correctLetters.includes(letter) ? letter : "") + "\n            </span>\n        ");
    })
        .join("") + "\n  ";
    //Removing the line break with regx
    var innerWord = wordEle.innerText.replace(/\n/g, "");
    if (innerWord === selectedWord) {
        finalMessage.innerText = "😃 Congratulations! You Won 😃 ";
        popup.style.display = "flex";
    }
};
var showNofication = function () {
    console.log("show notification");
    notification.classList.add("show");
    setTimeout(function () {
        notification.classList.remove("show");
    }, 3000);
};
var updateWrongLettersEle = function () {
    wrongLettersEle.innerHTML = "\n  " + (wrongLetters.length > 0 ? "<p>Wrong</P>" : "") + "\n  " + wrongLetters.map(function (letter) { return ("<span>" + letter + "</span>"); }) + "\n  ";
    //Display Parts
    figureParts.forEach(function (part, index) {
        var errors = wrongLetters.length;
        if (index < errors) {
            part.classList.add("show");
        }
        else {
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
window.addEventListener("keydown", function (e) {
    // e.keycode this is the key code a= 65 and z=90 only listening to a-z
    // keyCode is Deprecated
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        var letter = e.key;
        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            }
            else {
                showNofication();
            }
        }
        else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLettersEle();
            }
            else {
                showNofication();
            }
        }
    }
});
//restart game
playAgainBtn.addEventListener("click", function () {
    correctLetters.splice(0);
    wrongLetters.splice(0);
    selectedWord = words[Math.floor(Math.random() * words.length)];
    displayWord();
    updateWrongLettersEle();
    popup.style.display = "none";
});
displayWord();
