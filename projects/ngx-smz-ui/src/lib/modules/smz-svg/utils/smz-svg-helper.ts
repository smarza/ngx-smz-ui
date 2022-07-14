import { Container, List, Element } from '@svgdotjs/svg.js';

export function GetElementsByParentId(container: Container, parentId: string): List<Element> {
  const group = container.find(`#${parentId}`);

  if (group?.length > 0) {
    return group[0].children();
  }
  else {
    return new List<Element>();
  }

}

export function GetElementById(container: Container, parentId: string): Element {
  const group = container.find(`#${parentId}`);

  if (group?.length > 0) {
    return group[0];
  }
  else {
    return null;
  }

}