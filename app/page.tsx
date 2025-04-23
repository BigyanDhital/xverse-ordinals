import OrdinalsLookup from "@/screens/homepage/OrdinalsLookup";

export default function Home() {
  return (
    <div className="  min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div>
        <div className="">
          <h1 className="font-bold text-center text-2xl">Ordinal Inscription Lookup</h1>
        </div>
      </div>
      <main>
        <OrdinalsLookup />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <p className="flex items-center gap-2 hover:underline hover:underline-offset-4">Xverse Ordinals</p>
      </footer>
    </div>
  );
}
