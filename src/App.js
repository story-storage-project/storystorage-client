import "./App.css";
import React, { useState } from "react";
import DOMParserReact from "./parse";

function App() {
  const [value, setValue] = useState(
    "<div><button>hi</button><button>bye</button></div>"
  );
  const [element, setElement] = useState("");
  const [submit, setSubmit] = useState(false);

  function onSubmitHandler(e) {
    e.preventDefault();

    setElement(value);
    setSubmit(true);
  }

  return (
    <>
      <form onSubmit={onSubmitHandler}>
        <textarea value={value} onChange={(e) => setValue(e.target.value)} />
        <button>button</button>
      </form>
      {submit && <DOMParserReact source={element} />}
    </>
  );
}

export default App;
