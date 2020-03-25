const connection = require('../database/connection')
const crypto = require('crypto');

module.exports = {

    async index(request, response) {
        const sujeitos = await connection('sujeitos').select('*');

        return response.json(sujeitos);
    },

    async create(request, response) {
        const { rgm, name, email, whatsapp, city, uf } = request.body;

        const id = crypto.randomBytes(4).toString('HEX');

        await connection('sujeitos').insert({
            id,
            rgm,
            name,
            email,
            whatsapp,
            city,
            uf,
        });

        return response.json({ id })

    },


}