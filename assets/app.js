$(document).ready(function () {
  $(".get-new-quote-button").on("click", function(getQuote) {
    getQuote.preventDefault(),
    $.ajax({
      url: "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1",
      success: function(getQuote) {
                var content = getQuote.shift();
                $(".quote-author").text(content.title),
                $(".quote").html(content.content),
                "undefined" != typeof content.custom_meta && "undefined" != typeof content.custom_meta.Source ? $(".quote-source").html("Source: " + content.custom_meta.Source) : $(".quote-source").text("");

                var twitter = "http://twitter.com/home?status=",
                twitterMessage = content.content.replace(/(<([^>]+)>)/gi, ""),
                twitterMessageShortened = twitterMessage.substring(0, 108);

                twitter += twitterMessageShortened + "...",
                twitter += " " + content.link,
                $("#twitter").attr("href", twitter),
                window.history.replaceState({}, "", content.link),
                window.document.title = "Quotes on Design"
              },
      cache: !1
    });
  });
});
