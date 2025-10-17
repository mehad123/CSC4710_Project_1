const express = require('express');
const cors = require ('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

const usersTable = require('./dbService');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const users = usersTable.getUsersInstance()

function handleError(func){
    return async (...args) => {
        try{
            return await func(...args);
        }catch(err){
            console.error(err)
        }
    }
}

const addUser = handleError(async (request, response) => {  
    await users.createUser(request.body);
    response.send("ok")
})
const removeUser = handleError(async (request, response) => {  
    const {username} = request.params
    await users.deleteUser(username);
    response.send("ok")
})

const getUsers = handleError(async (request, response) => {
    const result = await users.getAllUsers();
    response.json(result);
})
const getUser = handleError(async (request, response) => {
    const {username} = request.params;
    const result = await users.getUsersByName(username, "username");
    response.json(result)
})
const getUsersFname = handleError(async (request, response) => {
    const {firstname} = request.params;
    const result = await users.getUsersByName(firstname, "firstname");
    response.json(result)
})
const getUsersLname = handleError(async (request, response) => {
    const {lastname} = request.params;
    const result = await users.getUsersByName(lastname, "lastname");
    response.json(result)
})

const getUsersSalary = handleError(async (request, response) => {
    const {minSalary, maxSalary} = request.query;
    const result = await users.getUsersBySalary(minSalary, maxSalary);
    response.json(result);
})
const getUsersAge = handleError(async (request, response) => {
    const {minAge, maxAge} = request.query;
    const result = await users.getUsersByAge(minAge, maxAge);
    response.json(result)
})
const getUsersToday = handleError(async (request, response) => {
    const result = await users.getUsersToday();
    response.json(result)
})
const getUsersAfter = handleError(async (request, response) => {
    const {username} = request.params;
    const result = await users.getUsersAfterReg(username);
    response.json(result)
})
const getUsersSame = handleError(async (request, response) => {
    const {username} = request.params;
    const result = await users.getUsersSameReg(username);
    response.json(result)
})
const getUsersNoSignIn = handleError(async (request, response) => {
    const result = await users.getUsersNoSignIn();
    response.json(result)
})

app.post('/users', addUser);
app.get('/users', getUsers);
app.get('/users/:username', getUser);
app.delete('/users/:username',removeUser);

app.get('/users/firstname/:firstname', getUsersFname);
app.get('/users/lastname/:lastname', getUsersLname);

app.get('/users/salary', getUsersSalary);
app.get('/users/age', getUsersAge);

app.get('/users/today', getUsersToday);
app.get('/users/afterReg/:username',getUsersAfter);
app.get('/users/sameReg/:username', getUsersSame);

app.get('/users/nosignin', getUsersNoSignIn);

app.listen(process.env.APP_PORT, 
    () => {
        console.log(`I am listening on port ${process.env.APP_PORT}.`);
    }
);
