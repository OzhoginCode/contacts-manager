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
                        required
                      />
                      <label for="floatingPassword1">Password</label>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button class="button-purple" type="submit" id="selectUser">
                      Login
                    </button>
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
                        required
                      />
                      <label for="floatingInput2">Email address</label>
                    </div>
                    <div class="form-floating mb-3">
                      <input
                        type="password"
                        class="form-control"
                        id="floatingPassword2"
                        placeholder="Password"
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
                        required
                      />
                      <label for="floatingPassword3">Repeat Password</label>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button class="button-purple" type="submit">Create account</button>
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
              </form>
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
