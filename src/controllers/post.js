const usersTable = require('./../models/m.bd.user');
const bucket = require('./../infraestructure/bucket');
const uuid = require('uuid');

const post = async (req, res) => {
    if (!req.body.name || !req.body.lastname || !req.file || !req.body.id){
        res.send({status: 500 , message: 'error data incomplete'});
    }
    try{
        await bucket.connect();
        const nameFile = `images/${uuid.v4()}.${req.file.originalname.split('.').pop()}`;
        await bucket.uploadFile(req.file, nameFile);
        const table = await usersTable();
        await table.create({
                name: req.body.name,
                lastname: req.body.lastname,
                photo: nameFile,
                id: req.body.id
            });
        res.send({status: 200 , message: 'ok'});
    } catch (error) {
        console.error(error);
        res.send({status: 501 , message: 'error save data'});
    }
}

module.exports = post;