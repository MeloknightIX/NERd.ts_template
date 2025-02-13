const getColor = (
  color: "background" | "text" | "main" | "accent" | string
) => {
  return `var(--c_${color})`;
};
export default getColor;
