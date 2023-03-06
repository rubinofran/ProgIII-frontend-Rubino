
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
            return <p className="menuCssTransformP"> <b>{transactionName}</b> de <b>${transactions[qty - 1].amount}</b> ({transactions[qty - 1].createdAt})</p>
        }
        return <p className="menuCssTransformP">No se registraron movimientos en la cuenta</p>
    }

    return (
        <div>
            <p className="menuCssTransformP"><b>ALIAS:</b> {alias}</p>
            <p className="menuCssTransformP"><b>DINERO EN LA CUENTA:</b> ${moneyInAccount}</p>
            <p style={styles.infoSep}><b>ÚLTIMO MOVIMIENTO:</b></p>
            <div>{showLastTransaction()}</div>
        </div>
    )
}

const styles = {
	infoSep: {
        padding: '5px'
    }
}

export default AccountSummary;