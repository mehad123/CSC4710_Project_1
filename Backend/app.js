const express = require('express');
const cors = require ('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

const dbService = require('./dbService');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

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
})
const getUsers = handleError(async (request, response) => {
})
const getUser = handleError(async (request, response) => {
})
const getUsersFname = handleError(async (request, response) => {
})
const getUsersLname = handleError(async (request, response) => {
})

const getUsersSalary = handleError(async (request, response) => {
})
const getUsersAge = handleError(async (request, response) => {
})
const getUsersToday = handleError(async (request, response) => {
})
const getUsersAfter = handleError(async (request, response) => {
})
const getUsersSame = handleError(async (request, response) => {
})
const getUsersNoSignIn = handleError(async (request, response) => {
})

app.post('/users', addUser);
app.get('/users', getUsers);
app.get('/users/username/:username', getUser);
app.get('/users/firstname/:firstname', getUsersFname);
app.get('/users/lastname/:lastname', getUsersLname);

app.get('/users/salary', getUsersSalary);
app.get('/users/age', getUsersAge);

app.get('/users/today', getUsersToday);
app.get('/users/:username/afterReg',getUsersAfter);
app.get('/users/:username/sameReg', getUsersSame);

app.get('/users/nosignin', getUsersNoSignIn);

app.listen(process.env.APP_PORT, 
    () => {
        console.log(`I am listening on port ${process.env.APP_PORT}.`);
    }
);
