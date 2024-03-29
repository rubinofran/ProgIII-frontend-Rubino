import { useState, useEffect } from "react";
import "../styles/Menu.css";
import { useNavigate } from "react-router-dom";
// Ant desing 
import { Divider, Row, Col, Card, Button } from "antd";

// Servicios
import localStorageService from "../services/localStorage";
import userService from "../services/users";
import transactionService from "../services/transactions";

// Componentes
import AccountInformation from "../components/AccountInformation";
import AccountSummary from "../components/AccountSummary";
import Operations from "../components/Operations";
import Transfers from "../components/Transfers";

function Menu() {

    const [user, setUser] = useState({});
    const [userLoggedName, setUserLoggedName] = useState('');
    const [userLoggedState, setUserLoggedState] = useState(Boolean);
    const [opt, setOpt] = useState(0);    
    const [userTransactions, setUserTransactions] = useState([])
    const [token, setToken] = useState('')

    const navigate = useNavigate();

    const showInfoTitle = () => {
        if(opt === 1) { return 'RESUMEN' }
        if(opt === 2) { return 'EXTRACCIÓN' }
        if(opt === 3) { return 'DEPÓSITO' }
        if(opt === 4) { return 'TRANSFERENCIA' }
        return 'INFORMACIÓN'
    }

    const showInfo = () => {
        /* console.log(user) */
        if(opt === 1) {
            console.log('El usuario intenta ver el resumen de la cuenta');
            if(!userLoggedState) {
                console.log('Usuario dado de baja. No puede visualizar el resumen de cuenta')
                return <p className="menuCssTransformP">Usuario dado de baja. No puede visualizar el resumen de cuenta</p>
            }
            return <AccountSummary data={user} transactions={userTransactions}/>
        }
        if(opt === 2) {
            /* console.log('El usuario intenta realizar una extracción'); */
            if(!userLoggedState) {
                console.log('Usuario dado de baja. No puede realizar extracciones')
                return <p className="menuCssTransformP">Usuario dado de baja. No puede realizar extracciones</p>
            }
            return <Operations data={user} isExtraction={true} setUser={setUser} transactions={userTransactions} setTransactions={setUserTransactions} token={token}/>
        }
        if(opt === 3) {
            /* console.log('El usuario intenta realizar un depósito'); */
            if(!userLoggedState) {
                console.log('Usuario dado de baja. No puede realizar depósitos')
                return <p className="menuCssTransformP">Usuario dado de baja. No puede realizar depósitos</p>
            }
            return <Operations data={user} isExtraction={false} setUser={setUser} transactions={userTransactions} setTransactions={setUserTransactions} token={token}/>
        }
        if(opt === 4) {
            /* console.log('El usuario intenta realizar una transferencia'); */
            if(!userLoggedState) {
                console.log('Usuario dado de baja. No puede realizar transferencias')
                return <p className="menuCssTransformP">Usuario dado de baja. No puede realizar transferencias</p>
            }
            return <Transfers data={user} setUser={setUser} transactions={userTransactions} setTransactions={setUserTransactions} token={token}/>
        }
        console.log('El usuario intenta ver la información de la cuenta');
        return <AccountInformation data={user}/>
    }

    const handleDeslog = () => {
        localStorageService.deleteLS();
        navigate("/login");
    }

    useEffect(() => {
		async function menu() {
			try {
				const userLogged = await localStorageService.getLS();
				if (!userLogged) {
                    console.log('Local storage vacío');
                    navigate("/login");
				} else {
                    setToken(userLogged.token)
					console.log('Usuario logueado: ', userLogged.user);
                    setUserLoggedName(userLogged.user.name);
                    setUserLoggedState(userLogged.user.isActive);
                    let response = await userService.getUserById(userLogged.user._id, userLogged.token);
                    setUser(response.data);
                    response = await transactionService.getAllTransactionsByUserId(userLogged.user._id, userLogged.token)
                    setUserTransactions(response.data)
				}
			} catch (err) {
				console.log('Error al intentar obtener el token de usuario. Error: ', err);
                localStorageService.deleteLS();
                navigate("/login");
			}
		}
		menu();
        // eslint-disable-next-line 
	}, []);

    return(
        <div className='indexCssContainers'>
            <Divider style={styles.divider}/>
            <Divider style={styles.divider}>ENTIDAD BANCARIA - {userLoggedName}</Divider>
            <Row justify='space-around'>
                <Col>
                    <Card title='OPERACIONES' style={styles.optCard}>
                        <p><Button onClick={() => setOpt(0)} style={styles.button}>INFORMACIÓN</Button></p>
                        <p><Button onClick={() => setOpt(1)} style={styles.button}>RESUMEN</Button></p>
                        <p><Button onClick={() => setOpt(2)} style={styles.button}>EXTRACCIÓN</Button></p>
                        <p><Button onClick={() => setOpt(3)} style={styles.button}>DEPÓSITO</Button></p>
                        <p><Button onClick={() => setOpt(4)} style={styles.button}>TRANSFERENCIA</Button></p>
                    </Card>
                </Col>
                <Col>
                    <Card title={showInfoTitle()} style={userLoggedState ? styles.infoCard : styles.blockInfoCard}>
                        {showInfo()}
                    </Card>
                </Col>
            </Row>
            <Divider style={styles.divider}/>
            <Button onClick={handleDeslog}>CERRAR SESIÓN</Button>
            <Divider style={styles.divider}/>
        </div>
    )
}

const styles = {
    divider: {
		borderWidth: 2, 
		borderColor: 'aquamarine',
	},
    optCard: { 
        width: 250, 
        backgroundColor: 'aquamarine' 
    },
    button: {
		width: 160
	},
    infoCard: { 
        width: 900, 
        backgroundColor: 'aquamarine' 
    },
    blockInfoCard: { 
        width: 900, 
        backgroundColor: 'salmon' 
    }
}

export default Menu;