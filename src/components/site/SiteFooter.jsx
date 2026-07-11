import Link from "next/link";
import {
  ArrowRight,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { company, footerServiceLinks, navItems } from "./siteData";

export default function SiteFooter() {
  return (
    <footer className="border-t-2 border-ink bg-ink text-paper">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[1.15fr_0.75fr_1fr_1fr]">
        <div className="max-w-xl">
          <p className="text-3xl font-black uppercase">{company.name}</p>
          <p className="mt-3 max-w-xl text-sm leading-7 text-paper/80">
            Honest doorstep repair for AC, refrigerators and washing machines
            across Mira Bhayander and nearby Mumbai areas.
          </p>
          <div className="mt-5 border-2 border-paper/80 bg-paper p-4 text-ink shadow-hard-sm">
            <div className="flex gap-3">
              <ShieldCheck className="mt-1 shrink-0 text-blueprint" size={24} />
              <p className="font-black leading-7">
                Perfectly working service focus with 6 months warranty on the
                particular service completed.
              </p>
            </div>
          </div>
        </div>

        <div>
          <p className="stamp-label mb-4 inline-block bg-gold text-ink">Navigate</p>
          <div className="grid gap-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-gold">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="stamp-label mb-4 inline-block bg-gold text-ink">Services</p>
          <div className="grid gap-2">
            {footerServiceLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group inline-flex items-center gap-2 hover:text-gold"
              >
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="stamp-label mb-4 inline-block bg-gold text-ink">Workshop desk</p>
          <div className="space-y-3 text-sm text-paper/85">
            <p className="flex gap-3">
              <MapPin className="mt-1 shrink-0" size={18} />
              {company.address}
            </p>
            <a className="flex gap-3 hover:text-gold" href={`tel:${company.phone}`}>
              <Phone size={18} />
              {company.phone}
            </a>
            <a className="flex gap-3 hover:text-gold" href={`mailto:${company.email}`}>
              <Mail size={18} />
              {company.email}
            </a>
            <a
              className="flex gap-3 hover:text-gold"
              href={`https://wa.me/${company.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={18} />
              WhatsApp booking
            </a>
            <p className="flex gap-3">
              <Clock className="shrink-0" size={18} />
              {company.hours}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-paper/20 px-4 py-4">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 text-xs font-bold uppercase tracking-wide text-paper/60 md:flex-row md:items-center md:justify-between">
          <p>© 2026 {company.name}. Appliance repair service.</p>
          <p>Diagnosis first. Clear price. Final testing.</p>
        </div>
      </div>
    </footer>
  );
}
