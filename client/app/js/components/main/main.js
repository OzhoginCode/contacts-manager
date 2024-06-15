import { HeroSection } from "#js/components/main/hero-section.js";
import { NewEntrySection } from "#js/components/main/new-entry-section.js";
import { EntriesListSection } from "#js/components/main/entries-list-section.js";

export const Main = {
  tagName: "main-component",

  create() {
    const main = document.createElement("main");
    main.className = "main";
    main.id = "main";

    const heroSection = HeroSection.create();
    main.appendChild(heroSection);

    const newEntrySection = NewEntrySection.create();
    main.appendChild(newEntrySection);

    const entriesListSection = EntriesListSection.create();
    main.appendChild(entriesListSection);

    return main;
  },

  init(main) {},

  getAll(container = document.body) {
    return container.getElementsByClassName(this.tagName);
  },
};
