export default function CountryFlag({ code, width = 43, height = 43 }) {
  const imageUrl = `https://cdn.jsdelivr.net/gh/hjnilsson/country-flags@master/svg/${
    code && code.toLowerCase()
  }.svg`;
  return <img src={imageUrl} alt={code} width={width} height={height} />;
}
