const renderRecords = (state, elements) => {
  elements.namesContainer.innerHTML = '';
  const ulForNames = document.createElement('ul');

  state.names.forEach(({ name, phone }) => {
    const newRecord = document.createElement('li');
    newRecord.textContent = `${name}  .  .  .  .  .  .  .  .  ${phone}`;
    ulForNames.append(newRecord);
  });
  elements.namesContainer.append(ulForNames);
};



export default () => {
  const state = {
    loginUserForm: {
      email: '',
      password: '',
    },
  };
  const elements = {
    // selectUser: document.querySelector('#selectUser'),
    // createUser: document.querySelector('#createUser'),
    // inputEmail: document.querySelector('#floatingInput'),
    // inputPassword: document.querySelector('#floatingPassword'),
    createUserForm: document.querySelector('#createUserForm'),
  };
  // const newRecForm = document.querySelector('[data-container="new-rec-form"]');
  const createUserHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const list = { name: name.trim(), phone: phone.trim() };
    state.names.push(list);
    form.reset();
    form.querySelector('input').focus();
    renderRecords(state, elements);
  };

  const loginUserHandler = (e) => {
    e.preventDefault();
  }

  elements.createUser.addEventListener('click', (e) => createUserHandler(e));
  renderRecords(state, elements);
};
