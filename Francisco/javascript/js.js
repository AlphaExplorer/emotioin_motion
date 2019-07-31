//Globarl Variable Declaration 
var happyArray = ["happy", "hilarious", "histerical", "funny", "lol", "happy babies"];
var sadArray = ["unhappy", "regretful", "tantrum", "dissapointed", "melancholy", "crying"];
var keyword_counter = 0;
var gif_response_storage;
var like_counter = 0;
var unlike_counter = 0;
var total_counter = 0;


function buttonSwitch() {  
    $("#buttons").empty()
    $("#buttons").append('<button type="button" class="btn btn-primary" id="like">Like</button>')
    $("#buttons").append('<button type="button" class="btn btn-danger" id="unlike">Unlike</button>')
};

function gif_generator(response, counter)
{
    // Saving the gif_original_url property
    var gif_url = response.data[counter].images.original.url;

    // Creating and storing an image tag
    var gifImage = $("<img>");

    // Setting the gif src, class and alt
    gifImage.attr("src", gif_url);
    gifImage.attr("class", "display")
    gifImage.attr("alt", "gif");

    // Appending the gif to the App_response div
    $(".App_response").empty();
    $(".App_response").append(gifImage);
    console.log(gif_url);
}

function apiCall(keyword) 
{
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    keyword + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=100";
    $.ajax(
    {
        url: queryURL,
        method: "GET"
    }).then(function (response) 
    {      
        // Saving the response 
        gif_response_storage = response;
        console.log(gif_response_storage)
        gif_generator(gif_response_storage, like_counter);
    })
}


$("#happy").on("click", function () 
{
    var keyword = happyArray[keyword_counter];
    apiCall(keyword);
    buttonSwitch();
});

$("#sad").on("click", function () 
{
    var keyword = sadArray[keyword_counter]
    apiCall(keyword);
    buttonSwitch();
});


$(document).on("click", "#like", function(){
    like_counter ++;
    total_counter ++;
    gif_generator(gif_response_storage, total_counter);
});


$(document).on("click", "#unlike", function(){
    unlike_counter ++;
    total_counter ++;
    gif_generator(gif_response_storage, total_counter);
    if (unlike_counter >= 2)
    {
        like_counter = 0;
        unlike_counter = 0;
        total_counter = 0;
        keyword_counter ++
        if(keyword_counter === happyArray.length)
        {
            keyword_counter = 0;
        }
        var keyword = sadArray[keyword_counter];
        apiCall(keyword);
    }

});

