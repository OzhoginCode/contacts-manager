export const EntriesListSection = {
  tagName: 'entries-list-section',

  create() {
    const entriesListSection = document.createElement('ul');
    entriesListSection.className = 'entries-list';
    entriesListSection.id = 'entries-list';
    return entriesListSection;
  },

  init(entriesListSection) {},

  getAll(container = document.body) {
    return container.getElementsByClassName(this.tagName);
  },
};
