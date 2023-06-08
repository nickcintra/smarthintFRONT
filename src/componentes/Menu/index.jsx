import React from 'react'
import { Link } from 'react-router-dom'

import './menu.css'


const Menu = (props) => {
    return (
        <header>
            <div className='menu'>
                <a><Link to="/Formulario">Cadastro</Link></a>
                <a><Link to="/Lista">Lista</Link></a>
            </div>
        </header>
    )
}

export default Menu