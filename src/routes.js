const router = require('express').Router();

const { admin } = require('./middlewares/employee-auth');
const LoginController = require('./controllers/LoginController');

router.get('/', admin, (req, res) => {
  res.json({ ok: true });
});
router.post('/login', LoginController.logInEmployee);

module.exports = router;
