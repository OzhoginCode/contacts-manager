export const NewEntrySection = {
  tagName: 'new-entry-section',

  create() {
    const newEntrySection = document.createElement('section');
    newEntrySection.className = 'new-entry-section';
    newEntrySection.id = 'new-entry-section';

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
          <form id="addNewEntry">
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
                    id="floatingInput3"
                    placeholder="name@example.com"
                    name="source"
                    required
                  />
                  <label for="floatingInput3">Source example.com</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="email"
                    class="form-control"
                    id="floatingInput4"
                    placeholder="name@example.com"
                    name="username"
                    required
                  />
                  <label for="floatingInput4">Username</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="password"
                    class="form-control"
                    id="floatingPassword4"
                    placeholder="Password"
                    name="password"
                    required
                  />
                  <label for="floatingPassword4">Password</label>
                </div>
                <div class="form-floating">
                  <input
                    type="password"
                    class="form-control"
                    id="floatingPassword5"
                    placeholder="Password"
                    name="repeat_password"
                    required
                  />
                  <label for="floatingPassword5">Repeat Password</label>
                </div>
              </div>

              <div class="modal-footer">
                <button 
                  type="submit"
                  class="button-purple"
                  data-bs-dismiss="modal"
                >
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
          </form>
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
