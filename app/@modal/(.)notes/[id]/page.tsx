import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NotePreview from "../../../../components/NotePreview/NotePreview";

export default async function NotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // ✅ Очікуємо params
  const { id } = await params;

  // ✅ Prefetch + hydration
  const qc = new QueryClient();
  await qc.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  // ✅ Отримуємо дані для передачі у NotePreview
  const note = await fetchNoteById(id);

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <NotePreview note={note} />
    </HydrationBoundary>
  );
}
