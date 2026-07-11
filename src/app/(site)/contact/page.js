import ContactForm from "@/components/site/ContactForm";
import PageIntro from "@/components/site/PageIntro";
import { company } from "@/components/site/siteData";
import { Mail, MapPin, Phone } from "lucide-react";

export const metadata = {
  title: "Contact | Book Appliance Repair",
  description:
    "Book AC, fridge or washing machine repair service with HansRaj Cooling Works.",
};

export default function ContactPage({ searchParams }) {
  const selectedService = searchParams?.service || "";

  return (
    <>
      <PageIntro title="Book a visit" eyebrow="Contact">
        Tell us the appliance problem, your address and preferred service. We
        will call back with the next available technician slot.
      </PageIntro>

      <section className="px-4 py-12">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <ContactForm selectedService={selectedService} />

          <aside className="poster-shadow border-2 border-ink bg-paper p-6 md:p-8">
            <p className="stamp-label mb-5 w-fit bg-gold text-ink">Service desk</p>
            <h2 className="font-serif text-4xl font-black text-ink">Direct contact</h2>
            <div className="mt-6 space-y-5 text-ink/80">
              <p className="flex gap-3">
                <MapPin className="mt-1 shrink-0 text-blueprint" size={22} />
                <span>
                  {company.address}
                  <span className="mt-1 block font-bold text-ink">{company.cityLine}</span>
                </span>
              </p>
              <a className="flex gap-3 hover:text-blueprint" href={`tel:${company.phone}`}>
                <Phone className="shrink-0" size={22} />
                {company.phone}
              </a>
              <a className="flex gap-3 hover:text-blueprint" href={`mailto:${company.email}`}>
                <Mail className="shrink-0" size={22} />
                {company.email}
              </a>
            </div>

            <div className="mt-8 overflow-hidden border-2 border-ink shadow-hard-sm">
              <iframe
                title="HansRaj Cooling Works location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3765.3873013677403!2d72.84887097425795!3d19.30899304461867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b02b2d5c65cb%3A0xe2f32eb9fb1839ed!2sNirmala%20Niketan%20High%20School!5e0!3m2!1sen!2sin!4v1732011957419!5m2!1sen"
                width="100%"
                height="320"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
