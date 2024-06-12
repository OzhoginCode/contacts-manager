const renderRecords = (state, elements) => {
  elements.namesContainer.innerHTML = '';
  const ulForNames = document.createElement('ul');

  state.names.forEach(({ source, login, password }) => {
    const newRecord = document.createElement('li');
    newRecord.textContent = `${source}  .  .  ${login}  .  .  ${password}`;
    ulForNames.append(newRecord);
  });
  elements.namesContainer.append(ulForNames);
};

export default () => {
  const state = {
    names: [],
  };
  const elements = {
    namesContainer: document.querySelector('[data-container="names"]'),
  };
  const newRecForm = document.querySelector('[data-container="new-rec-form"]');
  
  const submitHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const source = formData.get('source');
    const login = formData.get('login');
    const password = formData.get('password');
    const list = { source: source.trim(), login: login.trim(), password: password.trim() };
    state.names.push(list);
    form.reset();
    form.querySelector('input').focus();
    renderRecords(state, elements);
  };

  newRecForm.addEventListener('submit', (e) => submitHandler(e));
  renderRecords(state, elements);
};
