const express = require('express')
const cors = require ('cors')
const dotenv = require('dotenv')
dotenv.config()

const app = express();

const dbService = require('./dbService');


app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: false}));

app.post('/insert', async (request, response) => {
    const {name} = request.body;

    const db = dbService.getDbServiceInstance();
    const result = await db.insertNewName(name)
    .catch(err=>console.error(err));
    response.json({data: result});
});



app.get('/getAll', async (request, response) => {
    const db = dbService.getDbServiceInstance();

    const result = await db.getAllData()
    .catch(err=>console.error(err));
    response.json({data: result})
});


app.get('/search/:name', async (request, response) => { 
    const {name} = request.params;
    
    const db = dbService.getDbServiceInstance();

    let result;
    if(name === "all") 
       result = await db.getAllData()
        .catch(err=>console.error(err));
    else 
       result = await db.searchByName(name)
        .catch(err=>console.error(err)); 
    response.json({data: result});
});


app.patch('/update', async (request, response) => {
    const{id, name} = request.body;

    const db = dbService.getDbServiceInstance();

    const result = await db.updateNameById(id, name)
    .catch(err=>console.error(err));
    response.json({data: result})
});

app.delete('/delete/:id', async (request, response) => {     
    const {id} = request.params;
    const db = dbService.getDbServiceInstance();

    await db.deleteRowById(id)
    .catch(err=>console.error(err));

    response.json({success: true});
})   


app.listen(process.env.PORT, 
    () => {
        console.log(`I am listening on port ${process.env.PORT}.`)
    }
);
