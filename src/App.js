

import { AuxContext } from "./context/AuxContext";
import { useMemo, useState } from "react";
import Router from "./routes/index";

function App() {

  const [txt, setTxt] = useState("/// Contexto de pruebas ///");
	const txtProvider = useMemo(
		() => ({ txt, setTxt }),
		[txt, setTxt]
	);

  return (
    <AuxContext.Provider value={txtProvider}>
      <Router />
    </AuxContext.Provider>
/*     <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div> */
  );
}

export default App;
