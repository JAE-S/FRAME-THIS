  // ========================================================== //
 //               Front-End Javascript functions               //
// ========================================================== //

$('#view-article-container').hide();

$('document').ready( () => {

// Materialize functions 
// =========================================================
    // Materialize functions 
    $('.carousel').carousel();
    $('.modal').modal();
    $('.sidenav').sidenav();
    $('#bodyinput').val('New Text');
    $('#bodyinput').trigger('autoresize');
          
    // $('select').formSelect();
    // Materialize character counter 
    // $('input#name, input#last_name').characterCounter();
}) 

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

// On click function to scrape articles 
// =========================================================
  $(document).on("click", ".scrape", function() {
    if(newArticles > 0){
      console.log("Please clear the current Articles first")
    } else {
      $('.scrape').attr('href', "/scrape" )
      $('.no-articles').hide();
    }
  })

// Modal on click functions 
// =========================================================
  $(document).on("click", '.go-back', function() {
    $('#article-results').show();
    $('#view-article-container').hide();
    // $('.no-articles').hide();
  })

  function noArticles(){
    if (totalArticles > 0) {
      console.log("this button was clicked")
        $('.no-articles').hide();
    } else {
      console.log("this button was clicked")
        $('.no-articles').show();
    }
  }
 
