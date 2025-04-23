import Arrow from "@/components/icons/arrow";
import { OrdinalDetail } from "@/screens/detailspage/OrdinalDetail";
import Link from "next/link";
// export const dynamic = "force-dynamic";

export default function OrdinalDetailPage() {
  return (
    <div className="grid  justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex w-full justify-between">
        <Link href={"/"}>
          <Arrow.Left />
        </Link>
        <h1 className="font-bold">Ordinal Detail</h1>

        <div />
      </div>

      <main className="flex items-center justify-center">
        <OrdinalDetail />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <p className="flex items-center gap-2 hover:underline hover:underline-offset-4">Xverse Ordinals</p>
      </footer>
    </div>
  );
}
