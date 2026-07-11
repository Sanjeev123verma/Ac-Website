import Image from "next/image";
import Link from "next/link";
import { AlertCircle, CheckCircle2, ClipboardCheck, ShieldCheck } from "lucide-react";
import PageIntro from "@/components/site/PageIntro";
import ServiceCards from "@/components/site/ServiceCards";
import {
  processSteps,
  serviceDetails,
  servicePageNotes,
} from "@/components/site/siteData";

export const metadata = {
  title: "Services | AC, Fridge & Washing Machine Repair",
  description:
    "Book AC service, fridge repair, washing machine repair and maintenance plans from HansRaj Cooling Works.",
};

export default function ServicesPage() {
  return (
    <>
      <PageIntro title="Service menu" eyebrow="Services">
        Pick the appliance and problem. We will confirm the visit slot, inspect
        the issue and share pricing before repair work starts.
      </PageIntro>

      <section className="px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="section-heading">
            <p className="stamp-label bg-royal text-white">Quick selection</p>
            <h2>Choose the appliance first.</h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-ink/70">
              These are the main service categories. Below this, each category
              explains what we check, what problems it covers, and when you
              should book it.
            </p>
          </div>
          <ServiceCards />
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="section-heading">
            <p className="stamp-label bg-gold text-ink">Detailed services</p>
            <h2>What exactly happens in each visit?</h2>
          </div>

          <div className="grid gap-6">
            {serviceDetails.map((service, index) => (
              <article
                key={service.title}
                className="poster-shadow grid gap-6 border-2 border-ink bg-paper p-5 md:grid-cols-[0.75fr_1.25fr] md:p-7"
              >
                <div>
                  <p className="stamp-label mb-4 inline-block bg-royal text-white">
                    Service {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-4xl font-black leading-tight text-ink">
                    {service.title}
                  </h3>
                  <p className="mt-4 leading-8 text-ink/75">{service.intro}</p>
                  <p className="mt-5 border-l-4 border-blueprint bg-white p-4 font-bold leading-7 text-ink shadow-hard-sm">
                    {service.visitNote}
                  </p>
                </div>

                <div className="grid gap-5 lg:grid-cols-2">
                  <div className="border-2 border-ink bg-white p-4 shadow-hard-sm">
                    <h4 className="mb-4 flex items-center gap-2 text-xl font-black text-ink">
                      <ClipboardCheck size={22} />
                      Included checks
                    </h4>
                    <ul className="grid gap-3">
                      {service.included.map((item) => (
                        <li key={item} className="flex gap-3 leading-7 text-ink/75">
                          <CheckCircle2 className="mt-1 shrink-0 text-blueprint" size={18} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-2 border-ink bg-white p-4 shadow-hard-sm">
                    <h4 className="mb-4 flex items-center gap-2 text-xl font-black text-ink">
                      <AlertCircle size={22} />
                      Common problems
                    </h4>
                    <ul className="grid gap-3">
                      {service.commonProblems.map((item) => (
                        <li key={item} className="flex gap-3 leading-7 text-ink/75">
                          <span className="mt-2 h-2 w-2 shrink-0 border-2 border-ink bg-gold" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-10">
        <div className="poster-shadow mx-auto grid max-w-7xl gap-7 border-2 border-ink bg-paper p-5 md:p-7 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="stamp-label mb-5 w-fit bg-royal text-white">Service record</p>
            <div className="grid gap-5">
              {processSteps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <div key={step.title} className="flex gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center border-2 border-ink bg-gold font-serif text-2xl font-black shadow-hard-sm">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="flex items-center gap-2 font-serif text-2xl font-black">
                        <Icon size={20} />
                        {step.title}
                      </h3>
                      <p className="mt-1 text-ink/70">{step.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="relative aspect-[4/3] min-h-[320px] overflow-hidden border-2 border-ink bg-white shadow-hard-sm">
            <Image
              src="/ai-assets/services-diagnostic.jpg"
              alt="Organized AC, refrigerator, washing machine and maintenance diagnostics"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="poster-shadow grid gap-6 border-2 border-ink bg-paper p-6 md:grid-cols-3 md:p-8">
            {servicePageNotes.map((note) => (
              <div key={note.title} className="border-2 border-ink bg-white p-5 shadow-hard-sm">
                <ShieldCheck className="mb-4 text-blueprint" size={30} />
                <h3 className="text-2xl font-black text-ink">{note.title}</h3>
                <p className="mt-3 leading-7 text-ink/70">{note.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="poster-shadow grid gap-6 border-2 border-ink bg-ink p-6 text-paper md:grid-cols-[1fr_auto] md:items-center md:p-8">
            <div>
              <p className="stamp-label mb-4 inline-block bg-gold text-ink">
                Still confused?
              </p>
              <h2 className="text-4xl font-black md:text-5xl">
                Tell us the symptom. We will suggest the right service.
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-paper/75">
                You do not need to know the exact technical fault. Share the
                appliance, brand if available, and what changed recently.
              </p>
            </div>
            <Link href="/contact" className="btn-print bg-gold text-ink">
              Book diagnosis
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
