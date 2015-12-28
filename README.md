# item-paginator-js
Simple item paginator, to paginate tables, item collections... with some callbacks:

## Usage

````javascript
$(document).ready(function(){
  //La magia aquí
  var iP1 = new ItemPaginator({
    items: 283,
    items_per_page: 7,
    container: $('.sample-paginator-1')
  });
});
````

## Methods

````javascript
// You can update the number of items and force redrawing
iP1.setItems(125);

// Navigate to page
iP1.goToPage(2);
````

## Event callbacks

````javascript
var iP2 = new ItemPaginator({
  items: 46,
  items_per_page: 3,
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
````

## TO-DO
- Tests
- More samples
