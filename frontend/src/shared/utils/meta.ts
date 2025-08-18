interface setMetaTagProps {
  name: string;
  content: string;
}

const setMetaTag = ({ name, content }: setMetaTagProps) => {
  if (typeof document === "undefined") return;

  let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;

  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }

  el.setAttribute("content", content);
};

export default setMetaTag;
