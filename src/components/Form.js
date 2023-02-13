/* import { useState } from "react"; */
import '../styles/Form.css';

import { Link } from "react-router-dom";

function Form() {

    const verificar = () => {
/*         const usrIngresado = document.querySelector('#usr').value
        const pwdIngresado = document.querySelector('#pwd').value */

        return true
    }

    return(
        <div className='formContainer'>
            <h1 className='tit'>Entidad Bancaria - Registro</h1>
            <div className='form'>
{/*                 <p><label>Nombre: </label><input id='name' type='text'></input></p>
                <p><label>Apellido: </label><input id='lastName' type='text'></input></p> */}
                <p><label>Usuario: </label><input id='usr' type='text'></input></p>
                <p><label>Contraseña: </label><input id='pwd' type='text'></input></p>
{/*                 <p>
                    <label>Tipo de cliente: </label>
                    <select name='selectCliente'>
                        <option value='Persona física' selected>Persona física</option>
                        <option value='Persona jurídica'>Persona jurídica</option>
                    </select>
                </p>
                <p>
                    <label>Tipo de cuenta: </label>
                    <select name='selectCuenta'>
                        <option value='Cuenta corriente' selected>Cuenta corriente</option>
                        <option value='CAja de ahorro'>Caja de ahorro</option>
                    </select>
                </p> */}
                <p><button onClick={() => verificar()}>VERIFICAR</button></p>
                <p><button><Link to='/'>CONFIRMAR</Link></button> {/* validar */}</p>
            </div>
            <button className='btn-salida'><Link to='/'>ATRAS</Link></button>
        </div>
    )

}

export default Form;