import { useState, useEffect } from "react";
import '../styles/AdminMenu.css';
import { Link, useNavigate } from "react-router-dom";

// Servicios
import userService from "../services/users";
import localStorageService from "../services/localStorage";

// Componentes
import User from "../components/User";

function AdminMenu() {

	const [users, setUsers] = useState([]);
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
		async function adminMenu() {
			try {
				const userLogged = await localStorageService.getLS();
				if (!userLogged) {
                    console.log('Local storage vacío');
                    navigate("/login")
				} else {
					console.log('Usuario logueado: ', userLogged.user);
                    setUserLoggedName('PONER NAME AL ADMIN') // userLogged.user.name
					const response = await userService.getUsers();
					setUsers(response.data);
				}
			} catch (err) {
				console.log('Error al intentar obtener el token de usuario. Error: ', err);
				navigate("/login")
			}
		}
		adminMenu();
	}, []);

    return (
        <div className='adminMenuContainer'>
			<h1>Entidad Bancaria - Administrador - {userLoggedName}</h1>
            {users.map(x => (
				/* MEJORAR */
				x.userName.includes('admin')
					? 'nombre o razón social - email/nombre de usuario - Detalles - Dar de baja - Eliminar' 
					: 
					<User
						key={x._id}
						data={x}
						userList={users}
						setUserList={setUsers}
					></User>
			))}
			<form onSubmit={handleDeslog}>
                <p><button className='btn-salida'>CERRAR SESIÓN</button></p>
            </form>
        </div>
    )
}

export default AdminMenu;