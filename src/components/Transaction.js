
function Transaction({ data }) {

    const { transactionType, amount, createdAt } = data

    function translateAux() {
        // Corrección de idioma
        if(transactionType.typeName === 'extraction') {
            return 'extracción'
        } else if (transactionType.typeName === 'deposit') {
            return 'depósito'
        } else {
            return 'transferencia'
        }
    }

    return <p className="adminMenuCssSizeP">{createdAt}, <b>{translateAux()}</b> de <b>${amount}</b></p>
}

/* const styles = {
	
} */

export default Transaction;