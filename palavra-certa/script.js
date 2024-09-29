let answer = [];
fetch('answers.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        answer = data;
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });


const answerDisplay = document.getElementById("answerDisplay");
const resultDisplay = document.getElementById("resultDisplay");
const resultDisplayBefore = document.getElementById("resultBefore");
const resultDisplayAfter = document.getElementById("resultAfter");
const fullCard = document.getElementById("fullCard");

const alphabet = "ABCDEFGHIJLMNOPQRSTUVXZ";
const alphabetArr = alphabet.split("");

const animateCard = () => {
    fullCard.classList.add("animate");
    fullCard.addEventListener("animationend", () => {
        fullCard.classList.remove("animate");
    }, { once: true });
}

const updateDisplays = (currentIndex) => {
    resultDisplay.innerText = alphabetArr[currentIndex] || "";
    resultDisplayBefore.innerText = alphabetArr[(currentIndex - 1 + alphabetArr.length) % alphabetArr.length] || "?";
    resultDisplayAfter.innerText = alphabetArr[(currentIndex + 1) % alphabetArr.length] || "?";
};

const drawAnimation = (randomLetter, randomAnswer) => {
    let currentIndex = randomLetter + 1;
    const interval = setInterval(() => {
        updateDisplays(currentIndex);
        currentIndex = (currentIndex + 1) % alphabetArr.length;

        if (currentIndex === randomLetter) {
            clearInterval(interval);
        }
    }, 100);

    animateCard();
    setTimeout(() => {
        answerDisplay.textContent = answer[randomAnswer];
    }, 1200);
};

const getRandomIndex = (max) => {
    return Math.floor(Math.random() * max);
};

const handlerDraw = () => {
    const randomAnswer = getRandomIndex(answer.length);
    const randomLetter = getRandomIndex(alphabetArr.length);
    drawAnimation(randomLetter, randomAnswer);
};

document.getElementById("drawBtn").addEventListener("click", () => {
    if (!fullCard.classList.contains("animate")) {
        handlerDraw();
    }
});
