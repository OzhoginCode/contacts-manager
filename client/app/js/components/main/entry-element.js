import editIcon from '#icons/edit-icon.svg';
import deleteIcon from '#icons/delete-icon.svg';
import showIcon from '#icons/show-icon.svg';

export default (elemNumber, id, service, login, password) => `
<p class="rate-number" id="rate-number">${elemNumber}</p>
<div>
  <span class="item-name">Source</span>
  <div class="item-value">${service}</div>
</div>
<div>
  <span class="item-name">Username</span>
  <div class="item-value">${login}</div>
</div>
<div>
  <span class="item-name">Password</span>
  <div class="item-value">&#183;&#183;&#183;</div>
</div>

<section class="entry-item-buttons">
  <button
    type="button"
    id="edit-button${id}"
    class="button button-edit"
    data-bs-toggle="modal"
    data-bs-target="#passwordEditModal${id}"
  >
    <img src="${editIcon}" class="button__icon" alt="edit icon"></img>
    Edit
  </button>
  <div
    class="modal fade"
    id="passwordEditModal${id}"
    tabindex="-1"
    aria-labelledby="passwordEditModalLabel${id}"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <form class="account-edit-form" id="passwordEditModalForm${id}" data-edit-form-id=${id}>
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="passwordEditModalLabel${id}">
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
                type="text"
                class="form-control"
                id="floatingInput5"
                name="source"
                placeholder="name@example.com"
                required
                value="${service}"
              />
              <label for="floatingInput5">Source example.com</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                id="floatingInput6"
                placeholder="name@example.com"
                name="username"
                autocomplete="on"
                required
                value="${login}"
              />
              <label for="floatingInput6">Username</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                id="floatingPassword6"
                placeholder="Password"
                name="password"
                autocomplete="new-password"
                required
                value="${password}"
              />
              <label for="floatingPassword6">Password</label>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="button button-grey"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="submit"
              data-bs-dismiss="modal"
              class="button button-purple"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <button
    type="button"
    id="delete-button${id}"
    class="button button-delete"
    data-bs-toggle="modal"
    data-bs-target="#passwordDeleteModal${id}"
  >
    <img src="${deleteIcon}" class="button__icon" alt="delete icon"></img>
    Delete
  </button>
  <div
    class="modal fade"
    id="passwordDeleteModal${id}"
    tabindex="-1"
    aria-labelledby="passwordDeleteModalLabel${id}"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="passwordDeleteModalLabel${id}">
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
          You want to delete the entry with <strong style="color: #fff">username ${login} for source ${service}</strong>. Are you sure?
        </div>
        <div class="modal-footer">
          <button
            id="passwordDeleteYesButton${id}"
            type="button"
            data-account-id=${id}
            class="button button-grey confirm-delete-account-button"
            data-bs-dismiss="modal"
          >
            Yes
          </button>
          <button
            type="button"
            data-bs-dismiss="modal"
            class="button button-purple"
          >
            No
          </button>
        </div>
      </div>
    </div>
  </div>
  <button
    type="button"
    id="show-button${id}"
    class="button button-show"
    data-bs-toggle="modal"
    data-bs-target="#passwordShowModal${id}"
  >
    <img src="${showIcon}" class="button__icon" alt="show icon"></img>
    Show
  </button>
  <div
    class="modal fade"
    id="passwordShowModal${id}"
    tabindex="-1"
    aria-labelledby="passwordShowModalLabel${id}"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="passwordShowModalLabel${id}">
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
            <div class="item-value">${service}</div>
          </div>
          <div>
            <span class="item-name">Username</span>
            <div class="item-value">${login}</div>
          </div>
          <div>
            <span class="item-name">Password</span>
            <div class="item-value">${password}</div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="button button-purple"
            data-bs-dismiss="modal"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  </div>
</section>
`;
