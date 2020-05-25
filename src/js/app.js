if ( document.querySelector('.slider__latest-news') ) {
  const sliderLastestNewsItems = document.querySelectorAll('.latest-news-nav__item');
  const sliderLatestNews = new Swiper('.slider__latest-news .swiper-container', {
    loop: false,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    on: {
      slideChange: function() {
        sliderLastestNewsItems.forEach(item => {
          item.classList.remove('latest-news-nav__item--active');
          if ( item.dataset.slide == this.realIndex ) {
            item.classList.add('latest-news-nav__item--active');
          }
        })
      }
    }
  });

  const goToSlide = event => {
    const slideId = event.currentTarget.dataset.slide;
    sliderLatestNews.slideTo(slideId);
  }

  sliderLastestNewsItems.forEach(item => item.addEventListener('click', goToSlide));
}
