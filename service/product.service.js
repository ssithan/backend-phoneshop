const db = require('../config/db')
const { logError } = require('../utils/logError')

module.exports.getProduct = async (req, res)=>{
    try {
    let sql='SELECT c.id, p.id, p.name, p.description, p.image, c.name as category, b.name as brand, p.units_in_stock, p.unit_price, p.units_on_order, p.reorder_level, p.discontinued FROM products p ' +
            'INNER JOIN category c ON p.category_id=c.id ' +
            'LEFT JOIN brands b ON p.brand_id=b.id'
    const [rows] = await db.query(sql)
        return rows
    } catch (error) {
        logError('product.service', error, res)
    }
}

module.exports.getProductById = async (id)=>{
    const [rows] = await db.query('select * from Products where id=?', [id])
        return rows
}

module.exports.getProductByCategoryId = async (cateogry_id)=>{
    let sql='SELECT id, name, description, image, price FROM products '
            'WHERE category_id=?'
    const [rows] = await db.query(sql, [category_id])
        return rows
}


module.exports.deleteProductById = async (id)=>{
    const [{affectedRows}] = await db.query('delete from Products where id=?', [id])
        return affectedRows
}

module.exports.addOrEditProduct = async (obj, id = 0)=>{
    try {
        const [data] = await db.query('CALL sp_product_add_or_edit(?,?,?,?)', 
        [id, obj.name, obj.price, obj.image])
        return data
    } catch (error) {
        logError('product.service', error, res)
    }
}