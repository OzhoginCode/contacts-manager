import * as bootstrap from 'bootstrap';
import '#scss/styles.scss';

import { Header } from '#js/components/header/header.js';
import { Main } from '#js/components/main/main.js';
import { Footer } from '#js/components/footer/footer.js';

import app from '#js/app.js';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');

  const header = Header.create();
  root.appendChild(header);

  const main = Main.create();
  root.appendChild(main);

  const footer = Footer.create();
  root.appendChild(footer);

  app();
});
