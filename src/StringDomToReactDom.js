import {
  createElement,
  Fragment as ReactFragment,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from "react";
import {
  DOCUMENT_FRAGMENT_NODE,
  DOCUMENT_NODE,
  ELEMENT_NODE,
  TEXT_NODE,
} from "./constants/nodeTypes";
import { HTML_NAMESPACE } from "./constants/webNamespaces";
import stringHtmlParser from "./utils/stringHtmlParser";

export default function StringDomToReactDom(props) {
  const [nodesValue, setNodesValue] = useState({});

  const Fragment = props.Fragment || ReactFragment;
  const [allUniqueClass, setAllUniqueClass] = useState({});
  const [allElementsClass, setElementsClass] = useState({});
  const [userCustomClass, setUserCustomClass] = useState({});

  useEffect(() => {
    if (props.classStyle) {
      console.log("jjj")
      setUserCustomClass(Object.fromEntries(props.classStyle));
    }
  }, [props.classStyle]);

  const domClickHandler = (clickedNode) => {
    console.log(clickedNode);
  };

  const element2 = useCallback((node) => {
    if (node.nodeType === 3) return;

    const isHtml = node.namespaceURI === HTML_NAMESPACE;
    const tagName = isHtml ? node.tagName.toLowerCase() : node.tagName;

    const cryptoArr = new Uint32Array(1);
    const randomNomber = window.crypto.getRandomValues(cryptoArr)[0];

    const elementClassName = "element" + tagName;
    const uniqueClassName = "unique@" + randomNomber + tagName;
    node.classList.add(elementClassName, uniqueClassName);

    setAllUniqueClass((prev) => ({
      ...prev,
      [uniqueClassName]: {},
    }));

    if (!allElementsClass[elementClassName]) {
      setElementsClass((prev) => ({
        ...prev,
        [elementClassName]: {},
      }));
    }

    if (node.childNodes.length === 1) {
      setNodesValue((prev) => ({
        ...prev,
        [uniqueClassName]: node.textContent,
      }));

      return;
    }

    return Array.prototype.map
      .call(node.childNodes, (child) => element2(child))
      .filter(Boolean);
  }, []);

  const transform2 = useCallback(
    (node) => {
      const nodeType = node.nodeType;

      if (nodeType === ELEMENT_NODE) {
        return element2(node);
      }

      if (nodeType === TEXT_NODE) {
        return text(node);
      }

      return null;
    },
    [element2]
  );

  const transform = (node) => {
    const nodeType = node.nodeType;

    if (nodeType === ELEMENT_NODE) {
      return element(node);
    }

    if (nodeType === DOCUMENT_NODE || nodeType === DOCUMENT_FRAGMENT_NODE) {
      return root(node);
    }

    if (nodeType === TEXT_NODE) {
      return text(node);
    }

    return null;
  };

  const element = (node) => {
    const isHtml = node.namespaceURI === HTML_NAMESPACE;
    const tagName = isHtml ? node.tagName.toLowerCase() : node.tagName;
    const attributes = getAttributeNames(node);
    const elementClassName = "element" + tagName;
    let uniqueClassName;

    const allClass = [];

    for (const className of node.classList) {
      if (elementClassName === className) {
        allClass.push(allElementsClass[elementClassName]);
        continue;
      }

      if (className.indexOf("unique@") !== -1) {
        uniqueClassName = className;
        allClass.push(allUniqueClass[uniqueClassName]);
        continue;
      }

      allClass.push(userCustomClass[className]);
    }

    const elementProps = {};

    //TODO form, input, button 등 자주 쓰는 attribute는 등록되게 만들어주고 나머지는 다 없애주어야 함
    //TODO 리액트에서 중괄호로 쓰니 오류 발생 -> 코드 입력 -> js로 변환해주는 작업 필요
    // attributes.forEach((attr) => {
    //   const value = node.getAttribute(attr) || "";

    //   if (attr === "style") {
    //     elementProps[attr] = parseStyle(value);
    //   } else {
    //     const property = domPropertyRecord[attr] || attr;

    //     elementProps[property] =
    //       isHtml &&
    //       property !== "list" &&
    //       property in node &&
    //       typeof node[property] !== "string"
    //         ? node[property]
    //         : value;
    //   }
    // });

    if (node.childNodes.length === 1) {
      elementProps.onClick = () => domClickHandler(uniqueClassName);
      elementProps.onMouseEnter = () => console.log("enter");
      elementProps.onMouseLeave = () => console.log("leave");
      elementProps.style = Object.assign({}, ...allClass);
      return createElement(tagName, elementProps, nodesValue[uniqueClassName]);
    }

    return createElement(tagName, elementProps, ...children(node.childNodes));
  };

  const root = (node) => {
    const createEle = createElement(
      Fragment,
      null,
      ...children(node.childNodes)
    );
  };

  const text = (node) => node.data;

  const children = (children) => {
    return Array.prototype.map
      .call(children, (child) => transform(child))
      .filter(Boolean);
  };

  const getAttributeNames = (node) => {
    // for IE
    if (node.getAttributeNames == undefined) {
      return Array.prototype.map.call(node.attributes, (attr) => attr.name);
    }

    return node.getAttributeNames();
  };

  const dom = useMemo(() => {
    const stringToDom = stringHtmlParser(props.source);
    transform2(stringToDom);

    return stringToDom;
  }, [props.source, transform2]);

  const elements = () => transform(dom);

  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    return setNodesValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  console.log(dom)

  return (
    <>
      {Object.entries(nodesValue).map((item) => {
        return (
          <input
            key={item[0]}
            name={item[0]}
            value={nodesValue[item[0]]}
            onChange={onChangeHandler}
          />
        );
      })}
      {typeof elements === "string" ? (
        <ReactFragment>{elements}</ReactFragment>
      ) : (
        <>{elements()}</>
      )}
    </>
  );
}
