// Import our custom CSS
import "../scss/styles.scss";


// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";

// svg
import heroIcon from "../../app/icons/hero.svg";

//js
import "./app.js"

const heroDiv = document.getElementById("hero");

if (heroDiv) {
  heroDiv.innerHTML = heroIcon;
}
