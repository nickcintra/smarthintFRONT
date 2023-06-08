import React from 'react';
import './campoCheckBox.css'

const CampoCheckBox = (props) => {

    const isChecked = props.emFormulario ? e => props.aoAlterado(e.target.checked) : props.valor;

    return (
        <div className='campo-checkbox'>
            <label>
                {props.label}
            </label>
            <input type="checkbox"
                title={props.titulo}
                checked={isChecked}
                onChange={e => props.aoAlterado(e.target.checked)}
                required={props.obrigatorio}
            />
        </div>
    );
}

export default CampoCheckBox;