const db = require('../config/db');
const logError = require('../utils/logError')
module.exports.getConfProfile = async(req, res) => {
    try {
        let sql='select * from users'
        const [record_profile] = await db.query(sql)
        return ({
            record_profile,
        })
    } catch (error) {
        logError('config.service.profile', error, res)
    }
}

module.exports.getConfig = async(req, res) => {
    try {
        const [record_category] = await db.query('select * from category')
        const [record_product] = await db.query('select * from products')
        const [record_brand] = await db.query('select * from brands')
        return ({
            record_category,
            record_product,
            record_brand,
        })
    } catch (error) {
        logError('config.service', error, res)
    }
}