// Why isn't this part of jQuery or the browser????
// probably it is and I've missed it
// this was copied from sizzle/speed.js
function urlParams() {
  var parts, value,
      params = {},
      search = window.location.search.substring(1).split("&"),
      i = 0,
      len = search.length;

  for ( ; i < len; i++ ) {
    parts = search[i].split("=");
    value = parts[1];
    // Cast booleans and treat no value as true
    params[ decodeURIComponent(parts[0]) ] =
      value && value !== "true" ?
        value === "false" ? false :
        decodeURIComponent( value ) :
      true;
  }

  return params;
}
var postData = [{ "type": "open_response",
           "question_id": "1",
           "answer": "I like this activity"
         }];
if(window.location.search) {
    var returnUrl = urlParams().returnUrl;
}
$(function(){
  $('#send_learner_data').click(function(){
    if(returnUrl){
      console.log('sending data');
      var ajaxResponse = $.ajax({
        type: "post",
        url: returnUrl,
        xhrFields: {
          withCredentials: true
        },
        // using text/plain avoids the preflight OPTIONS request
        contentType: "text/plain",
        data: JSON.stringify( postData )
      });
      ajaxResponse.then(function(response){
        console.log(response);
      });
    } else {
      alert("no returnUrl passed to activity");
    }
  });
});
