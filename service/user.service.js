const db = require('../config/db')
const {logError} = require('../utils/logError')

module.exports.getUsers = async ()=>{
    try {
        let sql='Select u.id, u.user_name, u.user_pwd, u.is_active, r.name as role ' + 
                'From users u ' +
                'INNER JOIN roles r ON u.id=r.id'
        const [rows] = await db.query(sql)
            return rows
    } catch (error) {
        logError('user.service', error, res)
    }
}

module.exports.getUserById = async (Id)=>{
    let sql='select u.id, u.user_name, u.user_pwd, u.is_active, r.name as role ' + 
            'from users u ' +
            'INNER JOIN roles r ON u.id=r.id ' +
            'WHERE u.id=?'
    const [rows] = await db.query(sql, [Id])
        return rows
}

module.exports.deleteUserById = async (Id)=>{
    const [{affectedRows}] = await db.query('delete from users where id=?', [Id])
        return affectedRows
}

module.exports.addOrEditUser = async (obj, Id = 0)=>{
    try {
        const [[[{affectedRows}]]] = await db.query('CALL sp_user_add_or_edit(?,?,?,?,?)', 
        [Id, obj.UserName, obj.UserPassword, obj.RoleId, 'admin'])
        return affectedRows
    } catch (error) {
        logError('user.service', error, res)
    }

}