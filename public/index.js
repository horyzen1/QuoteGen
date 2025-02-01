const QUOTE_API_URL = 'https://qapi.vercel.app/api/random';

document.getElementById('generate-quote').addEventListener('click', fetchQuoteOfTheDay);

async function fetchQuoteOfTheDay() {
    console.log('Button clicked, fetching quote...');
    try {
        const response = await fetch(QUOTE_API_URL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const quote = data.quote.trim();
        document.getElementById('quote').innerText = quote;
        addQuoteToGallery(quote);
    } catch (error) {
        console.error('Error fetching the quote of the day:', error);
    }
}

function addQuoteToGallery(quote) {
    const gallery = document.getElementById('quote-gallery');
    const quoteElement = document.createElement('p');
    quoteElement.innerText = quote;
    gallery.appendChild(quoteElement);
}

// Fetch past quotes on page load (for demonstration purposes, we'll just add some static quotes)
window.onload = function() {
    const pastQuotes = [
        "The only limit to our realization of tomorrow is our doubts of today.",
        "The future belongs to those who believe in the beauty of their dreams.",
        "The best way to predict the future is to create it."
    ];
    pastQuotes.forEach(addQuoteToGallery);
};