import { DOCUMENT_FRAGMENT_NODE } from "../constants/nodeTypes";

export default function stringHtmlParser(source) {
  const parser = new DOMParser();
  const dom = parser.parseFromString(
    `<!doctype html><body><template>${source}</template></body>`,
    "text/html"
  );

  const nodes = dom.body.firstChild.content.childNodes;

  if (nodes.length > 1) {
    if (nodes[0].tagName !== "REACT.FRAGMENT" && nodes[0].nodeValue !== "<>") {
      alert("안돼");
    }
  }

  return nodes.length === 1
    ? nodes[0]
    : { nodeType: DOCUMENT_FRAGMENT_NODE, childNodes: nodes };
}

// const parse = (source) => {
//   const dom = htmlParser(source);

//   transform2(dom);
//   return dom;
// };
