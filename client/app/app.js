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

export default (testData) => {
  const state = {
    names: [],
  };
  const elements = {
    namesContainer: document.querySelector('[data-container="names"]'),
  };
  const newRecForm = document.querySelector('[data-container="new-rec-form"]');
  const huy = testData;
  const submitHandler = (e) => {
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

  newRecForm.addEventListener('submit', (e) => submitHandler(e));
  renderRecords(state, elements);
};
