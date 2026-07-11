import Link from "next/link";
import { services } from "./siteData";

export default function ServiceCards({ compact = false }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {services.map((service) => {
        const Icon = service.icon;

        return (
          <article key={service.title} className="service-card group">
            <div className="mb-5 flex items-start justify-between gap-4">
              <span className="grid h-14 w-14 place-items-center border-2 border-ink bg-gold text-ink shadow-hard-sm">
                <Icon size={30} strokeWidth={2.4} />
              </span>
              <span className="stamp-label bg-royal text-white">{service.stamp}</span>
            </div>
            <h3 className="font-serif text-3xl font-black leading-tight text-ink">
              {service.title}
            </h3>
            <p className="mt-3 text-sm font-black uppercase text-blueprint">{service.price}</p>
            <p className="mt-4 leading-7 text-ink/75">{service.summary}</p>
            {!compact && (
              <Link
                href={`/contact?service=${encodeURIComponent(service.title)}`}
                className="btn-print mt-6 w-full justify-center"
              >
                Book this service
              </Link>
            )}
          </article>
        );
      })}
    </div>
  );
}
