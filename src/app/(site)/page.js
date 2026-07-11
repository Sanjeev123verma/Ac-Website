import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Phone } from "lucide-react";
import ServiceCards from "@/components/site/ServiceCards";
import { company, processSteps, trustPoints } from "@/components/site/siteData";

export const metadata = {
  title: {
    absolute: "SaiRaj Cool Service | AC, Fridge & Washing Machine Repair",
  },
  description:
    "Old-school doorstep appliance repair for AC, fridge and washing machine service in Mira Bhayander and nearby Mumbai areas.",
};

export default function HomePage() {
  return (
    <>
      <section className="paper-grid px-4 py-8 md:py-12">
        <div className="mx-auto max-w-7xl">
          <div className="poster-frame grid min-h-[78vh] overflow-hidden bg-paper md:grid-cols-[0.95fr_1.05fr]">
            <div className="relative z-10 flex flex-col justify-center p-6 md:p-10 lg:p-12">
              <p className="stamp-label mb-5 w-fit bg-gold text-ink">Doorstep appliance repair</p>
              <h1 className="font-serif text-6xl font-black leading-[0.92] text-ink md:text-7xl lg:text-8xl">
                Cooling down?
                <span className="tilt-label mt-2 block w-fit bg-ink px-3 py-1 text-paper">
                  We fix it.
                </span>
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-ink/75">
                AC, fridge and washing machine service with clear pricing,
                honest diagnosis and 6 months warranty on the particular
                service completed.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/contact" className="btn-print justify-center">
                  Book a mechanic
                  <ArrowRight size={18} />
                </Link>
                <a href={`tel:${company.phone}`} className="btn-quiet justify-center">
                  <Phone size={18} />
                  {company.phone}
                </a>
              </div>
            </div>
            <div className="relative min-h-[420px] border-t-2 border-ink md:border-l-2 md:border-t-0">
              <Image
                src="/ai-assets/sairaaj-hero.jpg"
                alt="SaiRaj Cool Service technician with AC, refrigerator and washing machine"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 55vw"
                className="object-cover object-right"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 md:grid-cols-4">
            {trustPoints.map((point) => {
              const Icon = point.icon;

              return (
                <div key={point.label} className="mini-proof">
                  <Icon size={24} />
                  <span>{point.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="section-heading">
            <p className="stamp-label bg-royal text-white">Repair menu</p>
            <h2>One mechanic desk for your home appliances.</h2>
          </div>
          <ServiceCards />
        </div>
      </section>

      <section className="px-4 py-10">
        <div className="poster-shadow mx-auto grid max-w-7xl gap-7 border-2 border-ink bg-paper p-5 md:p-7 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="relative aspect-[16/10] min-h-[300px] overflow-hidden border-2 border-ink bg-white shadow-hard-sm">
            <Image
              src="/ai-assets/sairaaj-services.jpg"
              alt="SaiRaj Cool Service technician providing service for AC, refrigerator and washing machine"
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover object-center"
            />
          </div>
          <div>
            <p className="stamp-label mb-5 w-fit bg-gold text-ink">How it works</p>
            <div className="grid gap-5">
              {processSteps.map((step) => {
                const Icon = step.icon;

                return (
                  <div key={step.title} className="flex gap-4 border-b border-ink/20 pb-5 last:border-0 last:pb-0">
                    <span className="grid h-11 w-11 shrink-0 place-items-center border-2 border-ink bg-royal text-white shadow-hard-sm">
                      <Icon size={22} />
                    </span>
                    <div>
                      <h3 className="font-serif text-2xl font-black text-ink">{step.title}</h3>
                      <p className="mt-1 text-ink/70">{step.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="poster-shadow grid gap-8 border-2 border-ink bg-royal p-6 text-white md:grid-cols-[1fr_auto] md:items-center md:p-8">
          <div>
            <h2 className="font-serif text-4xl font-black md:text-5xl">
              Need cooling, cleaning or compressor help today?
            </h2>
            <p className="mt-3 max-w-2xl text-white/80">
              Share your issue and location. We will confirm the visit slot and
              service price before work starts. Our main focus is honest work,
              proper testing and a perfectly working appliance after service.
            </p>
          </div>
            <Link href="/contact" className="btn-print bg-gold text-ink">
              Book visit
              <CheckCircle2 size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
