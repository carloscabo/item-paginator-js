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

  iP1.onChangePage = function () {
    console.log('custom message '+this.getCurentPage());
  };

  // Sample2 ///////////////////////////////////////////////////////////////////

  iP2 = new ItemPaginator({
    items: 46,
    items_per_page: 3,
    container: $('#sample-paginator-2'),
    text: {
      prev: '&#8249; Anterior',
      next: 'Siguiente &#8250;'
    },
    onFirstPage: function() {
      console.log( 'sample-2 first page' );
    },
    onLastPage: function() {
      console.log( 'sample-2 last page' );
    },
    onChangePage: function() {
      console.log(this.getCurentPage());
      
      // console.log( 'sample-2 entered page: '+this.getCurentPage() );
    }
  });

  console.log(iP2);

});
