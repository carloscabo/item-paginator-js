var
  iP1,
  iP2;

$(document).ready(function(){
  //La magia aquí

  // Sample1 ///////////////////////////////////////////////////////////////////

  iP1 = new ItemPaginator({
    items: 283,
    items_per_page: 7,
    container: $('.sample-paginator-1')
  });

  // Sample2 ///////////////////////////////////////////////////////////////////

  iP2 = new ItemPaginator({
    items: 46,
    items_per_page: 3,
    start_page: 4, // Starting page, default is 1
    container: $('#sample-paginator-2'),
    text: {
      prev: '&#8249; Anterior',
      next: 'Siguiente &#8250;'
    },
    onFirstPage: function() {
      // that -> itemPaginator obj itself
      console.log( 'iP2 first page:' + that.getCurentPage() );
    },
    onLastPage: function() {
      // that -> itemPaginator obj itself
      console.log( 'iP2 last page:' + that.getCurentPage() );
    },
    onChangePage: function() {
      // that -> itemPaginator obj itself
      console.log( that.getCurentPage() );
    }
  });

  $('.sample-2-set-page').on('click', function(e) {
    e.preventDefault();
    iP2.goToPage(12);
  });

  $('.sample-2-set-items').on('click', function(e) {
    e.preventDefault();
    iP2.setItems(128);
  });


});
