import { useState, useEffect } from "react";
import '../styles/AdminMenu.css';
import { useNavigate } from "react-router-dom";
// Ant desing 
import { Divider, Button, Alert, Space } from "antd";

// Servicios
import userService from "../services/users";
import localStorageService from "../services/localStorage";

// Componentes
import User from "../components/User";

function AdminMenu() {

	const [users, setUsers] = useState([]);
	const [userLoggedName, setUserLoggedName] = useState('')

    const navigate = useNavigate()

	const handleDeslog = () => {
		localStorageService.deleteLS()
		navigate("/login")
	}

	useEffect(() => {
		async function adminMenu() {
			try {
				const userLogged = await localStorageService.getLS();
				if (!userLogged) {
                    console.log('Local storage vacío');
                    navigate("/login");
				} else {
					console.log('Usuario logueado: ', userLogged.user);
                    setUserLoggedName(userLogged.user.name);
					const response = await userService.getUsers();
					/* console.log(response) */
					setUsers(response.data.filter((x) => x.role.name !== 'admin'));
				}
			} catch (err) {
				console.log('Error al intentar obtener el token de usuario. Error: ', err);
				navigate("/login");
			}
		}
		adminMenu();
	}, []);

    return (
        <div className='indexCssContainers'>
{/* 			<Space direction="vertical" style={{ width: '25%' }}>
			    <Alert
					hidden={true}
					message="¿ELIMINAR DEFINITIVAMNETE?"
					showIcon
					type="error"
					closable
					action={
						<Button type="primary" size="small" danger>
							CONFIRMAR
						</Button>
					}
				/>
			</Space> */}
			<Divider style={styles.divider}/>
            <Divider style={styles.divider}>ENTIDAD BANCARIA - ADMINISTRADOR - {userLoggedName}</Divider>
			<div className='adminMenuCssScrollableArea'>
				{users.map(x => (
					<User
						key={x._id}
						data={x}
						userList={users}
						setUserList={setUsers}
					></User>
				))}
			</div>
			<Divider style={styles.divider}/>
			<Button onClick={handleDeslog}>CERRAR SESIÓN</Button>
			<Divider style={styles.divider}/>
        </div>
    )
}

const styles = {
	divider: {
		borderWidth: 2, 
		borderColor: 'aquamarine',
	},
	row: {
        padding: '15px 0',
		backgroundColor: 'lightgrey'
    }
}

export default AdminMenu;