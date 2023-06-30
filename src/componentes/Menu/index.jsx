import React from 'react'
import { Link } from 'react-router-dom'

import './menu.css'


const Menu = (props) => {
    return (
        <header>
            <div className='menu'>
                <Link to="/Formulario">Cadastro</Link>
                <Link to="/Lista">Lista</Link>
            </div>
        </header>
    )
}

export default Menu