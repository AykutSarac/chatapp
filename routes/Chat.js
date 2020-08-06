const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index.ejs');
});

router.post('/', (req, res, next) => {
    const username = req.body.username;
    const roomid = req.body.roomid;
    res.redirect('/chat/'+roomid+'/'+username);
});

router.get('/chat/:room/:user', (req, res, next) => {
    res.render('chat.ejs', {user: req.params.user, room: req.params.room});
});

module.exports = router;