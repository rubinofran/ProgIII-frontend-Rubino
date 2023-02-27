import { useState } from "react";
// Ant desing 
import { Button , message, Input } from "antd";

// Servicios
import userService from "../services/users";

function Operations({ data, isExtraction, setUser }) {

    const { _id, moneyInAccount } = data;

    const defaultAmount = 0
    const [amount, setAmount] = useState(defaultAmount)

    // Simulación de la operación física
    const operationSimulation = (data) => {
        const key = 'simulation'
        message.open({
            key,
            type: 'loading',
            content: 'Procesando',
        });
        setTimeout(() => {
            // Se podrán ver los cambios una vez finalizada la operación
            console.log('Response: ', data);
            setUser(data);
            message.open({
                key,
                type: 'success',
                content: isExtraction ? 'Retire su dinero' : 'Depósito exitoso',
                duration: 10,
            });
        }, 1000);
	};

    const modificarUsuario = async () => {
        try {
            isExtraction 
                ? console.log('El usuario intenta realizar una extracción de $', amount) 
                : console.log('El usuario intenta realizar un depósito de $', amount) 
            const newAmount = isExtraction
                ? (moneyInAccount - amount)
                : (moneyInAccount + amount)
            const response = await userService.updateUserById(_id, {
                moneyInAccount: newAmount
			});
            operationSimulation(response.data)
		} catch (err) {
            isExtraction 
                ? console.log('Error al intentar realizar una extracción') 
                : console.log('Error al intentar realizar un depósito') 
			console.log(err);
		}
    }

    return (
        <div>
            <p><b>DINERO EN LA CUENTA:</b> ${moneyInAccount}</p>
            <p><b>IMPORTE A {isExtraction ? 'RETIRAR' : 'DEPOSITAR'}:</b></p>
            <Input 
                style={styles.input}
                placeholder='Ingrese otro importe'
                type='number'
                defaultValue={defaultAmount}
                onChange={({target}) => setAmount(target.value)} /* ({target}) => handleInputChange(target.value) */
            />
            <p><Button onClick={modificarUsuario}>CONFIRMAR</Button></p>    
        </div>
    )
}

const styles = {
    input: {
        marginLeft: 10, 
        width: 200, 
    },
}

export default Operations;