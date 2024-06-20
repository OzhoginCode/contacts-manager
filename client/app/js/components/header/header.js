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
              </li>
            </ul>

            <section class="header__buttons-group">
              <button
                id="header__signin"
                class="button"
                data-bs-target="#exampleModalToggle"
                data-bs-toggle="modal"
              >
                Sign in
              </button>
            
              <button type="button" id="header__user-button" class="button" data-bs-toggle="modal" data-bs-target="#userModal">
                
              </button>
              <div class="modal fade" id="userModal" tabindex="-1" aria-labelledby="userModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <form id="userModalForm">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="userModalLabel">Edit User Account</h1>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <div class="form-floating mb-3">
                        <input type="email" class="form-control" id="editUserEmail" placeholder="name@example.com" name="email" required="" value="" autocomplete="on">
                        <label for="editUserEmail">Email address</label>
                      </div>
                      <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="userModalPassword" name="password" placeholder="Password" value="" autocomplete="current-password">
                        <label for="userModalPassword">Password</label>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="button button-grey" data-bs-dismiss="modal">Close</button>
                      <button type="submit" class="button button-purple" data-bs-dismiss="modal">Save changes</button>
                    </div>
                  </form>
                </div>
              </div>
              </div>
              <button type="button" id="header__exit-button" class="button" data-bs-toggle="modal" data-bs-target="#exitModal">
                Exit
              </button>
              <div class="modal fade" id="exitModal" tabindex="-1" aria-labelledby="exitModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="exitModalLabel">Exit</h1>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      Are you sure?
                    </div>
                    <div class="modal-footer">
                      <button type="button" id="exitButton"  class="button button-grey" data-bs-dismiss="modal">Yes</button>
                      <button type="button" class="button button-purple" data-bs-dismiss="modal">No</button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
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
