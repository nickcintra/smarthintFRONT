import './Botao.css'
import Icon from '@mui/material/Icon';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';

const Botao = (props) => {
    const botaoEstilo = props.texto === 'Excluir' ? 'excluir'
        : props.texto === 'Editar' ? 'editar'
        : props.texto === 'Visualizar' ? 'visualizar'
        : props.texto === 'Cadastrar' ? 'cadastrar'
        : props.texto === 'Cancelar' ? 'cancelar'
        : props.texto === 'Limpar Filtro' ? 'limpar-filtro'
        : 'padrao';

    const botaoClasses = `botao ${botaoEstilo}`;

    return (
        <button type='submit' className={botaoClasses} onClick={props.onClick}>
            {props.texto === 'Limpar Filtro' ? <CleaningServicesIcon /> : props.texto}
        </button>
    )
}

export default Botao 