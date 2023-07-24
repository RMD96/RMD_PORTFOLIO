document.addEventListener('DOMContentLoaded', function() {
/***************** Splashscreen ******************/

window.addEventListener('load', function() {
  var splashscreen = document.querySelector('.splashscreen');
  splashscreen.classList.add('splashscreen--is-hidden');

  setTimeout(function() {
    splashscreen.style.display = 'none';

    /* Introduction Animation */
    var name = document.querySelector('.introduction__content-el--name');
    var job = document.querySelector('.introduction__content-el--job');

    if (name && job) {
      name.style.opacity = 1;
      name.style.transform = 'translateX(0)';
      job.style.opacity = 1;
      job.style.transform = 'translateX(0)';
    }
  }, 800);
});

  /***************** Responsive Nav ******************/

  var burger = document.querySelector('.navigation__burger');
  var navigationContainer = document.querySelector('.navigation__container');

  burger.addEventListener('click', function() {
    navigationToggle();
  });

  function navigationToggle() {
    burger.classList.toggle('navigation__burger--is-open');
    navigationContainer.classList.toggle('navigation__container--is-open');
    document.documentElement.classList.toggle('scroll-lock');
  }

  /***************** Smooth Scroll ******************/

  var links = document.querySelectorAll('a[href*="#"]:not([href="#0"])');
  links.forEach(function(link) {
    link.addEventListener('click', function(ev) {
      ev.preventDefault();

      if (navigationContainer.classList.contains('navigation__container--is-open')) {
        navigationToggle();
      }

      var target = document.querySelector(this.getAttribute('href'));
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });

/***************** Animations ******************/

var elements = document.querySelectorAll('.fade-in-element');
console.log('Connected to the HTML. Found elements:', elements);

var isScrolling = false;

function animateElements() {
  elements.forEach(function(element) {
    if (isElementInViewport(element) && !element.classList.contains('animate')) {
      element.classList.add('animate');
      console.log('Adding animate class to element:', element);
    }
  });
}


function isElementInViewport(element) {
  var rect = element.getBoundingClientRect();
  var isInViewport = (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
  console.log('Element:', element, 'is in viewport:', isInViewport);
  return isInViewport;
}

function handleScroll() {
  if (!isScrolling) {
    setTimeout(function() {
      elements.forEach(function(element) {
        if (!element.classList.contains('animate') && isElementInViewport(element)) {
          element.classList.add('animate');
          console.log('Adding animate class to element:', element);
        }
      });
      isScrolling = false;
    }, 100); // Adjust the delay as needed
    isScrolling = true;
  }
}

window.addEventListener('scroll', handleScroll);
window.addEventListener('resize', handleScroll);

animateElements();

  /***************** Work Carousel ******************/

  var workNavigation = document.querySelectorAll('.work__navigation-el');
  workNavigation.forEach(function(el) {
    el.addEventListener('click', function() {
      var parent = el.parentNode;
      var position = Array.prototype.indexOf.call(parent.children, el);

      parent.querySelectorAll('.work__navigation-el').forEach(function(child) {
        child.classList.remove('work__navigation-el--is-active');
      });
      el.classList.add('work__navigation-el--is-active');

      var workList = document.querySelector('.work__list');
      workList.querySelectorAll('.work__list-el').forEach(function(child) {
        child.classList.remove('work__list-el--is-active');
      });
      workList.children[position].classList.add('work__list-el--is-active');
    });
  });

  /***************** Get year ******************/
    var currentYear = new Date().getFullYear();
    document.getElementById('current-year').textContent = currentYear;
  /***************** Helper Function ******************/

  function isElementInViewport(element) {
    var rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
});
