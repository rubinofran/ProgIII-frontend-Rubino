
function AccountSummary({ data, transactions }) {

    const { alias, moneyInAccount } = data;

    function showLastTransaction() {
        const qty = transactions.length
        if(qty > 0) {
            // Corrección de idioma
            let transactionName = ''
            if(transactions[qty - 1].transactionType.typeName === 'extraction') {
                transactionName = 'Extracción'
            } else if (transactions[qty - 1].transactionType.typeName === 'deposit') {
                transactionName = 'Depósito'
            } else {
                transactionName = 'Transferencia'
            }
            return <p> {transactionName} de ${transactions[qty - 1].amount} ({transactions[qty - 1].createdAt})</p>
        }
        return <p>No se registraron movimientos en la cuenta</p>
    }

    return (
        <div>
            <p><b>ALIAS:</b> {alias}</p>
            <p><b>DINERO EN LA CUENTA:</b> ${moneyInAccount}</p>
            <p><b>ÚLTIMO MOVIMIENTO:</b></p>
            <div>{showLastTransaction()}</div>
        </div>
    )
}

/* const styles = {
	
} */

export default AccountSummary;