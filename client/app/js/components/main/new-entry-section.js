export const NewEntrySection = {
  tagName: "new-entry-section",

  create() {
    const newEntrySection = document.createElement("section");
    newEntrySection.className = "new-entry-section";
    newEntrySection.id = "new-entry-section";

    newEntrySection.innerHTML = `
      <button
          type="button"
          class="new-entry-button"
          data-bs-toggle="modal"
          data-bs-target="#passwordAddModal"
        >
        Add New Entry
      </button>
      <div
        class="modal fade"
        id="passwordAddModal"
        tabindex="-1"
        aria-labelledby="passwordAddModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="passwordAddModalLabel">
                Add New Entry
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
                <label for="floatingInput">Source example.com</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  type="email"
                  class="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                />
                <label for="floatingInput">Username</label>
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
              <button 
                type="button"
                class="button-purple"
                data-bs-dismiss="modal">
                Save
              </button>
              <button
                type="button"
                class="button-grey"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              
            </div>
          </div>
        </div>
      </div>
    `;
    return newEntrySection;
  },

  init(newEntrySection) {},

  getAll(container = document.body) {
    return container.getElementsByClassName(this.tagName);
  },
};
