import './Conteudo.css'
import React from "react"
import { Routes, Route } from 'react-router-dom'

import Formulario from '../Formulario/index'
import Lista from '../Lista/index'
import FormHook from '../FormHook'

const Conteudo = props => (
    <main className="conteudo">
        <Routes>
            <Route path="/formulario" element={<Formulario />}/>
            <Route path="/lista" element={<Lista />}/>
        </Routes>
    </main>
)

export default Conteudo