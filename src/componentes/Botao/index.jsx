import './Botao.css'
import Icon from '@mui/material/Icon';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';

const Botao = (props) => {

    const botaoEstilo = props.texto === 'Excluir' ? {backgroundColor:'#FF3B3B'}
        : props.texto === 'Editar' ? {backgroundColor:'#ffa500'} : props.texto === "Visualizar" ? 
        {backgroundColor:'#289DFF'} :  props.texto === 'Cadastrar' ? {backgroundColor:'#00C6A0'} : 
        props.texto === 'Cancelar' ? {backgroundColor:'#262726'} : props.texto === 'Limpar Filtro' ? 
        {backgroundColor:'#0c3a2d', marginLeft:'20px'} : {backgroundColor:'#0c3a2d'};


    return (
        <button type='submit' className='botao' style={botaoEstilo} onClick={props.onClick}>
            {props.texto === 'Limpar Filtro' ? <CleaningServicesIcon /> : props.texto}
        </button>
    )
}

export default Botao 