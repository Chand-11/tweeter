$(document).ready(function () {
  $("#error").hide();
  $("#tweetform").on("submit", onSubmit);
  loadTweets();
});

//Function to clear tweetarea and reset counter
const clearText = () => {
  $("#tweet-text").val('');
  $('.counter').val(140);
};

// Function to send(POST) data to server
const onSubmit = function (event) {
  event.preventDefault();
  $("#error").slideUp();

  //Validation code for the text-area
  const length = $(".tweet-text-area").val().length;
  if (length === 0) {
    $("#error").slideDown("slow");
    $("#error").text("Tweet can not be empty");
    return;
  }
  if (length > 140) {
    $("#error").slideDown("slow");
    $("#error").text("tweet must be less than 140");
    return;
  }

  const data = $(this).serialize();
  $.post('/tweets', data)
    .then(data => {
      loadTweets();
      clearText();
    });
}

//to fetch the data from server
const loadTweets = function () {

  $.ajax('/tweets', { method: "GET", dataType: "json" })
    .then(data => {
      renderTweets(data);
    })
    .catch((e) => console.log(("Error: ", e)));

};

//Function to render the tweet to the container area
const renderTweets = function (tweets) {
  let tweetContainer = $(".tweet-area");
  tweetContainer.html("");

  for (const each of tweets) {
    let $tweet = createTweetElement(each);
    $tweet.prependTo(tweetContainer);
  }

}
//Function to create new tweet from the page
const createTweetElement = function (tweet) {
  const time = timeago.format(tweet.created_at);
  const $tweet = $(`<article class="tweet-header">
       
  <div class = "post-header"> 
     
    <div class= "icon">
        <img class="image" src="${tweet.user.avatars}"> 
        <div><b>${tweet.user.name}</b></div> 
      </div>

      <div>${tweet.user.handle}</div>
  </div>

  <h4>${escape(tweet.content.text)}</h4>
  <hr>      
  
  <Div class= "footer">
    <div> ${time} </div>
    <div class="footerimage"><i class="fas fa-flag"></i> <i class="fas fa-retweet"></i><i class="fas fa-heart"></i></div>
  
    </Div>
  </article> `);
  return $tweet;

}

//XSS - to stop malicious scripts in tweet-area
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};