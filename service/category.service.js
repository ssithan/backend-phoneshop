const db = require('../config/db');
const { logError } = require('../utils/logError')

module.exports.getCategory = async (req, res)=>{
    try {
    const [rows] = await db.query('select * from category')
        return rows
    } catch (error) {
        logError('category.service', error, res)
    }
}

module.exports.getCategoryById = async (Id)=>{
    const [rows] = await db.query('select * from category where id=?', [Id])
        return rows
}

module.exports.deleteCategoryById = async (Id)=>{
    const [{affectedRows}] = await db.query('delete from category where id=?', [Id])
        return affectedRows
}

module.exports.addOrEditCategory = async (obj, Id = 0)=>{
    try {
    const [{affectedRows}] = await db.query('CALL sp_category_add_or_edit(?,?,?)', 
    [Id, obj.name, obj.description])
    return affectedRows
    } catch (error) {
        logError('category.service.add', error, res)
    }
}