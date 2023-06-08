import { useState } from 'react'
import './comboBox.css'

const CampoComboBox = (props) => {
    
    return (
        <div className="lista-suspensa">
            <label>
                {props.label}
            </label>
            <select onChange={e => props.aoAlterado(e.target.value)} required={props.obrigatorio} value={props.valor}>
                <option value="">{props.placeholder}</option>
                {props.itens.map(item => <option key={item}>{item}</option>)}
            </select>
        </div>
    )
}

export default CampoComboBox;