import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div className="flex flex-col min-h-[100vh] items-center justify-center gap-2 text-center">
      <img
        alt="Hero"
        className="object-contain object-center mx-auto overflow-hidden aspect-video rounded-t-xl"
        height="300"
        src="/404.png"
        width="800"
      />
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">404 - Page Not Found</h1>
        <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
          We looked everywhere, but we couldn't find the page you were looking for.
        </p>
      </div>
      <Link
        className="inline-flex items-center justify-center h-10 px-8 text-sm font-medium transition-colors bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
        to="/"
      >
        Return to the homepage
      </Link>
    </div>
  )
}

