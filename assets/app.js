/* global axios */

var apiUrl =
    'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1?v=',
    newQuote = document.getElementById('new-quote'),
    quoteAuthor = document.getElementById('author'),
    quoteText = document.getElementById('text'),
    quoteSource = document.getElementById('source'),
    tweetQuote = document.getElementById('tweet-quote'),
    content,
    tweet,
    twitterUrl = 'http://twitter.com/intent/tweet/?text=',
    twitterMessage,
    twitterMessageShortened;

newQuote.addEventListener('click', function(event) {
    console.log(event);
    axios.get(apiUrl + Date.now()).then(function(response) {
        content = response.data[0];

        quoteAuthor.innerHTML = content.title;
        quoteText.innerHTML = content.content;
        typeof content.custom_meta !== 'undefined' &&
            typeof content.custom_meta.Source !== 'undefined'
            ? (quoteSource.innerHTML = 'Source: ' + content.custom_meta.Source)
            : (quoteSource.innerHTML = null);

        twitterMessage = content.content
            .trim()
            .replace(/(<([^>]+)>)/gi, '')
            .replace(/'/gi, '´');
        twitterMessageShortened = twitterMessage.substring(0, 108);

        tweet = twitterUrl + twitterMessageShortened + '... ' + content.link;
        tweetQuote.setAttribute('href', tweet);
    });
});
