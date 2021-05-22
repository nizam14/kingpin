// JavaScript Document
var getUrl = window.location;
//for localhost
//var site_url = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1]+'/';
//for live site
var site_url = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[0];
(function ($, window, document, undefined) {
  'use strict';

  var form = $('.agent-widget'),
    messageContainer = $('#message-contact'),
    messageText = $('#message-contact .message-text');


  $('.send-property-msg').click(function(){


    // remove the error class
    form.find('.form-control').removeClass('error');
    messageContainer.removeClass('error');

    var errorAll = '';

    // get the form data
    var formData = {
      
      'email': $('input[name="form-email"]').val(),
	  'phone': $('input[name="form-phone"]').val(),
      'message': $('textarea[name="form-message"]').val(),
	  'property': $('.property-title h2').text(),
	  'propertylink': $('#prolink').val(),
      
    };
     //formData.append('action', 'wpmlm_ajax_user_check');
    // process the form
    $.ajax({
      type: 'POST',
      url: site_url+'wp-admin/admin-ajax.php',
	  data: { 
                  'action': 'wpmlm_ajax_user_check', //calls wp_ajax_nopriv_ajaxlogin
                  'email': $('input[name="form-email"]').val(),
				  'phone': $('input[name="form-phone"]').val(),
				  'message': $('textarea[name="form-message"]').val(),
				  'property': $('#proname').val(),
				  'propertylink': $('#prolink').val(), },
	 /* action:  'make_booking',
      type:    "POST",
      url:     MBAjax.admin_url,*/
     // data: formData,
      dataType: 'json',
      encode: true
    }).done(function (data) {
      // handle errors
      if (!data.success) {

       

        if (data.error_email) {
          $('#email-field').addClass('error');
          errorAll = errorAll + ' ' + data.error_email;
        }
        if (data.error_phone) {
          $('#phone-field').addClass('error');
          errorAll = errorAll + ' ' + data.error_phone;
        }
        if (data.error_message) {
          $('#message-field').addClass('error');
          errorAll = errorAll + ' ' + data.error_message;
        }
        messageContainer.addClass('error');
        messageText.html(errorAll);
      } else {
		  
		  $("#enq-form")[0].reset();
        // display success message
        $('.mail-send').html(data.success);
		$('.mail-send').addClass('success_box');

        $('#contact-form .form-control').each(function () {
          $(this).fadeIn().val($(this).attr('placeholder'));
        });
		$('.mail-send').slideDown('slow', 'swing');
      setTimeout(function () {
        $('.mail-send').slideUp('slow', 'swing');
      }, 5000);
      }
	  
      
    }).fail(function (data) {
      // for debug
      console.log(data)
    });

    //e.preventDefault();
  });
}(jQuery, window, document));