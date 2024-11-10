
const express = require('express')
    router = express.Router()
const service = require('../service/auth.service')
   
router.get('/login/:username', async (req, res) => {
    const { username, password } = req.body
    const data = await service.getUserLogin(req.params.username)
    if (data.length == 0) {
        res.status(404).send('No record with given Name: ' + req.params.username)
    }
    else {
        res.send(data)
        
    }    
})

router.put('/password/:username', async (req, res) => {
    const affectedRows = await service.changePassword(req.body, req.params.username)
    if (affectedRows == 0)
        res.status(404).send('No record with given Name: ' + req.params.username)
    else
    res.send('Password Changed.')
})


module.exports = router