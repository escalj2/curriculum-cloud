"use client";
import { useEffect } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {

    useEffect(() => {
    //close modal when clicking outside or pressing escape
    const handleEsc = (event: KeyboardEvent) => {
        if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return() => window.removeEventListener("keydown", handleEsc);
}, [onClose]);

if (!isOpen) return null;

return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl relative">
            <button
                onClick={onClose}
                className="absolute top-4=3 right-4 text-slate-500 hover:text-slate-800 text-2xl"
            >
                x
            </button>
            {children}
        </div>

    </div>
    );
}