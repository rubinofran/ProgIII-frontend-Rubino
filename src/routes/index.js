/* import "../styles/App.css"; */
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Módulos
import AppStatus from "../modules/AppStatus";
import Login from "../modules/Login";
import RegForm from "../modules/RegForm";
import Menu from "../modules/Menu";
import AdminMenu from "../modules/AdminMenu";

/*  */
import Pruebas from "../modules/Pruebas";
/*  */

function Router() {
	const router = createBrowserRouter([
		{path: '/', element: <AppStatus />,},           /* No redirige si LS está vacío */
		{path: '/login', element: <Login />,},          /* No redirige si LS está vacío */
		{path: '/reg-form', element: <RegForm />,},     /* No redirige si LS está vacío */
		{path: '/menu', element: <Menu />,},            /* Redirige si LS está vacío, el destino es el login */
		{path: '/admin-menu', element: <AdminMenu />,}, /* Redirige si LS está vacío, el destino es el login */
		/*  */
		{path: '/pruebas', element: <Pruebas />,}
		/*  */
	]);

	return <RouterProvider router={router} />;
}

export default Router;
