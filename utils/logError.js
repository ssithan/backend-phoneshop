const fs=require('fs/promises')
const moment=require('moment')

const logError = async (controller, message_error, res) => {
    try {
        const timestamp = moment().format('YYYYMMDD HHmmss')
        const path ='./logs/' + controller + '.txt'
        const logMessage = timestamp + ' ' + message_error + '\n'
        await fs.appendFile(path, logMessage)
    } catch (error) {
        console.error('Error writing to logs file',error)
    }
    console.log("Internal Error.")
}
module.exports = { logError };