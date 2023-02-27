import { useMemo, useState } from "react";
import Router from "./routes/index";
import { AuxContext } from "./context/AuxContext";

function App() {

  const [txt, setTxt] = useState('/// Contexto de pruebas ///');
	const txtProvider = useMemo(
		() => ({ txt, setTxt }),
		[txt, setTxt]
	);

  return (
    <AuxContext.Provider value={txtProvider}>
      <Router />
    </AuxContext.Provider>
  );
}

export default App;
