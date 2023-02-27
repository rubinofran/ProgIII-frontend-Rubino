/* import { useState } from "react"; */
// Ant desing 
/* import { Row, Col, Button, message, Alert } from "antd"; */

function AccountSummary({ data }) {

    const { cbu, alias, moneyInAccount } = data;

    return (
        <div>
            <p><b>CBU:</b> {cbu}</p>
            <p><b>ALIAS:</b> {alias}</p>
            <p><b>DINERO EN LA CUENTA:</b> ${moneyInAccount}</p>
            <p><b>ÚLTIMO MOVIMIENTO:</b> VER</p>
        </div>
    )
}

/* const styles = {
	
} */

export default AccountSummary;