/* import { useState } from "react"; */
// Ant desing 
import { Row, Col } from "antd";

function AccountInformation({ data }) {

    const { userName, clientType, name, address, accountType, isActive } = data;

    return (
        <div>
            <Row>
                <Col span={12}>
                    <p><b>NOMBRE:</b> {name}</p> {/* consultar si es razón social */}
                    <p><b>DIRECCIÓN:</b> {address}</p>
                    <p><b>TIPO DE CLIENTE:</b> {clientType}</p>
                </Col>
                <Col span={12}>
                    <p><b>ESTADO:</b> {isActive ? 'activo' : 'inactivo'}</p>
                    <p><b>USUARIO:</b> {userName}</p>
                    <p><b>TIPO DE CUENTA:</b> {accountType}</p>
                </Col>
            </Row>
        </div>
    )
}

/* const styles = {
	
} */

export default AccountInformation;