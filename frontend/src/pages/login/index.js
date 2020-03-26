import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api'

import logoImg from '../../assets/FazPraMim.png';
export default function Login() {
    const [id, setId] = useState('');

    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {

            const resp = await api.post('sessions', { id });

            localStorage.setItem('sujeitoId', id);
            localStorage.setItem('sujeitoName', resp.data.name);

            history.push('/profile')
        } catch (err) {
            alert('Falha no Login')
        }

    }
    return (
        <div className="login-container">
            <section className="form">
                <h1>FAZ PRA MIM</h1>
                <form onSubmit={handleLogin}>
                    <h2>Faça seu Login</h2>

                    <input placeholder='Seu ID'
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />

                    <button className='button' type='submit'>Entrar</button>
                    <Link className='back-link' to="/register">
                        <FiLogIn size={16} color='#006266' />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={logoImg} alt="FazLogo" />
        </div>
    );
}