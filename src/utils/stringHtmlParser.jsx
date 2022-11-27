import { TEXT_NODE, COMMENT } from '../constants/nodeTypes';
import { htmlKeyOfhtmlJsxAttributes } from '../data/htmlJsxAttributes';

function stringToDomParser(stringHtml) {
  const parser = new DOMParser();
  const dom = parser.parseFromString(
    `<!doctype html><body><template>${stringHtml}</template></body>`,
    'text/html',
  );

  return dom;
}

export function getNodeList(stringHtml) {
  const dom = stringToDomParser(stringHtml);

  const allNodes = dom.body.firstChild.content.childNodes;

  return allNodes;
}

function nodeAttribute(node) {
  const attributeArr = node.getAttributeNames();

  const props = {};

  attributeArr.forEach(attr => {
    const value = node.getAttribute(attr) || '';
    if (attr === 'checked') {
      props.defaultchekced = value;
      return;
    }

    const convertJsxProperty = htmlKeyOfhtmlJsxAttributes[attr];

    props[convertJsxProperty] = value;
  });

  return props;
}

function storeChildElementProperties(node) {
  if (!node || node.nodeType === TEXT_NODE || node.nodeType === COMMENT) {
    return;
  }

  const data = {
    type: node.tagName.toLowerCase(),
  };

  const { textContent } = node;
  const props = nodeAttribute(node) || {};

  data.props = props;
  data.textContent = textContent;

  if (node.textContent) {
    data.children = node.textContent;
  }

  if (node.childNodes.length > 1) {
    data.children = Array.prototype.map
      .call(node.childNodes, child => storeChildElementProperties(child))
      .filter(Boolean);
  }

  return data;
}

export function storeAllElementProperties(nodeList) {
  if (!nodeList) return;

  const data = {};

  data.type = 'fragment';
  data.children = Array.prototype.map
    .call(nodeList, node => storeChildElementProperties(node))
    .filter(Boolean);

  return data;
}
