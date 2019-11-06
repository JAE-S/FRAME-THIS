  // ========================================================== //
 //               Front-End Javascript functions               //
// ========================================================== //

 // Hidden elements 
// =========================================================
  $('#view-article-container').hide();

  $('document').ready( () => {

 // Materialize functions 
// =========================================================
    $('.modal').modal();
    // $('.sidenav').sidenav();
    $('#bodyinput').val('New Text');
    $('#bodyinput').trigger('autoresize');
    $(".dropdown-trigger").dropdown();
          
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
      // console.log("Please clear the current Articles first")
    } else {
      $('.scrape').attr('href', "/scrape" )
      $('.no-articles').hide();
    }
  })

// go-back on click functions 
// =========================================================
  $(document).on("click", '.go-back', function() {
    $('#article-results').show();
    $('#view-article-container').hide();
    $("#myframe").attr('src', 'https://www.youtube.com/embed/O4ZAAi8awk4?autoplay=1&')
  })

 // If no Articles are found 
// =========================================================
  function noArticles(){
    if (totalArticles > 0) {
        $('.no-articles').hide();
    } else {
        $('.no-articles').show();
    }
  }
 
