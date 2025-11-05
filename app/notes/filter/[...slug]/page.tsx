import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import { notFound } from "next/navigation";

export default async function NotesPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;

  const rawTag = slug?.[0] ?? "all";
  const tag = rawTag === "all" ? undefined : rawTag;

  if (!rawTag) notFound();

  const qc = new QueryClient();

  await qc.prefetchQuery({
    queryKey: ["notes", { tag: rawTag }],
  
    queryFn: () => fetchNotes({ tag, page: 1, perPage: 12, search: "" }),
  });

  const state = dehydrate(qc);

  return (
    <>
      <h1 style={{ textAlign: "center", marginBottom: 20 }}>
        Notes tagged: {rawTag}
      </h1>
      <HydrationBoundary state={state}>
        <NotesClient tag={tag} />
      </HydrationBoundary>
    </>
  );
}
