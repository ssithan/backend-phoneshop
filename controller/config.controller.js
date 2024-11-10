const express = require('express')
    router = express.Router()

const service = require('../service/config.service')
    
    router.get('/', async (req, res) => {
        const data = await service.getConfig();
        res.send(data)
    })

    // router.get('/profile', async (req, res) => {
    //     const data = await service.getConfProfile();
    //     res.send(data)
    // })

    module.exports = router;