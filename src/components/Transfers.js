import { useState } from "react";
// Ant desing 
import { Button, message, Input} from "antd";

// Servicios
import userService from "../services/users";
import transactionService from "../services/transactions";

function Transfers({ data, setUser, transactions, setTransactions, token }) {

    const { _id, moneyInAccount, alias } = data;

    const defaultAmount = 0
    const [aliasSearched, setAliasSearched] = useState('')
    const [moneyToTransfer, setMoneyToTransfer] = useState(0)
    const [addressee, setAddressee] = useState({ _id: '', userName: '', name: '', moneyInAccount: 0, isActive: false})

    const error = errorMessage => message.error(errorMessage);
	const warning = warningMessage => message.warning(warningMessage);

    // Simulación de la operación física
    const operationSimulation = (data, transactionData) => {
        const key = 'simulation'
        message.open({
            key,
            type: 'loading',
            content: 'Procesando',
        });
        setTimeout(() => {
            // Se podrán ver los cambios una vez finalizada la operación
            /* console.log('Response: ', data); */
            /* console.log('Response: ', transactionData);  */
            setUser(data);
            // Mejorable, correción por ObjectId
            transactionData.transactionType = { typeName: 'transfer' }
            setTransactions([...transactions, transactionData]) 
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
            } else if(aliasSearched.trim() === '') {
                error('El campo está vacío y no se puede buscar')
                console.log('Error: El campo está vacío y no puede se buscar')
             } else {
                const response = await userService.getUserByAlias(aliasSearched, token);
                setAddressee(response.data)
            }   
		} catch (err) {
            setAddressee({ _id: '', userName: '', name: '', moneyInAccount: 0, isActive: false})
			/* console.log(err); */
            console.log(err.response.data);
            error(err.response.data);
		}
    }

    const modifyUserAndAddressee = async () => {
        try {
            console.log('El usuario intenta realizar una transferencia al destinatario con alias ', aliasSearched) 
            if(Number(moneyToTransfer) <= 0) {
                error('Debe ingresar un importe mayor a 0')
                console.log('Error: debe ingresar un importe mayor a 0')
            } else if (moneyInAccount === 0) { 
                error('La cuenta no tiene fondos suficientes para transferir')
                console.log('Error: La cuenta no tiene fondos suficientes para transferir')
            } else if(!addressee.isActive) { 
                error('La cuenta no se encuentra activa para transferirle')
                console.log('Error: La cuenta no se encuentra activa para transferirle')
            } else {
                let newAmount = addressee.moneyInAccount + Number(moneyToTransfer)
                const addresseeResponse = await userService.updateUserById(addressee._id, {
                    moneyInAccount: newAmount
			    }, token);
                console.log('Addresee response: ', addresseeResponse.data);
                newAmount = moneyInAccount - Number(moneyToTransfer)
                const response = await userService.updateUserById(_id, {
                    moneyInAccount: newAmount
			    }, token);
                const transactionResponse = await transactionService.createTransaction({
                    transactionType: 'transfer',
                    userId: _id,
                    amount: Number(moneyToTransfer)
                }, token)
                operationSimulation(response.data, transactionResponse.data)
            }
		} catch (err) {
			/* console.log(err); */
            console.log(err.response.data);
            error(err.response.data);
		}
    }

    return (
        <div>
            <p className="menuCssTransformP"><b>DINERO EN LA CUENTA:</b> ${moneyInAccount}</p>
            <p style={styles.infoSep}><b>DESTINATARIO POR ALIAS:</b></p>
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
        textAlign: 'center',
        padding: '5px'  
    },
    infoSep: {
        padding: '5px'
    }
}

export default Transfers;