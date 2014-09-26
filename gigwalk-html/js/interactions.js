

$(document).ready(function() {
	
	//******** device detection and class assignment ******** //	
	
	// detect if is touch
	function isTouchDevice(){
    return typeof window.ontouchstart !== 'undefined';
	}

	// if not touch
	if (!isTouchDevice()) {
		
		// add 'desktop' class to body
		$(function() {
	    var body = $(".body");
	    body.addClass(' desktop');
	    
		});
 
	// else if touch, add classes to body
	} else {
		
	  // add 'touch' 
		$(function() {
			var body = $(".body");
			body.addClass(' touch');
			
			// now get which device, add 'ios' or 'android'
			$(function() {
			  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

			  if (userAgent.match((/iPad/i) || (/iPhone/i) || (/iPod/i))) {
			  	body.addClass(' ios');
			  	
			  } else if (userAgent.match(/Android/i)) {
			    body.addClass(' android');
			  }
			});
		});
	}
	
	//******** responsive side nav display ******** //
	
		//this gets the selected value on load
		var navLocation = $('.nav-sections').find('.active').text();
		$( '.nav-active-holder' ).html( navLocation );
		
	  //this updates teh button on change location
		$('.nav-sections li').click(function() {
			$('.nav-sections').find('li.active').removeClass('active');
			$(this).addClass('active');
			var navLocation = $('.nav-sections').find('.active').text();
			$( '.nav-active-holder' ).html( navLocation );
		});
		
		//this opens and closes the sidenav
		$('.sidenav').addClass(' selective-hide');
		$( '.nav-active-holder' ).click(function() {
			$('.sidenav').toggleClass('selective-hide');
		});
				
	
	//******** initialize bootstrap components ******** //	
	
	$(function () {
    $('.hint').popover({
        selector: '[data-toggle="popover"]'
    });
	});
	
	$('.datepicker').datepicker()
	
	
	//******** project scheduling "repeats" panel ******** //	
	$('.repeats-setter').click(function() {
		if ( $('.set-repeats').css('display') == 'none' ) {
		  $('.set-repeats').css('display','block');
		} else {
		  $('.set-repeats').css('display','none');
		}
	});
	
	//******** project "materials" options panel ******** //	
		$('.materials.buttonly').click(function() {
			if ( $('.materials.options').css('display') == 'none' ) {
			  $('.materials.options').css('display','block');
			} else {
			  $('.materials.options').css('display','none');
			}
		});
	
	
	
});




// - - - - - - - - - - - - - END DOM READY - - - - - - - - - - - - - //


//***** fixes positioning bug for modal with keyboard for iPhone and iPad ***** //   

if( navigator.userAgent.match(/iPhone|iPad|iPod/i) ) {

  $('.modal').on('show.bs.modal', function() {
    setTimeout(function () {
      scrollLocation = $(window).scrollTop();
      $('.modal')
          .addClass('modal-ios')
          .height($(window).height())
          .css({'margin-top': scrollLocation + 'px'});
    }, 0);
  });

  $('input').on('blur', function(){
    setTimeout(function() {
      // This causes iOS to refresh, fixes problems when virtual keyboard closes
      $(window).scrollLeft(0);

      var $focused = $(':focus');
      // Needed in case user clicks directly from one input to another
      if(!$focused.is('input')) {
        // Otherwise reset the scroll to the top of the modal
        $(window).scrollTop(scrollLocation);
      }
    }, 0);
  })

}

  
//***** iPhone orientation redraw fix ***** // 

(function(w){

	// This fix addresses an iOS bug, so return early if the UA claims it's something else.
	var ua = navigator.userAgent;
	if( !( /iPhone|iPad|iPod/.test( navigator.platform ) && /OS [1-5]_[0-9_]* like Mac OS X/i.test(ua) && ua.indexOf( "AppleWebKit" ) > -1 ) ){
		return;
	}

    var doc = w.document;

    if( !doc.querySelector ){ return; }

    var meta = doc.querySelector( "meta[name=viewport]" ),
        initialContent = meta && meta.getAttribute( "content" ),
        disabledZoom = initialContent + ",maximum-scale=1",
        enabledZoom = initialContent + ",maximum-scale=10",
        enabled = true,
		x, y, z, aig;

    if( !meta ){ return; }

    function restoreZoom(){
        meta.setAttribute( "content", enabledZoom );
        enabled = true;
    }

    function disableZoom(){
        meta.setAttribute( "content", disabledZoom );
        enabled = false;
    }

    function checkTilt( e ){
		aig = e.accelerationIncludingGravity;
		x = Math.abs( aig.x );
		y = Math.abs( aig.y );
		z = Math.abs( aig.z );

		// If portrait orientation and in one of the danger zones
        if( (!w.orientation || w.orientation === 180) && ( x > 7 || ( ( z > 6 && y < 8 || z < 8 && y > 6 ) && x > 5 ) ) ){
			if( enabled ){
				disableZoom();
			}        	
        }
		else if( !enabled ){
			restoreZoom();
        }
    }

	w.addEventListener( "orientationchange", restoreZoom, false );
	w.addEventListener( "devicemotion", checkTilt, false );

})( this );

  





