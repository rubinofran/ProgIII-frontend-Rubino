import { useMemo, useState } from "react";
import Router from "./routes/index";

// Contextos
import { AuxContext } from "./context/AuxContext"; // unused

function App() {

  const [txt, setTxt] = useState('/// Contexto de pruebas ///');
	const txtProvider = useMemo(
		() => ({ txt, setTxt }),
		[txt, setTxt]
	); // unused

  return (
    <AuxContext.Provider value={txtProvider}>
      <Router />
    </AuxContext.Provider>
  );
}

export default App;
