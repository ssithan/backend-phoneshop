const express = require('express')
    router = express.Router()

const service = require('../service/category.service')
    router.get('/', async (req, res) => {
    const data = await service.getCategory()
    res.send(data)} 
)

    router.get('/:Id', async (req, res) => {
        const data = await service.getCategoryById(req.params.Id)
        if (data.length == 0)
            res.status(404).send('No record with given id: ' + req.params.Id)
        else
        res.send(data)
    })

    router.delete('/:Id', async (req, res) => {
       
            const affectedRows = await service.deleteCategoryById(req.params.Id)
            if (affectedRows == 0)
                res.status(404).send('No record with given id: ' + req.params.Id)
            else
                res.send('Category id [ ' + req.params.Id + ' ] deleted.');
    })

    router.post('/', async (req, res) => {
        await service.addOrEditCategory(req.body)
        res.status(201).send('Category created.')
    })

    router.put('/:Id', async (req, res) => {
        const affectedRows=await service.addOrEditCategory(req.body, req.params.Id)
        if (affectedRows == 0)
            res.status(404).send('No record with given Id: ' + req.params.Id)
        else
        res.send('Category id [ ' + req.params.Id + ' ] updated.')
    })

    module.exports = router;