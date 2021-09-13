const mysql = require('mysql');
let instance = null;
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Pk@010903',
    database: 'user_info',
    port: 3307
});

connection.connect((err) => {
    if(err) {
        console.log("db status: => " + err.message);
    }
    console.log('db status: => ' + connection.state);
})

class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM curd_app;";
                connection.query(query, (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            // console.log(response);
            return response;
        } catch (err) {
            console.log(err);
        }
    }

    async insertNewName(name) {
        try {   const date = new Date();
                const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO curd_app (name, date) VALUES (?, ?);";
                connection.query(query, [name, date],(err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.insertId);
                })
            });
            // console.log(response);
            return {
                id: insertId,
                name: name,
                date: date
            };

        } catch (err) {
            console.log(err);
        }
    }

    async deleteRowById(id) {
        try {
            id = parseInt(id, 10);
        const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM curd_app WHERE id = ?";
                connection.query(query, [id],(err, result) => {
                if (err) reject(new Error(err.message));
                resolve(result.affectedRows);
            })
        });
        return response === 1 ? true : false;
        } catch (err) {
            console.log(err);
            return false;
        }        
    }
    async updateNameById(id, name) {
        try {
            id = parseInt(id, 10);
        const response = await new Promise((resolve, reject) => {
                const query = "UPDATE curd_app SET name = ? WHERE id = ?";
                connection.query(query, [name, id],(err, result) => {
                if (err) reject(new Error(err.message));
                resolve(result.affectedRows);
            })
        });
        return response === 1 ? true : false;
        } catch (err) {
            console.log(err);
            return false;
        }   
    }

    async searchByName(name) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM curd_app WHERE name = ?;";
                connection.query(query, [name], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            // console.log(response);
            return response;
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = DbService;