import { useState } from "react";
// Ant desing 
import { Button , message, Input } from "antd";

// Servicios
import userService from "../services/users";

function Operations({ data, isExtraction, setUser }) {

    const { _id, moneyInAccount } = data;

    const defaultAmount = 0
    const [amount, setAmount] = useState(defaultAmount)

	const error = (errorMessage) => {
		message.error(errorMessage);
	};

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
            /* console.log('Response: ', data); */
            setUser(data);
            message.open({
                key,
                type: 'success',
                content: isExtraction ? 'Extracción exitosa' : 'Depósito exitoso',
                duration: 10,
            });
        }, 1000);
	};

    const modifyUser = async () => {
        try {
            isExtraction 
                ? console.log('El usuario intenta realizar una extracción de $', amount) 
                : console.log('El usuario intenta realizar un depósito de $', amount) 
            if(Number(amount) <= 0) {
                error('Debe ingresar un importe mayor a 0')
                console.log('Error: debe ingresar un importe mayor a 0')
            } else if (isExtraction && moneyInAccount == 0) {
                error('La cuenta no tiene fondos')
                console.log('Error: La cuenta no tiene fondos')
            } else {
                const newAmount = isExtraction
                    ? (moneyInAccount - Number(amount))
                    : (moneyInAccount + Number(amount))
                const response = await userService.updateUserById(_id, {
                    moneyInAccount: newAmount
			    });
                operationSimulation(response.data)
            }
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
                placeholder='Ingrese un importe'
                type='number'
                min='0'
                defaultValue={defaultAmount}
                onChange={({target}) => setAmount(target.value)} 
            />
            <Button onClick={modifyUser}>CONFIRMAR</Button>
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

export default Operations;