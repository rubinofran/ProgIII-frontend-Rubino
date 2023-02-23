import { useState, useEffect } from "react";
import logo from '../assets/logo.svg';
import '../styles/App.css';
import '../styles/AppStatus.css';
import { Link } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import axios from "axios";
import { useContext } from 'react';

// Servicios
import localStorageService from "../services/localStorage";

// Contextos
import { AuxContext } from "../context/AuxContext";

function AppStatus() {

	const [status, setStatus] = useState({});
	const { txt } = useContext(AuxContext);

	useEffect(() => {
		async function fetchData() {
			const response = await axios.get(apiBaseUrl);
			setStatus(response.data);
			localStorageService.deleteLS()
		}
		fetchData();
	}, []);

	return (
		<div className='status'>
			<img src={logo} className="App-logo" alt="logo" />
			<h1>FINAL PROG III - MERN PROJECT - APP STATUS</h1>
			<h2>REST API: {JSON.stringify(status)}</h2>
			<h2>{txt}</h2>
			<button><Link to='/login'>TO MAIN APP</Link></button>
            <button><Link to='/pruebas'>TO TESTS</Link></button>
		</div>
	)
}

export default AppStatus;
