const usersTable = require('./../models/m.bd.user');
const bucket = require('./../infraestructure/bucket');

const get = async (req, res) => {
    await bucket.connect();
    usersTable().then((table) => {
        table.findAll({raw: true}).then((data) => {
            res.json(data.map((item) => {
                return {
                    ...item,
                    photo: bucket.signedUrl(item.photo)
                }
            }));
        }).catch((err) => {
            console.error(err);
            res.json({ message: 'error_get', error: err });
        });
    });
}

module.exports = get;