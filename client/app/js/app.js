import axios from 'axios';

const renderHomePage = (state) => {
  const signInButton = document.querySelector('#exampleModalToggleLabel');
  signInButton.textContent = state.currentUser;
};
const addNewUser = async (newUser) => {
  try {
    const response = await axios.post('/api/users/', newUser);
    return response.data;
  } catch (err) {
    console.error(err.toJSON())
  }
};
const loginUser = async (user) => {
  try {
    const response = await axios.post('api/sessions/', user);
    return response.data;
  } catch (err) {
    console.error(err.toJSON())
  }
};

const addNewEntry = async (newEntry) => {
  try {
    const response = await axios.post('/api/accounts/', newEntry);
    return response.data;
  } catch (err) {
    console.error(err.toJSON())
  }
};
const editUserAccount = async (newData) => {
  try {
    const response = await axios.put('/api/users/current/', newData);
    return response.data;
  } catch (err) {
    console.error(err.toJSON())
  }
};
const entryEdit = async (newData, accountId) => {
  try {
    const response = await axios.put(`/api//accounts/${accountId}`, newData);
    return response.data;
  } catch (err) {
    console.error(err.toJSON())
  }
};
const getAccounts = async (state) => {
  try {
    const response = await axios.get('/api/accounts/');
    state.accaunts = response.data;
    return response.data;
  } catch (err) {
    console.error(err.toJSON())
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
  accaunts: [],
};

const app = async () => {
  const elements = {
    loginUserForm: document.querySelector('#loginUserForm'),
    createUserForm: document.querySelector('#createUserForm'),
    signInButton: document.querySelector('#exampleModalToggleLabel'),
    addNewEntry: document.querySelector('#addNewEntry'),
    editUserAccount: document.querySelector('#userModalForm'),
    exitButton: document.querySelector('#exitButton'),
    entryEdit: document.querySelector('#passwordEditModalForm'),
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
    }
    const addUserResp = await addNewUser({ login: email, password: password });
    renderHomePage(state);
    console.log(state);
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
      const addNewEntryResp = await addNewEntry({ service: service, login: username, password: password });
      state.accaunts.push(addNewEntryResp);
      renderHomePage(state);
      console.log(state);
    }
  };

  const editUserAccountHandler  = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const newLogin = formData.get('email');
    const newPasword = formData.get('password');
    const repeat_password = formData.get('repeat_password');
    if (newPasword === repeat_password) {
      const editUserResp = await editUserAccount({ login: newLogin, password: newPasword });
      state.currentUser = { login: newLogin, password: newPasword };
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
    // const accountId = 
    if (password === repeat_password) {
      const addNewEntryResp = await entryEdit({ service: service, login: username, password: password }, accountId);
      state.accaunts.push(addNewEntryResp);
      renderHomePage(state);
      console.log(state);
    }
  }


  // document.addEventListener('load', () => getCurrentUser(state));
  elements.createUserForm.addEventListener('submit', (e) => createUserHandler(e));
  elements.loginUserForm.addEventListener('submit', (e) => loginUserHandler(e));
  elements.addNewEntry.addEventListener('submit', (e) => addEntryHandler(e));
  elements.editUserAccount.addEventListener('submit', (e) => editUserAccountHandler(e));
  elements.exitButton.addEventListener('click', () => {
    axios.delete('/api/sessions/');
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
      console.error(err.toJSON())
    }
  };
  getCurrentUser(state);
  // if (state.currentUser.isGuest === false) {
    const resp = await getAccounts(state);
    renderHomePage(state);
  // }
  console.log(state);
};

export { app };
