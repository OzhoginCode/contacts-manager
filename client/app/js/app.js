import axios from 'axios';

import userIcon from '#icons/user-icon.svg';
import editIcon from '#icons/edit-icon.svg';
import deleteIcon from '#icons/delete-icon.svg';
import showIcon from '#icons/show-icon.svg';

const renderHomePage = (state) => {
  console.log(state);
  const signInButton = document.querySelector('#header__signin');
  const userButton = document.querySelector('#header__user-button');
  const exitButton = document.querySelector('#header__exit-button');
  const heroSection = document.querySelector('#hero-section');
  const newEntrySection = document.querySelector('#new-entry-section');
  const entriesListSection = document.querySelector('#entries-list');
  const editUserEmail = document.querySelector('#editUserEmail');

  editUserEmail.value = state.currentUser.login;

  entriesListSection.innerHTML = '';

  if (state.currentUser.isGuest) {
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
    state.accounts.forEach((entry, index) => {
      const { service, login, password } = entry;
      const id = index + 1;

      const entryItem = document.createElement('li');
      entryItem.id = `entry-item-${id}`;
      entryItem.className = 'entry-item section';

      entryItem.innerHTML = `
        <p class="rate-number" id="rate-number">${id}</p>
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
                <form id="passwordEditModalForm${id}">
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
      entriesListSection.appendChild(entryItem);
      return entryItem;
    });
  }
};

const getCurrentUser = async () => {
  try {
    const response = await axios.get('/api/users/current/');
    return response.data;
  } catch (err) {
    alert(err.response.status);
  }
};

const createUser = async (newUser) => {
  const response = await axios.post('/api/users/', newUser);
  return response.data;
};

const loginUser = async (user) => {
  const response = await axios.post('api/sessions/', user);
  return response.data;
};

const addNewEntry = async (newEntry) => {
  try {
    const response = await axios.post('/api/accounts/', newEntry);
    return response.data;
  } catch (err) {
    if (err.response.status === 401) {
      alert('Sign in for add record');
    }
  }
};

const editUserAccount = async (newData) => {
  const response = await axios.put('/api/users/current/', newData);
  return response;
};

// const entryEdit = async (newData, accountId) => {
//   try {
//     const response = await axios.put(`/api/accounts/${accountId}`, newData);
//     return response.data;
//   } catch (err) {
//     alert(err.response.status);
//   }
// };

// const entryDelete = async () => {
//   try {
//     const response = await axios.delete(`/api//accounts/${accountId}`);
//     return response.data;
//   } catch (err) {
//     alert(err.response.status);
//   }
// };

const getAccounts = async () => {
  try {
    const response = await axios.get('/api/accounts/');
    return response.data;
  } catch (err) {
    alert(err.response.status);
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
    if (password !== repeat_password) {
      alert("Passwords don't match");
      return;
    }
    try {
      const user = await createUser({ login: email, password });
      state.currentUser = { ...user, isGuest: false };
      form.reset();
    } catch (err) {
      const { errors } = err.response.data;
      const errorMessages = [
        errors.login || '',
        errors.password || '',
      ];
      alert(errorMessages.join('\n'));
    }
    if (!state.currentUser.isGuest) {
      const accounts = await getAccounts();
      state.accounts = accounts;
    }
    renderHomePage(state);
    form.reset();
  };

  const loginUserHandler = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const login = formData.get('email');
    const password = formData.get('password');
    state.loginUserForm.email = login;
    state.loginUserForm.password = password;
    try {
      const user = await loginUser({ login, password });
      state.currentUser = { ...user, isGuest: false };
      form.reset();
    } catch (err) {
      alert(err.response.data.error);
    }
    if (!state.currentUser.isGuest) {
      const accounts = await getAccounts();
      state.accounts = accounts;
    }
    renderHomePage(state);
  };

  const addEntryHandler = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const service = formData.get('source');
    const login = formData.get('username');
    const password = formData.get('password');
    const repeat_password = formData.get('repeat_password');
    if (password !== repeat_password) {
      alert("Passwords don't match");
      return;
    }
    const newAccount = await addNewEntry({
      service,
      login,
      password,
    });
    state.accounts.push(newAccount);
    renderHomePage(state);
    form.reset();
  };

  const editUserAccountHandler = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const newLogin = formData.get('email');
    const newPassword = formData.get('password');
    const newData = {
      ...(newLogin && { login: newLogin }),
      ...(newPassword && { password: newPassword })
    };
    if (!Object.keys(newData).length) return;
    try {
      await editUserAccount(newData);
      state.currentUser = { login: newLogin, password: newPassword, isGuest: false };
      form.reset();
    } catch (err) {
      const { errors } = err.response.data;
      const errorMessages = [
        errors.login || '',
        errors.password || '',
      ];
      alert(errorMessages.join('\n'));
    }
    renderHomePage(state);
  };

  // const editEntryHandler = async (e) => {
  //   e.preventDefault();
  //   const form = e.target;
  //   const formData = new FormData(form);
  //   const service = formData.get('source');
  //   const username = formData.get('username');
  //   const password = formData.get('password');
  //   const repeat_password = formData.get('repeat_password');
  //   const accountId = e.target.someAthribute;
  //   if (password === repeat_password) {
  //     const addNewEntryResp = await entryEdit(
  //       { service: service, login: username, password: password },
  //       accountId
  //     );
  //     state.accounts.push(addNewEntryResp);
  //     renderHomePage(state);
  //   }
  // };

  // const entryDeleteHandler = async (e) => {
  //   e.preventDefault();
  //   const accountId = e.target.someAthribute;
  //   const addNewEntryResp = await entryDelete(
  //     { service: service, login: username, password: password },
  //     accountId
  //   );
  //   const resp = await getAccounts(state);
  //   renderHomePage(state);
  // };

  elements.createUserForm.addEventListener('submit', (e) => createUserHandler(e));
  elements.loginUserForm.addEventListener('submit', (e) => loginUserHandler(e));
  elements.addNewEntry.addEventListener('submit', (e) => addEntryHandler(e));
  elements.editUserAccount.addEventListener('submit', (e) => editUserAccountHandler(e));
  // elements.entryEdit.addEventListener('submit', (e) => editEntryHandler(e));
  // elements.entryDelete.addEventListener('click', (e) => entryDeleteHandler(e));
  // elements.entryShow.addEventListener('click', (e) => entryShowHandler(e));
  elements.exitButton.addEventListener('click', async () => {
    const response = await axios.delete('/api/sessions/');
    state.currentUser = { isGuest: true };
    renderHomePage(state);
    return response.data;
  });

  const currentUser = await getCurrentUser();
  state.currentUser = currentUser;

  if (state.currentUser.isGuest === false) {
    const accounts = await getAccounts();
    state.accounts = accounts;
    }
  renderHomePage(state);
};

export default app;
