(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').css('top', '0px');
        } else {
            $('.sticky-top').css('top', '-100px');
        }
    });


    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";

    $(window).on("load resize", function () {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
                function () {
                    const $this = $(this);
                    $this.addClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "true");
                    $this.find($dropdownMenu).addClass(showClass);
                },
                function () {
                    const $this = $(this);
                    $this.removeClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "false");
                    $this.find($dropdownMenu).removeClass(showClass);
                }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav: false,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });

})(jQuery);






const products = [
    { image: 'img/video_image/0.jpg', title: 'Introduction' ,url: 'watch.html?video=Introduction'},
    { image: 'img/video_image/1.jpg', title: 'Test 1 first paper' ,url: 'watch.html?video=test1firstpaper'},
    { image: 'img/video_image/2.jpg', title: 'Test 1 second paper' ,url: 'watch.html?video=test1secondepaper'},
    { image: 'img/video_image/3.jpg', title: 'Test 2 first paper' ,url: 'watch.html?video=test2firstpaper'},
    { image: 'img/video_image/4.jpg', title: 'Test 2 second paper' ,url: 'watch.html?video=test2secondepaper'},
    { image: 'img/video_image/5.jpg', title: 'Test 3 first paper' ,url: 'watch.html?video=test3firstpaper'},
    { image: 'img/video_image/6.jpg', title: 'Test 3 second paper' ,url: 'watch.html?video=test3secondepaper'},
    { image: 'img/video_image/7.jpg', title: 'Test 4 first paper' ,url: 'watch.html?video=test4firstpaper'},
    { image: 'img/video_image/8.jpg', title: 'Test 4 second paper' ,url: 'watch.html?video=test4secondepaper'},
    { image: 'img/video_image/9.jpg', title: 'Test 5 first paper' ,url: 'watch.html?video=test5firstpaper'},
    { image: 'img/video_image/10.jpg', title: 'Test 6 first paper' ,url: 'watch.html?video=test6firstpaper'},
    { image: 'img/video_image/11.jpg', title: 'Test 6 second paper' ,url: 'watch.html?video=test6secondepaper'},
    { image: 'img/video_image/12.jpg', title: 'Test 7 first paper' ,url: 'watch.html?video=test7firstpaper'},
    { image: 'img/video_image/13.jpg', title: 'Test 7 second paper' ,url: 'watch.html?video=test7secondepaper'},
    { image: 'img/video_image/14.jpg', title: 'Test 8 first paper' ,url: 'watch.html?video=test8firstpaper'},
    { image: 'img/video_image/15.jpg', title: 'Test 8 second paper' ,url: 'watch.html?video=test8secondepaper'},
    { image: 'img/video_image/16.jpg', title: 'Test 9 second paper' ,url: 'watch.html?video=test9secondepaper'},
    { image: 'img/video_image/17.jpg', title: 'Test 10 second paper' ,url: 'watch.html?video=test10secondepaper'},
    { image: 'img/video_image/18.jpg', title: 'Test 11 second paper' ,url: 'watch.html?video=test11secondepaper'},
    { image: 'img/video_image/19.jpg', title: 'Test 12 second paper' ,url: 'watch.html?video=test12secondepaper'},
    { image: 'img/video_image/20.jpg', title: 'Test 13 second paper' ,url: 'watch.html?video=test13secondepaper'}
];

const gridContainer = document.querySelector('.product-item');

products.forEach((product) => {
    const cardHTML = `
        <div class="col-md-4">
            <div class="product-card"  data-url="${product.url}">
                <img src="${product.image}" width="100%" alt="${product.title}" class="product-image" >
                <h2 class="product-title">${product.title}</h2>
            </div>
        </div>
    `;
    gridContainer.innerHTML += cardHTML;
});

// select all product cards
const productCards = document.querySelectorAll('.product-card');



// add hover animation to each product card
productCards.forEach((card) => {

    card.addEventListener('click', (event) => {

        const cardElement = event.target.closest('.product-card'); // get the closest product card element
        const url = cardElement.getAttribute('data-url');

        if (url) {
            window.location.href = url;
        } else {
            console.error("No URL found!");
        }
    });
});

var player = videojs('my-video');

// Enable the quality selector plugin
// player.httpSourceSelector();
  // Automatically select the highest quality on startup
//   player.on('loadedmetadata', function() {
    // var qualityLevels = player.qualityLevels();
    // var bestQuality = qualityLevels.length - 1;
    // qualityLevels.selectedIndex_ = bestQuality;  // Select the highest quality by default
//   });


// Add event listener for autoplaying the video
player.ready(function() {
    console.log("auto paly")
    player.play();
  });
