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
      $(document).mouseup(function (e) {
      if (!$('.language-switcher-custom').is(e.target) && !$("language-switcher-custom.active").length) {
            $('.language-links').removeClass("active");
        }   
      }); 


      //close "model" webform and go back to previous page
      $(document, context).once('customFunctionality').on('click', function(event) {
        var form = $('#webform-submission-modal-multiselect-add-form');
        var clickedElement = event.target;
        
        if (!form.is(clickedElement) && form.has(clickedElement).length === 0) {
          window.history.back();
        }
      });


      //modal webform      
      var modal = $('<div id="webform-modal" class="webform-modal"></div>');
      var closeButton = $('<button id="webform-modal-close" class="webform-modal-close">X</button>');
      var webformContainer = $('<div id="webform-container" class="webform-container"></div>');
      modal.append(closeButton);
      modal.append(webformContainer);
      $('body').append(modal);

      function closeModal() {
        modal.hide();
      }

      closeButton.on('click', closeModal);

      modal.on('click', function(event) {
        if ($(event.target).is(modal)) {
          closeModal();
        }
      });

      $('#open-webform-modal').not('.webform-modal-processed').addClass('webform-modal-processed').on('click', function() {
        // Replace 'your_webform_id' with the actual Webform ID.
        var webformId = 'rts_multiselect';

        // Load only the form element inside the webform via AJAX and display the modal.
        webformContainer.load('/webform/' + webformId + ' form', function() {
          modal.show();
        });
      });

    }
  };

})(jQuery, Drupal);
