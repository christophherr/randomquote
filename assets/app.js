$(document).ready( function() {
  $('.get-new-quote-button').on('click', function(getQuote) {
    getQuote.preventDefault();
    $.ajax({
      url: 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
      success: function(getQuote) {
                var content = getQuote.shift();
                $('.quote-author').html(content.title);
                $('.quote').html(content.content);
                'undefined' !== typeof content.custom_meta && 'undefined' !== typeof content.custom_meta.Source ? $('.quote-source').html('Source: ' + content.custom_meta.Source) : $('.quote-source').text('');

                var twitter = 'http://twitter.com/intent/tweet/?text=',
                twitterMessage = content.content.replace(/(<([^>]+)>)/gi, ''),
                twitterMessageShortened = twitterMessage.substring(0, 108);

                twitter += twitterMessageShortened + '...';
                twitter += ' ' + content.link;
                $('#tweet-quote').attr('href', twitter);
              },
      cache: !1
    });
  });
});
