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


      // Close icon behavior for modal webform
      var pageId = 'modal-multiselect-form'; // Replace 'your-page-id' with the actual ID of your page
      if ($('#' + pageId, context).length) {
        // Code specific to your page with the given ID
        var container = $('#main-wrapper', context);
        var form = container.find('#webform-submission-modal-multiselect-add-form');
        var closeIcon = container.find('#custom-close-icon');
        var initialPageUrl = window.location.href;
        var isFormSubmitted = false;
        var isBackActionAllowed = true;
        // Attach the click event to the close icon
        closeIcon.once('rtsbarrio').on('click', function (event) {
          event.stopPropagation();
          if (isBackActionAllowed) {
            window.history.back();
          }
        });
        // Attach the click event to the document, but only trigger the back action when clicking outside the form and not the close icon
        $(document, context).once('rtsbarrio').on('click.rtsbarrio', function (event) {
          var clickedElement = event.target;
          // Check if the clicked element is outside the container, form, and not the form submission button or the close icon
          if (!container.is(clickedElement) && container.has(clickedElement).length === 0 && !$(clickedElement).is(':submit') && !closeIcon.is(clickedElement)) {
            // Check if the form has been submitted and the current page is not the initial page
            if (!isFormSubmitted || window.location.href === initialPageUrl) {
              isBackActionAllowed = true;
              window.history.back();
            } else if ($(clickedElement).closest('form').length === 0) {
              isBackActionAllowed = false;
            }
          }
        });
        // Update the form submission status when the form is submitted
        form.once('rtsbarrio-form').on('submit', function () {
          isFormSubmitted = true;
          isBackActionAllowed = true;
        });
      }      // End Close icon behavior for modal webform

      

    }
  };

})(jQuery, Drupal);


/* //modal webform      
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
}); */