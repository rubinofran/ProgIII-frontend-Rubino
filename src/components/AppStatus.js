import { useContext } from 'react';
import logo from '../assets/logo.svg';
import '../styles/App.css';
import '../styles/AppStatus.css';

/*  */
import { useState, useEffect } from "react";
import axios from "axios";
/*  */

import { AuxContext } from "../context/AuxContext";

function AppStatus() {
	/*  */
	const [status, setStatus] = useState({});
	/*  */
	
	const { txt } = useContext(AuxContext);

	useEffect(() => {
		async function fetchData() {
			const response = await axios.get("http://localhost:3000");
			setStatus(response.data);
		}
		fetchData();
	}, []);

	return (
		<div className='status'>
			<img src={logo} className="App-logo" alt="logo" />
			<h1>FINAL PROG III - MERN PROJECT - APP STATUS</h1>
			<h2>{JSON.stringify(status)}</h2>
			<h2>{txt}</h2>
		</div>
	)
}

export default AppStatus;
