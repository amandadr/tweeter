/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// HELPERS
const { escape, createTweetElement, renderTweets, loadTweets, preventSubmit, updateErrorText, displayError } = require('./client-helpers');


$(document).ready(function() {
  // hide the error container
  $('.error-log').hide();
  $('.tweet-form').hide();

  loadTweets();

  //* TO TOP *//
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

  //* SUBMIT NEW TWEET *//
  const $form = $('.tweet-form');
  const $formText = $('#tweet-text');

  //* DISPLAY CREATE TWEET *//
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

  // on submission/click of 'tweet' button
  //* SUBMIT NEW TWEET *//
  $form.on('submit', (evt) => {

    // stop the browser from submitting the form
    evt.preventDefault();


    // ERROR CASES //
    if ($formText[0].value.length > 140) {
      // over char count
      const msg = "Oo they're ramblin' again... (tone it down, you're over count)";
      const log = ("tweet over max length:", $formText[0].value.length);
      displayError(msg, log);
    } else if ($formText[0].value.length < 1) {
      // empty form
      const msg = "You've got little to tell, and you don't say much (but you might!)... Please type a tweet";
      const log = ("tweet empty :(");
      displayError(msg, log);
    } else {
      // success!
      // serialize the data from the form
      const tweetData = $form.serialize();

      $('.error-log').hide();

      // POST REQUEST //
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
      });

    }
  });
});