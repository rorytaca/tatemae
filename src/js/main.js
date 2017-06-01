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
  'https://source.unsplash.com/vZlTg_McCDo/800x600',
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
  // const element = <Gallery imgUrls={imgUrls} />;
  // ReactDOM.render(
  //   element,
  //   document.getElementById('mount')
  // );

  const element2 = <Carousel slides={carouselSlides} orientation={'horizontal'} navType={'bullets'} autoplay={true} autoplaySpeed={12000} />;
  ReactDOM.render(
    element2,
    document.getElementById('carousel-mount')
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
});


