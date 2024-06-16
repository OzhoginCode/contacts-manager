export const EntriesListSection = {
  tagName: "entries-list-section",

  create() {
    const entriesListSection = document.createElement("ul");
    entriesListSection.className = "entries-list";
    entriesListSection.id = "entries-list";

    entriesListSection.innerHTML = `
      <li class="password-item section">
        <p class="rate-number">1</p>
        <div>
          <span class="item-name">Source</span>
          <div class="item-value">example.com</div>
        </div>
        <div>
          <span class="item-name">Username</span>
          <div class="item-value">user523</div>
        </div>
        <div>
          <span class="item-name">Password</span>
          <div class="item-value">&#183;&#183;&#183;&#183;&#183;&#183;</div>
        </div>
        <section class="password-item-buttons d-flex justify-content-center">
          <button
            type="button"
            class="entry-buttons button-edit"
            data-bs-toggle="modal"
            data-bs-target="#passwordEditModal"
          >
            Edit
          </button>
          <div
            class="modal fade"
            id="passwordEditModal"
            tabindex="-1"
            aria-labelledby="passwordEditModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="passwordEditModalLabel">
                    Edit entry
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
                      id="floatingInput5"
                      placeholder="name@example.com"
                    />
                    <label for="floatingInput5">Source example.com</label>
                  </div>
                  <div class="form-floating mb-3">
                    <input
                      type="email"
                      class="form-control"
                      id="floatingInput6"
                      placeholder="name@example.com"
                    />
                    <label for="floatingInput6">Username</label>
                  </div>
                  <div class="form-floating mb-3">
                    <input
                      type="password"
                      class="form-control"
                      id="floatingPassword6"
                      placeholder="Password"
                    />
                    <label for="floatingPassword6">Password</label>
                  </div>
                  <div class="form-floating">
                    <input
                      type="password"
                      class="form-control"
                      id="floatingPassword7"
                      placeholder="Password"
                    />
                    <label for="floatingPassword7">Repeat Password</label>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="button-grey"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" class="button-purple">
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button
            type="button"
            class="entry-buttons button-delete"
            data-bs-toggle="modal"
            data-bs-target="#passwordDeleteModal"
          >
            Delete
          </button>
          <div
            class="modal fade"
            id="passwordDeleteModal"
            tabindex="-1"
            aria-labelledby="passwordDeleteModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="passwordDeleteModalLabel">
                    Danger Zone!
                  </h1>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  You are wanted to delete entry. Are you shure?
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="button-grey"
                    data-bs-dismiss="modal"
                  >
                    Yes
                  </button>
                  <button type="button" class="button-purple">No</button>
                </div>
              </div>
            </div>
          </div>
          <button
            type="button"
            class="entry-buttons button-show"
            data-bs-toggle="modal"
            data-bs-target="#passwordShowModal"
          >
            Show
          </button>
          <div
            class="modal fade"
            id="passwordShowModal"
            tabindex="-1"
            aria-labelledby="passwordShowModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="passwordShowModalLabel">
                    Show Password
                  </h1>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <div>
                    <span class="item-name">Source</span>
                    <div class="item-value">example.com</div>
                  </div>
                  <div>
                    <span class="item-name">Username</span>
                    <div class="item-value">user523</div>
                  </div>
                  <div>
                    <span class="item-name">Password</span>
                    <div class="item-value">p@$$WD40</div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="button-purple"
                    data-bs-dismiss="modal"
                  >
                    Ok
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </li>
    `;

    return entriesListSection;
  },

  init(entriesListSection) {},

  getAll(container = document.body) {
    return container.getElementsByClassName(this.tagName);
  },
};
