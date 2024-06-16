export const Header = {
  tagName: 'header-component',

  create() {
    const header = document.createElement('header');
    header.className = 'header';
    header.id = 'header';

    header.innerHTML = `
      <nav class="navbar navbar-expand-lg section">
        <div class="container-fluid">
          <a id="header-logo" class="navbar-brand" href="/"></a>
          <button
            class="navbar-toggler mobile-menu-icon"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul class="navbar-nav me-auto mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">About</a>
              </li>
            </ul>
            
            <button
              class="header__signin"
              data-bs-target="#exampleModalToggle"
              data-bs-toggle="modal"
            >
              Sign in
            </button>
          </div>
        </div>
      </nav>
    `;
    return header;
  },

  init(header) {},

  getAll(container = document.body) {
    return container.getElementsByClassName(this.tagName);
  },
};
