const express = require('express');
const path = require('path');
require('dotenv').config();
const multer  = require('multer');

const app = express();
const get = require('./controllers/get');
const post = require('./controllers/post');

const port = process.env.PORT || 3000;

const upload = multer({ dest: 'uploads/' });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/v1/item/list', (req, res) => { get(req, res); });

app.post('/v1/item/create', upload.single('photo') , (req, res) => { post(req, res); });

app.use('/' ,  express.static(path.join(__dirname, './' , 'views')));

app.listen(port, () => {
  console.log(`Example app on port ${port}`);
});