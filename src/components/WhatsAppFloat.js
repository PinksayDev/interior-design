import { whatsappLink } from "@/lib/site";
import { WhatsApp } from "./Icons";

export default function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed right-5 bottom-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] p-3.5 text-white shadow-lg shadow-black/20 transition hover:scale-105 sm:right-8 sm:bottom-8"
    >
      <WhatsApp className="h-7 w-7" />
      <span className="hidden pr-1 text-sm font-semibold sm:group-hover:inline">Chat with us</span>
    </a>
  );
}
