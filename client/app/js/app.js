import axios from 'axios';

const renderHomePage = (state) => {
  const signInButton = document.querySelector('#exampleModalToggleLabel');
  signInButton.textContent = state.currentUser;
};

const addNewUser = async (newUser) => {
  try {
    const response = await axios.post('/api/users/', newUser);
    return response.data;
  } catch (respons) {
    alert(response.data);
  }
};

const loginUser = async (user) => {
  try {
    const response = await axios.post('api/sessions/', user);
    return response.data;
  } catch (response) {
    alert(response.data);
  }
};

const getCurrentUser = async (state) => {
  try {
    const response = await axios.get('/api/users/current/');
    // return response.data;
    // const isGuest = response.data.isGuest;
    // if (!isGuest) {
    state.currentUser = response;
    renderHomePage(state);
  } catch (response) {
    alert(response.data);
  }
};

const addNewEntry = async (newEntry) => {
  try {
    const response = await axios.post('/accounts', newEntry);
    return response.data;
  } catch (response) {
    alert(response.data);
  }
};

const app = () => {
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

  const elements = {
    loginUserForm: document.querySelector('#loginUserForm'),
    createUserForm: document.querySelector('#createUserForm'),
    signInButton: document.querySelector('#exampleModalToggleLabel'),
    addNewEntry: document.querySelector('#addNewEntry'),
  };
  const loginUserHandler = async (e) => {
    e.preventDefault();
    const form = e.target;
    // console.log(e.target)
    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');
    console.log(email, password);
    state.loginUserForm.email = email;
    state.loginUserForm.password = password;
    const loginResp = await loginUser({ login: email, password: password });
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
    form.reset();
  };

  const addNewEntryHandler = async (e) => {
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
      state.accaunts.push(addNewEntryResp);
      renderHomePage(state);
    }
  };

  // document.addEventListener('load', () => getCurrentUser(state));
  elements.createUserForm.addEventListener('submit', (e) =>
    createUserHandler(e)
  );
  elements.loginUserForm.addEventListener('submit', (e) => loginUserHandler(e));
  elements.addNewEntry.addEventListener('submit', (e) => addNewEntryHandler);

  getCurrentUser();
};

export { app };
