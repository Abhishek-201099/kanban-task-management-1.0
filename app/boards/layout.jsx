import NavAside from "../_components/navAside/NavAside";

export default function Layout({ children }) {
  return (
    <div className="grid grid-cols-[1fr_4fr] h-full">
      <NavAside />
      <div>{children}</div>
    </div>
  );
}
