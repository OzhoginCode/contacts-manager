const { generatePassword } = require('./utils/passwordUtils');

// Генерация пароля и его использование
const generatedPassword = generatePassword();
console.log(`Сгенерированный пароль: ${generatedPassword}`);