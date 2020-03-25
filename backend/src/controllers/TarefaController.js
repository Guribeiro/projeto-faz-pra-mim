const connection = require('../database/connection');

module.exports = {

    async index(request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('tarefas').count();

        const tarefas = await connection('tarefas')
            .join('sujeitos', 'sujeitos.id', '=', 'tarefas.sujeito_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select(['tarefas.*',
                'sujeitos.rgm',
                'sujeitos.name',
                'sujeitos.email',
                'sujeitos.whatsapp',
                'sujeitos.city',
                'sujeitos.uf',
            ]);
        response.header('X-Total-Count', count['count(*)']);
        return response.json(tarefas);
    },

    async create(request, response) {
        const { title, description, value } = request.body;
        const sujeito_id = request.headers.authorization;

        const [id] = await connection('tarefas').insert({
            title,
            description,
            value,
            sujeito_id
        });

        return response.json({ id })
    },

    async delete(request, response) {
        const { id } = request.params;
        const sujeito_id = request.headers.authorization;

        const tarefa = await connection('tarefas')
            .where('id', id)
            .select('sujeito_id')
            .first();

        if (tarefa.sujeito_id != sujeito_id) {
            return response.status(401).json({ error: "Operation not permitted." });
        }

        await connection('tarefas').where('id', id).delete();

        return response.status(204).send();
    }

};