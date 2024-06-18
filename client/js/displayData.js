const { displaySavedData } = require('./utils/localStorageUtils');

// Вывод сохраненных данных при загрузке страницы
window.onload = function () {
  displaySavedData();
};