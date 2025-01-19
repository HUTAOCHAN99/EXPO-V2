  //  CAROUSEL 3D
  var CardSlider = new Swiper('.card-slider', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    slidesPerView: 3,
    spaceBetween: 10,
    coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2.5,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    on: {
        slideChange: function () {
            const slides = document.querySelectorAll('.swiper-slide');
            slides.forEach((slide, index) => {
                if (index === this.activeIndex || index === this.activeIndex + 1 || index === this.activeIndex - 1) {
                    slide.style.zIndex = '1';
                } else {
                    slide.style.zIndex = '0';
                }
            });
        },
    }
});