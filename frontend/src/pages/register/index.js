import React, { useState } from 'react';
import imgLogo from '../../assets/FazPraMim.png';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';

import api from '../../services/api';


export default function Register() {
    const [rgm, setRgm] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();
    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            rgm,
            name,
            email,
            whatsapp,
            city,
            uf,
        };

      try{
        const resp = await api.post('sujeitos', data)
        alert(`Seu ID de acesso: ${resp.data.id}`)
        history.push('/')
        
      } catch(err){
          alert('Erro no cadastro, tente novamente.')
      }


    }

    return (
        <div className="register-container">
            <div className="content">

                <section>
                    <img className='logo-register' src={imgLogo} alt="" />
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma</p>
                    <Link className='back-link' to="/">
                        <FiArrowLeft size={16} color='#006266' />
                        Já tenho cadastro
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder='Seu RGM'
                        value={rgm}
                        onChange={e => setRgm(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder='Seu Nome'
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder='Seu E-mail'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder='Seu WhatsApp'
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    />

                    <div className="input-group">
                        <input
                            type="text"
                            placeholder='Sua Cidade'
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder='UF'
                            style={{ width: 80 }}
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        />
                    </div>

                    <button className='button' type='submit'>Cadastrar</button>
                </form>
            </div>
        </div>
    );
}