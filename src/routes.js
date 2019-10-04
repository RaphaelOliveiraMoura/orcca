const router = require('express').Router();

const EmployeeRoutes = require('./routes/EmployeeRoutes');

router.use(EmployeeRoutes);

module.exports = router;
