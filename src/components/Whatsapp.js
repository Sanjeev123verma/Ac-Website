import React from 'react';
import { FaWhatsapp } from "react-icons/fa";

const WhatsApp = () => {
  const whatsappNumber = '+918104556898';
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center border-2 border-ink bg-green-500 text-white shadow-hard transition-all duration-200 hover:-translate-y-1"
      >
        <div className="p-3">
          <FaWhatsapp size={34} />
        </div>
        <div className="pointer-events-none absolute bottom-16 right-0 whitespace-nowrap border-2 border-ink bg-paper px-3 py-2 text-sm font-bold text-ink opacity-0 shadow-hard-sm transition-opacity duration-200 group-hover:opacity-100">
          Contact on WhatsApp
        </div>
      </a>
    </div>
  );
};

export default WhatsApp;
