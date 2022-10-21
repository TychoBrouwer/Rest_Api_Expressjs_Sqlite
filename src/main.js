#!/usr/bin/env node
const express = require('express');
const helmet = require('helmet');
const speakeasy = require('speakeasy');
const fs = require('fs');

const initDatabase = require('./utils/init-database');

const port = 3000 || process.env.PORT;

const app = express();
module.exports = app;

app.use(helmet());
app.use(express.json());
app.disable('x-powered-by');

initDatabase();

fs.readFile('api-secret.txt', (err, buf) => {
  if (buf) {
    app.locals.apiSecret = buf.toString();

    console.log(`api secret is "${app.locals.apiSecret}"`);
  } else {
    app.locals.apiSecret = speakeasy.generateSecret({ length: 20 }).base32;

    fs.writeFile('api-secret.txt', app.locals.apiSecret, () => {
      console.log(`new api secret is "${app.locals.apiSecret}"`);
    });
  }
});

const signIn = require('./routes/sign-in');
const signUp = require('./routes/sign-up');
const getClientSalt = require('./routes/get-client-salt');
const newClientSalt = require('./routes/new-client-salt');
const addItem = require('./routes/add-item');
const removeItem = require('./routes/remove-item');
const getInventory = require('./routes/get-inventory');
const addToGroup = require('./routes/add-to-group');
const getGroups = require('./routes/get-groups');
const getGroupUsers = require('./routes/get-group-users');

const createGroup = require('./routes/create-group');
const updateUser = require('./routes/update-user-details');

app.get('/', (req, res) => {
  res.json({ message: 'alive' });
});

app.use('/sign-in', signIn);
app.use('/sign-up', signUp);
app.use('/get-client-salt', getClientSalt);
app.use('/new-client-salt', newClientSalt);
app.use('/add-item', addItem);
app.use('/remove-item', removeItem);
app.use('/get-inventory', getInventory);
app.use('/add-to-group', addToGroup);
app.use('/get-groups', getGroups);
app.use('/get-group-users', getGroupUsers);
app.use('/create-group', createGroup);
app.use('/update-user', updateUser);

app.use((req, res) => {
  res.status(404).send("sorry can't find that!");
});

// custom error handler
app.use((err, req, res) => {
  console.error(err.stack);

  res.status(500).send('something broke!');
});

app.listen(port, () => {
  console.log(`api app listening on port ${port}`);
});
