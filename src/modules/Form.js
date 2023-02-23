import { useState, useEffect } from "react";
import '../styles/Form.css';
import { Link } from "react-router-dom";
/* import { useContext } from 'react'; */

// Servicios
import userService from "../services/users";

// Contextos
/* import { Alias } from "../context/Alias"; */

function Form() {

    /* const { aliasList } = useContext(Alias); */

    const [users, setUsers] = useState([]);

    const defaultTypes = {client: 'Persona física', account: 'Cuenta corriente'}

    const [clientType, setClientType] = useState(defaultTypes.client)
    const [accountType, setAccountType] = useState(defaultTypes.account)

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [businessName, setBusinessName] = useState('')
    const [address, setAddress] = useState('')

    const [username, setUsername] = useState('') 
    const [password, setPassword] = useState('')

    const error = (errorMessage) => {
		window.alert("Error: " + errorMessage);
	};

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            console.log(`
                Tipo de cliente: ${clientType}
                Información: ${
                    clientType === defaultTypes.client 
                        ? firstName + ' ' + lastName
                        : businessName
                }
                Dirección: ${address}
                Tipo de cuenta: ${accountType}
                Usuario: ${username}
                Contraseña: ${password}
            `);
			const newUser = await userService.createUser({
                userName: username,
                password,
                clientType,
                name: clientType === defaultTypes.client 
                    ? firstName + ' ' + lastName
                    : businessName,
                address,
                accountType, 
                cbu: users[users.length - 1].cbu + 1, /* no va a ir, con alias y el id sería suficiente */
                alias: 'PISO.PIEDRA.SOMBRERO', /* ver */
                moneyInAccount: 0,
                isActive: true,
                createdAt: new Date(),
                updatedAt: new Date(), 
			});
			setUsers([...users, newUser]);
            setFirstName('')
            setLastName('')
            setBusinessName('')
            setAddress('')
            setUsername('')
            setPassword('')
        } catch (err) {
            console.log('.... Error: ', err);
            error('...')
        }

    }

    useEffect(() => {
        async function fetchData() {
			const response = await userService.getUsers();
			setUsers(response.data);
		}
		fetchData();
	}, []);

    return(
        <div className='formContainer'>
            <h1 className='tit'>Entidad Bancaria - Registro</h1>
            <form onSubmit={handleSubmit} className='form'>
                <p>DATOS</p>
                <p>
                    <label>Tipo de cliente: </label>
                    <select 
                        defaultValue={defaultTypes.client} 
                        onChange={({target}) => setClientType(target.value)}
                    >
                        <option value='Persona física'>Persona física</option>
                        <option value='Persona jurídica'>Persona jurídica</option>
                    </select>
                </p>
                {
                    clientType === defaultTypes.client
                    ? 
                    <div>
                        <p>
                            <label>Nombre: </label>
                            <input 
                                type='text'
                                value={firstName}
                                placeholder='Nombre'
                                onChange={({target}) => setFirstName(target.value)}
                                required
                            />
                        </p>
                        <p>
                            <label>Apellido: </label>
                            <input 
                                type='text'
                                value={lastName}
                                placeholder='Apellido'
                                onChange={({target}) => setLastName(target.value)}
                                required
                            />
                        </p>
                    </div>
                    :
                    <div>
                        <p>
                            <label>Razón social: </label>
                            <input 
                                type='text'
                                value={businessName}
                                placeholder='Razón social'
                                onChange={({target}) => setBusinessName(target.value)}
                                required
                            />
                        </p>
                    </div>
                }
                <p>
                    <label>Dirección: </label>
                    <input 
                        type='text'
                        value={address}
                        placeholder='Dirección y número'
                        onChange={({target}) => setAddress(target.value)}
                        required
                    />
                </p> 
                <p>
                    <label>Tipo de cuenta: </label>
                    <select 
                        defaultValue={defaultTypes.account} 
                        onChange={({target}) => setAccountType(target.value)}
                    >
                        <option value='Cuenta corriente'>Cuenta corriente</option>
                        <option value='Caja de ahorro'>Caja de ahorro</option>
                    </select>
                </p>
                <p>CUENTA</p>
                <p>
                    <label>Usuario: </label>
                    <input 
                        type='email'
                        value={username}
                        placeholder='Usuario'
                        onChange={({target}) => setUsername(target.value)}
                        required
                    />
                </p>
                <p>
                    <label>Contraseña: </label>
                    <input 
                        type='password'
                        value={password}
                        placeholder='Contraseña'
                        onChange={({target}) => setPassword(target.value)}
                        required
                    />
                </p>
                <p><button>CONFIRMAR</button></p>
            </form>
            <button className='btn-salida'><Link to='/login'>ATRAS</Link></button>
        </div>
    )

}

export default Form;