//Global Constants 
const APIKEY = "x";
const LIMIT = 9;
const FILTER = "high";
const LANGUAGE = "en";
const CLIENT = "Gif Kingdom";

let pos = "";
let currentSearch = "";

//DOM items with query selectors
const gifForm = document.querySelector(".form");
const gifArea = document.querySelector(".gif-area");
const gifInput = document.querySelector("#input");
const gifSubmit = document.querySelector("#submit");
const gifMore = document.querySelector(".hidden");

//add event listener to form
gifForm.addEventListener("submit", handleFormSubmit);
gifMore.addEventListener("click", handleMore);

async function getResults(query) {
    let apiURL = `https://tenor.googleapis.com/v2/search?q=${query}&key=${APIKEY}&client_key=${CLIENT}&limit=${LIMIT}&pos=${pos}&contentfilter=${FILTER}`;
    let response = await fetch(apiURL);
    let responseData = await response.json();
    pos = responseData["next"];
    console.log(pos);
    displayResults(responseData);
    gifMore.classList.remove("hidden");
    
    

}

function displayResults(responseData) {
    //for each img in data
    responseData["results"].forEach(element => {
        gifArea.innerHTML += `
            <img id="${element["id"]}" src="${element["media_formats"]["gif"]["url"]}" alt="${element["title"]}"/>
        `
    });
    
}

function handleFormSubmit(evt) {
    evt.preventDefault();
    //clear current div
    gifArea.innerHTML = ``;
    let searchTerm = evt.target.input.value;
    currentSearch = searchTerm;
    getResults(searchTerm);

}

function handleMore(evt) {
    getResults(currentSearch);
}