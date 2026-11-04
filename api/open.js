export default {
  async fetch(request) {
    const headers = { "Cache-Control": "no-store" };
    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response(null, {
        status: 405,
        headers: { ...headers, Allow: "GET, HEAD" }
      });
    }

    const configuredUrl = process.env.APPS_SCRIPT_EXEC_URL?.trim();
    let destination;
    try {
      destination = new URL(configuredUrl);
    } catch {
      return configurationError(request, headers);
    }

    const isAppsScript =
      destination.origin === "https://script.google.com" &&
      !destination.username &&
      !destination.password &&
      /^\/(?:a\/macros\/[^/]+\/s|macros\/s)\/[A-Za-z0-9_-]+\/exec$/.test(destination.pathname);
    if (!isAppsScript) return configurationError(request, headers);

    return new Response(null, {
      status: 302,
      headers: { ...headers, Location: destination.href }
    });
  }
};

function configurationError(request, headers) {
  const message = "Chưa cấu hình đúng đường dẫn Apps Script. Hãy đặt APPS_SCRIPT_EXEC_URL bằng URL HTTPS kết thúc bằng /exec rồi triển khai lại trên Vercel.";
  return new Response(request.method === "HEAD" ? null : message, {
    status: 503,
    headers: { ...headers, "Content-Type": "text/plain; charset=utf-8" }
  });
}
