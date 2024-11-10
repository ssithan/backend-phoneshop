const db = require('../config/db');
//const jwt = require('jsonwebtoken');

const { logError } = require('../utils/logError')
module.exports.getUserLogin = async (username) => {
    try {
        //const { username, password } = req.body;
        let sql='select u.id, u.user_name, u.user_pwd, u.is_active, r.name as role ' + 
            'From users u ' +
            'INNER JOIN roles r ON u.id=r.id ' +
            'WHERE u.user_name=?';
            //'AND u.user_pwd=?'
            const [rows] = await db.query(sql, [username])
                return rows
    } catch (error) {
            logError('auth.service', error, res)
    }
}

// module.exports.validate_token = () => {
//     // call in midleware in route (role route, user route, teacher route)
//     return (req, res, next) => {
//       var authorization = req.headers.authorization; // token from client
//       var token_from_client = null;
//       if (authorization != null && authorization != '') {
//         token_from_client = authorization.split(' '); // authorization : 'Bearer lkjsljrl;kjsiejr;lqjl;ksjdfakljs;ljl;r'
//         token_from_client = token_from_client[1]; // get only access_token
//       }
//       if (token_from_client == null) {
//         res.status(401).send({
//           message: 'Unauthorized',
//         });
//       } else {
//         jwt.verify(
//           token_from_client,
//           config.config.token.access_token_key,
//           (error, result) => {
//             if (error) {
//               res.status(401).send({
//                 message: 'Unauthorized',
//                 error: error,
//               });
//             } else {
//               req.current_id = result.data.profile.id;
//               req.auth = result.data.profile; // write user property
//               req.permision = result.data.permision; // write user property
//               next(); // continue controller
//             }
//           }
//         );
//       }
//     };
//   };
  
// module.exports.getAccessToken = async (paramData) => {
//     const acess_token = await jwt.sign(
//       { data: paramData },
//       config.config.token.access_token_key
//       // {
//       //   expiresIn: '1d',
//       // }
//     );
//     return acess_token;
//   };
// router.get('/:Id', async (req, res) => {
//     const data = await service.getCategoryById(req.params.Id)
//     if (data.length == 0)
//         res.status(404).send('No record with given id: ' + req.params.Id)
//     else
//     res.send(data)
// })

// module.exports.changePassword = async (password, userName)=>{
//     let sql='update users set user_pwd=? where user_name=?';
//     const [{affectedRows}] = await db.query(sql, [userName, password])
//         return affectedRows
// }

// Login user from chatGPT
// app.post('/login', (req, res) => {
//     const { username, password } = req.body;

//     db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
//         if (err) return res.status(500).json({ error: err });
//         if (results.length === 0) return res.status(401).json({ message: 'User not found' });

//         const user = results[0];
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

//         const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
//         res.json({ token });
//     });
// });