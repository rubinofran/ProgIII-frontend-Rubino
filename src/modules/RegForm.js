import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// Ant desing 
import { Divider, Row, Col, Form, Input, Button, message, Card, Select } from "antd";

// Servicios
import userService from "../services/users";

function RegForm() {

    const navigate = useNavigate();

    const [users, setUsers] = useState([]);

     const defaultTypes = { client: 'Persona física', account: 'Cuenta corriente' }

    const [clientType, setClientType] = useState(defaultTypes.client);
    const [accountType, setAccountType] = useState(defaultTypes.account);

    const error = (errorMessage) => {
		message.error(errorMessage);
	};

    const success = (successMessage) => {
		message.success(successMessage);
	};

    const handleChangeClientType = (value) => {
        setClientType(value);
    };

    const handleChangeAccountType = (value) => {
        setAccountType(value);
    };

    const handleRegForm = async (values) => {
        try {
            if(
                values.address.trim() === '' ||
                values.password.trim() === '' ||
                (clientType === defaultTypes.client && values.firstName.trim() === '') ||
                (clientType === defaultTypes.client && values.lastName.trim() === '') ||
                (clientType !== defaultTypes.client && values.businessName.trim() === '') 
            ) {
                error('Algunos de los campos están vacíos')
                console.log('Error: algunos de los campos están vacíos')
            } else if(users.some(u => u.userName === values.username)) {
                error(`El usuario/email ${values.username} ya existe`)
                console.log(`Error: el usuario/email ${values.username} ya existe`)
            } else {
                console.log(`
                    Tipo de cliente: ${clientType}
                    Información: ${
                        clientType === defaultTypes.client 
                            ? values.firstName + ' ' + values.lastName
                            : values.businessName
                    }
                    Dirección: ${values.address}
                    Tipo de cuenta: ${accountType}
                    Usuario: ${values.username}
                    Contraseña: ${values.password}
                `);
			    const response = await userService.createUser({
                    userName: values.username,
                    password: values.password,
                    clientType,
                    name: clientType === defaultTypes.client 
                        ? values.firstName + ' ' + values.lastName
                        : values.businessName,
                    address: values.address,
                    accountType,
                    role: 'user'
			    });
                console.log('Response: ', response.data)
                success('Nuevo usuario creado')
                navigate("/login");
            }
        } catch (err) {
            console.log('Error: ...')
            console.log(err);
        }

    }

    const handleRegFormFailed = (errorInfo) => {
        // eslint-disable-next-line
        errorInfo.errorFields.map(err => {
            error(err.errors);
            console.log('Error: ' + err.errors[0]);
        })
    };

    useEffect(() => {
        async function fetchData() {
			const response = await userService.getUsers();
			setUsers(response.data);
		}
		fetchData();
	}, []);

    return(
        <div className='indexCssContainers'>
            <Divider style={styles.divider}/>
            <Divider style={styles.divider}>ENTIDAD BANCARIA</Divider>
            {/* <h1 className='tit'>Entidad Bancaria - Registro</h1> */}
            <Row justify='space-around'>
                <Col>
                    <Card title='REGISTRO' style={styles.card}>
                        <Select
                            defaultValue={defaultTypes.client}
                            style={styles.select}
                            onChange={handleChangeClientType}
                            options={[
                                {value: 'Persona física', label: 'Persona física'}, 
                                {value: 'Persona jurídica', label: 'Persona jurídica'}
                            ]}
                        />
                        <Select
                            defaultValue={defaultTypes.account}
                            style={styles.select}
                            onChange={handleChangeAccountType}
                            options={[
                                {value: 'Cuenta corriente', label: 'Cuenta corriente'}, 
                                {value: 'Caja de ahorro', label: 'Caja de ahorro'}
                            ]}
                        />
                        <Form
                            onFinish={handleRegForm}
                            onFinishFailed={handleRegFormFailed}
                        >   
                            
                            {
                                clientType  === defaultTypes.client
                                    ?
                                    <div>
                                        <Form.Item
                                            label='Nombre'
                                            name='firstName'
                                            rules={[{ required: true, message: 'Debe ingresar un nombre' }]}
                                        >
                                            <Input 
                                                placeholder='Ingrese su nombre'
                                                type='text'
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            label='Apellido'
                                            name='lastName'
                                            rules={[{ required: true, message: 'Debe ingresar un apellido' }]}
                                        >
                                            <Input 
                                                placeholder='Ingrese su apellido'
                                                type='text'
                                            />
                                        </Form.Item>
                                    </div>
                                    :
                                        <Form.Item
                                            label='Razón social'
                                            name='businessName'
                                            rules={[{ required: true, message: 'Debe ingresar una identificación de razón social' }]}
                                        >
                                            <Input 
                                                placeholder='Ingrese su razón social'
                                                type='text'
                                            />
                                        </Form.Item>
                            }
                            <Form.Item
                                label='Dirección'
                                name='address'
                                rules={[{ required: true, message: 'Debe ingresar una dirección' }]}
                            >
                                <Input 
                                    placeholder='Ingrese su dirección'
                                    type='text'
                                />
                            </Form.Item>
                            <Form.Item
                                label='Usuario'
                                name='username'
                                rules={[{ type: 'email' }, { required: true, message: 'Debe ingresar un email' }]}
                            >
                                <Input 
                                    placeholder='Ingrese su correo electrónico'
                                    type='email'
                                />
                            </Form.Item>
                            <Form.Item
                                label='Contraseña'
                                name='password'
                                rules={[{ required: true, message: 'Debe ingresar una contraseña' }]}
                            >
                                <Input 
                                    placeholder='Ingrese su contraseña'
                                    type='password'
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button htmlType='submit'>CONFIRMAR</Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
{/*             <form onSubmit={handleSubmit} className='indexCssForms'>
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
            </form> */}
            <Divider style={styles.divider}/>
            <Button><Link to='/login'>ATRAS</Link></Button>
            <Divider style={styles.divider}/>
        </div>
    )

}

const styles = {
    divider: {
		borderWidth: 2, 
		borderColor: 'aquamarine',
	},
    card: { 
        width: 500, 
        backgroundColor: 'aquamarine' 
    },
    select: {
        margin: '0 10px 25px 0'
    }
}

export default RegForm;