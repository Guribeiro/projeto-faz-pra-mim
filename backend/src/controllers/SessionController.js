const connection = require('../database/connection');

module.exports = {

    async create(request, response){
        const {id} = request.body;

        const sujeito = await connection('sujeitos')
        .where('id', id)
        .select('name')
        .first();

        if(!sujeito){
            return response.status(400).json({error: "Can't find any user with the entered ID"})
        }

        return response.json(sujeito);
    }
}