import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = [
  { ignores: ["outputs/thessalonians-deployment/**"] },
  ...nextVitals,
  ...nextTs,
];

export default eslintConfig;
