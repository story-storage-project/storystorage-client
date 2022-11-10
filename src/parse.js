import {
  createElement,
  Fragment as ReactFragment,
  useMemo,
  useState,
  useCallback,
} from "react";

import {
  DOCUMENT_FRAGMENT_NODE,
  DOCUMENT_NODE,
  ELEMENT_NODE,
  TEXT_NODE,
} from "./constants/nodeTypes";
import { HTML_NAMESPACE } from "./constants/webNamespaces";
import stringHtmlParser from "./utils/stringHtmlParser";

export default function DOMParserReact(props) {
  const [allData, setAllData] = useState({});

  const Fragment = props.Fragment || ReactFragment;

  const element2 = useCallback((node) => {
    const isHtml = node.namespaceURI === HTML_NAMESPACE;
    const tagName = isHtml ? node.tagName.toLowerCase() : node.tagName;
    const className = tagName + Math.floor(Math.random() * 900);

    if (node.childNodes.length === 1) {
      node.className = className;

      setAllData((prev) => ({
        ...prev,
        [className]: node.textContent,
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

    //! ELEMENT_NODE : 자식 없음 고유한 엘리먼트
    if (nodeType === ELEMENT_NODE) {
      return element(node);
    }

    //! DOCUMENT_NODE면 프래그먼트
    if (nodeType === DOCUMENT_NODE || nodeType === DOCUMENT_FRAGMENT_NODE) {
      return root(node);
    }

    if (nodeType === TEXT_NODE) {
      return text(node);
    }

    return null;
  };

  const element = (node) => {
    //! html인지 판단
    const isHtml = node.namespaceURI === HTML_NAMESPACE;
    const tagName = isHtml ? node.tagName.toLowerCase() : node.tagName;
    const attributes = getAttributeNames(node);

    const elementProps = {};


    if (node.childNodes.length === 1) {
      return createElement(tagName, { name: test }, allData[node.className]);
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


  const dom = useMemo(() => {
    const stringToDom = stringHtmlParser(props.source);
    transform2(stringToDom);

    return stringToDom;
  }, [props.source, transform2]);

  const elements = () => transform(dom);

  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    return setAllData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      {Object.entries(allData).map((item) => {
        return (
          <input
            key={item[0]}
            name={item[0]}
            value={allData[item[0]]}
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
