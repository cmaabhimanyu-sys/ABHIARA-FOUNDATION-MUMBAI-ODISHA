export const createTransportErrorResponse = (message: string, status = 502) =>
  new Response(
    JSON.stringify([
      {
        error: {
          json: {
            message,
            code: -32603,
            data: {
              code: "INTERNAL_SERVER_ERROR",
              httpStatus: status,
            },
          },
        },
      },
    ]),
    {
      status,
      headers: { "content-type": "application/json" },
    },
  );

export async function safeTrpcFetch(
  input: RequestInfo | URL,
  init?: RequestInit,
  fetchImpl: typeof globalThis.fetch = globalThis.fetch,
): Promise<Response> {
  try {
    const response = await fetchImpl(input, {
      ...(init ?? {}),
      credentials: "include",
    });
    const body = await response.clone().text();
    const contentType = response.headers.get("content-type") ?? "";

    if (!body.trim()) {
      console.warn("[tRPC] Server returned an empty response", {
        status: response.status,
        url: typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url,
      });
      return createTransportErrorResponse(
        "The payment service did not respond. Please wait a moment and try again.",
        response.status >= 400 ? response.status : 502,
      );
    }

    if (!contentType.includes("application/json")) {
      console.warn("[tRPC] Server returned a non JSON response", {
        status: response.status,
        contentType,
      });
      return createTransportErrorResponse(
        "The website could not reach the payment service. Please try again.",
        response.status >= 400 ? response.status : 502,
      );
    }

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown network error";
    console.warn("[tRPC] Backend unavailable:", message);
    return createTransportErrorResponse(
      "The website could not reach the payment service. Please check your connection and try again.",
      503,
    );
  }
}
