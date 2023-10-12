$(document).ready(function () {
  // --- our code goes here ---
  let count = 0;
  $('#tweet-text').on('input', function () {
    count = this.value.length - 1;
    count++;
    const form = $(this).closest('.tweet-form');
    let counting = form.find('.counter')['0'];
    counting.value = 140 - count;
    console.log("SOMETHING", count, counting)
    // return counting;
    if (counting.value >= 0) {
      $(this).css('color', 'slategrey');
      $(counting).css('color', 'slategrey');
    } else {
      $(this).css('color', 'firebrick');
      $(counting).css('color', 'firebrick');
    }
  })
});