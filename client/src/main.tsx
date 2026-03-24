import { trpc } from "@/lib/trpc";
import { UNAUTHED_ERR_MSG } from '@shared/const';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, TRPCClientError } from "@trpc/client";
import { createRoot } from "react-dom/client";
import superjson from "superjson";
import App from "./App";
import { getLoginUrl } from "./const";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // Don't retry auth errors
        if (error instanceof TRPCClientError) {
          if (error.message === UNAUTHED_ERR_MSG) return false;
          // Don't retry if backend is completely unavailable (404, network error)
          if (error.message?.includes("fetch") || error.message?.includes("Failed")) return false;
          if (error.message?.includes("404") || error.message?.includes("Not Found")) return false;
        }
        return failureCount < 1;
      },
      refetchOnWindowFocus: false,
      // CRITICAL: Never throw errors from queries — let components handle them gracefully
      throwOnError: false,
    },
    mutations: {
      retry: false,
      throwOnError: false,
    },
  },
});

const redirectToLoginIfUnauthorized = (error: unknown) => {
  try {
    if (!(error instanceof TRPCClientError)) return;
    if (typeof window === "undefined") return;

    const isUnauthorized = error.message === UNAUTHED_ERR_MSG;
    if (!isUnauthorized) return;

    // Only redirect if login URL is valid (not "#")
    const loginUrl = getLoginUrl();
    if (loginUrl && loginUrl !== "#") {
      window.location.href = loginUrl;
    }
  } catch (e) {
    console.warn("[Auth] Error handling redirect:", e);
  }
};

queryClient.getQueryCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.query.state.error;
    redirectToLoginIfUnauthorized(error);
    // Only log in dev, don't spam console in production
    if (import.meta.env.DEV) {
      console.error("[API Query Error]", error);
    }
  }
});

queryClient.getMutationCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.mutation.state.error;
    redirectToLoginIfUnauthorized(error);
    if (import.meta.env.DEV) {
      console.error("[API Mutation Error]", error);
    }
  }
});

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "/api/trpc",
      transformer: superjson,
      fetch(input, init) {
        return globalThis.fetch(input, {
          ...(init ?? {}),
          credentials: "include",
        }).catch((err) => {
          // If backend is completely unavailable, return a fake error response
          // instead of letting the fetch rejection crash the app
          console.warn("[tRPC] Backend unavailable:", err.message);
          return new Response(
            JSON.stringify([{ error: { message: "Backend unavailable", code: -1 } }]),
            { status: 500, headers: { "content-type": "application/json" } }
          );
        });
      },
    }),
  ],
});

createRoot(document.getElementById("root")!).render(
  <trpc.Provider client={trpcClient} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </trpc.Provider>
);
