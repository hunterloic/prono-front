export default function CountryName({ name, width = "4.5em", ...props }) {
  return (
    <span
      style={{
        width,
        wordBreak: "break-all",
      }}
      {...props}
    >
      {name}
    </span>
  );
}
