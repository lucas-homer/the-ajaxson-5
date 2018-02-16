

$(document).ready(function() {
    // register our function as the "callback" to be triggered by the form's submission event
    $("#gif-form-request").submit(fetchAndDisplayGif); // in other words, when the form is submitted, fetchAndDisplayGif() will be executed
});


/**
 * sends an asynchronous request to Giphy.com aksing for a random GIF using the 
 * user's search term (along with "jackson 5")
 * 
 * upon receiving a response from Giphy, updates the DOM to display the new GIF
 */
function fetchAndDisplayGif(event) {
    
    // This prevents the form submission from doing what it normally does: send a request (which would cause our page to refresh).
    // Because we will be making our own AJAX request, we dont need to send a normal request and we definitely don't want the page to refresh.
    event.preventDefault();

    clearError();
    
    // get the user's input text from the DOM
    var searchQuery = $('#tag').val(); // TODO should be e.g. "dance"
    var riddleAnswer = $("#riddle").val();
        
    
    // if they didn't fill in the sentence, yell at them to do so
    if (riddleAnswer == ""){
        displayError("You must first complete the sentence!");
        return;
    } else if (riddleAnswer != "5"){
        displayError("No GIFS for you!");
        return;
    } else {
        // configure a few parameters to attach to our request
    var params = { 
        api_key: "dc6zaTOxFJmzC", 
        tag : " jackson 5" + searchQuery, //  should be e.g. "jackson 5 dance"
    };
    
    var rootURL = "https://api.giphy.com/v1/gifs/random";
    // make an ajax request for a random GIF
    $.ajax({
        url: rootURL, // where should this request be sent?
        data: params, // attach those extra parameters onto the request
        success: function(response) {
            // if the response comes back successfully, the code in here will execute.
            
            // jQuery passes us the `response` variable, a regular javascript object created from the JSON the server gave us
            console.log("we received a response!");
            console.log(response);
            $('#gif').attr("src", response.data.image_url);
            
            setGifLoadedStatus(true);
            
            
            // 1. set the source attribute of our image to the image_url of the GIF
            // 2. hide the feedback message and display the image
        },
        error: function() {
            // if something went wrong, the code in here will execute instead of the success function
            
            // give the user an error message
            $("#feedback").text("Sorry, could not load GIF. Try again!");
            setGifLoadedStatus(false);
        }
    });
            
}
    
    // give the user a "Loading..." message while they wait
    
}
// display error message on the riddle text input, style it red
function displayError(message) {
    $("#riddle-form").addClass("has-error");
    $(".error-message").text(message);
    $
}

// removes error red styling and error message 
function clearError(message) {
    $("#riddle-form").removeClass("has-error");
    $(".error-message").text("");
}

/**
 * toggles the visibility of UI elements based on whether a GIF is currently loaded.
 * if the GIF is loaded: displays the image and hides the feedback label
 * otherwise: hides the image and displays the feedback label
 */
function setGifLoadedStatus(isCurrentlyLoaded) {
    $("#gif").attr("hidden", !isCurrentlyLoaded);
    $("#feedback").attr("hidden", isCurrentlyLoaded);
}