const scroll = () => {
  const menu = document.querySelector('.popup-menu-nav'),
    menuItems = menu.querySelectorAll('.menu-link'),
    upBtn = document.querySelector('.button-footer');

  const scrollTo = (target) => {
    window.scroll({
      left: 0,
      top: target.getBoundingClientRect().top,
      behavior: 'smooth'
    });
  };

  const scrollHandler = (e) => {
    e.preventDefault();
    const id = e.target.getAttribute('href');
    if (!e.target.closest('.link-list-menu')) {
      const block = document.querySelector(id);
      scrollTo(block)
    } else {
      return
    }
  }

  upBtn.addEventListener('click', scrollHandler)
  menuItems.forEach(el => {
    el.addEventListener('click', scrollHandler)
  })
}
export default scroll;
