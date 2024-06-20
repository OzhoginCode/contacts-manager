import axios from 'axios';

import userIcon from '#icons/user-icon.svg';
import editIcon from '#icons/edit-icon.svg';
import deleteIcon from '#icons/delete-icon.svg';
import showIcon from '#icons/show-icon.svg';

const renderHomePage = (state) => {
  const signInButton = document.querySelector('#header__signin');
  const userButton = document.querySelector('#header__user-button');
  const exitButton = document.querySelector('#header__exit-button');
  const heroSection = document.querySelector('#hero-section');
  const newEntrySection = document.querySelector('#new-entry-section');
  const entriesListSection = document.querySelector('#entries-list');
  const editUserEmail = document.querySelector('#editUserEmail');
  const userModalPassword = document.querySelector('#userModalPassword');

  editUserEmail.value = state.loginUserForm.email;
  userModalPassword.value = state.loginUserForm.password;

  while (entriesListSection.firstChild) {
    entriesListSection.removeChild(entriesListSection.firstChild);
  }

  console.log(
    `var isGuest from state.currentUser is ${state.currentUser.isGuest}`
  ); // why undefined on first boot?

  if (state.currentUser.isGuest || state.currentUser.isGuest === 'undefined') {
    heroSection.style.display = 'flex';
    newEntrySection.style.display = 'none';
    entriesListSection.style.display = 'none';
    signInButton.style.display = 'block';
    userButton.style.display = 'none';
    exitButton.style.display = 'none';
  } else {
    heroSection.style.display = 'none';
    newEntrySection.style.display = 'flex';
    entriesListSection.style.display = 'flex';
    signInButton.style.display = 'none';
    userButton.style.display = 'block';
    userButton.innerHTML = `
      <img src='${userIcon}' class="button__icon">
        ${state.currentUser.login}
      </img>
    `;
    exitButton.style.display = 'block';
  }

  if (state.accounts.length > 0) {
    state.accounts.forEach((entry) => {
      const entryItem = document.createElement('li');
      entryItem.id = `entry-item-${entry.id}`;
      entryItem.className = 'entry-item section';
      const itemSource = entry.service;
      const itemUsername = entry.login;
      const itemPassword = entry.password;

      entryItem.innerHTML = `
        <p class="rate-number" id="rate-number">${entry.id}</p>
        <div>
          <span class="item-name">Source</span>
          <div class="item-value">${entry.service}</div>
        </div>
        <div>
          <span class="item-name">Username</span>
          <div class="item-value">${entry.login}</div>
        </div>
        <div>
          <span class="item-name">Password</span>
          <div class="item-value">&#183;&#183;&#183;</div>
        </div>

        <section class="entry-item-buttons">
          <button
            type="button"
            id="edit-button${entry.id}"
            class="button button-edit"
            data-bs-toggle="modal"
            data-bs-target="#passwordEditModal${entry.id}"
          >
            <img src="${editIcon}" class="button__icon" alt="edit icon"></img>
            Edit
          </button>
          <div
            class="modal fade"
            id="passwordEditModal${entry.id}"
            tabindex="-1"
            aria-labelledby="passwordEditModalLabel${entry.id}"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <form id="passwordEditModalForm${entry.id}">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="passwordEditModalLabel${entry.id}">
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
                        value="${itemSource}"
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
                        value="${itemUsername}"
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
                        value="${itemPassword}"
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
            id="delete-button${entry.id}"
            class="button button-delete"
            data-bs-toggle="modal"
            data-bs-target="#passwordDeleteModal${entry.id}"
          >
            <img src="${deleteIcon}" class="button__icon" alt="delete icon"></img>
            Delete
          </button>
          <div
            class="modal fade"
            id="passwordDeleteModal${entry.id}"
            tabindex="-1"
            aria-labelledby="passwordDeleteModalLabel${entry.id}"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="passwordDeleteModalLabel${entry.id}">
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
                  You want to delete the entry with <strong style="color: #fff">username ${entry.login} for source ${entry.service}</strong>. Are you sure?
                </div>
                <div class="modal-footer">
                  <button
                    id="passwordDeleteYesButton${entry.id}"
                    type="button"
                    class="button button-grey"
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
            id="show-button${entry.id}"
            class="button button-show"
            data-bs-toggle="modal"
            data-bs-target="#passwordShowModal${entry.id}"
          >
            <img src="${showIcon}" class="button__icon" alt="show icon"></img>
            Show
          </button>
          <div
            class="modal fade"
            id="passwordShowModal${entry.id}"
            tabindex="-1"
            aria-labelledby="passwordShowModalLabel${entry.id}"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="passwordShowModalLabel${entry.id}">
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
                    <div class="item-value">${itemSource}</div>
                  </div>
                  <div>
                    <span class="item-name">Username</span>
                    <div class="item-value">${itemUsername}</div>
                  </div>
                  <div>
                    <span class="item-name">Password</span>
                    <div class="item-value">${itemPassword}</div>
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
      entriesListSection.appendChild(entryItem);
      return entryItem;
    });
  }
};

const createUser = async (newUser) => {
  try {
    const response = await axios.post('/api/users/', newUser);
    return response.data;
  } catch (err) {
    if (err.toJSON().status == 422) {
      alert('The same user already exsist');
    }
  }
};

const loginUser = async (user) => {
  try {
    const response = await axios.post('api/sessions/', user);
    return response.data;
  } catch (err) {
    if (err.toJSON().status == 422) {
      alert('Incorrect username or password');
    }
  }
};

const addNewEntry = async (newEntry) => {
  try {
    const response = await axios.post('/api/accounts/', newEntry);
    return response.data;
  } catch (err) {
    if (err.toJSON().status == 401) {
      alert('Sign in for add record');
    }
  }
};

const editUserAccount = async (newData) => {
  try {
    const response = await axios.put('/api/users/current/', newData);
    return response;
  } catch (err) {
    if (err.toJSON().status == 401) {
      alert('Sign in for edit account');
    }
  }
};

const entryEdit = async (newData, accountId) => {
  try {
    const response = await axios.put(`/api/accounts/${accountId}`, newData);
    return response.data;
  } catch (err) {
    alret(err.toJSON().status);
  }
};

const entryDelete = async () => {
  try {
    const response = await axios.delete(`/api//accounts/${accountId}`);
    return response.data;
  } catch (err) {
    alret(err.toJSON().status);
  }
};

const getAccounts = async (state) => {
  try {
    const response = await axios.get('/api/accounts/');
    state.accounts = response.data;
    return response.data;
  } catch (err) {
    alret(err.toJSON().status);
  }
};

const state = {
  loginUserForm: {
    email: '',
    password: '',
  },
  createUserForm: {
    email: '',
    password: '',
  },
  currentUser: {},
  accounts: [],
};

const app = async () => {
  const elements = {
    loginUserForm: document.querySelector('#loginUserForm'),
    createUserForm: document.querySelector('#createUserForm'),
    signInButton: document.querySelector('#exampleModalToggleLabel'),
    addNewEntry: document.querySelector('#addNewEntry'),
    editUserAccount: document.querySelector('#userModalForm'),
    exitButton: document.querySelector('#exitButton'),
    // entryEdit: document.querySelectorAll('.some_modal_class'),
    // entryDelete: document.querySelectorAll('.some_modal_class'),
    // entryShow: document.querySelectorAll('.some_modal_class'),
    editLogin: document.querySelector('#editUserEmail'),
    editButton: document.querySelector('#header__user-button'),
  };

  const createUserHandler = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');
    const repeat_password = formData.get('repeat_password');
    if (password === repeat_password) {
      state.createUserForm.email = email;
      state.createUserForm.password = password;
      const addUserResp = await createUser({
        login: email,
        password: password,
      });
      const loginResp = await loginUser({ login: email, password: password });
      state.currentUser = loginResp;
    }
    renderHomePage(state);
    console.log(state);
    form.reset();
  };

  const loginUserHandler = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');
    state.loginUserForm.email = email;
    state.loginUserForm.password = password;
    const loginResp = await loginUser({ login: email, password: password });
    state.currentUser = loginResp;
    const resp = await getAccounts(state);
    console.log(state);
    renderHomePage(state);
    form.reset();
  };

  const addEntryHandler = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const service = formData.get('source');
    const username = formData.get('username');
    const password = formData.get('password');
    const repeat_password = formData.get('repeat_password');
    if (password === repeat_password) {
      const addNewEntryResp = await addNewEntry({
        service: service,
        login: username,
        password: password,
      });
      state.accounts.push(addNewEntryResp);
      renderHomePage(state);
      console.log(state);
      form.reset();
    }
  };

  const editUserAccountHandler = async (e) => {
    e.preventDefault();
    const form = e.target; //placeholder = state.currentUser.login
    // state.currentUser.login ;
    // console.log(elements.editLogin.placeholder);
    const formData = new FormData(form);
    const newLogin = formData.get('email');
    const newPasword = formData.get('password');
    const repeat_password = formData.get('repeat_password');
    if (newPasword === repeat_password) {
      const editUserResp = await editUserAccount({
        login: newLogin,
        password: newPasword,
      });
      if (editUserResp) {
        state.currentUser = { login: newLogin, password: newPasword };
      }
      renderHomePage(state);
    }
    console.log(state);
    form.reset();
  };

  const editEntryHandler = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const service = formData.get('source');
    const username = formData.get('username');
    const password = formData.get('password');
    const repeat_password = formData.get('repeat_password');
    const accountId = e.target.someAthribute;
    if (password === repeat_password) {
      const addNewEntryResp = await entryEdit(
        { service: service, login: username, password: password },
        accountId
      );
      state.accounts.push(addNewEntryResp);
      renderHomePage(state);
      console.log(state);
    }
  };

  const entryDeleteHandler = async (e) => {
    e.preventDefault();
    const accountId = e.target.someAthribute;
    const addNewEntryResp = await entryDelete(
      { service: service, login: username, password: password },
      accountId
    );
    const resp = await getAccounts(state);
    renderHomePage(state);
    console.log(state);
  };

  elements.createUserForm.addEventListener('submit', (e) =>
    createUserHandler(e)
  );
  elements.loginUserForm.addEventListener('submit', (e) => loginUserHandler(e));
  elements.addNewEntry.addEventListener('submit', (e) => addEntryHandler(e));
  elements.editUserAccount.addEventListener('submit', (e) =>
    editUserAccountHandler(e)
  );
  // elements.entryEdit.addEventListener('submit', (e) => editEntryHandler(e));
  // elements.entryDelete.addEventListener('click', (e) => entryDeleteHandler(e));
  // elements.entryShow.addEventListener('click', (e) => entryShowHandler(e));
  elements.editButton.addEventListener('click', () => {
    console.log(111);
    elements.editLogin.value = state.currentUser.login;
  });
  elements.exitButton.addEventListener('click', async () => {
    const response = await axios.delete('/api/sessions/');
    state.currentUser = { isGuest: true };
    renderHomePage(state);
    return response.data;
  });

  elements.entryEdit.addEventListener('submit', (e) => editEntryHandler(e));

  const getCurrentUser = async (state) => {
    try {
      const response = await axios.get('/api/users/current/');
      state.currentUser = response.data;
      renderHomePage(state);
      console.log(state);
    } catch (err) {
      alret(err.toJSON().status);
    }
  };
  getCurrentUser(state);
  if (state.currentUser.isGuest === false) {
    const resp = await getAccounts(state);
    renderHomePage(state);
  }
  console.log(state);
};

export { app, renderHomePage, state };
