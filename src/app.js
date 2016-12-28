const STARS_LIST = require("./config.js");
let listNode = document.getElementById("stars"),
    audio = document.getElementById("audio");

STARS_LIST.forEach((star) => {
    let starElNode = document.createElement("div"),
        starTmpl = `<img src="${star.img}" title="${star.name}"/>
                    <div class="star_name">${star.name}</div>`;

    starElNode.setAttribute("class", "star");
    starElNode.setAttribute("data-id", star.id);
    starElNode.innerHTML = starTmpl;

    listNode.appendChild(starElNode);
});

listNode.addEventListener("click", onStarsListClick);
listNode.addEventListener("transitionend", onTransitionEnd);

function onTransitionEnd(e) {
    if (e.propertyName !== "transform") return;
    e.target.classList.remove("playing");
}

function onStarsListClick(e) {
    let node = e.target,
        isCardClicked = false;

    while(node !== null) {
        if(node.className === "star") {
            isCardClicked = true;
            break;
        }

        node = node.parentNode;
    }

    if(!isCardClicked) return;

    let starId = node.getAttribute("data-id");
    playStarQuote(starId);
    node.classList.add("playing");
}

function playStarQuote(starId) {
    if(!starId) return;
    STARS_LIST.forEach((star) => {
        if(star.id === starId && star.quotes.length) {
            let randomQuote = star.quotes[Math.ceil(Math.random() * star.quotes.length) - 1];

            // randomQuote.src
            // randomQuote.movie
            // randomQuote.text

            audio.setAttribute("src", randomQuote.src);
            audio.currentTime = 0;
            audio.play();
        }
    });
}