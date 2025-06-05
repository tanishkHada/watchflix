const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    throw new Error('Invalid email format');
  }
};

const isValidPassword = (password) => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?]).{8,}$/;

  if (!password || !passwordRegex.test(password)) {
    throw new Error(
      'Invalid password'
    );
  }
};

const isValidName = (name) => {
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    throw new Error('Invalid name');
  }
};

const isValidCode = (code) => {
  if (!code || typeof code !== 'string' || code.trim().length !== 6) {
    throw new Error('Invalid verification code');
  }
};

const isValidAuthContext = (context) => {
  const validContexts = ['register', 'forgotPassword'];
  if (!validContexts.includes(context)) {
    throw new Error('Invalid authentication context');
  }
};

const validators = {
  isValidEmail,
  isValidPassword,
  isValidName,
  isValidCode,
  isValidAuthContext
}

export default validators;
