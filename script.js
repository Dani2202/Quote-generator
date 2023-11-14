const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

async function getQuotes() {
  const apiUrl = "https://api.quotable.io/random";
  try {
    showLoadingSpinner();
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    if (!apiQuotes.author) {
      authorText.textContent = "Unknown";
    } else {
      authorText.textContent = apiQuotes.author;
    }
    if (apiQuotes.content.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    quoteText.textContent = apiQuotes.content;
    removeLoadingSpinner();
  } catch (error) {
    removeLoadingSpinner();
  }
}

// Tweet

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners

newQuoteBtn.addEventListener("click", getQuotes);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuotes();
