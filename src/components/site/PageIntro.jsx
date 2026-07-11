import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export default function PageIntro({ title, eyebrow, children }) {
  return (
    <section className="paper-grid border-b-2 border-ink px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-3 flex w-fit flex-wrap items-center gap-2 border-2 border-ink bg-paper px-3 py-1.5 text-xs font-black uppercase tracking-wide text-blueprint shadow-hard-sm">
            <Link href="/" className="inline-flex items-center gap-1 hover:text-ink">
              <Home size={13} />
              Home
            </Link>
            <ChevronRight size={13} />
            <span>{eyebrow || title}</span>
        </div>
        <div className="poster-shadow border-2 border-ink bg-paper p-5 md:p-7">
          <h1 className="text-4xl font-black leading-none text-ink md:text-6xl">
            {title}
          </h1>
          {children && <p className="mt-4 max-w-3xl text-lg leading-8 text-ink/75">{children}</p>}
        </div>
      </div>
    </section>
  );
}
