
exports.up = function(knex) {
    return knex.schema.createTable('tarefas', function(table){

        table.increments();

        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        table.string('sujeito_id').notNullable();
        table.foreign('sujeito_id').references('id').inTable('sujeitos');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('tarefas');
};
