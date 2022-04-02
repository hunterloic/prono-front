export default function CountryFlag({ code, width = 30, height = 30 }) {
  const imageUrl = `https://cdn.jsdelivr.net/gh/hjnilsson/country-flags@master/svg/${
    code && code.toLowerCase()
  }.svg`;
  return <img src={imageUrl} alt={code} width={width} height={height} />;
}
