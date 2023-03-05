import { useState, useEffect } from "react";
import '../styles/AdminMenu.css';
import { useNavigate } from "react-router-dom";
// Ant desing 
import { Divider, Button } from "antd";

// Servicios
import userService from "../services/users";
import localStorageService from "../services/localStorage";
import transactionService from "../services/transactions";

// Componentes
import User from "../components/User";

function AdminMenu() {

	const [users, setUsers] = useState([]);
	const [userLoggedName, setUserLoggedName] = useState('')
	const [transactions, setTransactions] = useState([])
	const [token, setToken] = useState('')

    const navigate = useNavigate()

	const handleDeslog = () => {
		localStorageService.deleteLS();
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
					setToken(userLogged.token)
					console.log('Usuario logueado!!!: ', userLogged.user);
                    setUserLoggedName(userLogged.user.name);
					let response = await userService.getUsers(userLogged.token);
					setUsers(response.data.filter((x) => x.role.name !== 'admin'));
					response = await transactionService.getAllTransactions(userLogged.token)
                    setTransactions(response.data)
				}
			} catch (err) {
				console.log('Error al intentar obtener el token de usuario. Error: ', err);
				localStorageService.deleteLS();
				navigate("/login");
			}
		}
		adminMenu();
		// eslint-disable-next-line 
	}, []);

    return (
        <div className='indexCssContainers'>
			<Divider style={styles.divider}/>
            <Divider style={styles.divider}>ENTIDAD BANCARIA - ADMINISTRADOR - {userLoggedName}</Divider>
			<div className='adminMenuCssScrollableArea'>
				{users.map(x => (
					<User
						key={x._id}
						data={x}
						userList={users}
						setUserList={setUsers}
						transactionList={transactions}
						token={token}
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