/*
 --------------------------------
 Ajax Contact Form
 --------------------------------
 + https://github.com/pinceladasdaweb/Ajax-Contact-Form
 + A Simple Ajax Contact Form developed in PHP with HTML5 Form validation.
 + Has a fallback in jQuery for browsers that do not support HTML5 form validation.
 + version 1.0.1
 + Copyright 2014 Pedro Rogerio
 + Licensed under the MIT license
 + https://github.com/pinceladasdaweb/Ajax-Contact-Form
 */
// JavaScript Document
var getUrl = window.location;
//for localhost
//var site_url = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1]+'/';
//for live site
var site_url = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[0];
(function ($, window, document, undefined) {
  'use strict';

  var form = $('#contact-form'),
    messageContainer = $('#message-contact'),
    messageText = $('#message-contact .message-text');


  $('.contactform').click(function(){


    // remove the error class
    form.find('.form-control').removeClass('error');
    messageContainer.removeClass('error');

    var errorAll = '';

    // get the form data
    var formData = {
      'name': $('input[name="form-name"]').val(),
      'email': $('input[name="form-email"]').val(),
	  'subject': $('input[name="form-subject"]').val(),
      'message': $('textarea[name="form-message"]').val()
      
    };

    // process the form
    $.ajax({
      type: 'POST',
      //url: 'contact.php',
      //data: formData,
	  url: site_url+'wp-admin/admin-ajax.php',
	  data: { 
                  'action': 'wpmlm_ajax_contact', //calls wp_ajax_nopriv_ajaxlogin
                  'fname': $('input[name="form-fname"]').val(),
				  'lname': $('input[name="form-lname"]').val(),
				  'mob': $('input[name="form-mob"]').val(),
				  'shift': $('select[name="form-shift"]').val(),
				  'camploc': $('select[name="form-camp-location"]').val(),
				  'email': $('input[name="form-email"]').val(),
				  'subject': $('input[name="form-subject"]').val(),
				  'jobtitle': $('input[name="form-jobtitle"]').val(),
				  'cname': $('input[name="form-cname"]').val(),
				  'staff_no': $('input[name="form-staffno"]').val(),
				  'message': $('textarea[name="form-message"]').val()
				  
				  
			},
      dataType: 'json',
      encode: true
    }).done(function (data) {
      // handle errors
      if (!data.success) {

        if (data.error_fname) {
          $('#fname-field').addClass('error');
          errorAll = data.error_fname;
        }
        
		if (data.error_mob) {
          $('#mob-field').addClass('error');
          errorAll = data.error_mob;
        }
		if (data.error_shift) {
          $('#shift-field').addClass('error');
          //errorAll = data.error_mob;
        }
		if (data.error_camp_location) {
          $('#camp-location-field').addClass('error');
          //errorAll = data.error_mob;
        }
        if (data.error_email) {
          $('#email-field').addClass('error');
          errorAll = errorAll + ' ' + data.error_email;
        }
        if (data.error_subject) {
          $('#subject-field').addClass('error');
          errorAll = errorAll + ' ' + data.error_subject;
        }
        if (data.error_message) {
          $('#message-field').addClass('error');
          errorAll = errorAll + ' ' + data.error_message;
        }
        messageContainer.addClass('error');
        messageText.html(errorAll);
      } else {
		  
		  $("#contact-form")[0].reset();
		  $('#shift-field').removeClass('error');
		  $('#camp-location-field').removeClass('error');
        // display success message
        $('.mail-send').html(data.success);
		$('.mail-send').addClass('success_box');

        /*$('#contact-form .form-control').each(function () {
          $(this).fadeIn().val($(this).attr('placeholder'));
        });*/
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
