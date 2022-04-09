export default function CountryFlag({
  code,
  width = "30em",
  height,
  ...props
}) {
  const imageUrl = `https://cdn.jsdelivr.net/gh/hjnilsson/country-flags@master/svg/${
    code && code.toLowerCase()
  }.svg`;

  return (
    <img
      style={{ border: "solid black 1px" }}
      {...props}
      src={imageUrl}
      alt={code}
      width={width}
      height={height}
    />
  );
}
