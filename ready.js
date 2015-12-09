$(document).ready(function(){
  //La magia aquí

  itemPaginator.onChangePage = function () {
    console.log('custom'+this.getCurentPage());
  };

  itemPaginator.init({
    items: 283,
    items_per_page: 7,
    container: $('.sample-paginator-1')
  });
});
