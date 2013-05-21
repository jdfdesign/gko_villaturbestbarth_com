//= require jquery
//= require jquery_ujs
//= require twitter.bootstrap.2.2.1/bootstrap/transition
//= require twitter.bootstrap.2.2.1/bootstrap/alert
//= require twitter.bootstrap.2.2.1/bootstrap/button
//= require twitter.bootstrap.2.2.1/bootstrap/collapse
//= require twitter.bootstrap.2.2.1/bootstrap/dropdown
//= require twitter.bootstrap.2.2.1/bootstrap/modal
//= require jquery.throttledresize.js
//= require jquery.mousewheel.3.0.6.js
//= require jquery.jscrollpane.js
//= require flexslider/jquery.flexslider.js

$(document).ready(function() {

  /////////////////////////////////////////////////
  var slider = $(".content-wrapper"),
      use_slider = true,
       // system set to false if page has no text
      gallery = $('#background-slideshow'),
      body = $("body"),
      scrollpane = $('.content-inner'),
      header_height = $('header.navbar').outerHeight(),
      footer_height = $('footer.footer').outerHeight(),
      slider_tab = $("#content-tab"),
      sliderWidth = 0,
      slide_open = true,
      thumbs_tab, thumbs_open = true,
      scrollpane_api, sliderInitialized = false,
      breakpoint = 979;

  $('.nav li.dropdown').on('click.dropdown.data-api', function(e) {
    if ($(window).width() > breakpoint) {
      e.preventDefault();
      e.stopPropagation();
      var host = window.location.hostname;
      var port = window.location.port;
      var url = $(this).find('a:first').attr("href");
      var path = host;
      
      if(port) {
        path += ":"; 
       path += port; 
      }
      path += url;
      window.location = "http://" + path;
      return false;
    }
  }) 
  var segments = window.location.pathname.split('/');
  var path = segments[1]
  if(path != "") {
    $('nav#primary-menu a[href^="/' + path + '"]').parent("li").addClass("active");
    if(segments.length > 1) {
      $('nav#secondary-menu a[href^="' + window.location.pathname + '"]').parent("li").addClass("active");
    }
  }
  

  /////////////////////////////////////////////////
  init_slide = function() {

    if (sliderInitialized || slider.length == 0) {
      return;
    }

    //console.log(sliderInitialized + " " + slider.length)
    slider_tab.on('click', function(e) {
      if (!slide_open) {
        show_slide(slider);
      } else {
        hide_slide(slider);
      }
      e.preventDefault();
      return false;
    });

    scrollpane_api = scrollpane.jScrollPane({
      showArrows: false,
      autoReinitialise: true
    }).data('jsp');

    sliderWidth = slider.outerWidth();
    sliderInitialized = true;
  }
  /////////////////////////////////////////////////
  destroy_slide = function() {
    if (slider.length && !sliderInitialized) {
      return;
    }
    slider_tab.off('click');
    if (typeof scrollpane_api !== "undefined" && scrollpane_api !== null) {
      scrollpane_api.destroy();
    }
    sliderInitialized = false;
  }
  /////////////////////////////////////////////////
  show_slide = function(el) {
    if (slide_open) {
      return;
    }
    slide_open = !slide_open;

    // Hide the thumbsbar
    if (thumbs_tab && thumbs_open) {
      thumbs_tab.click();
    }

    el.stop().animate({
      'right': 0
    }, {
      queue: false,
      duration: 500
    });

    slider_tab.find("i").removeClass("icon-chevron-left").addClass("icon-chevron-right");
  }
  /////////////////////////////////////////////////
  hide_slide = function(el) {
    if (!slide_open) {
      return;
    }
    slide_open = !slide_open;

    el.stop().animate({
      'right': -sliderWidth
    }, {
      queue: false,
      duration: 500
    });
    slider_tab.find("i").removeClass("icon-chevron-right").addClass("icon-chevron-left");
  }

  /////////////////////////////////////////////////
  rescale = function(e) {
    if (($(window).width() > breakpoint)) {
      init_slide();
    } else {
      destroy_slide();
    }
  }
  /////////////////////////////////////////////////
  getScreenSize = function() {
    return {
      w: $(window).width(),
      //Math.min(screenWidth, winWidth),
      h: $(window).height() //Math.min(screenHeight, winHeight)
    }
  }

  Slideshow.init();

  // Handle window.resize or orientationchange event
  $(window).bind("throttledresize", function(e) {
    rescale(e);
  }).trigger("throttledresize");

});

var Slideshow = {

  init: function() {
    // The slider being synced must be initialized first
    $('.carousel-flexslider').hide();

    $('.slider-flexslider').flexslider({
      animation: "slide"
    });
  }
}
