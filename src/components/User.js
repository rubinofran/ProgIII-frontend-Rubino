import { useState } from "react";
import "../styles/User.css";
// Ant desing 
import { Row, Col, Button, Modal/* , message */ } from "antd";

// Servicios
import userService from "../services/users";



function User({ data, userList, setUserList }) {

	const { _id, name, isActive } = data;
	
	const [user, setUser] = useState({})

	const [isModalOpen, setIsModalOpen] = useState(false);
	const handleDetailsModalOk = () => { setIsModalOpen(false); };
	const handleDetailsModalCancel = () => { setIsModalOpen(false); };

	/* const [userNameModified, setUserNameModified] = useState(data.userName); */

/* 	const error = (errorMessage) => {
		message.error(errorMessage);
	}; */

/* 	const warning = (warningMessage) => {
		message.warning(warningMessage);
	};  */

/* 	const alertWarning = () => {
		return (
			<Alert
				message="Confirmar?"
				type="warning"
				action={
					<Button size="small" type="primary">SI</Button>
				}
				closable
		  	/>
		)
	} */

	const loguearInfoCompleta = async () => {
		const { data: userInfo } = await userService.getUserById(_id);
		console.log('Detalles del usuario seleccionado: ', userInfo);
		setUser(userInfo)
		setIsModalOpen(true);
	};

	const modificarUsuario = async (isActive) => {
		try {
			let response = {}
			if(isActive) {
				console.log('Intenta dar de baja al usuario ', name);
				response = await userService.updateUserById(_id, {
					isActive: false
				});
				console.log('Response: ', response.data);
			} else {
				console.log('Intenta dar de alta al usuario ', name);
				response = await userService.updateUserById(_id, {
					isActive: true
				});
				console.log('Response: ', response.data);
			}
			setUserList([...userList.filter((x) => x._id !== _id), response.data]);
		} catch (err) {
			console.log('Error al intentar modificar al usuario ', name);
			console.log(err);
		}
	};

	const eliminarUsuario = async () => {
		try {
			const response = await userService.deleteUserById(_id);
			setUserList(userList.filter((x) => x._id !== _id));
			console.log('Response: ', response);
		} catch (err) {
			console.log('Error al intentar eliminar al usuario ', name);
			console.log(err);
		}
	};

	return (
		<div className='userCssRowHover'>
			<Modal title={name} open={isModalOpen} onOk={handleDetailsModalOk} onCancel={handleDetailsModalCancel}>
				<p><b>Estado:</b> {user.isActive ? 'activo' : 'inactivo'}</p>
				<p><b>Tipo de cliente:</b> {user.clientType}</p>
				<p><b>Correo electrónico:</b> {user.userName}</p>
				<p><b>Dirección:</b> {user.address}</p>
				<p><b>Dinero en cuenta:</b> ${user.moneyInAccount}</p>
				<p><b>Última modificación:</b> {user.updatedAt}</p>
			</Modal>
			<Row style={styles.row}>
				<Col span={18}>{name}</Col>
				<Col span={2}>
					<Button type='primary' onClick={loguearInfoCompleta}>DETALLES</Button>
				</Col>
				<Col span={2}>
					{isActive
						? <Button type='primary' danger onClick={() => modificarUsuario(isActive)}>DAR DE BAJA</Button>
						: <Button type='primary' onClick={() => modificarUsuario(isActive)}>DAR DE ALTA</Button>
					}
				</Col>
				<Col span={2}>
					<Button type='primary' onClick={eliminarUsuario} danger>ELIMINAR</Button>
				</Col>
			</Row>
		</div>
	);
}

const styles = {
	row: {
        padding: '15px 0',
    }
}

export default User;
