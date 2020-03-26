import React, { useEffect, useState } from 'react';
import './styles.css';
import logoImg from '../../assets/FazPraMim.png';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

export default function Profile() {
    const [tarefas, setTarefas] = useState([]);
    
    const sujeitoId = localStorage.getItem('sujeitoId');
    const sujeitoName = localStorage.getItem('sujeitoName');
    
    const history = useHistory();

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: sujeitoId,
            }
        }).then(resonse => {
            setTarefas(resonse.data)
        })
    }, [sujeitoId]);


    async function handleDeleteTarefa(id) {
        try {
            await api.delete(`tarefas/${id}`,{
                headers:{
                    Authorization: sujeitoId,
                }
            });

            setTarefas(tarefas.filter(tarefa => tarefa.id !== id))
        } catch (err) {
            alert('Erro ao deletar')
        }
    }

    function handleLogout(){
        localStorage.clear()
        history.push('/');
    }
    return (
        <div className="profile-container">
            <header>
                <img className='logo-register' src={logoImg} alt="LogoFaz" />
                <span>Bem Vindo(a), {sujeitoName}</span>

                <Link className='button' to='/tarefas/new'>Cadastrar uma nova tarefa</Link>

                <button onClick={handleLogout} type='button'>
                    <FiPower size={18} color="#c0392b" />
                </button>
            </header>

            <h1>Tarefas cadastradas</h1>

            <ul>
                {tarefas.map(tarefa => (
                    <li key={tarefa.id}>
                        <strong>TAREFA: </strong>
                        <p>{tarefa.title}</p>

                        <strong>DESCRIÇÃO: </strong>
                        <p>{tarefa.description}</p>

                        <strong>VALOR: </strong>
                        <p>
                            {Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(tarefa.value)}
                        </p>

                        <button onClick={() => handleDeleteTarefa(tarefa.id)} type='button'>
                            <FiTrash2 size={20} color='006266' />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}