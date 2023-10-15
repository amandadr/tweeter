/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// escape XSS,
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

$(document).ready(function() {
  // hide the error container
  $('.error-log').hide();
  $('.tweet-form').hide();

  // scroll back to top
  let $toTop = $('#toTop');

  $(window).scroll(function() {
    if ($(window).scrollTop() > 300) {
      $toTop.addClass('show');
    } else {
      $toTop.removeClass('show');
    }
  });

  $toTop.on('click', function(evt) {
    evt.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, '300');
  });

  //-- (LET'S GET) FUNCY HELP --//
  const createTweetElement = function(tweetObj) {
    const escapeName = `<p>${escape(tweetObj.user.name)}</p>`;
    const escapeContent = `<p>${escape(tweetObj.content.text)}</p>`;

    // -avatar -username -handle -age
    const $tweetMarkup = $(`
    <div class="tweet-box">
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
      <div class="tweet-age">
        ${timeago.format(`${tweetObj.created_at}`)}
      </div>
      <div class="tweet-foot-right">
        <div class="tweet-flag">
          <i class="fa-solid fa-flag"></i>
        </div>
        <div class="tweet-retweet">
          <i class="fa-solid fa-retweet"></i>
        </div>
        <div class="tweet-love">
          <i class="fa-solid fa-heart"></i>
        </div>
      </div>
    </footer>
  </div>
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

  const displayError = function(message, log, btn) {
    $('.error-log').slideDown("slow");
    updateErrorText(message);
    console.log(log);
    preventSubmit(btn);
    return false;
  };

  loadTweets();


  // SUBMIT FORM //
  const $form = $('.tweet-form');
  const $formText = $('#tweetText');
  const formBtn = '.tweet-btn';

  // submit on press of enter
  $($form).keypress(function(evt) {
    if (evt.which == 13) {
      $(formBtn).submit();
      return false;
    }
  });

  // display the tweet form
  $('.nav-right').on("click", (evt) => {
    evt.preventDefault();

    if ($form.is(':visible')) {
      $form.slideUp("slow");
    } else {
      $form.slideDown("slow");

      setTimeout(function() {
        $formText.focus();
      }, 1000);

      $formText.on("keypress", () => {
        if ($formText.length === 0) {
          $("$formText::placeholder").css("color", "transparent");
        }
      });
    }
  });

  $form.on('submit', (evt) => {

    // stop the browser from submitting the form
    evt.preventDefault();


    // ERROR CASES //
    console.log($formText[0].value);
    if ($formText[0].value.length > 140) {
      // over char count
      const msg = "Oo they're ramblin' again... (tone it down, you're over count)";
      const log = ("tweet over max length:", $formText[0].value.length);
      displayError(msg, log, formBtn);
    } else if ($formText[0].value.length < 1) {
      // empty form
      const msg = "You've got little to tell, and you don't say much (but you might!)... Please type a tweet";
      const log = ("tweet empty :(");
      displayError(msg, log, formBtn);
    } else {
      // grab the data from the form
      const tweetData = $form.serialize();
      $('.error-log').hide();
      // make a post request to the tweets
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: tweetData,
        success: () => {
          console.log('the post request resolved successfully', $formText[0].value);
          setTimeout(() => {
            location.reload();
          }, 300);
        },
        // error: (evt) => {
        //   evt.preventDefault();
        //   console.log('the post request was unsuccessful, see message:', $('#errorLog'));
        //   return false;
        // }
      }); //ajax post

    }
  });
});