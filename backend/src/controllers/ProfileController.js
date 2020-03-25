const connection = require('../database/connection');


module.exports = {
    async index(request, response){
        const sujeito_id = request.headers.authorization;

        const tarefas = await connection('tarefas')
        .where('sujeito_id', sujeito_id)
        .select('*');

        return response.json(tarefas);
    }
}