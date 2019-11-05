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
          + '<h6 class="left-align" style="line-height: 2; color: #920050" >' + "Category: " + data.category + " " + '</h6>' 
          + '<h6 class="left-align" style="line-height: 2; color: #920050">' + "Title: " + data.title + " " + '</h6>' 
          + '<h6 class="left-align" style="line-height: 2; color: #920050" >' + "Date Published: " + data.date + " " + '</h6>' 
          + '<p class="left-align">' + "Description: " + data.description + " " + '</p>' + '<br>' 
          + '</div>')
          $('#add').append(content)
        // The title of the article
        $("#notes").append("<h6 class='border-lines' style='color: #920050; border-top: 2px solid #920050; border-bottom: 2px solid #920050; padding: 8px' >" + "Notes for: " + data.title + "</h6>");

        $("#notes").append("<div id='oldNotes'>");

        $("#notes").append("<h6 class='left-align border-lines' style='color: #920050; border-bottom: 1px solid #920050; padding: 8px; margin-top: 20px' >" + "Add a note " + "</h6>");
        // An input to enter a new title
        $("#notes").append("<input autocomplete='off' id='titleinput' placeholder='Please enter a user name' name='title'>");
    
        // A textarea to add a new note body
        $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
        // A button to submit a new note, with the id of the article saved to it
        $("#notes").append("<button class='left-align BUTTON_NXA' data-id='" + data._id + "' id='savenote'>Save Note</button>");
        
        title = data.title
        // If there's a note in the article
        if (data.note) {
         
          $.getJSON("/notes", function(notes) {
        
            // For each one
            for (var i = 0; i < notes.length; i++) {
              if (notes[i].name === title) {
                console.log(notes)
                // for (var a = 0; a < notes.length; a++) {
                $('#oldNotes').append('<div>'

                    + '<h6>' + notes[i].title + " " + '</h6>' 
                    + '<p>' + notes[i].created.toString() + " " + '</p>' 
                    + '<p>' + notes[i].body + " " + '</p>' 
                //    
                    + '</div>')
              
          
                //     $('#emp_body').append(tr)
                // }
            }
          }
          })
        } 
    })
    
  })

