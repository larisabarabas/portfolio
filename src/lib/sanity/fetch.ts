import { client } from "@/lib/sanity/client";

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
    return await client.fetch<T>(query, params ?? {});
  } catch (error) {
    console.warn("[sanity] query failed, using fallback:", error);
    return fallback;
  }
}
