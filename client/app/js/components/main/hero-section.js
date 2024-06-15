export const HeroSection = {
  tagName: "hero-section-component",

  create() {
    const heroSection = document.createElement("section");
    heroSection.className = "hero-section";
    heroSection.id = "hero-section";

    heroSection.innerHTML = `
      <section id="hero-mobile" class="hero-section__mobile"></section>
      <section id="hero-desktop" class="hero-section__desktop"></section>
      
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
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="exampleModalToggleLabel">
                        Sign in
                      </h1>
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
                          id="floatingInput"
                          placeholder="name@example.com"
                        />
                        <label for="floatingInput">Email address</label>
                      </div>
                      <div class="form-floating">
                        <input
                          type="password"
                          class="form-control"
                          id="floatingPassword"
                          placeholder="Password"
                        />
                        <label for="floatingPassword">Password</label>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button class="button-purple">Login</button>
                      <p>Still not with us?</p>
                      <button
                        class="button-grey"
                        data-bs-target="#exampleModalToggle2"
                        data-bs-toggle="modal"
                      >
                        Create account
                      </button>
                    </div>
                  </div>
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
                      ></button>
                    </div>
                    <div class="modal-body">
                      <div class="form-floating mb-3">
                        <input
                          type="email"
                          class="form-control"
                          id="floatingInput"
                          placeholder="name@example.com"
                        />
                        <label for="floatingInput">Email address</label>
                      </div>
                      <div class="form-floating mb-3">
                        <input
                          type="password"
                          class="form-control"
                          id="floatingPassword"
                          placeholder="Password"
                        />
                        <label for="floatingPassword">Password</label>
                      </div>
                      <div class="form-floating">
                        <input
                          type="password"
                          class="form-control"
                          id="floatingPassword"
                          placeholder="Password"
                        />
                        <label for="floatingPassword">Repeat Password</label>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button class="button-purple">Create account</button>
                      <p>or</p>
                      <button
                        class="button-grey"
                        data-bs-target="#exampleModalToggle"
                        data-bs-toggle="modal"
                      >
                        Back to Login
                      </button>
                    </div>
                  </div>
                </div>
              </div>
          <button
            class="hero-section__signin"
            data-bs-target="#exampleModalToggle"
            data-bs-toggle="modal"
          >
            Sign in
          </button>
        </section>
      </div>
    `;
    return heroSection;
  },

  init(heroSection) {},

  getAll(container = document.body) {
    return container.getElementsByClassName(this.tagName);
  },
};
