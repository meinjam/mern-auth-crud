const User = require('../models/User');
const createToken = require('../utils/generateToken');
const { getAuthUser } = require('../middleware/authMiddleware');

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // create token
    const token = createToken(user.id);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signupUser = async function (req, res) {
  const { name, email, password } = req.body;

  try {
    const user = await User.signup(name, email, password);

    // create token
    const token = createToken(user.id);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const authUser = async (req, res) => {
  const { authorization } = req.headers;
  const { user, token } = await getAuthUser(authorization);
  res.status(200).json({ user, token });
};

module.exports = { loginUser, signupUser, authUser };
