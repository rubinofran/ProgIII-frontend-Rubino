import { useState, useEffect } from "react";
import '../styles/Menu.css';
import { /* Link,  */useNavigate } from "react-router-dom";

// Servicios
import localStorageService from "../services/localStorage";

function Menu() {

    const [userLoggedName, setUserLoggedName] = useState('')

    const navigate = useNavigate()

    const handleDeslog = async (e) => {
        e.preventDefault()
        try {
            await localStorageService.deleteLS()
            navigate("/login")
        } catch (err) {
            console.log('... . Error: ', err);
        }
    }

    useEffect(() => {
		async function menu() {
			try {
				const userLogged = await localStorageService.getLS();
				if (!userLogged) {
                    console.log('Local storage vacío');
                    navigate("/login")
				} else {
					console.log('Usuario logueado: ', userLogged.user);
                    setUserLoggedName(userLogged.user.name)
				}
			} catch (err) {
				console.log('Error al intentar obtener el token de usuario. Error: ', err);
                navigate("/login")
			}
		}
		menu();
	}, []);

    return(
        <div className='menuContainer'>
            <h1 className='tit'>Entidad Bancaria - {userLoggedName}</h1>
            <div className='operaciones'>
                <p><button>DEPÓSITO</button></p>
                <p><button>EXTRACCIONES</button></p>
                <p><button>RESUMEN</button></p>
            </div>
            <form onSubmit={handleDeslog}>
                <p><button className='btn-salida'>CERRAR SESIÓN</button></p>
            </form>
        </div>
    )
}

export default Menu;