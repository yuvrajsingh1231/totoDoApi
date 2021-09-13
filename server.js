const express = require('express');
const app = express();
const dbService = require('./service');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*")
    res.setHeader('Access-Control-Allow-Headers', "*")
    res.setHeader('Access-Control-Allow-Methods', "*")
    next();
});

// create
app.post('/insert', async (req, res) => {
    const {name} = req.body;
    try {
        const db = dbService.getDbServiceInstance();
        const result = await db.insertNewName(name);
        console.log(result);
        res.json({data: result});
    } catch(err) {
        console.log(err);
    }
    
});

// read
app.get('/getAll', async (req, res) => {
    const db = dbService.getDbServiceInstance();
    try {
        const result = await db.getAllData();
        // const data = await result;
        res.json({data: result});
    } catch (err) {
        console.log(err);
    }
});

//delete 
app.delete('/delete/:id', async (req, res) => {
    try {
        const db = dbService.getDbServiceInstance();
        const result = await db.deleteRowById(req.params.id);
        res.json({sucess: result});
    } catch(err) {
        console.log(err);
    }

})

// patch
app.patch('/update', async (req, res) => {
    const {id, name} = req.body;
    try {
        const db = dbService.getDbServiceInstance();
        const result = await db.updateNameById(id, name);

        res.json({sucess: result});
    }
    catch (err) {
        console.log(err);
    }
});

app.get('/search/:name', async (req, res) => {
    const {name} = req.params;
    
    try {
        const db = dbService.getDbServiceInstance();
        const result = await db.searchByName(name);
        // const data = await result;
        res.json({data: result});
    } catch (err) {
        console.log(err);
    }

})


app.listen(9000, () => console.log("running on => 90000"));