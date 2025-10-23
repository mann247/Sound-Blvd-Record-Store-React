const express = require (express);
const router = express.Router();

router.post('/', async(req,res) => {
    const {name, email, phone, comment} = req.body || {};
    if(!name || !email || !comment) return res.status(400).json({error:'Missing fields'});
    res.sendStatus(200);
});

module.exports = router;

