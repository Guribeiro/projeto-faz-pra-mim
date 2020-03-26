import React, { useState } from 'react';
import imgLogo from '../../assets/FazPraMim.png';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';

import api from '../../services/api';

export default function NovaTarefa() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();
    const sujeitoId = localStorage.getItem('sujeitoId');

    async function HandleNovaTarefa(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value
        };

        try {
            await api.post('tarefas', data, {
                headers: {
                    Authorization: sujeitoId
                }
            });

            history.push('/profile');
        } catch (err) {
            alert('Nao foi possível cadastrar nova tarefa')
        }

    }
    return (




        <div className="nova-tarefa-container">
            <div className="content">
                <section>
                    <img className='logo-register' src={imgLogo} alt="" />
                    <h1>Cadastrar nova tarefa</h1>
                    <p>Cadastre sua tarefa, informe detalhes, peculiaridades e o quanto está disposto a pagar.</p>
                    <Link className='back-link' to="/profile">
                        <FiArrowLeft size={16} color='#006266' />
                        Voltar para home
                    </Link>
                </section>
                <form onSubmit={HandleNovaTarefa}>
                    <input
                        type="text"
                        placeholder='Título da tarefa'
                        value={title}
                        onChange={e => setTitle(e.target.value)} />
                    <textarea
                        type="text"
                        placeholder='Descreva aqui sua tarefa'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder='Valor em reais'
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />

                    <button className='button' type='submit'>Cadastrar</button>
                </form>
            </div>
        </div>
    );
}