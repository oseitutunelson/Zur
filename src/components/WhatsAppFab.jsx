import { COMPANY } from '../data/site'
import Icon from './Icon'

export default function WhatsAppFab() {
  return (
    <a
      href={`https://wa.me/${COMPANY.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-full bg-accent px-4 py-3.5 text-ink shadow-2xl shadow-accent/30 transition-transform hover:scale-105"
    >
      <Icon name="whatsapp" size={22} />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 group-hover:max-w-[120px]">
        Chat with us
      </span>
    </a>
  )
}
