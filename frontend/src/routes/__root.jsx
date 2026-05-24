import { QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
} from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingActions, MobileStickyBar } from "@/components/FloatingActions";
import { CustomCursor } from "@/components/CustomCursor";
import { EnquiryProvider } from "@/components/EnquiryProvider";
import { BRAND } from "@/lib/constants";
import { BUILDERS } from "@/data/projects";
import { Toaster } from "sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl text-navy">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you&rsquo;re looking for doesn&rsquo;t exist.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center rounded-md bg-navy px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl text-navy">This page didn&rsquo;t load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong. Try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-md bg-navy px-5 py-2.5 text-sm font-medium text-white"
          >
            Try again
          </button>
          <a href="/" className="rounded-md border border-input px-5 py-2.5 text-sm font-medium">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <EnquiryProvider>
        <Toaster position="top-right" richColors />
        <CustomCursor />
        <Navbar />
        <main className="min-h-screen pb-16 sm:pb-0">
          <Outlet />
        </main>
        <Footer />
        <FloatingActions />
        <MobileStickyBar />
      </EnquiryProvider>
    </QueryClientProvider>
  );
}

