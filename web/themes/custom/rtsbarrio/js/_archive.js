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