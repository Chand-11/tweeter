//charactercount
$(document).ready(function () {
  // Even keyup call
  $("textarea").on("input", onChange);

});


const onChange = function () {


  //Store the handle of counter element from html
  let $count = $("output.counter");
  const length = $(this).val().length;
  //update the counter to show remaining character left on tectarea
  $count.val(140 - length);

  if (length > 140) {

    $count.addClass("danger");
    return;
  }

  // revert counter text to normal colour if user deletes enough characters
  $count.removeClass("danger");
};