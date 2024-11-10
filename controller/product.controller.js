const express = require('express')
    router = express.Router()

const service = require('../service/product.service')

    router.get('/', async (req, res) => {
        const product = await service.getProduct()
        res.send(product)
    })

    router.get('/:id', async (req, res) => {
        const product = await service.getProductById(req.params.id)
        if (product.length ==0)
            res.status(404).send('No record with given id: ' + req.params.id)
        else
        res.send(product)
    })

    router.delete('/:id', async (req, res) => {
        const affectedRows = await service.deleteProductById(req.params.id)
        if (affectedRows == 0)
            res.status(404).send('No record with given id: ' + req.params.id)
        else
        res.send('Product id [ ' + req.params.id + ' ] deleted.')
    })

    router.post('/', async (req, res) => {
        await service.addOrEditProduct(req.body)
        res.status(201).send('Product created.')
    })

    router.put('/:id', async (req, res) => {
        const data=await service.addOrEditProduct(req.body, req.params.id)
        res.send(data)
    })

    module.exports = router