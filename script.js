const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// Show Loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

//Get Quotes From API

async function getQuotes() {
  const apiUrl = "https://api.quotable.io/random";
  try {
    loading();
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
    complete();
  } catch (error) {
    complete();
    // Handling of Error
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
