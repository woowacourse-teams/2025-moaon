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

  let el = document.querySelector(selector) as HTMLMetaElement | null;

  if (!el) {
    el = document.createElement("meta");
    if (isProperty) {
      el.setAttribute("property", nameOrProperty);
    } else {
      el.setAttribute("name", nameOrProperty);
    }
    document.head.appendChild(el);
  }

  el.setAttribute("content", content);
};

export default setMetaTag;
