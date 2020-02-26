// TYPEWRITER EFFECT 
var Typewriter = function (txtElement, words, wait = 2000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}

// Type Method
Typewriter.prototype.type = function () {

    // Current word index
    const current = this.wordIndex % this.words.length;

    // current word full text
    const fullTxt = this.words[current];

    // console.log(fullTxt)

    // CHeck if deleting
    if (this.isDeleting) {

        //remove character
        this.txt = fullTxt.substring(0, this.txt.length - 1);

    } else {

        //add character
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt"> ${this.txt} </span>`;

    // Init Type Speed
    let typeSpeed = 200;

    if (this.isDeleting) {
        typeSpeed /= 2;
    }

    // Check if word is complete
    if (!this.isDeleting && this.txt === fullTxt) {

        // Make pause at end
        typeSpeed = this.wait;

        // Set deleting to true
        this.isDeleting = true

    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;

        //Move to the next word
        this.wordIndex++;

        // Pause before start typing
        typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed)
}

// Init On DOM load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
    const txtElement = document.querySelector('.txt-typed');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');

    // Init Typewriter
    new Typewriter(txtElement, words, wait);

}




// SCROLL TO TOP 
(function () {
    'use strict';

    var goToTop = document.querySelector('.back-to-top');
    // var addClass = goToTop.classList.add('visible');
    // var removeClass = goToTop.classList.remove('visible');

    // Track scrolling 
    function TrackPageScroll() {
        var pointsScrolled = window.pageYOffset;
        var coordinate = document.documentElement.clientHeight;

        pointsScrolled > coordinate ? goToTop.classList.add('visible') : goToTop.classList.remove('visible')
    }

    function backToTop() {
        if (window.pageYOffset > 0) {
            window.scrollBy(0, -80);
            setTimeout(backToTop, 10);
        }
    }

    window.addEventListener('scroll', TrackPageScroll);
    goToTop.addEventListener('click', backToTop);

})();
// SCROLL TO TOP ENDS




// TEAM CAROUSEL BEGINS <=======

// http://madewithenvy.com/ecosystem/articles/2015/exploring-order-flexbox-carousel/
var $carousel = document.querySelector('.carousel');
var $seats = document.querySelectorAll('.carousel-seat');
var $toggle = document.getElementsByClassName('toggle');

document.addEventListener("click", delegate(toggleFilter, toggleHandler));

// Common helper for event delegation.
function delegate(criteria, listener) {
    return function (e) {
        var el = e.target;
        do {
            if (!criteria(el)) {
                continue;
            }
            e.delegateTarget = el;
            listener.call(this, e);
            return;
        } while ((el = el.parentNode));
    };
}

// Custom filter to check for required DOM elements
function toggleFilter(elem) {
    return (elem instanceof HTMLElement) && elem.matches(".toggle");
    // OR
    // For < IE9
    // return elem.classList && elem.classList.contains('btn');
}

// Custom event handler function
function toggleHandler(e) {

    var $newSeat;
    var $el = document.querySelector('.is-ref');
    var $currSliderControl = e.delegateTarget;

    // Info: e.target is what triggers the event dispatcher to trigger and e.currentTarget is what you assigned your listener to.

    $el.classList.remove('is-ref');
    if ($currSliderControl.getAttribute('data-toggle') === 'next') {
        $newSeat = next($el);
        $carousel.classList.remove('is-reversing');
    } else {
        $newSeat = prev($el);
        $carousel.classList.add('is-reversing');
    }

    $newSeat.classList.add('is-ref');
    $newSeat.style.order = 1;
    for (var i = 2; i <= $seats.length; i++) {
        $newSeat = next($newSeat);
        $newSeat.style.order = i;
    }

    $carousel.classList.remove('is-set');
    return setTimeout(function () {
        return $carousel.classList.add('is-set');
    }, 50);

    function next($el) {
        if ($el.nextElementSibling) {
            return $el.nextElementSibling;
        } else {
            return $carousel.firstElementChild;
        }
    }

    function prev($el) {
        if ($el.previousElementSibling) {
            return $el.previousElementSibling;
        } else {
            return $carousel.lastElementChild;
        }
    }
}
// TEAM CAROUSEL ENDS =========>




