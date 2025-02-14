document.addEventListener("DOMContentLoaded", function () {
    var swiper = new Swiper('.swiper-container', {
        slidesPerView: "auto",
        spaceBetween: 20,
        loop: true,
        grabCursor: true,
        centeredSlides: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        mousewheel: {
            forceToAxis: true, // Ensures scrolling moves in one direction
            sensitivity: 1, // Keeps smooth but not too slow
            releaseOnEdges: true, // Prevents weird stops at edges
        },
        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },
        breakpoints: {
            640: { 
                slidesPerView: 2, 
                centeredSlides: true
            },
            1024: { 
                slidesPerView: 3, 
                centeredSlides: true
            }
        }
    });
});
