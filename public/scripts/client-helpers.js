const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(tweetObj) {
  const escapeName = `<p>${escape(tweetObj.user.name)}</p>`;
  const escapeContent = `<p>${escape(tweetObj.content.text)}</p>`;

  // -avatar -username -handle -age
  const $tweetMarkup = $(`
    <section class="tweet-box">
      <header class="tweet-head">
        <div class="tweet-head-left">
          <img class="tweet-avatar"
          src="${tweetObj.user.avatars}">
          </img>
          <div class="tweet-username">
          ${escapeName}
          </div>
        </div>
        <div class="tweet-handle">
        ${tweetObj.user.handle}
        </div>
      </header>
      <article class="tweet-article">
      ${escapeContent}
      </article>
      <footer class="tweet-foot">
        <div class="tweet-foot-left">
          <div class="tweet-age">
          ${timeago.format(`${tweetObj.created_at}`)}
          </div>
        </div>
        <div class="tweet-foot-right">
          <div class="tweet-flag">
            <svg xmlns="http://www.w3.org/2000/svg" , viewBox="0 0 448 512">
              <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
              <path
                d="M48 56c0-13.3-10.7-24-24-24S0 42.7 0 56V456c0 13.3 10.7 24 24 24s24-10.7 24-24V124.2l12.5-2.4c16.7-3.2 31.5-8.5 44.2-13.1l0 0 0 0c3.7-1.3 7.1-2.6 10.4-3.7c15.2-5.2 30.4-9.1 51.2-9.1c25.6 0 43 6 63.5 13.3l.5 .2c20.9 7.4 44.8 15.9 79.1 15.9c32.4 0 53.7-6.8 90.5-19.6V342.9l-9.5 3.3c-41.5 14.4-55.2 19.2-81 19.2c-25.7 0-43.1-6-63.6-13.3l-.6-.2c-20.8-7.4-44.8-15.8-79-15.8c-16.8 0-31 2-43.9 5c-12.9 3-20.9 16-17.9 28.9s16 20.9 28.9 17.9c9.6-2.2 20.1-3.7 32.9-3.7c25.6 0 43 6 63.5 13.3l.5 .2c20.9 7.4 44.8 15.9 79.1 15.9c34.4 0 56.4-7.7 97.8-22.2c7.5-2.6 15.5-5.4 24.4-8.5l16.2-5.5V360 72 38.4L416.2 49.3c-9.7 3.3-18.2 6.3-25.7 8.9c-41.5 14.4-55.2 19.2-81 19.2c-25.7 0-43.1-6-63.6-13.3l-.6-.2c-20.8-7.4-44.8-15.8-79-15.8c-27.8 0-48.5 5.5-66.6 11.6c-4.9 1.7-9.3 3.3-13.6 4.8c-11.9 4.3-22 7.9-34.7 10.3L48 75.4V56z" />
            </svg>
          </div>
          <div class="tweet-retweet">
            <svg xmlns="http://www.w3.org/2000/svg" , viewBox="0 0 576 512">
              <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
              <path
                d="M272 416c17.7 0 32-14.3 32-32s-14.3-32-32-32H160c-17.7 0-32-14.3-32-32V192h32c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-64-64c-12.5-12.5-32.8-12.5-45.3 0l-64 64c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l32 0 0 128c0 53 43 96 96 96H272zM304 96c-17.7 0-32 14.3-32 32s14.3 32 32 32l112 0c17.7 0 32 14.3 32 32l0 128H416c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l64 64c12.5 12.5 32.8 12.5 45.3 0l64-64c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8l-32 0V192c0-53-43-96-96-96L304 96z" />
            </svg>
          </div>
          <div class="tweet-love">
            <svg xmlns="http://www.w3.org/2000/svg" , viewBox="0 0 512 512">
              <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
              <path
                d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
            </svg>
          </div>
        </div>
      </footer>
    </section>
  `);
  return $tweetMarkup;
};

const renderTweets = function(tweetsArr) {
  for (const tweet of tweetsArr) {
    const tweetLength = tweet.content.text.length;
    if (tweetLength > 140 || tweetLength < 1) {
      return false;
    } else {
      const $tweet = createTweetElement(tweet);
      $('.user-feed').prepend($tweet);
    }
  }
};

const loadTweets = function() {
  $.ajax({
    method: 'GET',
    url: '/tweets',
    success: (tweets) => {
      console.log(tweets);
      renderTweets(tweets);
    }
  });
};

const preventSubmit = function(htmlClass) {
  $(htmlClass).on("click", ((evt) => {
    evt.preventSubmit();
    return false;
  }));
};

const updateErrorText = function(txt) {
  $('#errorLog').text(txt);
};

const displayError = function(message, log) {
  $('.error-log').slideDown("slow");
  updateErrorText(message);
  console.log(log);
  preventSubmit(".tweet-btn");
  return false;
};

module.exports = { loadTweets, displayError }; // only using loadTweets and displayError outside of this js file