/* import { useContext } from 'react'; */
import { useState, useEffect } from "react";
import userService from "../services/users";
/* import { Alias } from "../context/Alias"; */

function Pruebas() {
    const [/* users,  */setUsers] = useState([]);
    const [alias, setAlias] = useState('');
	/* const { aliasList } = useContext(Alias); */

    const newAlias = (users) => {
        /* let newArr = [] */
        users.map(x => {
            if(x.alias) {
                const arr = x.alias.split('.');
                console.log(x.alias, arr)
            }
        })
        setAlias('a' + '.' + 'b' + '.' + 'c')
    }

    useEffect(() => {
        async function fetchData() {
			const response = await userService.getUsers();
			setUsers(response.data);
            newAlias(response.data)
		}
		fetchData();
	}, []);

    return (
        <div>
            <h1>PRUEBAS</h1>
            <h2>Alias válido: {alias}</h2>
        </div>
    )
}

export default Pruebas;