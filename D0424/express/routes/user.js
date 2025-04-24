const express = require('express');

const router = express.Router();

//get /user 라우터
router.get('/', (req,res) =>{ // get /user/
    res.send('Hello User');
});

module.exports = router;