export const Footer = {
  tagName: 'footer-component',

  create() {
    const footer = document.createElement('footer');
    footer.className = 'footer';
    footer.id = 'footer';

    footer.innerHTML = `
      <div class="section text-center">made by Hexlers</div>
    `;

    return footer;
  },

  getAll(container = document.body) {
    return container.getElementsByClassName(this.tagName);
  },
};
