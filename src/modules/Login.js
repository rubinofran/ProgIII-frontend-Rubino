import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// Ant desing 
import { Divider, Row, Col, Form, Input, Button, message, Card } from "antd"; 
// message.error('error message') message.warning('warning message') message.open('success message')

// Servicios
import localStorageService from "../services/localStorage";
import userService from "../services/users";

function Login() {

    const navigate = useNavigate();
    
    const [users, setUsers] = useState([]);

	const error = (errorMessage) => {
		message.error(errorMessage);
	};

    const handleLogin = async (values) => {
        try {
            if(values.password.trim() === '') {
                error('La contraseña no puede estar vacía')
                console.log('Error: la contraseña no puede estar vacía')
            } /* else if(users.every(u => u.userName !== values.username)) { 
                error(`El usuario/email ${values.username} no se encuentra registrado`)
                console.log(`Error: el usuario/email ${values.username} no se encuentra registrado`)
            } */ else {
                const response = await userService.validateUserAndCreateToken({
                    userName: values.username,
                    password: values.password
                }); // esto
                /* if (response.data.token) { */
                    const payload = { user: response.data.user, token: response.data.token };
                    localStorageService.setLS(payload); // esto
                /* } */
                response.data.user.role === 'admin'
                    ? navigate('/admin-menu')            
                    : navigate('/menu') // esto
                /* console.log('Response: ', response.data) */
            }
        } catch (err) {
            /* console.log(err) */
            console.log(err.response.data);
            error(err.response.data)
        }
    };
      
    const handleLoginFailed = (errorInfo) => {
        // eslint-disable-next-line
        errorInfo.errorFields.map(err => {
            error(err.errors);
            console.log('Error: ' + err.errors[0]);
        });
    };

    useEffect(() => {
		async function login() {
			try {
				let response = await localStorageService.getLS();
				if (!response) {
                    console.log('Local storage vacío');
				} else {
					console.log('Usuario logueado: ', response.user);
				}
                response = await userService.getUsers();
			    setUsers(response.data);
			} catch (err) {
				console.log('Error al intentar obtener el token de usuario. Error: ', err);
			}
		}
		login();
	}, []);

    return(
        <div className='indexCssContainers'>
            <Divider style={styles.divider}/>
            <Divider style={styles.divider}>ENTIDAD BANCARIA</Divider>
            <Row justify='space-around'>
                <Col>
                    <Card title='INGRESO' style={styles.card}>
                        <Form
                            onFinish={handleLogin}
                            onFinishFailed={handleLoginFailed}
                        >
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
                                <Button htmlType='submit'>INICIAR SESIÓN</Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
            <Divider style={styles.divider}/>
            <Button><Link to='/reg-form'>REGISTRARSE</Link></Button>
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
    }
}

export default Login;