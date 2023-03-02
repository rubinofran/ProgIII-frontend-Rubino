import { useState, useEffect } from "react";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import axios from "axios";
/* import { useContext } from "react"; */
// Ant desing
import { Divider, Row, Col, Button } from "antd";

// Servicios
import localStorageService from "../services/localStorage";

// Contextos
/* import { AuxContext } from "../context/AuxContext"; */

function AppStatus() {

	const [status, setStatus] = useState({});
	/* const { txt } = useContext(AuxContext); */

	useEffect(() => {
		async function fetchData() {
			const response = await axios.get(apiBaseUrl);
			setStatus(response.data);
			localStorageService.deleteLS()
		}
		fetchData();
	}, []);

	return (
		<div className='indexCssContainers'>
			<Divider style={styles.divider}/>
			<img src={logo} className='App-logo' alt='logo' />
			<Divider style={styles.divider} orientation='center'>FINAL PROG III - MERN PROJECT</Divider>
			<h3>APP STATUS</h3>
			<Divider style={styles.divider} orientation='center'>API</Divider>
			<Row>
				<Col span={6}></Col>
				<Col span={6}>
					<b>NOMBRE:</b> {JSON.stringify(status.name)}
				</Col>
				<Col span={6}>
					<b>VERSIÓN:</b> {JSON.stringify(status.version)}
				</Col>
				<Col span={6}></Col>
			</Row>
			{/* <Divider style={styles.divider} orientation='center'>AUX</Divider>
			<h3>{txt}</h3> */}
			<Divider style={styles.divider} orientation='center'>LINKS</Divider>
			<Button><Link to='/login' target='_blank'>TO MAIN APP</Link></Button>
			<Divider style={styles.divider}/>
		</div>
	)
}

const styles = {
	divider: {
		borderWidth: 2, 
		borderColor: 'aquamarine' 
	},
}

export default AppStatus;
