import NavAside from "../_components/navAside/NavAside";

export default function Layout({ children }) {
  return (
    <div className="grid grid-cols-[auto_1fr] h-full">
      <NavAside />
      {children}
    </div>
  );
}
