import "./App.css";
import React, { useEffect, useState } from "react";
import StringDomToReactDom from "./StringDomToReactDom";
import htmlElementsSet from "./data/htmlElements";

function App() {
  const [value, setValue] = useState(
    `<div>
      <button class="test">hi</button>
      <button>bye</button>
    </div>`
  );
  const [css, setCss] = useState(
    `.test {
      color: "red";
      font-weight: "500";
    }

    .test2 {
      background: "blue";
    }

    .test3 {
      background: "green";
    }

    div {
      color: "red";
    }
    `
  );
  const [element, setElement] = useState("");
  const [submit, setSubmit] = useState(false);
  const [classStyle, setClassStyle] = useState(new Map());
  const [idStyle, setIdStyle] = useState(new Map());
  const [elementStyle, setElementStyle] = useState(new Map());

  const [test1, setTest1] = useState({});
  const [test2, setTest2] = useState({});

  async function onSubmitHandler(e) {
    e.preventDefault();

    setElement(value);
    setSubmit(true);
  }

  useEffect(() => {
    // TODO validate
    // TODO 특수문자 확인
    const validateBrackets = css.match(/{/g).length === css.match(/}/g).length; // 1. 괄호 개수 확인
    const validateSemicolon = css.match(/:/g).length === css.match(/;/g).length; // 2. 세미콜론 확인

    const cssEmptySpace = css.replace(/\s|"|'/g, ""); // 모든 공백 제거

    // let regexp = /{.+}/m;
    function cssKey(css) {
      const cssAllKey = [];
      let cssMode = "";
      let key = "";
      let isInsideBracket = false;

      for (const char of css) {
        if (!isInsideBracket && char === ".") {
          cssMode = "class";
          continue;
        }

        if (char === "{") {
          isInsideBracket = true;

          if (key && cssMode !== "class") {
            console.log("ho");
            cssMode = htmlElementsSet.has(key) ? "element" : "id";
          }

          const keyObject = { mode: cssMode, key };

          key.length >= 1 && cssAllKey.push(keyObject);
          key = "";
          cssMode = "";
          continue;
        }

        if (char === "}") {
          isInsideBracket = false;
          continue;
        }

        if (!isInsideBracket) {
          key += char;
        }
      }

      return cssAllKey;
    }

    function cssValue(css) {
      const cssAllValue = [];
      const cssValue = {};

      let isInsideBracket = false;
      let hasKey = false;
      let key = "";
      let value = "";
      let obj = {};

      for (const char of css) {
        if (char === ";") {
          obj[key] = value;

          hasKey = false;
          key = "";
          value = "";
          continue;
        }

        if (char === "{") {
          isInsideBracket = true;
          continue;
        }

        if (char === "}") {
          cssAllValue.push(obj);
          obj = {};

          isInsideBracket = false;
          continue;
        }

        if (char === ":") {
          hasKey = true;
          continue;
        }

        if (isInsideBracket) {
          if (!hasKey) {
            key += char;
          } else {
            value += char;
          }
        }
      }

      return cssAllValue;
    }

    const cssKeyArr = cssKey(cssEmptySpace);
    const cssValuesArr = cssValue(cssEmptySpace);

    cssKeyArr.forEach((cssKey, i) => {
      if (cssKey.mode === "class") {
        setClassStyle(
          (prev) => new Map([...prev, [cssKey.key, cssValuesArr[i]]])
        );
      }

      if (cssKey.mode === "element") {
        setElementStyle(
          (prev) => new Map([...prev, [cssKey.key, cssValuesArr[i]]])
        );
      }

      if (cssKey.mode === "id") {
        setIdStyle((prev) => new Map([...prev, [cssKey.key, cssValuesArr[i]]]));
      }
    });
  }, [css]);

  return (
    <>
      <form onSubmit={onSubmitHandler}>
        <textarea
          className="test"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <textarea value={css} onChange={(e) => setCss(e.target.value)} />
        <button
          style={{ ...test1, ...test2 }}
          onClick={() => setTest1({ backgroundColor: "red" })}
        >
          button
        </button>
      </form>
      {submit && (
        <StringDomToReactDom
          source={element}
          classStyle={classStyle}
          idStyle={idStyle.size && idStyle}
          elementStyle={elementStyle.size && elementStyle}
        />
      )}
    </>
  );
}

export default App;
