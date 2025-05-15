import NavAside from "../_components/navAside/NavAside";

export default function Layout({ children }) {
  return (
    <div className="lg:grid lg:grid-cols-[280px_1fr] h-screen w-screen scrollbar-hide overflow-hidden">
      {/* <div className="flex h-full"> */}
      <NavAside />
      {children}
    </div>
  );
}
