"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { cloneElement, createContext, useContext, useState } from "react";

import { useOutsideClick } from "@/app/_hooks/useOutsideClick.";

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const open = setOpenName;
  const close = () => setOpenName("");

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  const { close, openName } = useContext(ModalContext);

  const ref = useOutsideClick(close);

  if (openName !== name) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-screen backdrop-blur-sm z-1000 transition-all">
      <div
        ref={ref}
        className="overflow-scroll scrollbar-hide w-auto min-w-[800px] max-h-[800px] h-auto  fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  px-10 py-6 flex flex-col gap-6 rounded-xl bg-primary-900 shadow-2xl pb-8"
      >
        <div className="flex items-center justify-end">
          <button onClick={close}>
            <XMarkIcon className="h-8 w-8 text-primary-100 hover:text-primary-300" />
          </button>
        </div>

        {cloneElement(children, { onCloseModal: close })}
      </div>
    </div>
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
