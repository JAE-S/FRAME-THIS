  // ========================================================== //
 //                                                            //
// ========================================================== //

// Global Variables
// =========================================================
var newArticles = 0; 
var totalArticles = 0; 
$("#notes").hide();
$('#article-results').show();
var title;

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
              + "<a class='view-article BUTTON_NXA' data-id='" + data[i]._id + "'>" + "View " + data[i].category + "</a>" 
              + "<a class='BUTTON_NXA' target='_blank' href='" + data[i].link + "' data-id='s-" + data[i]._id + "'>" + "Visit Site" + "</a>" +
              '</div>' +
              '</td>')

              $('#emp_body').append(tr)
          if (!data[i].opened){
            newArticles++
          }
      }
      loadIt()
      
    
      totalArticles = data.length
      $('#new-articles').prepend(newArticles)
      $('.total-articles').prepend(totalArticles)
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
      // With that done
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

    var thisId = $(this).attr("data-id");
    var myFrame = $("#myframe");

    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      .then(function(data) {
        console.log(data);

        myFrame.attr('src', data.link)

        if (!data.opened){
         
        $('#add').append(content)
        // contentGenerated = true; 
          newArticles--
          $.ajax({
            method: "PUT",
            url: "/articles/" + thisId,
            }) .then(function(data) {
              // Add total number of unread articles to the badge in the nav bar 
              $('#new-articles').html(newArticles)
              console.log("This article has been viewed " + data.opened);
            })
        }
        var content = $('<div class="info">');
        content.html( "<a class='left-align go-back BUTTON_NXA'>" + "Go Back" + "</a>" 
          + "<a class='right-align view-article BUTTON_NXA' target='_blank' href='" + data.link + "'>" + "Visit site" + "</a>" 
          + '<div class="description z-depth-2" style="margin: 20px 8px">'
          + '<h6 class="left-align" >' + '<a class="article-details">'+ "Category: " + '</a>' + data.category + " " + '</h6>' 
          + '<h6 class="left-align">' + '<a class="article-details">' + "Title: " + '</a>' + data.title + " " + '</h6>' 
          + '<h6 class="left-align">' + '<a class="article-details">' + "Date Published: " + '</a>' + data.date + " " + '</h6>' 
          + '<h6 class="left-align">' + '<a class="article-details">' + "Description: " + '</a>' + data.description + " " + '</h6>' + '<br>' 
          + '</div>')

        $('#add').append(content)
        // The title of the article
        $("#notes").append("<h5 class='border-lines notes-title'>" + "Notes for: " + data.title + "</h5>");
        // Notes saved in the database
        $("#notes").append("<div class='left-align' id='oldNotes'>");

        $(".input-labels").append("<p class='row'>" + "Username: " + "</p>");
        $(".input-labels").append("<p class='row'>" + "Add Note: " + "</p>");
        // An Input to save the user's name 
        $(".input-boxes").append("<input class=' row add-note' autocomplete='off' id='titleinput' placeholder='Jane' name='title'>");
    
        // A textarea to add a new note body
        $(".input-boxes").append("<textarea class='row' id='bodyinput' name='body'></textarea>");
        // A button to submit a new note, with the id of the article saved to it
        $(".input-boxes").append("<button class='right-align BUTTON_NXA' data-id='" + data._id + "' id='savenote'>Save Note</button>");
        
        title = data.title
        // If there's a note in the article
        if (data.note) {
         
          $.getJSON("/notes", function(notes) {
        
            // For each one
            for (var i = 0; i < notes.length; i++) {
              if (notes[i].name === title) {
                // console.log(notes)
                $('#oldNotes').append( '<p>'+ '<a class="delete">' + '| DELETE | ' + '</a>' + '<a class="date">' + notes[i].created.toString() + " " + '</a>' 
                 + notes[i].title + " " + '<br>' 
                 + notes[i].body + " " + '</p>')
              }
            }
          })
        } 
    })
    
  })

