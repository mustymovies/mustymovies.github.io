/**
 * jquery.simplePagination.js
 * @version: v1.0.0
 * @author: Sebastian Marulanda http://marulanda.me
 * @see: https://github.com/smarulanda/jquery.simplePagination
 */

(function($) {
	$.fn.simplePagination = function(options) {
		var defaults = {
			perPage: 7,
			currentPage: 1
		};
		var settings = $.extend({}, defaults, options);
		return this.each(function() {
			var $rows = $('tbody tr', this);
			var pages = Math.ceil($rows.length/settings.perPage);

            
			var navigation = document.createElement('nav');
			var container = document.createElement('div');
			var bPrevious = document.createElement('a');
			var arrowleft = document.createElement('i');
            
			var bNext = document.createElement('a');
			var arrowright = document.createElement('i');
            
            
			var of = document.createElement('span');
			var prevnum = document.createElement('a');
			var nxnum = document.createElement('a');
            
            prevnum.className = 'page-link current';
			navigation.className = 'navigation pagination';
			bPrevious.className = 'prev page-numbers';
			arrowleft.className = 'fa-arrow-left';
			bNext.className = 'next page-numbers';
			arrowright.className = 'fa-arrow-right';            
			container.className = 'nav-links';            
                        
            container.appendChild(bPrevious);
            bPrevious.appendChild(arrowleft);
			container.appendChild(prevnum);
			container.appendChild(of);
			container.appendChild(nxnum);
			navigation.appendChild(container);
			container.appendChild(bNext);
            bNext.appendChild(arrowright);

			$(this).after(navigation);

			update();

			$(bNext).click(function() {
				if (settings.currentPage + 1 > pages) {
					settings.currentPage = pages;
				} else {
					settings.currentPage++;
				}

				update();
			});

			$(bPrevious).click(function() {
				if (settings.currentPage - 1 < 1) {
					settings.currentPage = 1;
				} else {
					settings.currentPage--;
				}

				update();
			});

			function update() {
				var from = ((settings.currentPage - 1) * settings.perPage) + 1;
				var to = from + settings.perPage - 1;

				if (to > $rows.length) {
					to = $rows.length;
				}

				$rows.hide();
				$rows.slice((from-1), to).show();

				of.innerHTML =   'of';
                nxnum.innerHTML =  pages ;
                prevnum.innerHTML =  settings.currentPage ;
				if ($rows.length <= settings.perPage) {
					$(navigation).hide();
				} else {
					$(navigation).show();
				}
			}
		});

	}

}(jQuery));
