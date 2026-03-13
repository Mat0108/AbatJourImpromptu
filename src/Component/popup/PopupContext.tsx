import { Dialog, DialogPanel } from "@headlessui/react";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

type PopupContextType = {
  isOpen: boolean;
  content: ReactNode | null;
  openPopup: (content: ReactNode) => void;
  closePopup: () => void;
};

const PopupContext = createContext<PopupContextType | null>(null);

export const PopupProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ReactNode>(null);

  const openPopup = (popupContent: ReactNode) => {
    setContent(popupContent);
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
    setContent(null);
  };

  return (
    <PopupContext.Provider
      value={{
        isOpen,
        content,
        openPopup,
        closePopup,
      }}
    >
      {children}
    </PopupContext.Provider>
  );
};

export const usePopup = () => {
  const ctx = useContext(PopupContext);
  if (!ctx) {
    throw new Error("usePopup must be used inside PopupProvider");
  }
  return ctx;
};

export const GlobalPopup = () => {
  const { isOpen, closePopup, content } = usePopup();
  return (
    <Dialog open={isOpen} onClose={closePopup} className="relative z-50">
      <div className="fixed inset-0 flex w-screen items-center justify-center p-1 lg:p-4 bg-black/60">
        <DialogPanel className="bg-white rounded ">
          {content}
        </DialogPanel>
      </div>
    </Dialog>
  );
}; 