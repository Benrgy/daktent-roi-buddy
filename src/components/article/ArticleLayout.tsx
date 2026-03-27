import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronUp, Menu, X } from "lucide-react";
import logoImg from "/logo.png";

interface TOCItem {
  id: string;
  label: string;
}

interface ArticleLayoutProps {
  title: string;
  subtitle: string;
  heroImage: string;
  tocItems: TOCItem[];
  children: React.ReactNode;
  publishDate: string;
  readTime: string;
  breadcrumbLabel: string;
}

export function ArticleLayout({
  title,
  subtitle,
  heroImage,
  tocItems,
  children,
  publishDate,
  readTime,
  breadcrumbLabel,
}: ArticleLayoutProps) {
  const [activeSection, setActiveSection] = useState("");
  const [tocOpen, setTocOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );
    tocItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [tocItems]);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg shadow-sm border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <img src={logoImg} alt="Daktent ROI Calculator" width={28} height={28} className="w-7 h-7" />
            <span className="font-bold text-sm text-foreground">Daktent ROI Calculator</span>
          </a>
          <div className="flex items-center gap-2">
            <a href="/#calculator" className="px-4 py-2 rounded-lg text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all">
              Bereken Besparing
            </a>
            <button
              onClick={() => setTocOpen(!tocOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-muted"
              aria-label="Inhoudsopgave"
            >
              {tocOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile TOC overlay */}
      {tocOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setTocOpen(false)}>
          <div className="absolute top-14 left-0 right-0 bg-card border-b border-border p-4 max-h-[70vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Inhoudsopgave</p>
            <nav className="space-y-1">
              {tocItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setTocOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeSection === item.id
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Hero */}
      <header className="relative pt-14 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt={title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[hsl(155_45%_10%/0.9)]" />
        </div>
        <div className="relative z-10 py-16 md:py-24 px-4">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            {/* Breadcrumbs */}
            <nav className="text-sm text-white/60" aria-label="Breadcrumb">
              <a href="/" className="hover:text-white/80">Home</a>
              <span className="mx-2">/</span>
              <span className="text-white/90">{breadcrumbLabel}</span>
            </nav>
            <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-white/75 max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
            <div className="flex items-center justify-center gap-4 text-white/50 text-sm">
              <span>📅 {publishDate}</span>
              <span>⏱️ {readTime} leestijd</span>
            </div>
          </div>
        </div>
      </header>

      {/* Content with sticky sidebar */}
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">
        <div className="flex gap-8">
          {/* Sticky TOC sidebar - desktop */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-20">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Inhoudsopgave</p>
              <nav className="space-y-0.5 border-l-2 border-border">
                {tocItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`block pl-4 py-1.5 text-sm transition-all border-l-2 -ml-[2px] ${
                      activeSection === item.id
                        ? "border-primary text-primary font-semibold"
                        : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/10">
                <p className="text-sm font-bold text-foreground mb-1">💡 Bereken je besparing</p>
                <p className="text-xs text-muted-foreground mb-3">Ontdek in 30 sec of een daktent financieel slim is.</p>
                <a href="/#calculator" className="block text-center px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all">
                  Start Calculator →
                </a>
              </div>
            </div>
          </aside>

          {/* Article content */}
          <article className="flex-1 min-w-0 max-w-3xl">
            <div className="prose prose-lg prose-stone max-w-none
              prose-headings:font-display prose-headings:text-foreground prose-headings:scroll-mt-20
              prose-p:text-muted-foreground prose-p:leading-relaxed
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground
              prose-li:text-muted-foreground
              prose-img:rounded-xl prose-img:shadow-lg
              prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:rounded-r-xl prose-blockquote:py-1 prose-blockquote:px-6
            ">
              {children}
            </div>
          </article>
        </div>
      </div>

      {/* CTA footer */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-primary/5 border-t border-primary/10 py-12 px-4"
      >
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Benieuwd naar jouw besparing?</h2>
          <p className="text-muted-foreground">Gebruik onze gratis calculator en ontdek in 30 seconden hoeveel je bespaart met een daktent.</p>
          <a href="/#calculator" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-all shadow-xl shadow-primary/25">
            Start Berekening →
          </a>
        </div>
      </motion.div>

      {/* Related articles */}
      <div className="border-t border-border bg-card py-10 px-4">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Daktent ROI Calculator · Onafhankelijke vergelijking
          </p>
        </div>
      </div>

      {/* Back to top */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all"
          aria-label="Terug naar boven"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
