const menuItems = document.getElementsByClassName('menu-item');
const calculateActiveLink = (newHash) => {
  for (let item of menuItems) {
    const link = item.firstChild;

    if (link.hash === newHash) {
      link.classList.add('active-link');
    }

    if (link.hash !== newHash) {
      link.classList.remove('active-link');
    }
  }
};
const goTop = () => {
  const href = window.location.href;
  const hashPosition = href.indexOf('#');
  const newHref = href.slice(0, hashPosition);

  window.location.href = newHref;

  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};


calculateActiveLink(window.location.hash);
document.addEventListener('hashchange', function (e) {
  const newHash = e.target.location.hash;
  calculateActiveLink(newHash);
});


const pagesObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    const pageId = entry.target.id;
    const isPageVisible = entry.isIntersecting;

    if (isPageVisible) {
      calculateActiveLink(`#${pageId}`);
      window.location.hash = pageId;
    }

    if (pageId === 'main-photo' && isPageVisible) {
      for (let item of menuItems) {
        item.firstChild.classList.remove('active-link');
      }
      window.location.hash = '';
    }

  });
}, { threshold: 0.7 });

for (let item of menuItems) {
  const pageId = item.firstChild.hash;
  pagesObserver.observe(document.querySelector(pageId));
}
pagesObserver.observe(document.querySelector('#main-photo'));


// burger menu logic
const burgerMenuElement = document.querySelector('.burger-menu');
const burgerMenuButton = document.querySelector('.burger-menu-toggle-btn');
const burgerLinks = document.getElementsByClassName('link burger');

const showBurgerMenu = () => {
  burgerMenuElement.classList.toggle('menu-open');
  burgerMenuButton.classList.toggle('button-menu-open');
};

burgerMenuButton.addEventListener('click', showBurgerMenu);

for (const elem of burgerLinks) {
  elem.addEventListener('click', showBurgerMenu);
}
