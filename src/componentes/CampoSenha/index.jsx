import '../CampoTexto/campotexto.css'

const CampoSenha = (props) => {

    const placeholderModificada = `${props.placeholder}...`

    const aoDigitado = (evento) => {
        props.aoAlterado(evento.target.value)
    }

    return (
        <div className="campo-texto">
            <label>
                {props.label}
            </label>
            <input
                type='password'
                value={props.valor}
                onChange={aoDigitado}
                required={props.obrigatorio}
                placeholder={placeholderModificada}
            />
        </div>
    )
}

export default CampoSenha