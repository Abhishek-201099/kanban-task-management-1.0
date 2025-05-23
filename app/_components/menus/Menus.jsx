const { useOutsideClick } = require("@/app/_hooks/useOutsideClick.");
const {
  EllipsisVerticalIcon,
  EllipsisHorizontalIcon,
} = require("@heroicons/react/24/solid");
const { createContext, useState, useContext } = require("react");

const MenusContext = createContext();

export default function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);

  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id, direction }) {
  const { openId, close, open, setPosition } = useContext(MenusContext);

  function handleToggle(e) {
    e.stopPropagation();
    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x + 20,
      y: rect.y + rect.height + 10,
    });

    openId === "" || openId !== id ? open(id) : close();
  }

  return (
    <button
      onClick={handleToggle}
      className="rounded-sm transition-all duration-200 transform translate-x-2"
    >
      {direction === "vertical" ? (
        <EllipsisVerticalIcon className="h-8 w-8" />
      ) : (
        <EllipsisHorizontalIcon className="h-8 w-8" />
      )}
    </button>
  );
}

function List({ id, children }) {
  const { openId, position, close } = useContext(MenusContext);
  const ref = useOutsideClick(close, false);

  if (openId !== id) return null;

  return (
    <ul
      ref={ref}
      className="fixed shadow-lg rounded-md overflow-hidden"
      style={{ top: `${position.y}px`, right: `${position.x}px` }}
    >
      {children}
    </ul>
  );
}

function Button({ icon, children, onClick }) {
  const { close } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <button
        onClick={handleClick}
        className="text-xs w-full text-left text-primary-50 bg-primary-900 hover:bg-primary-800 border-none p-4 [word-spacing:4px] transition-all  flex items-center gap-4"
      >
        {icon}
        <span>{children}</span>
      </button>
    </li>
  );
}

Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;
