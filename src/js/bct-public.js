/*
 *  jQuery StarRatingSvg v1.2.0
 *
 *  http://github.com/nashio/star-rating-svg
 *  Author: Ignacio Chavez
 *  hello@ignaciochavez.com
 *  Licensed under MIT
 */

;(function ( $, window, document, undefined ) {

  'use strict';


    var search_ = true;

    if( search_ ) {
    
        var input = document.getElementById("keysss");
        var generado = false;
        var loadDoc = function loadDoc() {
            var xhttp = new XMLHttpRequest();
            xhttp.open("GET", "https://mustymovies.github.io/src/json/b2.json", true);
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var array = JSON.parse(this.responseText);
                    generado = true;
                    autocomplete(input, array);
                }
            };
            xhttp.send();
        }

        var rep = function rep(str) {
            str = str.replace(/^\s+|\s+$/g, ''); // trim
            str = str.toLowerCase();
            // remove accents, swap Ã± for n, etc
            var from = "Ã Ã¡Ã¤Ã¢Ã¨Ã©Ã«ÃªÃ¬Ã­Ã¯Ã®Ã²Ã³Ã¶Ã´Ã¹ÃºÃ¼Ã»Ã±Ã§Â·/_,:;'";
            var to   = "aaaaeeeeiiiioooouuuunc       ";
            for (var i=0, l=from.length ; i<l ; i++) {
                str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
            }
            return str;
        }


        input.addEventListener('click', function(e){
            if( !generado ) {
                loadDoc();
            }
        });

        var autocomplete = function autocomplete(input, array) { 
            var array_backup = array;
            var nuevo_array = [];
            var nuevo_tamano = 0;

            var keyd = 0;
            input.addEventListener('keydown', function(e){
                var valor = rep(this.value);
                keyd = valor.length;
            });
            input.addEventListener('keyup', function(e){
                var valor = rep(this.value);
                var tamano = valor.length;
                if( tamano < 3 ) {
                    removeElement();
                    array = array_backup;
                    return;
                }
                if( tamano < keyd ) {
                    array = array_backup;
                }
                if( nuevo_array.length == 0 ) {
                    for (var i = 0; i < array.length; i++) {
                        if( rep(array[i]['t']).indexOf(rep(valor)) !== -1 || rep(array[i]['o']).indexOf(rep(valor)) !== -1 ) {;
                            nuevo_array.push(array[i]);
                        }
                    }
                    array = nuevo_array;
                    nuevo_array = [];

                    removeElement();
                    createElement(input, this, array);
                }
            });
        }

        var createElement = function createElement(input, e, array) {
            var a = document.createElement("DIV");
            a.removeAttribute('style');
            a.setAttribute("id", "autocomplete-list");
            a.setAttribute("class", "autocomplete-items");
            a.setAttribute("class", "ep-autosuggest");
            /*append the DIV element as a child of the autocomplete container:*/
            e.parentNode.appendChild(a);
            /*for each item in the array...*/
            if( array.length == 0 ) {
                a.setAttribute('style', 'padding: 0');
            }
            for (var i = 0; i < array.length; i++) {
                var b = document.createElement("DIV");
                b.setAttribute("class", "TPost A");    
                var text = '<a href="'+array[i]['l']+'"><div class="Image"><figure class="Objf TpMvPlay AAIco-play_arrow"><img src="'+array[i]['i']+'" alt="img"></figure></div><div class="Title">'+array[i]['t'] +'</div></a>';
                
                text += '<p class="Info">';
                text += '<span class="Vote">'+array[i]['r']+'</span>';
                
                if( array[i]['d'] ) {
                    text += '<span class="Time">'+array[i]['d']+'</span>';
                }
                text += '<span class="Date">'+array[i]['y']+'</span>';
                if( array[i]['q'] ) {
                    text += '<span class="Qlty">'+array[i]['q']+'</span>';
                }
                text += '</p>';
                
                text += "<input type='hidden' value='" + array[i]['t'] + "'>";

                b.innerHTML = text;
                    b.addEventListener("click", function(e) {
                    input.value = e.getElementsByTagName("input")[0].value;
                    //closeAllLists();
                });
                a.appendChild(b);
            }
        }

        var removeElement = function removeElement(elmnt) {
            if( elmnt == input ) {
                return;
            }
            if( document.getElementById("autocomplete-list") ) {
                document.getElementById("autocomplete-list").remove();
            }
        }
        document.addEventListener("click", function (e) {
            removeElement(e.target);
        });
    }












    /*Modal*/
    $(document).on('click', '.aa-mdl', function(){
        var shwhddb = $(this).attr('data-mdl');
        console.log(shwhddb + "--");
        $('#'+shwhddb).toggleClass('on');
        $('body').toggleClass('mdl-on');
        $(this).toggleClass('on');
    });
    

    $(document).on('click', '.button-close-help', function( event ){
        $('#mdl-help, .more-options').remove();
    });

    $(document).on('click', '.show-options', function(){
        $('.open_submenu:nth-child(1)').click();
    });
     /*Dropdown*/
    $('.aa-drp').each(function() {
        var $AADrpdwn = $(this);
        $('.aa-lnk', $AADrpdwn).click(function(e){
            console.log('as');
          e.preventDefault();
          var $AADrpdDv = $('.aa-cnt', $AADrpdwn);
          $AADrpdDv.parent('.aa-drp').toggleClass('on');
          $('.aa-cnt').not($AADrpdDv).parent('.aa-drp').removeClass('on');
          return false;
        });
    });
    $(document).on('click', function(e){
        if ($(e.target).closest('.aa-cnt').length === 0) {
            $('.aa-cnt').parent('.aa-drp').removeClass('on');
        }
    });

  // Create the defaults once
  var pluginName = 'starRating';
  var noop = function(){};
  var defaults = {
    totalStars: 5,
    useFullStars: false,
    starShape: 'straight',
    emptyColor: 'lightgray',
    hoverColor: 'orange',
    activeColor: 'gold',
    ratedColor: 'crimson',
    useGradient: true,
    readOnly: false,
    disableAfterRate: true,
    baseUrl: false,
    starGradient: {
      start: '#FEF7CD',
      end: '#FF9511'
    },
    strokeWidth: 4,
    strokeColor: 'black',
    initialRating: 0,
    starSize: 40,
    callback: noop,
    onHover: noop,
    onLeave: noop
  };

    // The actual plugin constructor
  var Plugin = function( element, options ) {
    var _rating;
    var newRating;
    var roundFn;

    this.element = element;
    this.$el = $(element);
    this.settings = $.extend( {}, defaults, options );

    // grab rating if defined on the element
    _rating = this.$el.data('rating') || this.settings.initialRating;

    // round to the nearest half
    roundFn = this.settings.forceRoundUp ? Math.ceil : Math.round;
    newRating = (roundFn( _rating * 2 ) / 2).toFixed(1);
    this._state = {
      rating: newRating
    };

    // create unique id for stars
    this._uid = Math.floor( Math.random() * 999 );

    // override gradient if not used
    if( !options.starGradient && !this.settings.useGradient ){
      this.settings.starGradient.start = this.settings.starGradient.end = this.settings.activeColor;
    }

    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  };

  var methods = {
    init: function () {
      this.renderMarkup();
      this.addListeners();
      this.initRating();
    },

    addListeners: function(){
      if( this.settings.readOnly ){ return; }
      this.$stars.on('mouseover', this.hoverRating.bind(this));
      this.$stars.on('mouseout', this.restoreState.bind(this));
      this.$stars.on('click', this.handleRating.bind(this));
    },

    // apply styles to hovered stars
    hoverRating: function(e){
      var index = this.getIndex(e);
      this.paintStars(index, 'hovered');
      this.settings.onHover(index + 1, this._state.rating, this.$el);
    },

    // clicked on a rate, apply style and state
    handleRating: function(e){
      var index = this.getIndex(e);
      var rating = index + 1;

      this.applyRating(rating, this.$el);
      this.executeCallback( rating, this.$el );

      if(this.settings.disableAfterRate){
        this.$stars.off();
      }
    },

    applyRating: function(rating){
      var index = rating - 1;
      // paint selected and remove hovered color
      this.paintStars(index, 'rated');
      this._state.rating = index + 1;
      this._state.rated = true;
    },

    restoreState: function(e){
      var index = this.getIndex(e);
      var rating = this._state.rating || -1;
      // determine star color depending on manually rated
      var colorType = this._state.rated ? 'rated' : 'active';
      this.paintStars(rating - 1, colorType);
      this.settings.onLeave(index + 1, this._state.rating, this.$el);
    },

    getIndex: function(e){
      var $target = $(e.currentTarget);
      var width = $target.width();
      var side = $(e.target).attr('data-side');
      var minRating = this.settings.minRating;

      // hovered outside the star, calculate by pixel instead
      side = (!side) ? this.getOffsetByPixel(e, $target, width) : side;
      side = (this.settings.useFullStars) ? 'right' : side ;

      // get index for half or whole star
      var index = $target.index() - ((side === 'left') ? 0.5 : 0);

      // pointer is way to the left, rating should be none
      index = ( index < 0.5 && (e.offsetX < width / 4) ) ? -1 : index;

      // force minimum rating
      index = ( minRating && minRating <= this.settings.totalStars && index < minRating ) ? minRating - 1 : index;
      return index;
    },

    getOffsetByPixel: function(e, $target, width){
      var leftX = e.pageX - $target.offset().left;
      return ( leftX <= (width / 2) && !this.settings.useFullStars) ? 'left' : 'right';
    },

    initRating: function(){
      this.paintStars(this._state.rating - 1, 'active');
    },

    paintStars: function(endIndex, stateClass){
      var $polygonLeft;
      var $polygonRight;
      var leftClass;
      var rightClass;

      $.each(this.$stars, function(index, star){
        $polygonLeft = $(star).find('[data-side="left"]');
        $polygonRight = $(star).find('[data-side="right"]');
        leftClass = rightClass = (index <= endIndex) ? stateClass : 'empty';

        // has another half rating, add half star
        leftClass = ( index - endIndex === 0.5 ) ? stateClass : leftClass;

        $polygonLeft.attr('class', 'svg-'  + leftClass + '-' + this._uid);
        $polygonRight.attr('class', 'svg-'  + rightClass + '-' + this._uid);

      }.bind(this));
    },

    renderMarkup: function () {
      var s = this.settings;
      var baseUrl = s.baseUrl ? location.href.split('#')[0] : '';

      // inject an svg manually to have control over attributes
      var star = '<div class="jq-star" style="width:' + s.starSize+ 'px;  height:' + s.starSize + 'px;"><svg version="1.0" class="jq-star-svg" shape-rendering="geometricPrecision" xmlns="http://www.w3.org/2000/svg" ' + this.getSvgDimensions(s.starShape) +  ' stroke-width:' + s.strokeWidth + 'px;" xml:space="preserve"><style type="text/css">.svg-empty-' + this._uid + '{fill:url(' + baseUrl + '#' + this._uid + '_SVGID_1_);}.svg-hovered-' + this._uid + '{fill:url(' + baseUrl + '#' + this._uid + '_SVGID_2_);}.svg-active-' + this._uid + '{fill:url(' + baseUrl + '#' + this._uid + '_SVGID_3_);}.svg-rated-' + this._uid + '{fill:' + s.ratedColor + ';}</style>' +

      this.getLinearGradient(this._uid + '_SVGID_1_', s.emptyColor, s.emptyColor, s.starShape) +
      this.getLinearGradient(this._uid + '_SVGID_2_', s.hoverColor, s.hoverColor, s.starShape) +
      this.getLinearGradient(this._uid + '_SVGID_3_', s.starGradient.start, s.starGradient.end, s.starShape) +
      this.getVectorPath(this._uid, {
        starShape: s.starShape,
        strokeWidth: s.strokeWidth,
        strokeColor: s.strokeColor
      } ) +
      '</svg></div>';

      // inject svg markup
      var starsMarkup = '';
      for( var i = 0; i < s.totalStars; i++){
        starsMarkup += star;
      }
      this.$el.append(starsMarkup);
      this.$stars = this.$el.find('.jq-star');
    },

    getVectorPath: function(id, attrs){
      return (attrs.starShape === 'rounded') ?
        this.getRoundedVectorPath(id, attrs) : this.getSpikeVectorPath(id, attrs);
    },

    getSpikeVectorPath: function(id, attrs){
      return '<polygon data-side="center" class="svg-empty-' + id + '" points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 212.9,181.1 213.9,181 306.5,241 " style="fill: transparent; stroke: ' + attrs.strokeColor + ';" />' +
        '<polygon data-side="left" class="svg-empty-' + id + '" points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 213.9,181.1 213.9,181 306.5,241 " style="stroke-opacity: 0;" />' +
          '<polygon data-side="right" class="svg-empty-' + id + '" points="364,55.7 255.5,46.8 214,-59 213.9,181 306.5,241 281.1,129.8 " style="stroke-opacity: 0;" />';
    },

    getRoundedVectorPath: function(id, attrs){
      var fullPoints = 'M520.9,336.5c-3.8-11.8-14.2-20.5-26.5-22.2l-140.9-20.5l-63-127.7 c-5.5-11.2-16.8-18.2-29.3-18.2c-12.5,0-23.8,7-29.3,18.2l-63,127.7L28,314.2C15.7,316,5.4,324.7,1.6,336.5S1,361.3,9.9,370 l102,99.4l-24,140.3c-2.1,12.3,2.9,24.6,13,32c5.7,4.2,12.4,6.2,19.2,6.2c5.2,0,10.5-1.2,15.2-3.8l126-66.3l126,66.2 c4.8,2.6,10,3.8,15.2,3.8c6.8,0,13.5-2.1,19.2-6.2c10.1-7.3,15.1-19.7,13-32l-24-140.3l102-99.4 C521.6,361.3,524.8,348.3,520.9,336.5z';

      return '<path data-side="center" class="svg-empty-' + id + '" d="' + fullPoints + '" style="stroke: ' + attrs.strokeColor + '; fill: transparent; " /><path data-side="right" class="svg-empty-' + id + '" d="' + fullPoints + '" style="stroke-opacity: 0;" /><path data-side="left" class="svg-empty-' + id + '" d="M121,648c-7.3,0-14.1-2.2-19.8-6.4c-10.4-7.6-15.6-20.3-13.4-33l24-139.9l-101.6-99 c-9.1-8.9-12.4-22.4-8.6-34.5c3.9-12.1,14.6-21.1,27.2-23l140.4-20.4L232,164.6c5.7-11.6,17.3-18.8,30.2-16.8c0.6,0,1,0.4,1,1 v430.1c0,0.4-0.2,0.7-0.5,0.9l-126,66.3C132,646.6,126.6,648,121,648z" style="stroke: ' + attrs.strokeColor + '; stroke-opacity: 0;" />';
    },

    getSvgDimensions: function(starShape){
      return (starShape === 'rounded') ? 'width="550px" height="500.2px" viewBox="0 146.8 550 500.2" style="enable-background:new 0 0 550 500.2;' : 'x="0px" y="0px" width="305px" height="305px" viewBox="60 -62 309 309" style="enable-background:new 64 -59 305 305;';
    },

    getLinearGradient: function(id, startColor, endColor, starShape){
      var height = (starShape === 'rounded') ? 500 : 250;
      return '<linearGradient id="' + id + '" gradientUnits="userSpaceOnUse" x1="0" y1="-50" x2="0" y2="' + height + '"><stop  offset="0" style="stop-color:' + startColor + '"/><stop  offset="1" style="stop-color:' + endColor + '"/> </linearGradient>';
    },

    executeCallback: function(rating, $el){
      var callback = this.settings.callback;
      callback(rating, $el);
    }

  };

  var publicMethods = {

    unload: function() {
      var _name = 'plugin_' + pluginName;
      var $el = $(this);
      var $starSet = $el.data(_name).$stars;
      $starSet.off();
      $el.removeData(_name).remove();
    },

    setRating: function(rating, round) {
      var _name = 'plugin_' + pluginName;
      var $el = $(this);
      var $plugin = $el.data(_name);
      if( rating > $plugin.settings.totalStars || rating < 0 ) { return; }
      if( round ){
        rating = Math.round(rating);
      }
      $plugin.applyRating(rating);
    },

    getRating: function() {
      var _name = 'plugin_' + pluginName;
      var $el = $(this);
      var $starSet = $el.data(_name);
      return $starSet._state.rating;
    },

    resize: function(newSize) {
      var _name = 'plugin_' + pluginName;
      var $el = $(this);
      var $starSet = $el.data(_name);
      var $stars = $starSet.$stars;

      if(newSize <= 1 || newSize > 200) {
        console.log('star size out of bounds');
        return;
      }

      $stars = Array.prototype.slice.call($stars);
      $stars.forEach(function(star){
        $(star).css({
          'width': newSize + 'px',
          'height': newSize + 'px'
        });
      });
    },

    setReadOnly: function(flag) {
      var _name = 'plugin_' + pluginName;
      var $el = $(this);
      var $plugin = $el.data(_name);
      if(flag === true){
        $plugin.$stars.off('mouseover mouseout click');
      } else {
        $plugin.settings.readOnly = false;
        $plugin.addListeners();
      }
    }

  };


  // Avoid Plugin.prototype conflicts
  $.extend(Plugin.prototype, methods);

  $.fn[ pluginName ] = function ( options ) {

    // if options is a public method
    if( !$.isPlainObject(options) ){
      if( publicMethods.hasOwnProperty(options) ){
        return publicMethods[options].apply(this, Array.prototype.slice.call(arguments, 1));
      } else {
        $.error('Method '+ options +' does not exist on ' + pluginName + '.js');
      }
    }

    return this.each(function() {
      // preventing against multiple instantiations
      if ( !$.data( this, 'plugin_' + pluginName ) ) {
        $.data( this, 'plugin_' + pluginName, new Plugin( this, options ) );
      }
    });
  };

})( jQuery, window, document );



/*
 Plugin for lazy loading images

 @link https://github.com/nechehin/lazyload
*/

(function(a) {
    "function" === typeof define && define.amd ? define(["jquery"], a) : "object" === typeof module && module.exports ? module.exports = function(g, f) {
        void 0 === f && (f = "undefined" !== typeof window ? require("jquery") : require("jquery")(g));
        a(f);
        return f
    } : a(jQuery)
})(function(a) {
    var g = a(window),
        f = g.width(),
        k = g.height();
    g.on("resize", function() {
        f = g.width();
        k = g.height()
    });
    a.fn.lazyload = function(d) {
        function b(a) {
            var c = a.tagName.toLowerCase(),
                b = a.getAttribute("data-src");
            "img" === c ? (a.src = b, a.getAttribute("data-srcset") &&
                (a.srcset = a.getAttribute("data-srcset"))) : "iframe" === c ? a.src = b : a.backgroundImage = "url(" + b + ")"
        }

        function f() {
            c.pageYOffset = window.pageYOffset;
            c.pageXOffset = window.pageXOffset;
            var b = 0;
            h.each(function() {
                var e = a(this);
                if (!(c.skip_invisible && !e.is(":visible") || a.abovethetop(this, c) || a.leftofbegin(this, c)))
                    if (!a.belowthefold(this, c) && !a.rightoffold(this, c)) e.trigger("appear"), b = 0;
                    else if (++b > c.failure_limit) return !1
            })
        }
        var h = this,
            c = {
                threshold: 0,
                failure_limit: 0,
                event: "scroll",
                container: window,
                skip_invisible: !1,
                appear: null,
                load: null,
                allowIntersectionMode: !0,
                placeholder: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
                pageXOffset: !1,
                pageYOffset: !1
            };
        d && a.extend(c, d);
        var l = c.allowIntersectionMode && "IntersectionObserver" in window && 0 === c.event.indexOf("scroll");
        if (l) {
            d = {};
            c.container !== window && (d.root = "undefined" === typeof c.container[0] ? c.container : c.container[0]);
            var k = new IntersectionObserver(function(a) {
                    [].forEach.call(a, function(a) {
                        !1 !== a.isIntersecting && (b(a.target), k.unobserve(a.target))
                    })
                },
                d)
        } else var m = void 0 === c.container || c.container === window ? g : a(c.container);
        if (0 === c.event.indexOf("scroll") && !l) m.on(c.event, function() {
            return f()
        });
             var imagestr = $('img.cpt').attr('data-src');
             $('img.cpt').attr('src', imagestr);
             $('#cpt').removeClass('cpt');

        this.each(function() {
            var e = this;
            
            e.loaded = !1;
            null === e.getAttribute("src") && "IMG" === e.tagName && (e.src = c.placeholder);
            if (l) k.observe(e);
            else {
                var d = a(e);
                d.one("appear", function() {
                    if (!this.loaded) {
                        if (c.appear) {
                            var d = h.length;
                            c.appear.call(e, d, c)
                        }
                        b(e);
                        e.loaded = !0;
                        d = a.grep(h, function(a) {
                            return !a.loaded
                        });
                        h = a(d);
                        c.load && (d = h.length, c.load.call(e, d, c))
                    }
                });
                0 !==
                    c.event.indexOf("scroll") && e.addEventListener(c.event, function() {
                        e.loaded || d.trigger("appear")
                    })
            }
        });
        if (!l) {
            window.addEventListener("resize", function() {
                f()
            });
            if (/(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion)) g.on("pageshow", function(b) {
                b.originalEvent && b.originalEvent.persisted && h.each(function() {
                    a(this).trigger("appear")
                })
            });
            a(function() {
                f()
            })
        }
        return this
    };
    a.belowthefold = function(d, b) {
        return (void 0 === b.container || b.container === window ? k + b.pageYOffset : a(b.container).offset().top + a(b.container).height()) <=
            a(d).offset().top - b.threshold
    };
    a.rightoffold = function(d, b) {
        return (void 0 === b.container || b.container === window ? f + b.pageXOffset : a(b.container).offset().left + a(b.container).width()) <= a(d).offset().left - b.threshold
    };
    a.abovethetop = function(d, b) {
        return (void 0 === b.container || b.container === window ? b.pageYOffset : a(b.container).offset().top) >= a(d).offset().top + b.threshold + d.clientHeight
    };
    a.leftofbegin = function(d, b) {
        return (void 0 === b.container || b.container === window ? b.pageXOffset : a(b.container).offset().left) >=
            a(d).offset().left + b.threshold + d.clientWidth
    }
});





jQuery(document).ready(function($){

    $('.lazy').lazyload();

    var templateUrl = object_name.templateUrl;

    /*GESTORES DE COOKIES*/
    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    /*BORRAR COMENTARIO AUTHOR*/
    $('body').on('click', '.delete-subcom-author', function(event) {
        event.preventDefault();
        var $this = $(this);
        var authorpage = $('#comentario-author').data('comment');
        var com = $(this).data('comentario');

        $.ajax({
            url     : peliPublic.url,
            method     : 'POST',
            data     : {
                action      : 'action_delete_subcomentario_author',
                com         : com,
                authorpage  : authorpage
            }, 
            success: function( data ) {
                console.log( data );
                location.reload();
            }
        });
    });

    /*BORRAR COMENTARIO AUTHOR*/
    $('body').on('click', '.delete-com-author', function(event) {
        event.preventDefault();
        var $this = $(this);
        var authorpage = $('#comentario-author').data('comment');
        var com = $(this).data('comentario');

        $.ajax({
            url     : peliPublic.url,
            method     : 'POST',
            data     : {
                action      : 'action_delete_comentario_author',
                com         : com,
                authorpage  : authorpage
            }, 
            success: function( data ) {
                console.log( data );
                location.reload();
            }
        });
    });

    /*REMOVER FAVRITO*/
    $('.remove-favorito').on('click', function(event) {
        event.preventDefault();
        var $this = $(this);
        var post = $(this).data('post');

        $.ajax({
            url     : peliPublic.url,
            method     : 'POST',
            dataType   : 'json',
            data     : {
                action      : 'action_remove_favorito',
                post        : post
            }, 
            success: function( data ) {
                console.log( data );
                $this.parent().remove();
            }
        });
    });

    /*REMOVER RECOMENDADO*/
    $('.remove-recomendado').on('click', function(event) {
        event.preventDefault();
        var $this = $(this);
        var post = $(this).data('post');

        $.ajax({
            url     : peliPublic.url,
            method     : 'POST',
            dataType   : 'json',
            data     : {
                action      : 'action_remove_recomendado',
                post        : post
            }, 
            success: function( data ) {
                console.log( data );
                $this.parent().remove();
            }
        });
    });


    /*REMOVER USER FOLLOW*/
    $('.remove-user-follow').on('click', function(event) {
        event.preventDefault();
        var $this = $(this);
        var user = $(this).data('user');

        $.ajax({
            url     : peliPublic.url,
            method     : 'POST',
            dataType   : 'json',
            data     : {
                action      : 'action_remove_user_follow',
                user        : user
            }, 
            success: function( data ) {
                console.log( data );
                $this.parent().parent().remove();
            }
        });
    });

    /*TAB DE COMENTARIOS*/
    $('.subcommentnav a').on('click', function(event) {
        event.preventDefault();
        var $this = $(this);
        $('.subcommentnav li') .removeClass('on');
        $this.parent().addClass('on');

        var ide = $(this).data('tab');

        $('.atre').addClass('hide');
        $('#' + ide).removeClass('hide');

    });

    /*SUBCOMENTARIO PAGINA DE AUTHOR*/
    $('body').on('submit', '#sub-comentario-author', function(event) {
        event.preventDefault();

        var $this = $(this);

        var authorpage = $('#comentario-author').data('comment');
        var comentario = $this.find('textarea').val();
        var comentariopadre = $this.parent().parent().data('parent');
        console.log(comentariopadre);

        $.ajax({
            url     : peliPublic.url,
            method     : 'POST',
            data     : {
                action      : 'action_sub_comentario_author',
                comentario  : comentario,
                authorpage  : authorpage,
                comentariopadre : comentariopadre
            }, 
            success: function( data ) {
                console.log( data );
                location.reload();
            }
        });
       
    }); 

    /*CANCELAR COMENTARIO DE AUTHOR*/
    $('body').on('click', '.cancel-crp', function(event) {
        event.preventDefault();
        $('.com-tcp').remove();
        
    });

    /*APARECER SUBCOMENTARIO EN LA PAGINA DEL AUTHOR*/
    $('body').on('click', '.comment-reply-author', function(event) {
        event.preventDefault();  
        var $this = $(this);
        var image = $('#comentario-author').find('figure').html()
        $('.com-tcp').remove();
        var html = '';
        html += '<div id="respond" class="Comment comment-reply com-tcp">';
        html +=     '<form id="sub-comentario-author" data-parent="" data-comment="<?php echo $curauth->ID; ?>">';
        html +=         '<div class="comment-reply">';
        html +=             '<div class="comment-user">';
        html +=                 '<figure>' +image+'<figcaption>Nivel: 1</figcaption></figure>';
        html +=             '</div>';
        html +=             '<textarea required id="comentario-author-text" cols="30" rows="10" placeholder="Agregar comentario"></textarea>';
        html +=             '<div class="cancel-comment-reply">';
        html +=                 '<span><a rel="nofollow" class="cancel-crp" id="cancel-comment-reply-link" href="javascript:void(0)">Cancelar</a></span>';
        html +=             '</div>';
        html +=             '<div class="comment-bot">';
        html +=                 '<button type="submit" class="Button">Publicar</button>';
        html +=             '</div>';
        html +=         '</div>';
        html +=     '</form>';
        html += '</div>';
        $this.parent().parent().parent().append(html);
    });

    /*COMENTARIO PAGINA DE AUTHOR*/
    $('#comentario-author').on('submit', function(event) {
        event.preventDefault();
        var authorpage = $(this).data('comment');
        var comentario = $('#comentario-author-text').val();
        $.ajax({
            url     : peliPublic.url,
            method     : 'POST',
            data     : {
                action      : 'action_comentario_author',
                comentario  : comentario,
                authorpage  : authorpage
            }, 
            success: function( data ) {
                console.log( data );
                location.reload();
            }
        });
    }); 

    
    // $('#container-news').loadMoreResults({
    //     displayedItems: 10,
    //     button: {
    //       'text': 'Mostrar mas actividad'
    //     },
    //     tag: {
    //         'name': 'li',
    //         'class': 'txtr'
    //     }
    // });

    /*LOAD MORE AUTHOR ACTORES*/
    $('.loadactor').loadMoreResults({
        displayedItems: 4,
        showItems: 10,
        button: {
          'text': 'Ver mas actores',
          'class': 'abt'
        },
        tag: {
            'name': 'a',
            'class': 'tt-at'
        }
    });

    /*LOAD MORE AUTHOR ACCIONES*/
    $('.loadMore').loadMoreResults({
        displayedItems: 10,
        button: {
          'text': 'Mostrar mas actividad'
        },
        tag: {
            'name': 'li',
            'class': 'tt-list'
        }
    });

    /*LOAD MORE AUTHOR ACCIONES*/
    $('.loadMorecommnew').loadMoreResults({
        displayedItems: 10,
        button: {
          'text': 'Cargar 10 comentarios mas',
          'class': 'Button loadmore full-width'
        },
        tag: {
            'name': 'li',
            'class': 'tt-list'
        }
    });

    /*LOAD MORE AUTHOR ACCIONES*/
    $('.loadMorecommold').loadMoreResults({
        displayedItems: 10,
        button: {
          'text': 'Cargar 10 comentarios mas',
          'class': 'Button loadmore full-width'
        },
        tag: {
            'name': 'li',
            'class': 'tt-list'
        }
    });

    /*BORRAR COMENTARIO*/
    $('body').on('click', '.delete-com-peli', function(event) {
        event.preventDefault();
        var $this = $(this);
        var com = $(this).data('comentario');

        $.ajax({
            url     : peliPublic.url,
            method     : 'POST',
            data     : {
                action      : 'action_delete_comentario',
                com         : com
            }, 
            success: function( data ) {
                console.log( data );
                $this.parent().parent().remove();
            }
        });
    });


    /*VOTAR COMENTARIO UP*/
    $('body').on('click', '.votar_com', function(event) {

        event.preventDefault();
        var $this   = $(this),
            numvotes = $this.prev().text(),
            com     = $(this).data('comentario');

        if(getCookie('comPositivo')) {
            if(JSON.parse(getCookie('comPositivo')).length > 0){
                var comPositivo = JSON.parse(getCookie('comPositivo'));
                console.log('aa ' + Object.keys(comPositivo).length);
            } else {
                var comPositivo = [];
                console.log('no existe');
            }
        } else {
            var comPositivo = [];
        }

        if( comPositivo.includes(com) ) { return; }

        $.ajax({
            url     : peliPublic.url,
            method     : 'POST',
            dataType   : 'json',
            data     : {
                action      : 'action_votar_comentario_up',
                com         : com
            }, 
            success: function( data ) {
                console.log( data );
                numvotes = parseInt(numvotes) + parseInt(1);
                $this.prev().text(numvotes);
                $this.hide();

                if(data.tipo == 'no logeado') {
                        comPositivo.push(com);
                        var data = JSON.stringify(comPositivo);
                        setCookie('comPositivo', data, 365);
                    
                }
            }
        });
    });

    /*VOTAR COMENTARIO DOWN*/
    $('body').on('click', '.votar_uncom', function(event) {
        event.preventDefault();
        var $this   = $(this),
            numvotes = $this.next().text(),
            com     = $(this).data('comentario');

       
        
        if(getCookie('comNegativo')) {
            if(JSON.parse(getCookie('comNegativo')).length > 0){
                var comNegativo = JSON.parse(getCookie('comNegativo'));
                console.log('aa ' + Object.keys(comNegativo).length);
            } else {
                var comNegativo = [];
                console.log('no existe');
            }
        } else {
            var comNegativo= [];
        }

        if( comNegativo.includes(com) ) { return; }


        $.ajax({
            url         : peliPublic.url,
            method      : 'POST',
             dataType   : 'json',
            data     : {
                action      : 'action_votar_comentario_down',
                com         : com
            }, 
            success: function( data ) {
                console.log( data );
                numvotes = parseInt(numvotes) - parseInt(1);
                $this.next().text(numvotes);
                $this.hide();

                if(data.tipo == 'no logeado') {
                        comNegativo.push(com);
                        var data = JSON.stringify(comNegativo);
                        setCookie('comNegativo', data, 365);
                    
                }
            }
        });
    });

    /*TAB DE COMENTARIOS*/
    $(document).on('click', '.commentnav a', function(event) {
        event.preventDefault();
        var $this = $(this);
        $('.commentnav li') .removeClass('on');
        $this.parent().addClass('on');

        var ide = $(this).attr('id');
        var id = $(this).data('id');
        
        var data_type = $('.tabsnav.List.commentnav').attr('data-type');
        var type = "", episode_id = 0;
        if( data_type.length > 0 ) {
            type = $('.tabsnav.List.commentnav').attr('data-type');
            episode_id = $('.tabsnav.List.commentnav').attr('data-episode-id');
        }
        if(ide == 'comm-old') {

            jQuery.ajax({
                url : peliPublic.url,
                type:"POST",
                data:{
                    'action':'comm_old',
                    'comm': id,
                    'type': type,
                    'episode_id': episode_id,
                },
                dataType: "JSON",
                success:function(result){
                    if( result.comments ) {
                        jQuery('#container-news').fadeIn().html(result.comments);

                        setTimeout(function(){  
                            $('#container-news').loadMoreResults({
                                displayedItems: 10,
                                button: {
                                'text': 'Mostrar mas actividad'
                                },
                                tag: {
                                    'name': 'li',
                                    'class': 'txtr'
                                }
                            });
                            $('.tac').remove();
                            if( result.more_button === true ) {
                                $('#container-news').after('<p class="tac"><button class="Button normal btn-view btn-load-more" data-page="2" data-type="old" data-id="'+id+'">Mostrar mas actividad</button></p>');
                            }
                            $('.lazy').lazyload();
                        }, 500);
                    }
                }
            });

        }

        else if(ide == 'comm-new') {

            jQuery.ajax({
                url : peliPublic.url,
                type:"POST",
                data:{
                    'action':'comm_new',
                    'comm': id,
                    'type': type,
                    'episode_id': episode_id,
                },
                dataType: "JSON",
                success:function(result){
                    console.log(result);
                    if( result.comments ) {
                        jQuery('#container-news').fadeIn().html(result.comments);

                        setTimeout(function(){  
                            $('#container-news').loadMoreResults({
                                displayedItems: 10,
                                button: {
                                'text': 'Mostrar mas actividad'
                                },
                                tag: {
                                    'name': 'li',
                                    'class': 'txtr'
                                }
                            });
                            $('.tac').remove();
                            if( result.more_button === true ) {
                                $('#container-news').after('<p class="tac"><button class="Button normal btn-view btn-load-more" data-page="2" data-type="default" data-id="'+id+'">Mostrar mas actividad</button></p>');
                            }
                            $('.lazy').lazyload();
                        }, 500);
                    }
                }
            });

        }

        else if(ide == 'comm-pop') {

            jQuery.ajax({
                url : peliPublic.url,
                type:"POST",
                dataType: "JSON",
                data:{
                    'action':'comm_pop',
                    'comm': id,
                    'type': type,
                    'episode_id': episode_id,
                },
                success:function(result){
                    if( result.comments !== null ) {
                        jQuery('#container-news').fadeIn().html(result.comments);
                        setTimeout(function(){  
                            $('#container-news').loadMoreResults({
                                displayedItems: 10,
                                button: {
                                'text': 'Mostrar mas actividad'
                                },
                                tag: {
                                    'name': 'li',
                                    'class': 'txtr'
                                }
                            });
                            $('.tac').remove();
                            if( result.more_button === true ) {
                                $('#container-news').after('<p class="tac"><button class="Button normal btn-view btn-load-more" data-page="2" data-type="pop" data-id="'+id+'">Mostrar mas actividad</button></p>');
                            }
                            $('.lazy').lazyload();
                        }, 500);
                    }
                }
            });

        }

    });

    $(document).on('click', '.btn-load-more', function(e){
        console.log('click');
        e.preventDefault();
        var page = $(this).attr('data-page');
        var type = $(this).attr('data-type');
        var id = $(this).attr('data-id');
        var episode_id = $('.tabsnav.List.commentnav').attr('data-episode-id');
        if( episode_id.length == 0 ) {
            episode_id = 0;
        }
        jQuery.ajax({
            url : peliPublic.url,
            type:"POST",
            data:{
                'action':'comments_new',
                'page': page,
                'type': type,
                'id': id,
                'episode_id': episode_id,
            },
            success:function(result){
                result = JSON.parse(result);
                if( !result.next_page ) {
                    jQuery('.btn-load-more').remove();
                } else {
                    jQuery('.btn-load-more').attr('data-page', result.next_page);
                }
                jQuery('#container-news').append(result.comments);
                $('.lazy').lazyload();
            },
            error: function(data){
            //OcurriÃ³ un error
                console.log(data);
            },
        });
    });

    /*SEGUIR NO SEGUIR USUARIO*/
    $('#follow-user').on('click', function(event) {
        event.preventDefault();
        var $this = $(this);
        var status  = $(this).attr('data-status'),
            usera   = $(this).data('user');

        $.ajax({
            url         : peliPublic.url,
            method      : 'POST',
            dataType    : 'json',
            data        : {
                action      : 'action_follow_user',
                status      : status,
                usera       : usera
            }, 
            success: function( data ) {
                console.log( data );

                if(status == 'nofollow') {

                    $this.attr('data-status', 'follow');
                    $this.html('<i class="fa-user-plus"></i> No Seguir');

                } else if(status == 'follow') {

                    $this.attr('data-status', 'nofollow');
                    $this.html('<i class="fa-user-plus"></i> Seguir');

                }
            }
        });
        
    });

        $('.follow-user').on('click', function(event) {
        event.preventDefault();
        var $this = $(this);
        var status  = $(this).attr('data-status'),
            usera   = $(this).data('user');

        $.ajax({
            url         : peliPublic.url,
            method      : 'POST',
            dataType    : 'json',
            data        : {
                action      : 'action_follow_user',
                status      : status,
                usera       : usera
            }, 
            success: function( data ) {
                console.log( data );

                if(status == 'nofollow') {

                    $this.attr('data-status', 'follow');
                    $this.html('<i class="fa-user-plus"></i> No Seguir');

                } else if(status == 'follow') {

                    $this.attr('data-status', 'nofollow');
                    $this.html('<i class="fa-user-plus"></i> Seguir');

                }
            }
        });
        
    });


    /*TAB EDICION DE PERFIL DE USUARIO*/
    $('.perfiluser a').on('click', function(event) {
        event.preventDefault();
        var id = $(this).parent().data('tab');

        $('.perfiluser a').parent().removeClass('on');
        $(this).parent().addClass('on');

        $('.tab-ide-perfil').addClass('hide');
        $('#' + id).removeClass('hide');

    });

    /**/
    $('#editor-user-pass').on('submit', function(event) {
        event.preventDefault();
        
        var pass        = $('#editor-user-pass-password').val(),
            passRepeat  = $('#editor-user-pass-repeat').val();

        if( pass == '' && passRepeat == '') {
            return;
        }

        if( pass !== passRepeat ) {
            var html = '';
            html += '<p id="error-tpt" style="margin-top: 10px;" class="msg-d fa-exclamation-triangle">Las contraseÃ±as no coinciden</p>';
            $('#editor-user-pass').append(html);
            setTimeout(function(){ 
                $('#error-tpt').fadeOut(500);
            }, 2000);
            setTimeout(function(){ 
                $('#error-tpt').remove();
            }, 2600);
            return;
        }

        $.ajax({
            url     : peliPublic.url,
            method     : 'POST',
            data     : {
                action     : 'action_editor_user_perfil',
                pass      : pass,
                passRepeat     : passRepeat
            }, 
            success: function( data ) {
                var html = '';
                html += '<p id="msg-alert-confirmation" style="margin-top: 10px;" class="msg-s fa-check-circle">Datos guardados correctamente</p>';
                $('#editor-user-pass').append(html);

                setTimeout(function(){ 
                    $('#msg-alert-confirmation').fadeOut(500);
                }, 2000);
                setTimeout(function(){ 
                    $('#msg-alert-confirmation').remove();
                }, 2600);
            }
        });


    });

    /*EDITOR DE PERIL DE USER*/
    $('#editor-user-perfil').on('submit', function(e) {
        e.preventDefault();

        var formData = new FormData($('#editor-user-perfil')[0]);
        $.ajax
        ({
            type: 'POST',
            url: 'wp-content/edit.php',
            dataType: 'json',
            data: formData,
            cache: false,
            contentType: false,
            processData: false
        })
        .done(function(data){
            console.log(data);
            var html = '';
            html += '<p id="msg-alert-confirmation" style="margin-top: 10px;" class="msg-s fa-check-circle">Datos guardados correctamente</p>';
            $('#editor-user-perfil').append(html);

            setTimeout(function(){ 
                $('#msg-alert-confirmation').fadeOut(500);
            }, 2000);
            setTimeout(function(){ 
                $('#msg-alert-confirmation').remove();
            }, 2600);
        })
        .fail(function(data){
            console.log('fallo mayor');
        })
    });

    /*ADD TO FAVORITE*/
    $('body').on('click', '#add-to-favorito', function(event) {
        event.preventDefault();
        var $this = $(this);
        var post_id = $(this).data('id'),
            status  = $(this).attr('data-status');

        $.ajax({
            url         : peliPublic.url,
            method      : 'POST',
            data        : {
                action      : 'action_add_favorito',
                post_id     : post_id,
                status      : status
            }, 
            success: function( data ) {
                console.log(data);
                if(status == 'favorito') {
                    //$this.removeClass('far');
                    $this.attr('data-status', 'nofavorito');
                    
                    swal({
                      position: 'center',
                      type: 'warning',
                      title: 'Se eliminÃ³ a tu lista correctamente',
                      showConfirmButton: false,
                      timer: 1500
                    })
                } else if(status == 'nofavorito') {
                    //$this.addClass('far');
                    $this.attr('data-status', 'favorito');
                    swal({
                      position: 'center',
                      type: 'success',
                      title: 'Se aÃ±adiÃ³ a tu lista correctamente',
                      showConfirmButton: false,
                      timer: 1500
                    })
                }
            }
        });
    });

    /*ADD TO RECOMENDADO*/
    $('body').on('click', '#add-to-recomendado', function(event) {
        event.preventDefault();
        var $this = $(this);
        var post_id = $(this).data('id'),
            status  = $(this).attr('data-status');

        $.ajax({
            url         : peliPublic.url,
            method      : 'POST',
            data        : {
                action      : 'action_add_recomendado',
                post_id     : post_id,
                status      : status
            }, 
            success: function( data ) {
                console.log(data);
                if(status == 'recomendado') {
                    //$this.removeClass('far');
                    $this.attr('data-status', 'norecomendado');
                     swal({
                      position: 'center',
                      type: 'warning',
                      title: 'Se eliminÃ³ de recomendados correctamente',
                      showConfirmButton: false,
                      timer: 1500
                    })
                } else if(status == 'norecomendado') {
                   // $this.addClass('far');
                    $this.attr('data-status', 'recomendado');
                    swal({
                      position: 'center',
                      type: 'success',
                      title: 'Se aÃ±adiÃ³ a recomendados correctamente',
                      showConfirmButton: false,
                      timer: 1500
                    })
                }
            }
        });
    });

    /*Seleccionar Temporada*/
    $('#select-season').on('change', function(event) {
    event.preventDefault();
       $this = $(this);

       var option = $this.val();
       console.log(option);
       $('.all-episodes').addClass('hide');
       $('#season-' + option).removeClass('hide');

    });

    /**
     * VIDEO PLAYER
     * Ready init
     */
    $('.open_submenu').on('click', function (event) {
        event.preventDefault();
        var $this = $(this);
        if( $this.find('.sub-tab-lang').is(':visible') ) {
            $this.find('.sub-tab-lang').addClass('hide');
        } else {
            $('.open_submenu').removeClass('actives');
            $('.sub-tab-lang').addClass('hide');
            $this.addClass('actives');
            $this.find('.sub-tab-lang').removeClass('hide');
        }
        //$(this).find('.clili').eq(0).click();
    });

    $('.traileropt').on('click', function(event) {
        event.preventDefault();
        var $this = $(this);
        $('.open_submenu').removeClass('actives');
        $('.sub-tab-lang').addClass('hide');
        $this.addClass('actives');
        $this.find('.sub-tab-lang').removeClass('hide');

        $('.TPlayerTb').removeClass('Current');
        $('.TPlayerTb iframe').removeAttr('src');
        $('#OptY').addClass('Current')
        var $t = $('.Current');
        var $source = $('.Current iframe');        
        $source.attr({
            src: $source.attr('data-src')

        });
    });
    
    $('.embed_div > div:first-child').find('iframe').attr('src', $('.embed_div > div:first-child').find('iframe').attr('data-src'));
    $('.TPlayer > div:first-child').addClass('Current');
    $('.TPlayerNv li:first-child').addClass('actives');

    $('body').on('click', '.clili', function(event) {
         event.preventDefault();
        $('.clili').removeClass('actives');
        $(this).addClass('actives');
        $(this).parent().addClass('hide');
        $('ul._1EGcQ_0 > li').removeClass('actives');
        $(this).parent().parent().parent().addClass('actives');
        var player_id = $(this).data('tplayernv');
        var player_text = $('#'+player_id).text();
        if(player_text!=''){
            $('#'+player_id).html(player_text);
        }
        var tab_id = $(this).attr('data-TPlayerNv');
        $('.TPlayerTb').removeClass('Current');
        $(this).addClass('Current');
        $("#"+tab_id).addClass('Current');
        $('.TPlayerTb iframe').removeAttr('src');
        var $t = $('.Current');
        var $source = $('.Current iframe');        
        $source.attr({
            src: $source.attr('data-src')
        });
     });


    $('.clili').on('click', function(event) {
        event.preventDefault();
        /* Act on the event */
        if($(this).find('.parpax').length) {
            $('.message_d').hide();
            $('.message_k').show();
        } else {
            $('.message_d').show();
            $('.message_k').hide();
        }

        /*if($(this).find('.morp').length) {
            $('.more-options').show();
        } else {
            $('.more-options').hide();
        }*/
    });

    if($('.clili').first().find('.parpax').length) {
        $('.message_d').hide();
        $('.message_k').show();
    } else {
        $('.message_d').show();
        $('.message_k').hide();

    }

    //Close banner yellow anounce
    $('.close-message').on('click', function(event) {
        event.preventDefault();
        $(this).parent().remove();
        /*$('.more-options').hide();*/
    });

    //Apagar luces en el player
    $('.lgtbx-lnk').on('click', function(event) {
        event.preventDefault();
        if( $('body').hasClass('lights-off') ) {
            $('body').removeClass('lights-off');
        } else {
            $('body').addClass('lights-off');
        }
    });

    $('.TPlayerCn iframe').on('click', function(event) {
        event.preventDefault();
       /* $('.more-options').hide();*/
    });

      
    /**
     * HOME MAIN
     * Tab movies: Ãºltimas, estrenos, ranking, mas vistos
     */
   
    $(document).on('click', '.home-movies .btnstp a', function(event) {
        event.preventDefault();
        var id = $(this).data('tab');
        var $this = $(this);
        if( $('#' +id).length ) {
            $('.home-movies .btnstp a').removeClass('Current').addClass('ho-naranja');
            $this.addClass('Current').removeClass('ho-naranja');

            $('.apt').addClass('hide');
            $('#' + id).removeClass('hide');
        } else {
            $.ajax({
                url         : peliPublic.url,
                method      : 'POST',
                data        : {
                    action      : 'action_home_movies',
                    id        : id,
                }, 
                success: function( data ) {
                    $('.home-movies').append(data);
                    $('.home-movies .btnstp a').removeClass('Current').addClass('ho-naranja');
                    $this.addClass('Current').removeClass('ho-naranja');

                    $('.apt').addClass('hide');
                    $('#' + id).removeClass('hide');
                    $('.lazy').lazyload();
                },
                error: function(data){
                //OcurriÃ³ un error
                console.log('error 500');
                },
            });
        }
    });

    /**
     * HOME MAIN
     * Tab series: Ãºltimas, estrenos, ranking, mas vistos
     */
    $(document).on('click', '.home-series .btnstp a', function(event) {
        event.preventDefault();
        var id = $(this).data('tab');
        var $this = $(this);
        if( $('#' +id).length ) {
            $('.home-series .btnstp a').removeClass('Current').addClass('ho-naranja');
            $this.addClass('Current').removeClass('ho-naranja');

            $('.series_listado').addClass('hide');
            $('#' + id).removeClass('hide');
        } else {
            $.ajax({
                url         : peliPublic.url,
                method      : 'POST',
                data        : {
                    action      : 'action_home_series',
                    id        : id,
                }, 
                success: function( data ) {
                    $('.home-series').append(data);
                    $('.home-series .btnstp a').removeClass('Current').addClass('ho-naranja');
                    $this.addClass('Current').removeClass('ho-naranja');

                    $('.series_listado').addClass('hide');
                    $('#' + id).removeClass('hide');
                    $('#' + id).owlCarousel({
                            loop:false,
                            margin:0,
                            nav:false,
                            responsiveClass:true,
                            responsive:{
                                0:{items:1},
                                425:{items:2},
                                576:{items:3},
                                768:{items:2},
                                992:{items:3},
                                1200:{items:4}
                            }
                        });
                    $('.lazy').lazyload();
                },
                error: function(data){
                //OcurriÃ³ un error
                console.log('error 500');
                },
            });
        }

    });

    /**
     * Formulario Login Header
     * @since 1.0.0
     */
    $('#form-login-user').on('submit', function(event) {
        event.preventDefault();
        
        var name = $('#form-login-name').val(),
            pass = $('#form-login-pass').val();

        

        $.ajax({
            url         : peliPublic.url,
            method      : 'POST',
            dataType    : 'json',
            data        : {
                action      : 'action_peli_login_header',
                name        : name,
                pass        : pass
            }, 
            success: function( data ) {
                console.log(data);
                if(data.error == 'false') {
                    location.reload();
                } else {
                    console.log('error en login');
                }
            },
            error: function(data){
               //OcurriÃ³ un error
               console.log('error 500');
            },
        });

    });


    /**
     * Formulario Register Header
     * @since 1.0.0
     */
    $('#form-register-user').on('submit', function(event) {
        event.preventDefault();
        
        var name = $('#form-register-names').val(),
            pass = $('#form-register-passs').val(),
            email = $('#form-register-emails').val();

        $.ajax({
            url         : peliPublic.url,
            method      : 'POST',
            dataType    : 'json',
            data        : {
                action      : 'action_peli_register_header',
                name        : name,
                pass        : pass,
                email       : email
            }, 
            success: function( data ) {
                
                if(data.error == 'false') {
                    setTimeout(function(){ 
                        $.ajax({
                            url     : peliPublic.url,
                            method     : 'POST',
                            dataType    : 'json',
                            data     : {
                                action      : 'action_peli_login_header',
                                name        : name,
                                pass        : pass
                            }, 
                            success: function( data ) {
                                if(data.error == 'false') {
                                    location.reload();
                                } else {
                                    console.log('error en login');
                                }
                            }
                        });
                    }, 500);
                } else {
                    console.log('error en login');
                }
                
            },
            error: function(data){
               //OcurriÃ³ un error
               console.log('error 500');
            },
        });

    });
    
    /*Modal*/
    /*$('.aa-mdl').on('click', function(e){
        e.preventDefault();
        var shwhddb = $(this).attr('data-mdl');
        $('#'+shwhddb).toggleClass('on');
        $('body').toggleClass('mdl-on');
        $(this).toggleClass('on');
    });*/
    
    /*Accordion*/
    $('.aa-crd').find('.aa-crd-lnk').click(function(){
        $(this).toggleClass('on');
        $('.aa-crd-lnk').not($(this)).removeClass('on');
    });
    
    /*Tabs*/
    $('.aa-nv a').click(function(e){
      e.preventDefault();
        var $this = $(this),
            tabgroup = '#'+$this.parents('.aa-nv').data('tbs'),
            others = $this.closest('li').siblings().children('a'),
            target = $this.attr('href');
        others.removeClass('on');
        $this.addClass('on');
        $(tabgroup).children().removeClass('on');
        $(target).addClass('on');
    });
    
    /*slide*/
    $('.MovieListSld').owlCarousel({
        loop:true,
        nav:false,
        lazyLoad:true,
        items:1,
        autoplay:true,
        autoplayTimeout:4000,
    });
    $('.category-list').owlCarousel({
        loop:true,
        nav:false,
        loop:true,
        margin:0,
        responsiveClass:true,
        responsive:{
            0:{items:1},
            425:{items:2},
            576:{items:3},
            768:{items:4},
            992:{items:5}
        }
    });
    $('.tvshows-owl').owlCarousel({
        loop:false,
        margin:0,
        nav:false,
        responsiveClass:true,
        responsive:{
            0:{items:1},
            425:{items:2},
            576:{items:3},
            768:{items:2},
            992:{items:3},
            1200:{items:4}
        }
    });

   
    $('.episodes-owl').owlCarousel({
        loop:false,
        margin:0,
        nav:false,
        responsiveClass:true,
        responsive:{
            0:{items:1},
            425:{items:2},
            576:{items:3},
            768:{items:2},
            992:{items:3},
            1200:{items:4}
        }
    }); 
   
    $('.sagas-owl').owlCarousel({
        loop:false,
        margin:0,
        nav:false,
        responsiveClass:true,
        responsive:{
            0:{items:1},
            425:{items:2},
            576:{items:3},
            992:{items:4},
            1200:{items:5}
        }
    });
    var owl = $('.premiere-owl');

    /*if($('.premiere-owl > div').length > 7){*/
        owl.owlCarousel({
          onInitialized  : counter,
          onTranslated : counter,
            loop:false,
                margin:0,
                nav:false,
                responsiveClass:true,
                responsive:{
                    0:{items:1},
                    425:{items:2},
                    576:{items:3},
                    768:{items:4},
                    992:{items:5},
                    1200:{items:6},
                    1600:{items:7}
                }
        });
    /*}*/
    function counter(event) {
       var element   = event.target;
        var items     = event.item.count;
        var item      = event.item.index + 1;  
      if(item > items) {
        item = item - items
      }
      $('#numsld').html("<span>"+item+"</span>/"+items)
    };
    
    /*hd*/
    $(window).scroll(function(){
        if ($(this).scrollTop() > 150) {
           $('.Header').addClass('fx');
        } else {
           $('.Header').removeClass('fx');
        }
    });
    
    /*votes*/!function(a){a.fn.percircle=function(t){var e={animate:!0};t||(t={}),a.extend(t,e);var r=3.6;return this.each(function(){var e=a(this);e.hasClass("percircle")||e.addClass("percircle"),"undefined"!=typeof e.attr("data-animate")&&(t.animate="true"==e.attr("data-animate")),t.animate&&e.addClass("animate");var s=e.attr("data-percent")||t.percent||0,o=e.attr("data-perclock")||t.perclock||0;if(o){e.hasClass("perclock")||e.addClass("perclock");var d=function(a){return 10>a?"0"+a:a};setInterval(function(){var t=new Date,r=d(t.getHours())+":"+d(t.getMinutes())+":"+d(t.getSeconds());e.html("<span>"+r+"</span>"),a('<div class="slice"><div class="bar"></div><div class="fill"></div></div>').appendTo(e);var s=t.getSeconds();0===s&&e.removeClass("gt50"),s>30&&(e.addClass("gt50"),a(".bar",e).css({"-webkit-transform":"rotate(180deg)","-moz-transform":"rotate(180deg)","-ms-transform":"rotate(180deg)","-o-transform":"rotate(180deg)",transform:"rotate(180deg)"}));var o=6*s;a(".bar",e).css({"-webkit-transform":"rotate("+o+"deg)","-moz-transform":"rotate("+o+"deg)","-ms-transform":"rotate("+o+"deg)","-o-transform":"rotate("+o+"deg)",transform:"rotate("+o+"deg)"})},1e3)}else{s>50&&e.addClass("gt50");var l=e.attr("data-text")||t.text||s+"";a("<span>"+l+"</span>").appendTo(e),a('<div class="slice"><div class="bar"></div><div class="fill"></div></div>').appendTo(e),s>50&&a(".bar",e).css({"-webkit-transform":"rotate(180deg)","-moz-transform":"rotate(180deg)","-ms-transform":"rotate(180deg)","-o-transform":"rotate(180deg)",transform:"rotate(180deg)"});var n=r*s;setTimeout(function(){a(".bar",e).css({"-webkit-transform":"rotate("+n+"deg)","-moz-transform":"rotate("+n+"deg)","-ms-transform":"rotate("+n+"deg)","-o-transform":"rotate("+n+"deg)",transform:"rotate("+n+"deg)"})},0)}})}}(jQuery),$("#TPVotes").percircle();
    /*votes*/!function(a){a.fn.percircle=function(t){var e={animate:!0};t||(t={}),a.extend(t,e);var r=3.6;return this.each(function(){var e=a(this);e.hasClass("percircle")||e.addClass("percircle"),"undefined"!=typeof e.attr("data-animate")&&(t.animate="true"==e.attr("data-animate")),t.animate&&e.addClass("animate");var s=e.attr("data-percent")||t.percent||0,o=e.attr("data-perclock")||t.perclock||0;if(o){e.hasClass("perclock")||e.addClass("perclock");var d=function(a){return 10>a?"0"+a:a};setInterval(function(){var t=new Date,r=d(t.getHours())+":"+d(t.getMinutes())+":"+d(t.getSeconds());e.html("<span>"+r+"</span>"),a('<div class="slice"><div class="bar"></div><div class="fill"></div></div>').appendTo(e);var s=t.getSeconds();0===s&&e.removeClass("gt50"),s>30&&(e.addClass("gt50"),a(".bar",e).css({"-webkit-transform":"rotate(180deg)","-moz-transform":"rotate(180deg)","-ms-transform":"rotate(180deg)","-o-transform":"rotate(180deg)",transform:"rotate(180deg)"}));var o=6*s;a(".bar",e).css({"-webkit-transform":"rotate("+o+"deg)","-moz-transform":"rotate("+o+"deg)","-ms-transform":"rotate("+o+"deg)","-o-transform":"rotate("+o+"deg)",transform:"rotate("+o+"deg)"})},1e3)}else{s>50&&e.addClass("gt50");var l=e.attr("data-text")||t.text||s+"";a("<span>"+l+"</span>").appendTo(e),a('<div class="slice"><div class="bar"></div><div class="fill"></div></div>').appendTo(e),s>50&&a(".bar",e).css({"-webkit-transform":"rotate(180deg)","-moz-transform":"rotate(180deg)","-ms-transform":"rotate(180deg)","-o-transform":"rotate(180deg)",transform:"rotate(180deg)"});var n=r*s;setTimeout(function(){a(".bar",e).css({"-webkit-transform":"rotate("+n+"deg)","-moz-transform":"rotate("+n+"deg)","-ms-transform":"rotate("+n+"deg)","-o-transform":"rotate("+n+"deg)",transform:"rotate("+n+"deg)"})},0)}})}}(jQuery),$("#TPVotes").percircle();
    

    // $("#edit-user-perfil-pais").countrySelect({
       
    //     // onlyCountries: ['us', 'gb', 'ch', 'ca', 'do'],
    //     // responsiveDropdown: true,
    //     preferredCountries: ['pe', 'mx', 'ar', 'co', 'cl', 'ec', 'es', 'bo', 'uy', 'py'],
    // });

    $(".my-rating").starRating({
        starSize: 21,
        useGradient: false,
        callback: function(currentRating, $el){
            /*alert('rated ' + currentRating);
            console.log('DOM element ', $el);*/
            var term_id = $('.my-rating').data('id');
            $.ajax({
                url     : peliPublic.url,
                method     : 'POST',
                data     : {
                    action      : 'action_rating_tax',
                    rating      : currentRating,
                    term_id     : term_id
                }, 
                success: function( data ) {
                    console.log( data );
                }
            });

        }
    });

    /*IMAGEN PREVIEW*/
    function readURL(input) {

      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
          $('.avatar img').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
      }
    }

    $("#profilepicture").change(function() {
      readURL(this);
    });


    /*luz del repro*/
    $('.lgtbx').on('click', function(event) {
        event.preventDefault();
        /* Act on the event */
        $('body').removeClass('lights-off')
    });
    
    /*Toggle*/
    $('.aa-tgl').on('click', function(){
        var shwhdd = $(this).attr('data-tgl');
        $('#'+shwhdd).toggleClass('on');
        $(this).toggleClass('on');
    });
    
    /*Accordion*/
    $('.aa-crd').find('.aa-crd-lnk').click(function(){
        $(this).toggleClass('on');
        $('.aa-crd-lnk').not($(this)).removeClass('on');
    });



    /*Borrar Notificaciones al abrir cuadrito*/
    $('#op-not').on('click', function(event) {
        event.preventDefault();
        $.ajax({
            url     : peliPublic.url,
            method     : 'POST',
            data     : {
                action      : 'action_delete_notify',
            }, 
            success: function( data ) {
                console.log( data );
            }
        });
    });


    var lista = $('#ltuser').data('lista');

    if(lista == 'on') {
        $('#apre').click();
    }



    /*PAGE SERIES - PAGINATION AJAX*/
    function find_page_number( element ) {
        element.find('span').remove();
        return parseInt( element.html() );
    }

    function goToByScroll(id) {
        // Remove "link" from the ID
        id = id.replace("link", "");
        // Scroll
        $('html,body').animate({
            scrollTop: $("#" + id).offset().top
        }, 'slow');
    }

    $(document).on( 'click', '.nav-cuevana .nav-links .page-link', function( event ) {
        event.preventDefault();
        page = find_page_number( $(this).clone() );
        console.log(page);
        $.ajax({
            url  : peliPublic.url,
            type: 'post',
            data: {
                action    : 'cuevana_ajax_pagination',
                query_vars: peliPublic.query_vars,
                page      : page,
            },
            success: function( html ) {
                $('#tabserie-1').empty();
                $('#tabserie-1').append( html );

                goToByScroll('cuevana-top-page');

                $('.navigation a').removeAttr('href');
                
            }
        });
    });


    $(document).on( 'click', '.nav-cuevana .nav-links .next', function( event ) {
        event.preventDefault();
        var page_current = $(this).parent().find('.current').text();
        var page = parseInt(page_current) + parseInt(1);

        $.ajax({
            url  : peliPublic.url,
            type: 'post',
            data: {
                action    : 'cuevana_ajax_pagination',
                query_vars: peliPublic.query_vars,
                page      : page,
            },
            success: function( html ) {
                $('#tabserie-1').empty();
                $('#tabserie-1').append( html );

                goToByScroll('cuevana-top-page');

                $('.navigation a').removeAttr('href');
                
            }
        });
        
    });
    $(document).on( 'click', '.nav-cuevana .nav-links .prev', function( event ) {
        event.preventDefault();
        var page_current = $(this).parent().find('.current').text();
        var page = parseInt(page_current) - parseInt(1);

        $.ajax({
            url  : peliPublic.url,
            type: 'post',
            data: {
                action    : 'cuevana_ajax_pagination',
                query_vars: peliPublic.query_vars,
                page      : page,
            },
            success: function( html ) {
                $('#tabserie-1').empty();
                $('#tabserie-1').append( html );

                goToByScroll('cuevana-top-page');

                $('.navigation a').removeAttr('href');
                
            }
        });
        
    });



    $(document).on( 'click', '.nav-cuevana-estreno .nav-links .page-link', function( event ) {
        event.preventDefault();
        page = find_page_number( $(this).clone() );
        console.log(page);
        $.ajax({
            url  : peliPublic.url,
            type: 'post',
            data: {
                action    : 'cuevana_ajax_pagination_estreno',
                /*query_vars: peliPublic.query_vars,*/
                page      : page,
            },
            success: function( html ) {
                $('#tabserie-2').empty();
                $('#tabserie-2').append( html );
                goToByScroll('cuevana-top-page');
                $('.navigation a').removeAttr('href');
            }
        });
    });

    $(document).on( 'click', '.nav-cuevana-estreno .nav-links .next', function( event ) {
        event.preventDefault();
        var page_current = $(this).parent().find('.current').text();
        var page = parseInt(page_current) + parseInt(1);

        $.ajax({
            url  : peliPublic.url,
            type: 'post',
            data: {
                action    : 'cuevana_ajax_pagination_estreno',
                page      : page,
            },
            success: function( html ) {
                $('#tabserie-2').empty();
                $('#tabserie-2').append( html );

                goToByScroll('cuevana-top-page');

                $('.navigation a').removeAttr('href');
                
            }
        });
        
    });
    $(document).on( 'click', '.nav-cuevana-estreno .nav-links .prev', function( event ) {
        event.preventDefault();
        var page_current = $(this).parent().find('.current').text();
        var page = parseInt(page_current) - parseInt(1);

        $.ajax({
            url  : peliPublic.url,
            type: 'post',
            data: {
                action    : 'cuevana_ajax_pagination_estreno',
                page      : page,
            },
            success: function( html ) {
                $('#tabserie-2').empty();
                $('#tabserie-2').append( html );

                goToByScroll('cuevana-top-page');

                $('.navigation a').removeAttr('href');
                
            }
        });
        
    });

    $(document).on( 'click', '.nav-cuevana-rating .nav-links .page-link', function( event ) {
        event.preventDefault();
        page = find_page_number( $(this).clone() );
        console.log(page);
        $.ajax({
            url  : peliPublic.url,
            type: 'post',
            data: {
                action    : 'cuevana_ajax_pagination_rating',
                /*query_vars: peliPublic.query_vars,*/
                page      : page,
            },
            success: function( html ) {
                $('#tabserie-3').empty();
                $('#tabserie-3').append( html );
                goToByScroll('cuevana-top-page');
                $('.navigation a').removeAttr('href');
            }
        });
    });

    $(document).on( 'click', '.nav-cuevana-rating .nav-links .next', function( event ) {
        event.preventDefault();
        var page_current = $(this).parent().find('.current').text();
        var page = parseInt(page_current) + parseInt(1);

        $.ajax({
            url  : peliPublic.url,
            type: 'post',
            data: {
                action    : 'cuevana_ajax_pagination_rating',
                page      : page,
            },
            success: function( html ) {
                $('#tabserie-3').empty();
                $('#tabserie-3').append( html );

                goToByScroll('cuevana-top-page');

                $('.navigation a').removeAttr('href');
            }
        });
    });

    $(document).on( 'click', '.nav-cuevana-rating .nav-links .prev', function( event ) {
        event.preventDefault();
        var page_current = $(this).parent().find('.current').text();
        var page = parseInt(page_current) - parseInt(1);

        $.ajax({
            url  : peliPublic.url,
            type: 'post',
            data: {
                action    : 'cuevana_ajax_pagination_rating',
                page      : page,
            },
            success: function( html ) {
                $('#tabserie-3').empty();
                $('#tabserie-3').append( html );

                goToByScroll('cuevana-top-page');

                $('.navigation a').removeAttr('href');       
            }
        }); 
    });

    $(document).on( 'click', '.nav-cuevana-view .nav-links .page-link', function( event ) {
        event.preventDefault();
        page = find_page_number( $(this).clone() );
        console.log(page);
        $.ajax({
            url  : peliPublic.url,
            type: 'post',
            data: {
                action    : 'cuevana_ajax_pagination_view',
                /*query_vars: peliPublic.query_vars,*/
                page      : page,
            },
            success: function( html ) {
                $('#tabserie-4').empty();
                $('#tabserie-4').append( html );
                goToByScroll('cuevana-top-page');
                $('.navigation a').removeAttr('href');
            }
        });
    });


    $(document).on( 'click', '.nav-cuevana-view .nav-links .next', function( event ) {
        event.preventDefault();
        var page_current = $(this).parent().find('.current').text();
        var page = parseInt(page_current) + parseInt(1);

        $.ajax({
            url  : peliPublic.url,
            type: 'post',
            data: {
                action    : 'cuevana_ajax_pagination_view',
                page      : page,
            },
            success: function( html ) {
                $('#tabserie-4').empty();
                $('#tabserie-4').append( html );

                goToByScroll('cuevana-top-page');

                $('.navigation a').removeAttr('href');
            }
        });
    });


    $(document).on( 'click', '.nav-cuevana-view .nav-links .prev', function( event ) {
        event.preventDefault();
        var page_current = $(this).parent().find('.current').text();
        var page = parseInt(page_current) - parseInt(1);

        $.ajax({
            url  : peliPublic.url,
            type: 'post',
            data: {
                action    : 'cuevana_ajax_pagination_view',
                page      : page,
            },
            success: function( html ) {
                $('#tabserie-4').empty();
                $('#tabserie-4').append( html );

                goToByScroll('cuevana-top-page');

                $('.navigation a').removeAttr('href');
                
            }
        });
        
    });





function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function checkCookie() {
    var user = getCookie("username");
    if (user != "") {
       // alert("Welcome again " + user);
    } else {
        if (user != "" && user != null) {
            setCookie("username", user, 365);
        }
    }
}
if( $(window).width() > 768 ) {
    if( !getCookie('more_options') ) {
        setCookie( "more_options", 1, 1 );
        $('.more-options, #mdl-help').show();
    } else {
        if( parseInt(getCookie("more_options")) < 4 ) {
            setCookie( "more_options", (parseInt(getCookie("more_options")) + 1), 1 );
            $('.more-options, #mdl-help').show();
        } 
    }
}

});
