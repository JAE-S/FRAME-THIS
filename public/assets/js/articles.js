  // ========================================================== //
 //                       Controllers                          //
// ========================================================== //

// Global Variables
// =========================================================
var newArticles = 0; 

// Code for pagination
// =========================================================
function loadIt(){
    $('#myTable').pageMe({
        pagerSelector:'#myPager',
        // activeColor: 'rgb(146, 0, 80)',
        prevText:'Anterior',
        nextText:'Siguiente',
        showPrevNext:true,
        hidePageNumbers:false,
        perPage: 3
    });
};

// Grab the articles as a json
// =========================================================
$.getJSON("/articles", function(data) {
   
    var tr;
    $('#emp_body').html('');
    // For each one
    for (var i = 0; i < data.length; i++) {
        tr = $('<tr class="article-preview" />');
            tr.append('<td>' 
            + '<h6 class="title center-align z-depth-2" >' + data[i].title + " " + '</h6>' 
            + '<p class="description z-depth-2">' + data[i].description + " " + '</p>' + '<br>' 
            + '<div class="action-buttons">'
            + "<a class='BUTTON_NXA' data-id='" + data[i]._id + "'>" + "View " + data[i].category + "</a>" 
            + "<a class='BUTTON_NXA view-notes'>" + "View Notes " + "</a>" 
            + "<a class='BUTTON_NXA favorites'>" + "Add to Favorites" + "</a>" +
            '</div>' +
            '</td>')

            $('#emp_body').append(tr)
    }
    loadIt()
    newArticles = data.length
    $('#new-articles').prepend(newArticles)
    $('.total-articles').prepend(newArticles)
    // console.log(data.length)
});


// Grab the articles as a json
// =========================================================
  // on Click function for anchor tag 
$(document).on("click", "a", function() {
    console.log(newArticles)
    // Empty the notes from the note section
    $("#notes").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");
    var myFrame = $("#myframe");
    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      // With that done, add the note information to the page
      .then(function(data) {
        console.log(data);
        // Updates the content of the iframe to match the article that was clicked
        myFrame.attr('src', data.link)
        newArticles--
        $('#new-articles').html(newArticles)
        // The title of the article
        $("#notes").append("<p class='border-lines'>" + "Notes for: " + data.title + "</p>");
        // An input to enter a new title
        // $("#notes").append("<input id='titleinput' name='title' >");
            
        // A textarea to add a new note body
        $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
        // A button to submit a new note, with the id of the article saved to it
        $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
  
        // If there's a note in the article
        if (data.note) {
          // Place the title of the note in the title input
          $("#titleinput").val(data.note.title);
          // Place the body of the note in the body textarea
          $("#bodyinput").val(data.note.body);
        }
      });
  });
  
  // When you click the savenote button
  $(document).on("click", "#savenote", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
  
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from title input
        title: $("#titleinput").val(),
        // Value taken from note textarea
        body: $("#bodyinput").val()
      }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#notes").empty();
      });
  
    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });