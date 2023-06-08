import FormHook from '../FormHook';
import './formulario.css'

import { useState } from 'react';


const Formulario = (props) => {
    return (
        <section className='formulario'>
            <FormHook/>
        </section>
    )
}

export default Formulario;