import axios from 'axios';

import getEntryElement from '#js/components/main/entry-element.js';
import generatePassword from '#js/utils/generatePassword.js';

import userIcon from '#icons/user-icon.svg';

const renderHomePage = (state) => {
  const editEntryHandler = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const service = formData.get('source');
    const login = formData.get('username');
    const password = formData.get('password');
    const accountId = parseInt(form.dataset.editFormId);
    try {
      const newData = await entryEdit({ service, login, password }, accountId);
      const index = state.accounts.findIndex(
        (account) => account.id === accountId
      );
      state.accounts[index] = { ...newData, id: accountId };
    } catch (err) {
      alert(err.response.data.error);
    }
    renderHomePage(state);
  };

  const entryDeleteHandler = async (e) => {
    e.preventDefault();
    const accountId = parseInt(e.target.dataset.accountId);
    console.log(accountId);
    try {
      await entryDelete(accountId);
      state.accounts = state.accounts.filter(
        (account) => account.id !== accountId
      );
    } catch (err) {
      console.log(err);
      alert(err.response.data.error);
    }
    renderHomePage(state);
  };

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

  state.accounts.forEach((entry, index) => {
    const { id, service, login, password } = entry;
    const elemNumber = index + 1;

    const entryItem = document.createElement('li');
    entryItem.id = `entry-item-${id}`;
    entryItem.className = 'entry-item section';

    entryItem.innerHTML = getEntryElement(
      elemNumber,
      id,
      service,
      login,
      password
    );
    entriesListSection.appendChild(entryItem);
  });
  const editForms = entriesListSection.querySelectorAll('.account-edit-form');
  editForms.forEach((form) =>
    form.addEventListener('submit', editEntryHandler)
  );

  const deleteButtons = entriesListSection.querySelectorAll(
    '.confirm-delete-account-button'
  );
  deleteButtons.forEach((btn) =>
    btn.addEventListener('click', entryDeleteHandler)
  );
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
  const response = await axios.post('/api/accounts/', newEntry);
  return response.data;
};

const editUserAccount = async (newData) => {
  const response = await axios.put('/api/users/current/', newData);
  return response.data;
};

const entryEdit = async (newData, accountId) => {
  const response = await axios.put(`/api/accounts/${accountId}`, newData);
  return response.data;
};

const entryDelete = async (accountId) => {
  const response = await axios.delete(`/api/accounts/${accountId}`);
  return response.data;
};

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
    generateButton: document.querySelector('#generate-password'),
    newEntryPassword: document.querySelector('#newEntryPassword'),
    newEntryPasswordRepeat: document.querySelector('#newEntryPasswordRepeat'),
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
      const errorMessages = [errors.login || '', errors.password || ''];
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
      ...(newPassword && { password: newPassword }),
    };
    if (!Object.keys(newData).length) return;
    try {
      const { login, id } = await editUserAccount(newData);
      state.currentUser = { login, id, isGuest: false };
      form.reset();
    } catch (err) {
      const { errors } = err.response.data;
      const errorMessages = [errors.login || '', errors.password || ''];
      alert(errorMessages.join('\n'));
    }
    renderHomePage(state);
  };

  elements.createUserForm.addEventListener('submit', createUserHandler);
  elements.loginUserForm.addEventListener('submit', loginUserHandler);
  elements.addNewEntry.addEventListener('submit', addEntryHandler);
  elements.editUserAccount.addEventListener('submit', editUserAccountHandler);
  elements.exitButton.addEventListener('click', async () => {
    const response = await axios.delete('/api/sessions/');
    state.currentUser = { isGuest: true };
    state.accounts = [];
    renderHomePage(state);
    return response.data;
  });

  elements.generateButton.addEventListener('click', () => {
    const password = generatePassword();
    console.log(password);
    elements.newEntryPassword.value = password;
    elements.newEntryPasswordRepeat.value = password;
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
