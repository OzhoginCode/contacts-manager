// Функция для сохранения данных в localStorage
function saveData(nickname, password) {
  if (nickname.trim() === "" || password === null) {
    return false;
  }
  const savedData = JSON.parse(localStorage.getItem('savedPasswords')) || [];
  savedData.push({ nickname, password });
  localStorage.setItem('savedPasswords', JSON.stringify(savedData));
  return true;
}

// Функция для вывода сохраненных данных из localStorage
function displaySavedData() {
  const savedData = JSON.parse(localStorage.getItem('savedPasswords')) || [];
  savedData.forEach((item, index) => {
    console.log(`Nickname: ${item.nickname}, Password: ${item.password}`);
  });
}

// Функция для очистки всех сохраненных данных из localStorage
function clearSavedData() {
  localStorage.removeItem('savedPasswords');
}

// Экспорт функций работы с localStorage
module.exports = {
  saveData,
  displaySavedData,
  clearSavedData
};