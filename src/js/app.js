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

if ( document.querySelector('.timer') ) {
  const releaseDate = new Date('2020-12-31T23:59:59').getTime();

  const interval = setInterval(() => {
    const now = new Date().getTime();
    const diff = releaseDate - now;
    const time = {
      days: diff > 0 ? Math.floor(diff / ( 1000 * 60 * 60 * 24 )) : 0,
      hours: diff > 0 ? Math.floor((diff%(1000 * 60 * 60 * 24))/(1000 * 60 * 60)) : 0,
      minutes: diff > 0 ?  Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)) : 0,
      seconds: diff > 0 ?  Math.floor((diff % (1000 * 60)) / 1000) : 0,
    }

    document.getElementById('timer-days').innerHTML = time.days;
    document.getElementById('timer-hours').innerHTML = time.hours;
    document.getElementById('timer-minutes').innerHTML = time.minutes;
    document.getElementById('timer-seconds').innerHTML = time.seconds;

    if ( diff < 0 ) {
      clearInterval(interval);
    }
  }, 1000);
}
