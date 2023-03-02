import { useState } from "react";
// Ant desing 
import { /* Row, Col,  */Button, message, /*Alert,  */Input} from "antd";

// Servicios
import userService from "../services/users";

function Transfers({ data, setUser }) {

    const { _id, moneyInAccount, alias } = data;

    const defaultAmount = 0
    const [aliasSearched, setAliasSearched] = useState('')
    const [moneyToTransfer, setMoneyToTransfer] = useState(0)
    const [addressee, setAddressee] = useState({ _id: '', userName: '', name: '', moneyInAccount: 0})

    const warning = (warningMessage) => {
		message.warning(warningMessage);
	};

    const error = (errorMessage) => {
		message.error(errorMessage);
	};

    // Simulación de la operación física
    const operationSimulation = (addresseeData, data) => {
        const key = 'simulation'
        message.open({
            key,
            type: 'loading',
            content: 'Procesando',
        });
        setTimeout(() => {
            // Se podrán ver los cambios una vez finalizada la operación
            /* console.log('Addresee response: ', addresseeData);
            console.log('Response: ', data); */
            setUser(data);
            message.open({
                key,
                type: 'success',
                content: 'Transferencia exitosa',
                duration: 10,
            });
        }, 1000);
    };

    const buscarPorAlias = async () => {
        try {
            console.log('El usuario intenta buscar al destinatario de la transferencia con alias ', aliasSearched) 
            if(alias === aliasSearched) {
                warning('El ALIAS ingresado es el suyo propio, intente con otro')
            } else {
                const response = await userService.getUserByAlias(aliasSearched);
                setAddressee(response.data)
            }   
		} catch (err) {
            setAddressee({ _id: '', userName: '', name: '', moneyInAccount: 0})
            console.log('Error al intentar encontrar un destinatario con alias ', aliasSearched) 
			console.log(err);
		}
    }

    const modifyUserAndAddressee = async () => {
        try {
            console.log('El usuario intenta realizar una transferencia al destinatario con alias ', aliasSearched) 
            if(Number(moneyToTransfer) <= 0) {
                error('Debe ingresar un importe mayor a 0')
                console.log('Error: debe ingresar un importe mayor a 0')
            } else {
                let newAmount = addressee.moneyInAccount + Number(moneyToTransfer)
                const addresseeResponse = await userService.updateUserById(addressee._id, {
                    moneyInAccount: newAmount
			    });
                newAmount = moneyInAccount - Number(moneyToTransfer)
                const response = await userService.updateUserById(_id, {
                    moneyInAccount: newAmount
			    });
                operationSimulation(addresseeResponse.data, response.data)
            }
		} catch (err) {
            console.log('Error al intentar realizar una transferencia al destinatario con alias ', aliasSearched) 
			console.log(err);
		}
    }

    return (
        <div>
            <p><b>DESTINATARIO POR ALIAS:</b></p>
            {
                addressee._id === ''
                    ?
                    <div>
                        <Input 
                            style={styles.input}
                            placeholder='PALABRA1.PALABRA2.PALABRA3'
                            type='text'
                            onChange={({target}) => setAliasSearched(target.value)} 
                        />
                        <Button onClick={buscarPorAlias}>BUSCAR</Button>
                    </div>
                    :
                    <div>
                        <p><b>RESULTADO:</b> {addressee.name} ({addressee.userName})</p> 
                        <p>
                            <Input 
                                style={styles.input}
                                placeholder='Ingrese un importe'
                                type='number'
                                min='0'
                                defaultValue={defaultAmount}
                                onChange={({target}) => setMoneyToTransfer(target.value)} 
                            />
                            <Button type='primary' onClick={modifyUserAndAddressee}>TRANSFERIR</Button> 
                            <Button type='primary' danger onClick={() => setAddressee({ _id: '', userName: '', name: '', moneyInAccount: 0})}>CANCELAR</Button> 
                        </p>
                    </div>
            }
        </div>
    )
}

const styles = {
    input: {
        marginRight: 10, 
        width: 300, 
        textAlign: 'center' 
    },
}

export default Transfers;