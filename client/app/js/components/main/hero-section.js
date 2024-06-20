import logoIcon from '#icons/logo.svg';
import heroIcon from '#icons/hero.svg';
import signinIcon from '#icons/signin-icon.svg';

export const HeroSection = {
  tagName: 'hero-section-component',

  create() {
    const heroSection = document.createElement('section');
    heroSection.className = 'hero-section';
    heroSection.id = 'hero-section';

    heroSection.innerHTML = `
      <section id="hero-mobile" class="hero-section__mobile">
        <img src="${logoIcon}" alt="passWD40 logo" class="hero-section__mobile">
      </section>
      <section id="hero-desktop" class="hero-section__desktop">
        <img src="${heroIcon}" alt="passWD40 logo" class="hero-section__desktop">
      </section>
      <div class="hero-container">
        <section class="hero-section__slogan">
          <h1>The Most Ultimate Password Manager</h1>
        </section>
        <section>
          <div
            class="modal fade"
            id="exampleModalToggle"
            aria-hidden="true"
            aria-labelledby="exampleModalToggleLabel"
            tabindex="-1"
          >
            <div class="modal-dialog modal-dialog-centered">
              <form id="loginUserForm">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalToggleLabel">Sign in</h1>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <div class="form-floating mb-3">
                      <input
                        type="email"
                        class="form-control"
                        id="floatingInput1"
                        placeholder="name@example.com"
                        name="email"
                        autocomplete="on"
                        required
                      />
                      <label for="floatingInput1">Email address</label>
                    </div>
                    <div class="form-floating">
                      <input
                        type="password"
                        class="form-control"
                        id="floatingPassword1"
                        placeholder="Password"
                        name="password"
                        autocomplete="on"
                        required
                      />
                      <label for="floatingPassword1">Password</label>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      class="button button-purple"
                      type="submit"
                      id="selectUser"
                      data-bs-dismiss="modal"  
                    >
                      Login
                    </button>
                    <p>Still not with us?</p>
                    <button
                      class="button button-grey"
                      data-bs-target="#exampleModalToggle2"
                      data-bs-toggle="modal"
                      type="button"
                    >
                      Create account
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div
            class="modal fade"
            id="exampleModalToggle2"
            aria-hidden="true"
            aria-labelledby="exampleModalToggleLabel2"
            tabindex="-1"
          >
            <div class="modal-dialog modal-dialog-centered">
              <form id="createUserForm">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalToggleLabel2">
                      Sign up
                    </h1>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                    </button>
                  </div>
                  <div class="modal-body">
                    <div class="form-floating mb-3">
                      <input
                        type="email"
                        class="form-control"
                        id="floatingInput2"
                        placeholder="name@example.com"
                        name="email"
                        autocomplete="on"
                        required
                      />
                      <label for="floatingInput2">Email address</label>
                    </div>
                    <div class="form-floating mb-3">
                      <input
                        type="password"
                        class="form-control"
                        id="floatingPassword2"
                        name="password"
                        placeholder="Password"
                        autocomplete="on"
                      />
                      <label for="floatingPassword2">Password</label>
                    </div>
                    <div class="form-floating">
                      <input
                        type="password"
                        class="form-control"
                        id="floatingPassword3"
                        placeholder="Password"
                        name="repeat_password"
                        autocomplete="on"
                        required
                      />
                      <label for="floatingPassword3">Repeat Password</label>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      class="button button-purple"
                      type="submit"
                      data-bs-dismiss="modal"  
                    >
                      Create account
                    </button>
                    <p>or</p>
                    <button
                      class="button button-grey"
                      data-bs-target="#exampleModalToggle"
                      data-bs-toggle="modal"
                      type="button"
                    >
                      Back to Login
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <button
            class="button signin"
            id="hero-section__signin"
            data-bs-target="#exampleModalToggle"
            data-bs-toggle="modal"
          >
            <img src="${signinIcon}" class="button__icon" alt="Signin Icon"></img>
            Sign in
          </button>
        </section>
      </div>
    `;
    return heroSection;
  },

  getAll(container = document.body) {
    return container.getElementsByClassName(this.tagName);
  },
};
