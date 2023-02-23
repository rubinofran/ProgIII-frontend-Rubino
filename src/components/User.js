import { useState } from "react";
import '../styles/User.css';
/* import { Link, useNavigate } from "react-router-dom"; */

/* import userService from "../services/users"; */

function User({ data, userList, setUserList }) {
	const { name, userName, _id } = data;
	/* const [userNameModified, setUserNameModified] = useState(data.userName); */

	const loguearInfoCompleta = async () => {
		console.log('log')
/* 		const { data: userInfo } = await userService.getUserById(_id);
		console.log("userInfo: ", userInfo); */
	};

	const modificarUsuario = async () => {
		console.log('mod')
/* 		const response = await userService.updateUserById(_id, {
			userName: userNameModified,
		});
		console.log("Response: ", response); */
	};

	const eliminarUsuario = async () => {
		console.log('elim')
/* 		try {
			const response = await userService.deleteUserById(_id);
			setUserList(userList.filter((x) => x._id !== _id));
			console.log("Response: ", response);
		} catch (err) {
			console.log("Therre was an error deleting user ", _id);
			console.log(err);
		} */
	};

	return (
		<div>
			{name} - {userName} -
			<button onClick={() => loguearInfoCompleta()}>Ver</button>
{/* 			<Button type="primary" onClick={() => loguearInfoCompleta()}>
				Ver Detalle
			</Button> */}
			<button onClick={() => modificarUsuario()}>Baja</button>
			<button onClick={() => eliminarUsuario()}>X</button>
{/* 			<Button danger disabled={true} onClick={() => eliminarUsuario()}>
				Borrar
			</Button> */}
		</div>
	);
}

export default User;
