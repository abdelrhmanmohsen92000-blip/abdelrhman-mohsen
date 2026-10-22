import Link from "next/link";

export default function NotFound() {
  return (
    <div className="px-[var(--gutter)] pt-16 pb-10">
      <p className="t-label">404</p>
      <h1 className="t-title mt-4 max-w-[16ch]">This sheet isn’t in the set.</h1>
      <p className="t-lead mt-6 text-lead">The page may have moved. The project list has everything that’s published.</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/work" className="btn btn-primary">
          See all projects
        </Link>
        <Link href="/" className="btn btn-quiet">
          Go to the home page
        </Link>
      </div>
    </div>
  );
}
