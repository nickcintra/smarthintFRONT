import { DatePicker, Space } from 'antd';
import React from 'react';
import './CampoDate.css'
import dayjs from 'dayjs'

const CampoDate = (props) => {

    const dateFormat = 'YYYY/MM/DD';

    const aoDigitado = (dateString) => {
        props.aoAlterado(dateString);
    }

    return (
        <Space direction="vertical" className='campodate'>
            <label>
                {props.label}
            </label>
            <DatePicker
                className='datacampo'
                defaultValue={props.dataPadrao ? dayjs(props.dataPadrao, dateFormat) : ''}
                value={props.valor}
                onChange={aoDigitado}
                format={dateFormat}
                aria-required={props.obrigatorio}
            />
        </Space>
    )
}

export default CampoDate;
