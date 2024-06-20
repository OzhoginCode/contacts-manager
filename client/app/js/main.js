// Import our custom CSS
import '#scss/styles.scss';

import { Header } from '#js/components/header/header.js';
import { Main } from '#js/components/main/main.js';
import { Footer } from '#js/components/footer/footer.js';

import logoIcon from '#icons/logo.svg';
import heroIcon from '#icons/hero.svg';
import newEntryIcon from '#icons/new-entry-icon.svg';
import signinIcon from '#icons/signin-icon.svg';
import exitIcon from '#icons/exit-icon.svg';

import app from '#js/app.js';

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root'); // change

  const header = Header.create();
  Header.init(header);
  root.appendChild(header);

  const main = Main.create();
  Main.init(main);
  root.appendChild(main);

  const footer = Footer.create();
  Footer.init(footer);
  root.appendChild(footer);
});

// svg
document.addEventListener('DOMContentLoaded', () => {
  const logo = document.createElement('img');
  logo.src = logoIcon;
  logo.alt = 'LOGO';
  logo.className = 'navbar-logo';
  document.getElementById('header-logo').appendChild(logo);

  const heroMobile = document.createElement('img');
  heroMobile.src = logoIcon;
  heroMobile.alt = 'passWD40 logo';
  heroMobile.className = 'hero-section__mobile';
  document.getElementById('hero-mobile').appendChild(heroMobile);

  const heroDesktop = document.createElement('img');
  heroDesktop.src = heroIcon;
  heroDesktop.alt = 'passWD40 logo';
  heroDesktop.className = 'hero-section__desktop';
  document.getElementById('hero-desktop').appendChild(heroDesktop);

  const newEntryImg = document.createElement('img');
  newEntryImg.src = newEntryIcon;
  newEntryImg.alt = 'Add New Entry';
  newEntryImg.className = 'button__icon';
  const newEntryButton = document.getElementById('new-entry-button');
  newEntryButton.insertBefore(newEntryImg, newEntryButton.firstChild);

  const signinHeaderImg = document.createElement('img');
  signinHeaderImg.src = signinIcon;
  signinHeaderImg.alt = 'Signin Icon';
  signinHeaderImg.className = 'button__icon';
  const signinHeaderButton = document.getElementById('header__signin');
  signinHeaderButton.insertBefore(
    signinHeaderImg,
    signinHeaderButton.firstChild
  );

  const exitHeaderImg = document.createElement('img');
  exitHeaderImg.src = exitIcon;
  exitHeaderImg.alt = 'Exit Icon';
  exitHeaderImg.className = 'button__icon';
  const exitHeaderButton = document.getElementById('header__exit-button');
  exitHeaderButton.insertBefore(exitHeaderImg, exitHeaderButton.firstChild);

  const signinHeroImg = document.createElement('img');
  signinHeroImg.src = signinIcon;
  signinHeroImg.alt = 'Signin Icon';
  signinHeroImg.className = 'button__icon';
  const signinButton = document.getElementById('hero-section__signin');
  signinButton.insertBefore(signinHeroImg, signinButton.firstChild);

  app()
});

// document.addEventListener('DOMContentLoaded', () => );
