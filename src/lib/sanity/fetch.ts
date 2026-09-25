import { client } from "@/lib/sanity/client";

// Pages are static, so without an explicit window Next.js keeps Sanity
// responses in its data cache indefinitely — across rebuilds too — and CMS
// edits never reach the site. Refresh at most once a minute (ISR).
const REVALIDATE_SECONDS = 60;

export async function sanityFetch<T>({
  query,
  params,
  fallback,
}: {
  query: string;
  params?: Record<string, unknown>;
  fallback: T;
}): Promise<T> {
  try {
    return await client.fetch<T>(query, params ?? {}, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
  } catch (error) {
    console.warn("[sanity] query failed, using fallback:", error);
    return fallback;
  }
}
