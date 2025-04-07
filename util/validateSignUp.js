const validator = require('validator');

const validateSignUp = (req) => {
  const { name, emailId, password, role } = req.body;

  if (!name) {
    throw new Error('Please enter the name');
  } else if (!validator.isStrongPassword(password)) {
    throw new Error('Please enter valid password with combination of one capital letter, a character, and a number with password length of 8');
  } else if (!validator.isEmail(emailId)) {
    throw new Error('please enter valid email');
  }
};

module.exports = { validateSignUp };
