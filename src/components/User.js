import { useState } from "react";
import "../styles/User.css";
// Ant desing 
import { Row, Col, Button, Modal/* , message */ } from "antd";

// Servicios
import userService from "../services/users";

// Componentes
import Transaction from "./Transaction";

function User({ data, userList, setUserList, transactionList }) {

	const { _id, name, isActive } = data;
	
	const [user, setUser] = useState({})

	const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
	const handleDetailsModalOk = () => { setIsDetailsModalOpen(false); };
	const handleDetailsModalCancel = () => { setIsDetailsModalOpen(false); };

	const [isTransactionsModalOpen, setIsTransactionsModalOpen] = useState(false);
	const handleTransactionsModalOk = () => { setIsTransactionsModalOpen(false); };
	const handleTransactionsModalCancel = () => { setIsTransactionsModalOpen(false); };

	
	const [deleteWarningModalOpen, setdeleteWarningModalOpen] = useState(false);
	const handleDeleteWarningModalOk = () => { 
		deleteUser()
		setdeleteWarningModalOpen(false); 
	};
	const handleDeleteWarningModalCancel = () => { setdeleteWarningModalOpen(false); };

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

	const logCompleteInfo = async () => {
		const { data: userInfo } = await userService.getUserById(_id);
		console.log('Detalles del usuario seleccionado: ', userInfo);
		setUser(userInfo)
		setIsDetailsModalOpen(true);
	};

	const logTransactionsInfo = () => {
		setIsTransactionsModalOpen(true)
	};

	const deleteWarning = () => {
		setdeleteWarningModalOpen(true)
	};

	const modifyUser = async (isActive) => {
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

	const deleteUser = async () => {
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
			<Modal title={name} open={isDetailsModalOpen} onOk={handleDetailsModalOk} onCancel={handleDetailsModalCancel}>
				<p><b>Estado:</b> {user.isActive ? 'activo' : 'inactivo'}</p>
				<p><b>Tipo de cliente:</b> {user.clientType}</p>
				<p><b>Correo electrónico:</b> {user.userName}</p>
				<p><b>Dirección:</b> {user.address}</p>
				<p><b>Dinero en cuenta:</b> ${user.moneyInAccount}</p>
				<p><b>Última modificación:</b> {user.updatedAt}</p>
				<p><b>Alias:</b> {user.alias}</p>
			</Modal>
			<Modal title={name} open={isTransactionsModalOpen} onOk={handleTransactionsModalOk} onCancel={handleTransactionsModalCancel}>
				{transactionList.filter(t => t.userId === _id).map(x => (
					<Transaction
						key={x._id}
						data={x}
					></Transaction>
				))}
			</Modal>
			<Modal title='Alerta' open={deleteWarningModalOpen} onOk={handleDeleteWarningModalOk} onCancel={handleDeleteWarningModalCancel}>
				¿Está seguro de que desea eliminar al usuario {name}?
			</Modal>
			<Row style={styles.row}>
				<Col span={12}>{name}</Col>
				<Col span={3}>
					<Button type='primary' onClick={logCompleteInfo}>DETALLES</Button>
				</Col>
				<Col span={3}>
					<Button type='primary' onClick={logTransactionsInfo}>MOVIMIENTOS</Button>
				</Col>
				<Col span={3}>
					{isActive
						? <Button type='primary' danger onClick={() => modifyUser(isActive)}>DAR DE BAJA</Button>
						: <Button type='primary' onClick={() => modifyUser(isActive)}>DAR DE ALTA</Button>
					}
				</Col>
				<Col span={3}>
					{/* <Button type='primary' onClick={deleteUser} danger>ELIMINAR</Button> */}
					<Button type='primary' onClick={deleteWarning} danger>ELIMINAR</Button>
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
