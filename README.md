# item-paginator-js
Simple item paginator, to paginate tables, item collections... with some callbacks:

## Usage

```
$(document).ready(function(){
  //La magia aquí
  itemPaginator.init({
    items: 50,
    items_per_page: 7,
    container: $('.item-paginator')
  });
});
```

## Methods

```
// You can update the number of items and force redrawing
itemPaginator.setItems(125);

// Navigate to page
itemPaginator.goToPage(2);
```

## Event callbacks

```
// On every page change, includinng page 1 initialization
itemPaginator.onChangePage = function () {
  console.log(this.current_page);
}

// Enter first page
itemPaginator.onFirstPage = function () {
  console.log('First page');
}

// Enter last page
itemPaginator.onLastPage = function () {
  console.log('First page');
}
```

## TO-DO
- Several instances
- Intensive testings
