/*
  Item paginator 0.02 beta
  2015 by Carlos Cabo

  var ip1 = new itemPaginator({
    items: 56,
    items_per_page: 7,
    container: $('#table-paginator')
  });
*/

var ItemPaginator = (function() {

  function Constructor(user_options) {

    // Settings
    this.set = {
      items: 0,
      pages: 0,
      offset: 0, // Useful
      limit: 0,  // Useful
      pages_to_show: 7,
      items_per_page: 0,
      items_last_page: 0,
      current_page: 0,
      container: null,
      text: {
        ellipsis: '…',
        next: 'Next',
        prev: 'Prev',
      },
      classes: {
        current: 'active',
        disabled: 'disabled',
        prev: 'prev',
        next: 'next',
        page: 'page-',
        paginator: 'item-paginator',
        ellipsis: 'ellipsis'
      },
      $html: null
    };

    this.set = $.extend(true, this.set, user_options);

    if (typeof(this.set.onChangePage) == "function") {
      this.onChangePage = this.set.onChangePage;
    }

    if (this.set.items === 0 || this.set.items_per_page === 0) {
      return false; // Bad settings, do nothing
    }

    if (!this.set.container instanceof jQuery) {
      this.set.container = $(this.set.container);
    }

    this.calculatePageCount();
  }

  Constructor.prototype = {

    calculatePageCount: function() {
      this.set.pages = parseInt(Math.floor(this.set.items / this.set.items_per_page), 10);
      if ( this.set.items > ( this.set.pages * this.set.items_per_page )) {
        this.set.pages++;
      }
      // If there is 1 page only, no need for paginator
      if (this.set.pages < 2) {
        this.destroy();
        return;
      }
      this.set.current_page = 1;
      this.createHTML();
    },

    /**
    * Crea el HTML y lo attachea
    */
    createHTML: function() {
      var
      that = this,
      // media
      media = Math.floor(this.set.pages_to_show / 2),
      // Restamos la primera
      loop_ini = this.set.current_page - media + 1,
      // Restamos la última
      loop_fin = this.set.current_page + media - 1;

      // Paginator container
      this.set.$html = $('<div>').addClass(this.set.classes.paginator);

      // Offset & limit
      this.set.offset = (this.set.current_page - 1) * this.set.items_per_page + 1;
      this.set.limit = this.set.items_per_page;

      // Create ellipsis
      if (this.set.classes.ellipsis !== false) {
        $ellipsis = $('<span>').addClass(this.set.classes.ellipsis).text(this.set.text.ellipsis);
      }

      // Prev
      if(this.set.text.prev !== false) {
        var $prev = $('<span>').addClass(this.set.classes.prev).html(this.set.text.prev);
        if (this.set.current_page < 2) {
          $prev.addClass(this.set.classes.disabled);
        } else {
          $prev.on('click', function(e) {
            e.preventDefault();
            var cp = that.set.current_page - 1;
            that.goToPage(cp);
          });
        }
        $prev.appendTo(this.set.$html);
      }

      // First page
      var $first = $('<a href="#page-1" class="page page-first page-1">1</a>');
      $first.appendTo(this.set.$html);

      // First ellipsis
      if (this.set.classes.ellipsis !== false && this.set.pages > this.set.pages_to_show) {
        if (this.set.current_page > media + 1) {
          $ellipsis.clone().appendTo(this.set.$html);
        }
      }

      // Rest of pages
      // Less pages than pages_to_show... no need of ellipsis, simple loop
      if (this.set.pages < this.set.pages_to_show) {
        for (var i = 2; i < this.set.pages; i++) {
          var $page = $('<a href="#page-'+i+'" class="page page-last page-'+i+'">'+i+'</a>');
          $page.appendTo(this.set.$html);
        }
      } else {

        // Esta cerca del principio
        if (this.set.current_page < this.set.pages_to_show - 2) {
          loop_ini = 2;
          loop_fin = this.set.pages_to_show - 1;
        }

        // Esta cerca del final
        if (this.set.current_page >= (this.set.pages - media)) {
          loop_ini = this.set.pages - this.set.pages_to_show + 2;
          loop_fin = this.set.pages - 1;
        }

        // Hay más elementos que elementos por página
        for (var i = loop_ini; i <= loop_fin; i++) {
          var $page = $('<a href="#page-'+i+'" class="page page-last page-'+i+'">'+i+'</a>');
          $page.appendTo(this.set.$html);
        }

      }

      // Final ellipsis
      if (this.set.classes.ellipsis !== false && this.set.pages > this.set.pages_to_show) {
        if (this.set.current_page < (this.set.pages - media)) {
          $ellipsis.appendTo(this.set.$html);
        }
      }

      // Last page
      var $last = $('<a href="#page-'+this.set.pages+'" class="page page-last page-'+this.set.pages+'">'+this.set.pages+'</a>');
      $last.appendTo(this.set.$html)

      // Add active class
      this.set.$html.find('a.page-'+this.set.current_page).addClass(this.set.classes.current);

      // Pages events
      this.set.$html.find('a.page').not('.'+this.set.classes.current).off('click').on('click', function(e) {
        e.preventDefault();
        that.goToPage(parseInt($(this).text(), 10));
      });

      // Next
      if(this.set.text.next !== false) {
        var $next = $('<span>').addClass(this.set.classes.next).html(this.set.text.next);
        if (this.set.current_page === this.set.pages) {
          $next.addClass(this.set.classes.disabled);
        } else {
          $next.on('click', function(e) {
            e.preventDefault();
            var cp = that.set.current_page + 1;
            that.goToPage(cp);
          });
        }
        $next.appendTo(this.set.$html);
      }

      // Append to DOM
      this.destroy('');
      this.set.$html.appendTo(this.set.container);

      // Fire events so they are called on first run also
      if (typeof(this.set.onChangePage) == "function") {
        this.set.onChangePage();
      }
      if (this.set.current_page === 1 && typeof(this.set.onFirstPage) == "function") {
        this.set.onFirstPage();
      }
      if (this.set.current_page === this.set.pages && typeof(this.set.onLastPage) == "function") {
        this.set.onLastPage();
      }
    },

    destroy: function() {
      this.set.container.html('');
      return;
    },

    setItems: function(items) {
      this.set.items = items;
      this.calculatePageCount();
    },

    getCurentPage: function() {
      return this.set.current_page;
    },

    getPages: function() {
      return this.set.pages;
    },

    goToPage: function(pagenum) {
      if (pagenum > this.set.pages) {
        pagenum = this.set.pages;
      }
      if ( pagenum > 0 && pagenum < this.set.pages + 1 ) {
        this.set.current_page = pagenum;
        this.createHTML();
      }
    },

    goToNext: function() {
      if (this.set.current_page < this.set.pages) {
        this.goToPage(this.set.current_page++);
      }
    },

    goToPrev: function() {
      if (this.set.current_page > 1) {
        this.goToPage(this.set.current_page--);
      }
    },

    // Events supposed to be assigned from outside
    // onChangePage: function () {
    //   console.log('Entered page: '+this.getCurentPage());
    // },

    // onFirstPage: function() {
    //   console.log('First page!');
    // },

    // onLastPage: function() {
    //   console.log('Last page!');
    // }

  } // Prototype

  return Constructor;

})();
