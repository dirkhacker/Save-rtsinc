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

      //MOBILE NAV TOGGLE
      $(document).ready(function() {
        $('.mobile-nav-toggle a').on("click", function(event) {
          event.preventDefault(); // Prevents the default behavior of the link
      
          // Handle the logic for opening the modal popup here
          $('body').addClass("mobile-nav-active");
        });
      
        $(document).on("click", function(event) {
          var $target = $(event.target);
      
          // Check if the click event occurred outside the mobile nav container or on the mobile-nav-x element
          if (
            (!$target.closest('.mobile-nav-container').length && !$target.closest('.mobile-nav-toggle').length) ||
            $target.closest('.mobile-nav-x').length
          ) {
            // Handle the logic for closing the modal popup here
            $('body').removeClass("mobile-nav-active");
          }
        });
      }); //END MOBILE NAV TOGGLE


      //LANGUAGE SWITCHER
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
      }); //END LANGUAGE SWITCHER

      // Search JS
      $('.search-box').on('click', function() {
        let mqm = window.matchMedia("screen and (max-width: 576px)").matches;
        let mqt = window.matchMedia("screen and (min-width: 1200px)").matches;
        if (mqm) {
          if ('.search-box:hidden') {
            $('.header-logo, rtsf-tall').hide();
          }
        }
        else if (mqt) {
          if ('.search-box:hidden') {
            $('#block-megamainnav').hide();
          }
        }
      });

      $('.search-box').focusout(function() {
        let mqm = window.matchMedia("screen and (max-width: 575px)").matches;
        let mqt = window.matchMedia("screen and (min-width: 1200px)").matches;
        if (mqm) {
          $('.header-logo, .rtsf-tall').show();
          $('.rtsf-logo').hide();
        }
        else if (mqt) {
          $('#block-megamainnav').show();
        }
      });


      // CLOSE MODAL WEBFORM
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
      }  // END CLOSE MODAL WEBFORM


       // ADD URL QUERY PARAMS TO LOCAL STORAGE
       $(window).each(function () {
        // Get the query string
        var queryString = window.location.search;
        // Remove the '?' at the start of the query string
        queryString = queryString.substring(1);
        // Split the query string into individual parameters
        var params = queryString.split('&');
        // Loop through each parameter
        for (var i = 0; i < params.length; i++) {
          // Split the parameter into name and value
          var param = params[i].split('=');
          // Store the parameter in local storage
          sessionStorage.setItem(decodeURIComponent(param[0]), decodeURIComponent(param[1]));
        }
      });


      //INSERT LOCAL STORAGE into current webform submit
      $(".webform-submission-form", context).each(function () {
        $(this).submit(function (event) {
          event.preventDefault();
          // Get values from local storage:
          var campaignValue = sessionStorage.getItem("campaign");
          var sourceValue = sessionStorage.getItem("source");
          var adValue = sessionStorage.getItem("ad");
          var adgroupValue = sessionStorage.getItem("adgroup");
          var gclidValue = sessionStorage.getItem("gclid");
          var keywordValue = sessionStorage.getItem("keyword");
          var lead_sourceValue = sessionStorage.getItem("lead_source");
          var mediumValue = sessionStorage.getItem("medium");
          var placementValue = sessionStorage.getItem("placement");
          var record_typeValue = sessionStorage.getItem("record_type");
          var referrer_domainValue = sessionStorage.getItem("referrer_domain");
          var segmentValue = sessionStorage.getItem("segment");
          var form_urlValue = sessionStorage.getItem("form_url");
          var ppc_campaignValue = sessionStorage.getItem("ppc_campaign"); 
          var cpc_campaignValue = sessionStorage.getItem("cpc_campaign"); 
          var formidValue = sessionStorage.getItem("formid"); 
         // Set the values in the form if they exist in local storage
          if (campaignValue) {
            $("input[name='campaign']").val(campaignValue);
          }
          if (sourceValue) {
            $("input[name='source']").val(sourceValue);
          }
          if (adValue) {
            $("input[name='ad']").val(adValue);
          }
          if (adgroupValue) {
            $("input[name='adgroup']").val(adgroupValue);
          }
          if (gclidValue) {
            $("input[name='gclid']").val(gclidValue);
          }
          if (keywordValue) {
            $("input[name='keyword']").val(keywordValue);
          }
          if (lead_sourceValue) {
            $("input[name='lead_source']").val(lead_sourceValue);
          }
          if (mediumValue) {
            $("input[name='medium']").val(mediumValue);
          }
          if (placementValue) {
            $("input[name='placement']").val(placementValue);
          }
          if (record_typeValue) {
            $("input[name='record_type']").val(record_typeValue);
          }
          if (referrer_domainValue) {
            $("input[name='referrer_domain']").val(referrer_domainValue);
          }
          if (segmentValue) {
            $("input[name='segment']").val(segmentValue);
          }
          if (form_urlValue) {
            $("input[name='form_url']").val(form_urlValue);
          }
          if (ppc_campaignValue) {
            $("input[name='ppc_campaign']").val(ppc_campaignValue);
          }
          if (cpc_campaignValue) {
            $("input[name='cpc_campaign']").val(cpc_campaignValue);
          }
          if (formidValue) {
            $("input[name='formid']").val(formidValue);
          }
          // Now submit the form
          this.submit();
        });
      });  // END INERT SESIION STORAGE  url params into current webform



    }
  };
})(jQuery, Drupal);

// SEO hreflang attribute for pagination and exposed filters
(function ($, Drupal, drupalSettings) {

  Drupal.behaviors.hreflangLinks = {
    attach: function (context, settings) {
      $('.bef-link', context).once('hreflangLinks').attr('hreflang', drupalSettings.path.currentLanguage);
      $('.pagination .page-item .page-link', context).once('hreflangLinks').attr('hreflang', drupalSettings.path.currentLanguage);
    }
  };
})(jQuery, Drupal, drupalSettings);

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

   // ADD URL QUERY PARAMS TO LOCAL STORAGE
   /* $(window).once('queryParams').each(function () {
    // Get the query string
    var queryString = window.location.search;
    // Remove the '?' at the start of the query string
    queryString = queryString.substring(1);
    // Split the query string into individual parameters
    var params = queryString.split('&');
    // Loop through each parameter
    for (var i = 0; i < params.length; i++) {
      // Split the parameter into name and value
      var param = params[i].split('=');
      // Store the parameter in local storage
      localStorage.setItem(decodeURIComponent(param[0]), decodeURIComponent(param[1]));
    }
  });  */ //END URL QUERY PARAMS TO LOCAL STORAGE