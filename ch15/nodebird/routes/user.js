const express = require('express');

const {isLoggedIn} = require('../middlewares');
const {follow, unFollow} = require('../controllers/user');

const router = express.Router();

//post /user/:id/follow
router.post('/:id/follow', isLoggedIn, follow); // :id 부분이 req.params.id

router.post('/:id/unFollow', isLoggedIn, unFollow);

module.exports = router;