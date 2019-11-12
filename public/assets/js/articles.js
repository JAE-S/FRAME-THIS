  // ========================================================== //
 //                                                            //
// ========================================================== //

// Global Variables
// =========================================================
  // Tracks articles that haven't been viewed 
  var newArticles = 0;             
  // Tracks the total number of articles that were found
  var totalArticles = 0;          
  // Stores the title information so it can be accessed by notes 
  var title;

 // Hidden elements on load 
// =========================================================
  $("#notes").hide();
  $('#article-results').show();

 // Grabs the articles as a json
// =========================================================
  $.getJSON("/articles", function(data) {
    $('#emp_body').html('');
    var tr;
      
      // For each article generate the following html elements
      for (var i = 0; i < data.length; i++) {
          tr = $('<tr class="article-preview" />');
              tr.append('<td>' 
              + '<h6 class="title center-align z-depth-2" >' + data[i].title + " " + '</h6>' 
              + '<p class="description z-depth-2">' + data[i].description + " " + '</p>' + '<br>' 
              + '<div class="action-buttons">'
              + "<a class='view-article BUTTON_NXA' data-id='" + data[i]._id + "'>" + "View " + data[i].category + "</a>" 
              + "<a class='BUTTON_NXA' target='_blank' href='" + data[i].link + "' data-id='s-" + data[i]._id + "'>" + "Visit Site" + "</a>" +
              '</div>' +
              '</td>')

          $('#emp_body').append(tr)
          // Counts the newly generated elements 
          if (!data[i].opened){
            newArticles++
          }
      }
      // Function for pagination -> Code under custom.js file 
      loadIt()
      // Sets the total number of generated elements to the totalArticles variable 
      totalArticles = data.length

      $('.new-articles').prepend(newArticles)
      $('.total-articles').prepend(totalArticles)
      // Function for noArticles  -> Code under custom.js file  
      // Lets users know that no articles were found 
      noArticles()
  });
  
 // Save a note 
// =========================================================
  $(document).on("click", "#savenote", function(event) {
    event.preventDefault();
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
        body: $("#bodyinput").val(),
        name: title
      }
    })
      // With that done clear the title data 
      .then(function() {
        title = ("");
      });
  
    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
    location.reload();
  });

 // On Click view the article / add & view notes 
// =========================================================
  $(document).on("click", ".view-article", function() {
    $(".info").empty();
    $('#article-results').hide();
    $('#view-article-container').show();
    $("#notes").show(); 
    $("#notes").empty();
    $('.input-labels').show();
    $('.input-labels').empty();
    $('.input-boxes').show();
    $('.input-boxes').empty();
 

    var thisId = $(this).attr("data-id");
    var myFrame = $("#myframe");

    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      .then(function(data) {
        console.log(data);
        // Set the iframe to the link associated with the article 
        myFrame.attr('src', data.link)

        title = data.title

        if (!data.opened){
         
          $('#add').append(content)
          newArticles--

          $.ajax({
            method: "PUT",
            url: "/articles/" + thisId,
            }) .then(function(data) {
              // Add total number of unread articles to the badge in the nav bar 
              $('.new-articles').html(newArticles)
              console.log("This article has been viewed " + data.opened);
            })
        }
        // Adds the article's (that was clicked) information to the notes view
        var content = $('<div class="info">');
        content.html( 
          // Buttons -> Go Back & visit site 
            '<a class="left-align go-back BUTTON_NXA">' + "Go Back" + '</a>' 
          + '<a class="right-align view-article BUTTON_NXA" target="_blank" href="' + data.link + '">' + "Visit site" + '</a>'
          // Article details 
          + '<div class="descriptions z-depth-2" style="margin: 20px 8px">'
          + '<h5 class="headline left-align border-line">' + title + '</h5>' 
          + '<p class="left-align" >' + '<a class="article-details">'+ "Category: " + '</a>' + data.category + " " + '</p>' 
          + '<p class="left-align">' + '<a class="article-details">' + "Date Published: " + '</a>' + data.date + " " + '</p>' 
          // + '<p class="left-align">' + '<a class="article-details">' + "Description: " + '</a>' + data.description + " " + '</p>' 
          + '</div>')

        $('#add').append(content)

        // Notes Section header 
        $("#notes").append("<h5 class='border-lines notes-title'>" + "Notes" + "</h5>");
        // Creates a div to store notes that are currently in the database 
        $("#notes").append("<div class='left-align' id='oldNotes'>");

        $(".input-labels").append("<p class='row'>" + "Username: " + "</p>");
        $(".input-labels").append("<p class='row'>" + "Note: " + "</p>");

        // An Input to save the user's name 
        $(".input-boxes").append("<input class=' row add-note' autocomplete='off' id='titleinput' placeholder='Jane' name='title'>");
        // A textarea to add a new note body
        $(".input-boxes").append("<textarea class='materialize-textarea row' id='bodyinput' name='body'></textarea>");
        // A button to submit a new note, with the id of the article saved to it
        $(".input-boxes").append("<button class='right-align BUTTON_NXA' data-id='" + data._id + "' id='savenote'>Save Note</button>");
        
        
        // If there's a note in the article
        if (data.note) {
         
          $.getJSON("/notes", function(notes) {
            // For each one
            for (var i = 0; i < notes.length; i++) {
              if (notes[i].name === title) {
                // console.log(notes)
                $('#oldNotes').append( '<p>'+ '<a class="delete" data-id="' + notes[i]._id + '" >' + '| DELETE | ' + '</a>' + '<a class="date">' + notes[i].created.toString() + " " + '</a>' 
                 + notes[i].title + " " + '<br>' 
                 + notes[i].body + " " + '</p>')
              }
            }
          })
        } else { 
          $('#oldNotes').append('<p>' + 'There are currently' + '<a class="no-notes-alert">' + ' 0 ' + '</a>' + 'notes for '+ title + '.' + '</p>');
        }
    })
    
  })

 // Delete a note 
// =========================================================
$(document).on("click", ".delete", function(event) {
  event.preventDefault();
  // Grab the id associated with the article from the delete button
  var thisId = $(this).attr("data-id");
  console.log('remove this button: ' + thisId)
 
  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "PUT",
    url: "/notes/delete/" + thisId,
  })
    // With that done clear the title data 
    .then(function() {
      console.log("this note has been deleted")
    });
    
  location.reload();
});