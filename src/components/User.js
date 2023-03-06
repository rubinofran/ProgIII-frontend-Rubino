import { useState } from "react";
import "../styles/User.css";
// Ant desing 
import { Row, Col, Button, Modal, message, Input } from "antd";

// Servicios
import userService from "../services/users";

// Componentes
import Transaction from "./Transaction";

function User({ data, userList, setUserList, transactionList, token }) {

	const { _id, name, address, isActive } = data;
	
	const [user, setUser] = useState({})
	const [newName, setNewName] = useState(name)
	const [newAddress, setNewAddress] = useState(address)

	const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
	const handleDetailsModalOk = () => setIsDetailsModalOpen(false);
	const handleDetailsModalCancel = () => setIsDetailsModalOpen(false);

	const [isTransactionsModalOpen, setIsTransactionsModalOpen] = useState(false);
	const handleTransactionsModalOk = () => setIsTransactionsModalOpen(false);
	const handleTransactionsModalCancel = () => setIsTransactionsModalOpen(false);
	
	const [updateWarningModalOpen, setUpdateWarningModalOpen] = useState(false);
	const handleUpdateWarningModalOk = () => updateUser(); 
	const handleUpdateWarningModalCancel = () => setUpdateWarningModalOpen(false);

	const [deleteWarningModalOpen, setdeleteWarningModalOpen] = useState(false);
	const handleDeleteWarningModalOk = () => { 
		deleteUser()
		setdeleteWarningModalOpen(false); 
	};
	const handleDeleteWarningModalCancel = () => setdeleteWarningModalOpen(false);

	const error = errorMessage => message.error(errorMessage);
	/* const warning = (warningMessage) => message.warning(warningMessage); */

	const logCompleteInfo = async () => {
		const { data: userInfo } = await userService.getUserById(_id, token);
		console.log('Detalles del usuario seleccionado: ', userInfo);
		setUser(userInfo)
		setIsDetailsModalOpen(true);
	};

	const logTransactionsInfo = () => setIsTransactionsModalOpen(true);
	const updateWarinig = () => setUpdateWarningModalOpen(true)
	const deleteWarning = () => setdeleteWarningModalOpen(true);

	const modifyStatusUser = async (isActive) => {
		try {
			let response = {}
			if(isActive) {
				console.log('Intenta dar de baja al usuario ', name);
				response = await userService.updateUserById(_id, {
					isActive: false
				}, token);
			} else {
				console.log('Intenta dar de alta al usuario ', name);
				response = await userService.updateUserById(_id, {
					isActive: true
				}, token);
			}
			/* console.log('Response: ', response.data); */
			setUserList([...userList.filter((x) => x._id !== _id), response.data]);
		} catch (err) {
			/* console.log(err); */
			error('Error al intentar modificar al usuario ', name);
			console.log(err.response.data);
		}
	};

	const updateUser = async () => {
		try {
			console.log('Intenta dar de modificar al usuario ', name);
			if(newName.trim() === '' || newAddress.trim() === '') {
                error('Algunos de los campos están vacíos')
                console.log('Error: algunos de los campos están vacíos')
            } else {
				const response = await userService.updateUserById(_id, {
					name: newName,
					address: newAddress
				}, token);
				/* console.log('Response: ', response.data); */
				setUserList([...userList.filter((x) => x._id !== _id), response.data]);
				setUpdateWarningModalOpen(false);
			}
		} catch (err) {
			/* console.log(err); */
			error('Error al intentar modificar al usuario ', name);
			console.log(err.response.data);
		}
	}
	
	const deleteUser = async () => {
		try {
			const response = await userService.deleteUserById(_id, token);
			setUserList(userList.filter((x) => x._id !== _id));
			console.log('Response: ', response);
		} catch (err) {
			/* console.log(err); */
			console.log(err.response.data);
            error(err.response.data);
		}
	};

	return (
		<div className='userCssRowHover'>
			<Modal title={name} open={isDetailsModalOpen} onOk={handleDetailsModalOk} onCancel={handleDetailsModalCancel}>
				<p className="adminMenuCssSizeP"><b>Estado:</b> {user.isActive ? 'activo' : 'inactivo'}</p>
				<p className="adminMenuCssSizeP"><b>Tipo de cliente:</b> {user.clientType}</p>
				<p className="adminMenuCssSizeP"><b>Tipo de cuenta:</b> {user.accountType}</p>
				<p className="adminMenuCssSizeP"><b>Correo electrónico:</b> {user.userName}</p>
				<p className="adminMenuCssSizeP"><b>Dirección:</b> {user.address}</p>
				<p className="adminMenuCssSizeP"><b>Dinero en cuenta:</b> ${user.moneyInAccount}</p>
				<p className="adminMenuCssSizeP"><b>Última modificación:</b> {user.updatedAt}</p>
				<p className="adminMenuCssSizeP"><b>Alias:</b> {user.alias}</p>
			</Modal>
			<Modal title={name} open={isTransactionsModalOpen} onOk={handleTransactionsModalOk} onCancel={handleTransactionsModalCancel}>
				{!transactionList.filter(t => t.userId === _id).length 
					? <p className="adminMenuCssSizeP">No se registraron movimientos en la cuenta</p>
					: transactionList.filter(t => t.userId === _id).map(x => (
					  	<Transaction
					  		key={x._id}
					  		data={x}
					  	></Transaction>
					  ))
				}
			</Modal>
			<Modal title='Modificaciones' open={updateWarningModalOpen} onOk={handleUpdateWarningModalOk} onCancel={handleUpdateWarningModalCancel}>
				<p className="adminMenuCssSizeP"><b>Nuevo nombre o razón social:</b></p>
				<Input 
					style={styles.input}
					placeholder='Ingrese un nuevo nombre'
					type='text'
					defaultValue={name}
					onChange={({target}) => setNewName(target.value)} 
				/>
				<p className="adminMenuCssSizeP"><b>Nueva dirección:</b></p>
				<Input 
					style={styles.input}
					placeholder='Ingrese una nueva dirección'
					type='text'
					defaultValue={address}
					onChange={({target}) => setNewAddress(target.value)} 
				/>
			</Modal>
			<Modal title='Alerta' open={deleteWarningModalOpen} onOk={handleDeleteWarningModalOk} onCancel={handleDeleteWarningModalCancel}>
				<p className="adminMenuCssSizeP">¿Está seguro de que desea eliminar al usuario {name}?</p>
			</Modal>
			<Row style={styles.row}>
				<Col span={4}><b style={styles.txt}>{name}</b></Col>
				<Col span={4}>
					<Button type='primary' onClick={logCompleteInfo} style={styles.button}>DETALLES</Button>
				</Col>
				<Col span={4}>
					<Button type='primary' onClick={logTransactionsInfo} style={styles.button}>MOVIMIENTOS</Button>
				</Col>
				<Col span={4}>
					<Button type='primary' onClick={updateWarinig} style={styles.button}>MODIFICACIONES</Button>
				</Col>
				<Col span={4}>
					{isActive
						? <Button type='primary' danger onClick={() => modifyStatusUser(isActive)} style={styles.button}>DAR DE BAJA</Button>
						: <Button type='primary' onClick={() => modifyStatusUser(isActive)} style={styles.button}>DAR DE ALTA</Button>
					}
				</Col>
				<Col span={4}>
					<Button type='primary' onClick={deleteWarning} danger style={styles.button}>ELIMINAR</Button>
				</Col>
			</Row>
		</div>
	);
}

const styles = {
	row: {
        padding: '15px 0',
    },
	button: {
		width: 160
	},
	txt: {
		fontSize: 'large'
	},
	input: {
        marginRight: 10, 
        width: 300,
        textAlign: 'center',
        padding: '5px' 
    }
}

export default User;
