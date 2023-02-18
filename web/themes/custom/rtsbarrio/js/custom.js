/**
 * @file
 * Global utilities.
 *
 */
(function($, Drupal) {

  'use strict';

  Drupal.behaviors.rtsbarrio = {
    attach: function(context, settings) {

      // Form Label: Add the has-value class to a sibling label
      // if the input has a value
      let input = ".form-control";
      $(input).on('change', function() {
        if ($(this).val().length > 0){
          $(this).siblings("label").addClass('has-value');
        }
        else {
          $(this).siblings("label").removeClass('has-value');
        }
      });
      $(input).each(function() {
        if ($(this).val().length > 0) {
          $(this).siblings("label").addClass('has-value');
        }
      });


      // Language Switcher active class
      $('.language-switcher-custom.active').click(function() {
        $('.language-switcher-custom').removeClass("active");
      });
      $('.language-switcher-custom').click(function() {
      if ( !$(".language-switcher-custom.active").length ) {
        $('.language-links').addClass("active");
      }  
      });

      // Language switcher hide when mouse out
/*       $(".language-switcher-custom").mouseout(function(){
        $(".language-links").removeClass("active");
      }); */
      // Language switcher hide when clicking off
      $(document).mouseup(function (e) {
      if (!$('.language-switcher-custom').is(e.target) && !$("language-switcher-custom.active").length) {
            $('.language-links').removeClass("active");
        }   
      }); 

    }
  };

})(jQuery, Drupal);
