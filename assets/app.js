/* global axios */

const apiUrl =
  'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1?v=';
const newQuote = document.getElementById('new-quote');
const quoteAuthor = document.getElementById('author');
const quoteText = document.getElementById('text');
const quoteSource = document.getElementById('source');
const tweetQuote = document.getElementById('tweet-quote');
const twitterUrl = 'http://twitter.com/intent/tweet/?text=';
let content;
let tweet;
let twitterMessage;
let twitterMessageShortened;

newQuote.addEventListener('click', () => {
  axios.get(apiUrl + Date.now()).then((response) => {
    content = response.data[0];

    quoteAuthor.innerHTML = content.title;
    quoteText.innerHTML = content.content;
    if (
      typeof content.custom_meta !== 'undefined' &&
      typeof content.custom_meta.Source !== 'undefined'
    ) {
      quoteSource.innerHTML = `Source: ${content.custom_meta.Source}`;
    } else {
      quoteSource.innerHTML = null;
    }

    twitterMessage = content.content
      .trim()
      .replace(/(<([^>]+)>)/gi, '')
      .replace(/'/gi, '´');
    twitterMessageShortened = twitterMessage.substring(0, 108);

    tweet = `${twitterUrl + twitterMessageShortened}... ${content.link}`;
    tweetQuote.setAttribute('href', tweet);
  });
});
