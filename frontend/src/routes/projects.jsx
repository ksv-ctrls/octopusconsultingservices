import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { AREAS, BUDGET_OPTIONS, BUILDERS, PROJECTS } from "@/data/projects";
const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects in Chennai \u2014 Octopus Consulting" },
      {
        name: "description",
        content:
          `Browse ${PROJECTS.length}+ premium real-estate projects across Chennai. Filter by location, budget, BHK, and builder. RERA-verified.`,
      },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: ProjectsPage,
});
const PAGE = 9;
function ProjectsPage() {
  const [q, setQ] = useState("");
  const [area, setArea] = useState("");
  const [budget, setBudget] = useState("");
  const [bhk, setBhk] = useState("");
  const [builder, setBuilder] = useState("");
  const [sort, setSort] = useState("new");
  const [shown, setShown] = useState(PAGE);
  const filtered = useMemo(() => {
    const b = BUDGET_OPTIONS.find((x) => x.value === budget);
    const bhkN = bhk ? Number(bhk) : null;
    let list = PROJECTS.filter((p) => {
      if (q && !`${p.name} ${p.builder} ${p.location}`.toLowerCase().includes(q.toLowerCase()))
        return false;
      if (area && p.area !== area) return false;
      if (builder && p.builder !== builder) return false;
      if (b && (p.priceMin > b.max || p.priceMax < b.min)) return false;
      if (bhkN !== null && !p.bhk.includes(bhkN)) return false;
      return true;
    });
    if (sort === "asc") list = [...list].sort((a, b2) => a.priceMin - b2.priceMin);
    else if (sort === "desc") list = [...list].sort((a, b2) => b2.priceMax - a.priceMax);
    else list = [...list].sort((a, b2) => b2.id - a.id);
    return list;
  }, [q, area, budget, bhk, builder, sort]);
  const visible = filtered.slice(0, shown);
  const inputCls =
    "px-3 py-2.5 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold";
  return (
    <>
      <section className="pt-32 pb-10 bg-gradient-luxe text-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-xs uppercase tracking-[0.3em] text-gold mb-3">All Projects</div>
          <h1 className="font-display text-4xl sm:text-5xl mb-3">
            {PROJECTS.length} premium projects across Chennai
          </h1>
          <p className="text-white/70 max-w-2xl">
            Filter by location, budget, BHK and builder. Every project is RERA-verified and backed
            by a direct builder tie-up.
          </p>
        </div>
      </section>

      <section className="sticky top-[68px] z-20 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <input
            className={inputCls + " col-span-2 lg:col-span-2"}
            placeholder="Search projects…"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setShown(PAGE);
            }}
          />
          <select
            className={inputCls}
            value={area}
            onChange={(e) => {
              setArea(e.target.value);
              setShown(PAGE);
            }}
          >
            <option value="">All locations</option>
            {AREAS.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
          <select
            className={inputCls}
            value={budget}
            onChange={(e) => {
              setBudget(e.target.value);
              setShown(PAGE);
            }}
          >
            <option value="">Any budget</option>
            {BUDGET_OPTIONS.map((b) => (
              <option key={b.value} value={b.value}>
                {b.label}
              </option>
            ))}
          </select>
          <select
            className={inputCls}
            value={bhk}
            onChange={(e) => {
              setBhk(e.target.value);
              setShown(PAGE);
            }}
          >
            <option value="">Any BHK</option>
            <option value="1">1 BHK</option>
            <option value="2">2 BHK</option>
            <option value="3">3 BHK</option>
            <option value="4">4 BHK</option>
          </select>
          <select className={inputCls} value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="new">Newest</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
          <select
            className={inputCls + " col-span-2 md:col-span-3 lg:col-span-6"}
            value={builder}
            onChange={(e) => {
              setBuilder(e.target.value);
              setShown(PAGE);
            }}
          >
            <option value="">All builders</option>
            {BUILDERS.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </div>
      </section>

      <section className="py-12 bg-surface">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="mb-6 text-sm text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "project" : "projects"} found
          </div>
          {visible.length === 0 ? (
            <div className="py-20 text-center text-muted-foreground">
              No projects match. Try clearing filters.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visible.map((p) => (
                <ProjectCard key={p.id} p={p} />
              ))}
            </div>
          )}
          {shown < filtered.length && (
            <div className="mt-12 text-center">
              <button
                onClick={() => setShown((s) => s + PAGE)}
                className="px-8 py-3.5 bg-navy text-white rounded-md font-semibold uppercase tracking-wider text-sm hover:opacity-90 transition"
              >
                Load More ({filtered.length - shown} remaining)
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
export { Route };
