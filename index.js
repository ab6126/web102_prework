/*****************************************************************************
 * Challenge 2
*/

import GAMES_DATA from './games.js';

const GAMES_JSON = JSON.parse(GAMES_DATA);

function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3
*/

const gamesContainer = document.getElementById("games-container");

function addGamesToPage(games) {
    for (let i = 0; i < games.length; i++) {
        const gameCard = document.createElement("div");
        gameCard.classList.add("game-card");

        gameCard.innerHTML = `
            <img src="${games[i].img}" class="game-img" />
            <h3>${games[i].name}</h3>
            <p>${games[i].description}</p>
            <p>Backers: ${games[i].backers}</p>
        `;

        gamesContainer.appendChild(gameCard);
    }
}

addGamesToPage(GAMES_JSON);

/*****************************************************************************
 * Challenge 4
*/

const contributionsCard = document.getElementById("num-contributions");

const totalContributions = GAMES_JSON.reduce((sum, game) => {
    return sum + game.backers;
}, 0);

contributionsCard.innerHTML = totalContributions.toLocaleString();

const raisedCard = document.getElementById("total-raised");

const totalRaised = GAMES_JSON.reduce((sum, game) => {
    return sum + game.pledged;
}, 0);

raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = GAMES_JSON.length;

/*****************************************************************************
 * Challenge 5
*/

function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);

    addGamesToPage(unfundedGames);
}

function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);

    addGamesToPage(fundedGames);
}

function showAllGames() {
    deleteChildElements(gamesContainer);

    addGamesToPage(GAMES_JSON);
}

const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*****************************************************************************
 * Challenge 6
*/

const descriptionContainer = document.getElementById("description-container");

const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);

const displayStr = `
A total of $${totalRaised.toLocaleString()} has been raised for ${GAMES_JSON.length} games.
Currently, ${unfundedGames.length} ${unfundedGames.length === 1 ? "game remains" : "games remain"} unfunded.
We need your help to fund these amazing games!
`;

const descriptionParagraph = document.createElement("p");
descriptionParagraph.innerHTML = displayStr;
descriptionContainer.appendChild(descriptionParagraph);

/*****************************************************************************
 * Challenge 7
*/

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
    return item2.pledged - item1.pledged;
});

const [firstGame, secondGame, ...rest] = sortedGames;

const firstGameName = document.createElement("p");
firstGameName.innerHTML = firstGame.name;
firstGameContainer.appendChild(firstGameName);

const secondGameName = document.createElement("p");
secondGameName.innerHTML = secondGame.name;
secondGameContainer.appendChild(secondGameName);