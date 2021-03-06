const portfolioPopup = () => {
  const popupPortfolio = document.querySelector('.popup-portfolio'),
        popupPortfolioSliderWrap = document.querySelector('.popup-portfolio-slider-wrap'),
        popupPortfolioSlider = document.querySelector('.popup-portfolio-slider'),
        portfolioText = document.querySelectorAll('.popup-portfolio-text'),
        arrowLeft = document.querySelector('#popup_portfolio_left'),
        arrowRight = document.querySelector('#popup_portfolio_right'),
        slides = document.querySelectorAll('.popup-portfolio-slider__slide'),
        current = document.querySelector('#popup-portfolio-counter').querySelector('.slider-counter-content__current'),
        total = document.querySelector('#popup-portfolio-counter').querySelector('.slider-counter-content__total');

        let currentPosition = 0,
        currentSlide = 1,
        step = (screen.width <= 1024) ? 857 : 624;
        total.innerText = popupPortfolioSlider.children.length;
        portfolioText.forEach(el => el.style.display = 'none');

  popupPortfolioSliderWrap.style.position = 'absolute'

  const style = document.createElement('style');
  style.innerHTML = `
        .popup-portfolio-text {
          margin-right: 30px !important;
        }
        .popup-portfolio-text--tablet {
          background-color: #fff;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          margin-right: 30px !important;
        }
        .popup-portfolio-slider {
            transition:transform 0.5s !important;
        }
    `
  document.head.appendChild(style);

  const idSetter = (selector) => {
    let id = 0;
    selector.forEach(el => {
      id++
      el.setAttribute('id', `portfolio-slider__slide-frame--${id}`)
    })
  }

  idSetter(document.querySelector('.portfolio-slider').querySelectorAll('.portfolio-slider__slide-frame'));
  idSetter(document.querySelector('.portfolio-slider-mobile').querySelectorAll('.portfolio-slider__slide-frame'))

  const cleaner = () => {
    document.querySelectorAll('.popup-portfolio-text').forEach(el => el.style.display = 'none')
  }

  if (screen.width <= 1024 && screen.width >= 768) {
    slides.forEach(el => {
      el.style.cssText = 'margin-top: 292px'
    })
    portfolioText.forEach(el => el.classList.add('popup-portfolio-text--tablet'))
    document.querySelectorAll('.popup-portfolio-text__title').forEach(el => el.style.marginTop = 'auto')
  } else if (screen.width < 768) {
    slides.forEach(el => el.style.display = 'none')
  }

  const portfolioPopupHandler = (e) => {
    if (e.target.closest('.portfolio-slider__slide-frame')) {
      let target = e.target.getAttribute('id').replace(/\D/g, '') - 1;
      current.innerText = target + 1;
      arrowLeft.style.display = 'none'
      popupPortfolio.style.visibility = 'visible';
      cleaner();
      if (screen.width > 1024) {
        portfolioText[currentSlide - 1].style.display = 'block'
      } else if (screen.width <= 1024 && screen.width >= 768) {
        document.querySelectorAll('.popup-arrow').forEach(el => el.style.marginTop = '100px')
        portfolioText[currentSlide - 1].style.display = 'flex'
      }
      popupPortfolioSlider.style.transform = `translateY(${-step * target}px)`
      currentSlide = +current.textContent
      currentPosition = -step * target;
      if (screen.width < 768) {
        slides.forEach(el => el.style.display = 'none')
        slides[target].style.display = 'block'
        portfolioText[currentSlide - 1].style.cssText = 'display: flex; margin-top: 300px'
        popupPortfolioSlider.style.transform = `translateY(${0}px)`
      }
    } else if (e.target.closest('#popup_portfolio_right')) {
      cleaner()
      if (screen.width >= 768) {
        if (screen.width > 1024) {
          portfolioText[currentSlide - 1].style.display = 'block'
        } else if (screen.width <= 1024 && screen.width >= 768) {
          portfolioText[currentSlide - 1].style.display = 'flex'
        }
        currentSlide++
        arrowLeft.style.display = 'flex';
        current.innerText++
        currentPosition = currentPosition - step;
        popupPortfolioSlider.style.transform = `translateY(${currentPosition}px)`
        if (currentSlide == 10) {
          arrowRight.style.display = 'none'
        } 
      } else {
        currentSlide++
        arrowLeft.style.display = 'flex'
        if (currentSlide >= 10) {
          arrowRight.style.display = 'none'
        }
        current.innerText++
        slides.forEach(el => el.style.display = 'none')
        slides[+current.innerText - 1].style.display = 'block'
        portfolioText[currentSlide - 1].style.cssText = 'display: flex; margin-top: 300px'
      }
    } else if (e.target.closest('#popup_portfolio_left')) {
      if (screen.width >= 768) {
        cleaner()
        currentSlide--
        current.innerText = currentSlide;
        if (screen.width > 1024) {
          portfolioText[currentSlide - 1].style.display = 'block'
        } else if (screen.width <= 1024 && screen.width >= 768) {
          document.querySelectorAll('.popup-arrow').forEach(el => el.style.marginTop = '100px')
          portfolioText[currentSlide - 1].style.display = 'flex'
        }
        currentPosition = currentPosition + step;
        popupPortfolioSlider.style.transform = `translateY(${currentPosition}px)`
        if (currentSlide == 1) {
          arrowLeft.style.display = 'none'
        }
      } else {
        currentSlide--
        arrowRight.style.display = 'flex'
        if (currentSlide == 1) {
          arrowLeft.style.display = 'none'
        }
        current.innerText--
        slides.forEach(el => el.style.display = 'none')
        slides[currentSlide - 1].style.display = 'block'
        portfolioText[currentSlide - 1].style.cssText = 'display: flex; margin-top: 300px'
      }
    } else if (!e.target.closest('.popup-dialog-portfolio') || e.target.closest('.close') && e.target.closest('.popup-portfolio')) {
      popupPortfolio.style.visibility = 'hidden';
    }
  }
  window.addEventListener('click', portfolioPopupHandler)
}


export default portfolioPopup;
