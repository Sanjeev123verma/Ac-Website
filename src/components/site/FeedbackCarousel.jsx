"use client";

import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "./siteData";

export default function FeedbackCarousel() {
  const scrollByCard = (direction) => {
    const carousel = document.getElementById("customer-feedback-carousel");

    if (!carousel) {
      return;
    }

    carousel.scrollBy({
      left: direction * Math.min(carousel.clientWidth * 0.9, 420),
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      <div className="mb-4 flex justify-end gap-3">
        <button
          type="button"
          className="grid h-11 w-11 place-items-center border-2 border-ink bg-paper text-ink shadow-hard-sm transition hover:-translate-y-0.5 hover:bg-gold"
          onClick={() => scrollByCard(-1)}
          aria-label="Previous customer feedback"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          type="button"
          className="grid h-11 w-11 place-items-center border-2 border-ink bg-royal text-white shadow-hard-sm transition hover:-translate-y-0.5"
          onClick={() => scrollByCard(1)}
          aria-label="Next customer feedback"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      <div
        id="customer-feedback-carousel"
        className="scrollbar-hide flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-3"
      >
        {testimonials.map((item) => {
          const Icon = item.icon;

          return (
            <article
              key={`${item.name}-${item.area}`}
              className="poster-shadow min-w-[82%] snap-start border-2 border-ink bg-white p-6 sm:min-w-[420px] lg:min-w-[390px]"
            >
              <Quote className="mb-4 text-blueprint" size={34} />
              <div className="mb-4 flex gap-1 text-gold">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Icon key={index} size={18} fill="currentColor" />
                ))}
              </div>
              <p className="leading-8 text-ink/75">&quot;{item.text}&quot;</p>
              <div className="mt-6 border-t-2 border-ink pt-4">
                <p className="font-black text-ink">{item.name}</p>
                <p className="text-sm font-bold uppercase text-blueprint">{item.area}</p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
