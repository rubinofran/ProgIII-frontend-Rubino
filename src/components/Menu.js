import { useState, useEffect } from "react";
import '../styles/Menu.css';

import { Link } from "react-router-dom";
import usuarioPruebasService from "../services/usuariosPruebas";

function Menu() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
		async function fetchData() {
			const response = await usuarioPruebasService.getAllUsuariosPruebas();
			setUsers(response.data);
		}
		fetchData();
	}, []);

    return(
        <div className='menuContainer'>
            <h1 className='tit'>Entidad Bancaria - USUARIO!!</h1>
            <div className='operaciones'>
{/*                 <p><button>DEPÓSITO</button></p>
                <p><button>EXTRACCIONES</button></p>
                <p><button>RESUMEN</button></p> */}
                <ul>
                    {users.map((x) => (
                        <li>{x.userName}</li>
                    ))}
                </ul>
            </div>
            <p><button className='btn-salida'><Link to='/'>CERRAR SESIÓN</Link></button></p>
        </div>
    )
}

export default Menu;