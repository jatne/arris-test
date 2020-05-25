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

const mainNavScrollHandler = () => {
  if ( document.querySelector('.main-header__nav .nav__main') ) {
    const navMain =  document.querySelector('.main-header__nav .nav__main');
    navMain.style.width = '100%';
    const navMainList = navMain.querySelector('ul');
    const arrowLeft =  document.querySelector('.nav__arrow--left');
    const arrowRight =  document.querySelector('.nav__arrow--right');
    const diff = navMainList.scrollWidth - navMain.clientWidth;
    navMainList.style.marginLeft = 0;
    navMain.style.width = diff ? `${navMain.clientWidth}px` : '100%';
    let isNavScrolled = false;

    if ( diff && !isNavScrolled ) {
      arrowRight.classList.remove('nav__arrow--not-active');
    } else {
      arrowRight.classList.add('nav__arrow--not-active');
    }

    if ( diff && isNavScrolled ) {
      arrowLeft.classList.remove('nav__arrow--not-active');
    } else {
      arrowLeft.classList.add('nav__arrow--not-active');
    }

    arrowRight.addEventListener('click', () => {
      isNavScrolled = true;
      navMainList.style.marginLeft = `-${diff}px`;
    });

    arrowLeft.addEventListener('click', () => {
      isNavScrolled = false;
      navMainList.style.marginLeft = 0;
    });

    navMainList.addEventListener('transitionend', () => {
      if ( isNavScrolled ) {
        arrowLeft.classList.remove('nav__arrow--not-active');
        arrowRight.classList.add('nav__arrow--not-active');
      }

      if ( !isNavScrolled && diff ) {
        arrowLeft.classList.add('nav__arrow--not-active');
        arrowRight.classList.remove('nav__arrow--not-active');
      }
    }, false)
  }
}

mainNavScrollHandler();

const resetMobileNav = () => {
  document.body.classList.remove('lock');
  document.querySelector('.main-header').className = 'main-header';
}

window.addEventListener('resize', mainNavScrollHandler);
window.addEventListener('resize', resetMobileNav);

const burgers = document.querySelectorAll('.burger');
const mobileSearchBtn = document.querySelector('.main-header-mobile__search .btn__search');

const handleMobileMenu = event => {
  const target = event.currentTarget;
  const mainHeader = document.querySelector('.main-header');

  switch ( target.dataset.mode ) {
    case 'mobile':
      if ( mainHeader.classList.contains('open') ) {
        if ( [...mainHeader.classList].includes(`open-${target.dataset.target}`) ) {
          document.body.classList.remove('lock')
          mainHeader.classList.remove('open')
          mainHeader.classList.remove(`open-${target.dataset.target}`);
        } else {
          mainHeader.className = [...mainHeader.classList].filter(singleClass => !singleClass.match(/^open-/)).join(' ');
          mainHeader.classList.add(`open-${target.dataset.target}`);
        }
      } else {
        window.scrollTo(0,0);
        document.body.classList.add('lock')
        mainHeader.classList.add('open')
        mainHeader.classList.add(`open-${target.dataset.target}`);
      }
      break;
      case 'additional':
        target.classList.toggle('active');
        document.querySelector('.menu-additional').classList.toggle('active')
        break;
    }
}

mobileSearchBtn.addEventListener('click', handleMobileMenu);
burgers.forEach(burger => burger.addEventListener('click', handleMobileMenu));
