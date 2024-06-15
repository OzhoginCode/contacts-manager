// Import our custom CSS
import "#scss/styles.scss";
import { Header } from "#js/components/header/header.js";
import { Main } from "#js/components/main/main.js";
import { Footer } from "#js/components/footer/footer.js";

import logoIcon from "#icons/logo.svg";
import heroIcon from "#icons/hero.svg";

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");

  const header = Header.create();
  Header.init(header);
  app.appendChild(header);

  const main = Main.create();
  Main.init(main);
  app.appendChild(main);

  const footer = Footer.create();
  Footer.init(footer);
  app.appendChild(footer);
});

// svg
document.addEventListener("DOMContentLoaded", () => {
  const logo = document.createElement("img");
  logo.src = logoIcon;
  logo.alt = "LOGO";
  logo.className = "navbar-logo";
  document.getElementById("header-logo").appendChild(logo);

  const heroMobile = document.createElement("img");
  heroMobile.src = logoIcon;
  heroMobile.alt = "passWD40 logo";
  heroMobile.className = "hero-section__mobile";
  document.getElementById("hero-mobile").appendChild(heroMobile);

  const heroDesktop = document.createElement("img");
  heroDesktop.src = heroIcon;
  heroDesktop.alt = "passWD40 logo";
  heroDesktop.className = "hero-section__desktop";
  document.getElementById("hero-desktop").appendChild(heroDesktop);
});
