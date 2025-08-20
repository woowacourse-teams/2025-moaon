interface setMetaTagProps {
  nameOrProperty: string;
  content: string;
  isProperty?: boolean;
}

const setMetaTag = ({
  nameOrProperty,
  content,
  isProperty = false,
}: setMetaTagProps) => {
  const selector = isProperty
    ? `meta[property="${nameOrProperty}"]`
    : `meta[name="${nameOrProperty}"]`;

  const metaElement =
    document.querySelector(selector) ?? document.createElement("meta");

  if (isProperty) {
    metaElement.setAttribute("property", nameOrProperty);
  } else {
    metaElement.setAttribute("name", nameOrProperty);
  }
  document.head.appendChild(metaElement);

  metaElement.setAttribute("content", content);
};

export default setMetaTag;
