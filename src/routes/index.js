import "../styles/App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
/* import AppStatus from "../components/AppStatus"; */
import Login from "../components/Login";
import Form from "../components/Form";
import Menu from "../components/Menu";

function Router() {
	const router = createBrowserRouter([
		/* {path: "/", element: <AppStatus />,}, solo para test de conexión al back */
		{path: "/", element: <Login />,},
		{path: "/form", element: <Form />,},
		{path: "/menu", element: <Menu />,}
	]);

	return <RouterProvider router={router} />;
}

export default Router;
