const express = require('express')
const bcrypt = require('bcrypt')
    router = express.Router()

const service = require('../service/user.service')

    router.get('/', async (req, res) => {
        const users = await service.getUsers()
        res.send(users)
    })

    router.get('/:Id', async (req, res) => {
        const user = await service.getUserById(req.params.Id)
        if (user.length == 0)
            res.status(404).send('No record with given id: ' + req.params.Id)
        else
        res.send(user)
    })

    router.delete('/:Id', async (req, res) => {
        const affectedRows = await service.deleteUserById(req.params.Id)
        if (affectedRows ==0)
            res.status(404).send('No record with given id: ' + req.params.Id)
        else
        res.send('user id [ ' + req.params.Id + ' ] deleted.')
    })

    router.post('/', async (req, res) => {
        await service.addOrEditUser(req.body)
        res.status(201).send('user created.')
    })

    router.put('/:Id', async (req, res) => {
        const affectedRows = await service.addOrEditUser(req.body, req.params.Id)
        if (affectedRows == 0)
            res.status(404).send('No record with given id: ' + req.params.Id)
        else
        res.send('user id [ ' + req.params.Id + ' ] updated.')
    })

    module.exports = router