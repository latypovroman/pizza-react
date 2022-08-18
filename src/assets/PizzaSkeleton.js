import React from "react";
import ContentLoader from "react-content-loader";

const PizzaSkeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="132" cy="130" r="130" />
    <rect x="5" y="275" rx="0" ry="0" width="260" height="27" />
    <rect x="155" y="377" rx="24" ry="24" width="110" height="55" />
    <rect x="7" y="382" rx="0" ry="0" width="97" height="48" />
    <rect x="5" y="317" rx="0" ry="0" width="260" height="51" />
  </ContentLoader>
);

export default PizzaSkeleton;
