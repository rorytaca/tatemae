import React from 'react';
import ReactDOM from 'react-dom';
import Gallery from './Gallery';
import Carousel from './Carousel';
import style from '../css/main.scss';

/* Consts for Image Gallery Demo */
let imgUrls = [
  'https://source.unsplash.com/3Z70SDuYs5g/800x600',
  'https://source.unsplash.com/01vFmYAOqQ0/800x600',
  'https://source.unsplash.com/2Bjq3A7rGn4/800x600',
  'https://source.unsplash.com/t20pc32VbrU/800x600',
  'https://source.unsplash.com/pHANr-CpbYM/800x600',
  'https://source.unsplash.com/3PmwYw2uErY/800x600',
  'https://source.unsplash.com/uOi3lg8fGl4/800x600',
  'https://source.unsplash.com/CwkiN6_qpDI/800x600',
  'https://source.unsplash.com/9O1oQ9SzQZQ/800x600',
  'https://source.unsplash.com/E4944K_4SvI/800x600',
  'https://source.unsplash.com/-hI5dX2ObAs/800x600',
  'https://source.unsplash.com/vZlTg_McCDo/800x600'
];

let carouselSlides = [
  '<div id="slide1" class="flex-container"><h1 class="flex center">Slide 1</h1></div>',
  '<div id="slide2" class="flex-container"><h1 class="flex center">Slide 2</h1></div>',
  '<div id="slide3" class="flex-container"><h1 class="flex center">Slide 3</h1></div>',
  '<div id="slide4" class="flex-container"><h1 class="flex center">Slide 4</h1></div>'
];


/* React page render */ 
document.addEventListener('DOMContentLoaded', function() {
  const element = <Gallery imgUrls={imgUrls} />;
  ReactDOM.render(
    element,
    document.getElementById('gallery-mount')
  );

  const element2 = <Carousel slides={carouselSlides} />;
  ReactDOM.render(
    element2,
    document.getElementById('carousel-mount-1')
  );
  const element3 = <Carousel slides={carouselSlides} orientation={'vertical'} navType={'bullets'} autoplay={true} autoplaySpeed={12000} />;
  ReactDOM.render(
    element3,
    document.getElementById('carousel-mount-2')
  );

  //TODO:: move these to seperate file eventually
  $("body").on("click",".jump-to", function(e) {
    e.preventDefault();
    var target = $(this).data("href");
    $("html, body").animate({ scrollTop: $(target).offset().top - 10 }, 500);
  });

  $("body").on("click",".mobile-menu-toggle", function(e) {
    $(".navigation").toggleClass("active");
  });

  //Copy to clipboard event handlers
  var copyCommandSupported = document.queryCommandSupported('copy');
  $(".copy-to-clipboard").on("click", function() {
    copyToClipboard($(this).parents().siblings("xmp")[0]);
    $(this).on("mouseout",function() {
      $(this).siblings('.copy-to-clipboard').children('.alert').html("Copy to clipboard");
    });

  });

  //DEMO SPECIFIC CODE BELOW

  $(document).scroll(function() {
    const scrollLoc = $(window).scrollTop();
    
    var coverletEnd = $(".coverlet").height();
    if ($(".nav-column").hasClass("page-top")) {
      if (scrollLoc > 100) {
        $(".nav-column").removeClass("page-top")
        // $(".scroll-down").fadeOut();
      }
    } else {
      if (scrollLoc < 100) {
        $(".nav-column").addClass("page-top");
        // $(".scroll-down").fadeIn();
      }       
    }

    //Navigation Tracker Function
    if ($(".navigation.trackable").length) {
      $('section').each(function() {
        if ($(this).offset().top < scrollLoc && $(this).offset().top > scrollLoc - 200) {
          $("nav li").removeClass("active");
          // console.log($("nav li a").find(`[data-href='#${this.id}']`));
          $("nav li a[data-href='#"+this.id+"']").parent().addClass("active");
          return false; // stops the iteration after the first one on screen
        }
      });
    }
  });

  //update nav tracker

  //form helper functions
  $("form .input-group").on("click", function(e) {
      if($("input", this).length > 0) {
        $("input", this).focus();
      }
      if($("textarea", this).length > 0) {
        $("textarea", this).focus();
      }
  });
  $("form .input-group.encapsulated input, form .input-group.encapsulated textarea").on("focusin",function(e) {
    var inputGroup = $(this).parent().parent();
    inputGroup.css("border","solid 1px #3af");
  });
  $("form .input-group.encapsulated input, form .input-group.encapsulated textarea").on("focusout",function(e) {
    var inputGroup = $(this).parent().parent();
    inputGroup.css("border","solid 1px #ccc");
  });

  //nav
  $("body").on("click",".mobile-menu-toggle", function(e) {
    $(this).toggleClass("active");
    var nav = $(this).sibling(".navigation");
    $(nav).toggleClass("active");
  });

  $(".progress-demo-btn").on("click", function() {
      var x = 0;
      $(".progress-bar").html("");
      var progressInterval = setInterval(function() {
        $(".progress-bar").css("width",x+"%");
        if (++x > 100) {
          window.clearInterval(progressInterval);
            $(".progress-bar").html("COMPLETE");
        }
      });
  });
});


/* ================================
copy to clipboard functions 
================================ */
function copyToClipboard(element) {
  selectText(element);
  var succeeded;
  try {
    succeeded = document.execCommand('copy');
  } catch (e) {
    succeeded = false;
  }

  if (succeeded) {
    var target = $(element).siblings('.code-pen-header').children('.copy-to-clipboard').children('span.alert');
    var original = target.html();
    target.html("Success!");
    setTimeout(function() {
      target.html(original);
    }, 2000); 
  }
  deselect(element);
}

function selectText(element) {
  if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
    element.select();
    return;
  }

  var rangeObj, selection;
  if (document.createRange) {
    rangeObj = document.createRange();
    rangeObj.selectNodeContents(element);
    selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(rangeObj);
  } else if (document.body.createTextRange) {
    rangeObj = document.body.createTextRange();
    rangeObj.moveToElementText(element);
    rangeObj.select();
  }
}

function deselect(element) {
  if (element) {
    if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
      element.blur();
      return;
    }
  }
  if (window.getSelection) {
    var selection = window.getSelection();
    if (selection.removeAllRanges) {
      selection.removeAllRanges();
    } else if (selection.empty) {
      selection.empty();
    }
  } else if (document.selection) {
    document.selection.empty();
  }
}
/* ================================
end of clipboard functions 
================================ */

function updateProgress(event) {
  if (event.lengthComputable) {
    var percentComplete = (event.loaded / event.total)*100;  
    $('.progress-bar').width(percentComplete + '%');
  } 
} 

