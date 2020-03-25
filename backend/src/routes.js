const express = require('express');
const routes = express.Router();

const SujeitoController = require('./controllers/SujeitoController')
const TarefaController = require('./controllers/TarefaController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

routes.post('/sessions', SessionController.create);

routes.get('/sujeitos', SujeitoController.index);
routes.post('/sujeitos', SujeitoController.create);

routes.get('/profile', ProfileController.index)

routes.get('/tarefas', TarefaController.index);
routes.post('/tarefas', TarefaController.create);
routes.delete('/tarefas/:id', TarefaController.delete);

module.exports = routes;