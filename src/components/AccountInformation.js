
// Ant desing 
import { Row, Col } from "antd";

function AccountInformation({ data }) {

    const { userName, clientType, name, address, accountType, isActive } = data;

    return (
        <div>
            <Row>
                <Col span={12}>
                    <p className="menuCssTransformP"><b>{clientType === 'Persona física' ? 'NOMBRE:' : 'RAZÓN SOCIAL:'}</b> {name}</p>
                    <p className="menuCssTransformP"><b>DIRECCIÓN:</b> {address}</p>
                    <p className="menuCssTransformP"><b>TIPO DE CLIENTE:</b> {clientType}</p>
                </Col>
                <Col span={12}>
                    <p className="menuCssTransformP"><b>ESTADO:</b> {isActive ? 'activo' : 'inactivo'}</p>
                    <p className="menuCssTransformP"><b>USUARIO:</b> {userName}</p>
                    <p className="menuCssTransformP"><b>TIPO DE CUENTA:</b> {accountType}</p>
                </Col>
            </Row>
        </div>
    )
}

export default AccountInformation;