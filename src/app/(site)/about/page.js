import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import FeedbackCarousel from "@/components/site/FeedbackCarousel";
import PageIntro from "@/components/site/PageIntro";
import {
  aboutStats,
  aboutTimeline,
  aboutValues,
  company,
  customerTypes,
  serviceAreas,
  trustPoints,
} from "@/components/site/siteData";

export const metadata = {
  title: "About | HansRaj Cooling Works",
  description:
    "Learn about HansRaj Cooling Works, a doorstep AC, fridge and washing machine repair service in Mira Bhayander.",
};

export default function AboutPage() {
  return (
    <>
      <PageIntro title="About our service desk" eyebrow="About">
        {company.name} is a local doorstep repair team for AC, fridge and
        washing machine service. Our work is built around clear diagnosis,
        practical repair, customer trust and 6 months warranty on the
        particular service completed.
      </PageIntro>

      <section className="px-4 py-10">
        <div className="poster-shadow mx-auto max-w-7xl border-2 border-ink bg-paper p-5 md:p-7">
          <div className="grid gap-7 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="relative aspect-[4/3] min-h-[320px] overflow-hidden border-2 border-ink bg-white shadow-hard-sm">
              <Image
                src="/ai-assets/about-workshop.jpg"
                alt="Technician inspecting AC, refrigerator and washing machine in a repair workshop"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover object-center"
              />
            </div>

            <div className="lg:pl-2">
              <p className="stamp-label mb-5 w-fit bg-gold text-ink">Since 15+ years</p>
              <h2 className="text-5xl font-black leading-tight text-ink">
                A local repair workshop that comes to your doorstep.
              </h2>
              <p className="mt-5 text-lg leading-8 text-ink/75">
                We serve homes, rented flats, shops and small offices where
                appliances cannot wait for long. Whether the AC is not cooling,
                the fridge is losing temperature or the washing machine is making
                noise, our first job is to inspect properly and explain the issue
                in simple language.
              </p>
              <p className="mt-4 text-lg leading-8 text-ink/75">
                Our main focus is not just finishing the job quickly. We want the
                appliance to work properly after service, and we stand behind that
                particular service with a 6-month warranty.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trustPoints.map((point) => {
              const Icon = point.icon;

              return (
                <div key={point.label} className="mini-proof bg-white">
                  <Icon size={24} />
                  <span>{point.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 md:grid-cols-4">
            {aboutStats.map((stat) => (
              <div key={stat.label} className="poster-shadow border-2 border-ink bg-white p-5">
                <p className="text-4xl font-black text-blueprint">{stat.value}</p>
                <p className="mt-2 text-sm font-black uppercase leading-6 text-ink/70">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="section-heading">
            <p className="stamp-label bg-royal text-white">Who we serve</p>
            <h2>Customers who need repair without confusion.</h2>
            <p className="mt-4 text-lg leading-8 text-ink/70">
              Appliance repair is stressful because customers do not always
              know the technical fault. Our job is to remove that confusion.
            </p>
          </div>

          <div className="grid gap-4">
            {customerTypes.map((item) => (
              <div key={item} className="mini-proof bg-white">
                <CheckCircle2 size={24} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="section-heading">
            <p className="stamp-label bg-gold text-ink">Our values</p>
            <h2>What customers should feel after a visit.</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {aboutValues.map((value) => {
              const Icon = value.icon;

              return (
                <article key={value.title} className="service-card">
                  <span className="mb-5 grid h-14 w-14 place-items-center border-2 border-ink bg-gold text-ink shadow-hard-sm">
                    <Icon size={28} />
                  </span>
                  <h3 className="text-3xl font-black leading-tight text-ink">{value.title}</h3>
                  <p className="mt-4 leading-7 text-ink/75">{value.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="poster-shadow border-2 border-ink bg-paper p-6 md:p-8">
            <p className="stamp-label mb-5 w-fit bg-royal text-white">How we work</p>
            <h2 className="text-4xl font-black leading-tight text-ink md:text-5xl">
              A simple repair flow customers can understand.
            </h2>
            <div className="mt-8 grid gap-5">
              {aboutTimeline.map((step, index) => (
                <div key={step.title} className="flex gap-4 border-b border-ink/20 pb-5 last:border-0 last:pb-0">
                  <span className="grid h-12 w-12 shrink-0 place-items-center border-2 border-ink bg-gold text-2xl font-black shadow-hard-sm">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-2xl font-black text-ink">{step.title}</h3>
                    <p className="mt-1 leading-7 text-ink/70">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="poster-shadow border-2 border-ink bg-royal p-6 text-white md:p-8">
            <Wrench className="mb-5" size={42} />
            <h3 className="text-4xl font-black leading-tight">
              We do not start repair work blindly.
            </h3>
            <p className="mt-5 leading-8 text-white/80">
              The technician checks the visible issue, tests the appliance
              condition and then shares the work needed. This protects the
              customer from random part replacement and unclear bills.
            </p>
            <div className="mt-6 border-2 border-ink bg-paper p-4 text-ink shadow-hard-sm">
              <ShieldCheck className="mb-3 text-blueprint" size={28} />
              <p className="font-black leading-7">
                Diagnosis first. Price clarity second. Repair only after
                customer approval. Final testing before closure.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="section-heading">
            <p className="stamp-label bg-royal text-white">Customer feedback</p>
            <h2>What people usually care about.</h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-ink/70">
              For a repair website, feedback should talk about punctuality,
              clear explanation, neat work and fair pricing. Use the arrows or
              swipe sideways to view more customer cards.
            </p>
          </div>

          <FeedbackCarousel />
        </div>
      </section>

      <section className="px-4 py-10">
        <div className="poster-shadow mx-auto grid max-w-7xl gap-7 border-2 border-ink bg-paper p-5 md:p-7 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="relative aspect-[4/3] min-h-[300px] overflow-hidden border-2 border-ink bg-white shadow-hard-sm">
            <Image
              src="/ai-assets/service-desk.jpg"
              alt="Organized appliance repair booking desk with phone, service notes and tools"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover object-center"
            />
          </div>

          <div>
            <p className="stamp-label mb-5 w-fit bg-gold text-ink">Service area</p>
            <h2 className="text-4xl font-black leading-tight text-ink md:text-5xl">
              Local visits around Mira Bhayander.
            </h2>
            <p className="mt-4 leading-8 text-ink/75">
              We are most useful for customers who need a technician nearby,
              quick communication and home visit repair support.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {serviceAreas.map((area) => (
                <div key={area} className="flex items-center gap-3 border-2 border-ink bg-white p-3 font-black shadow-hard-sm">
                  <MapPin className="shrink-0 text-blueprint" size={20} />
                  {area}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="poster-shadow grid gap-6 border-2 border-ink bg-ink p-6 text-paper md:grid-cols-[1fr_auto] md:items-center md:p-8">
            <div>
              <p className="stamp-label mb-4 inline-block bg-gold text-ink">
                Ready for a visit?
              </p>
              <h2 className="text-4xl font-black leading-tight md:text-5xl">
                Tell us what happened. We will guide the next step.
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-paper/75">
                Share appliance type, issue, location and preferred time. The
                service desk will help you pick the right visit.
              </p>
            </div>
            <Link href="/contact" className="btn-print bg-gold text-ink">
              Book service
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
