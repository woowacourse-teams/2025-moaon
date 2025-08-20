interface setMetaTagProps {
  attr: { key: "name" | "property"; value: string };
  content: string;
}

const setMetaTag = ({ attr, content }: setMetaTagProps) => {
  const selector = `meta[${attr.key}="${attr.value}"]`;

  const metaElement =
    document.querySelector(selector) ?? document.createElement("meta");

  metaElement.setAttribute(attr.key, attr.value);
  metaElement.setAttribute("content", content);

  document.head.appendChild(metaElement);
};

export default setMetaTag;
