interface MetaTagConfig {
  attr: { key: "name" | "property"; value: string };
  content: string;
}

const setMetaTags = (configs: MetaTagConfig[]) => {
  const fragment = document.createDocumentFragment();
  const existingTags = new Set<string>();

  const allMetaTags = document.head.querySelectorAll("meta");
  allMetaTags.forEach((tag) => {
    const name = tag.getAttribute("name");
    const property = tag.getAttribute("property");
    if (name) existingTags.add(`name:${name}`);
    if (property) existingTags.add(`property:${property}`);
  });

  configs.forEach(({ attr, content }) => {
    const selector = `meta[${attr.key}="${attr.value}"]`;

    let metaElement = document.querySelector(selector) as HTMLMetaElement;

    if (metaElement) {
      metaElement.setAttribute("content", content);
    } else {
      metaElement = document.createElement("meta");
      metaElement.setAttribute(attr.key, attr.value);
      metaElement.setAttribute("content", content);
      fragment.appendChild(metaElement);
    }
  });

  if (fragment.children.length > 0) {
    document.head.appendChild(fragment);
  }
};

export default setMetaTags;
