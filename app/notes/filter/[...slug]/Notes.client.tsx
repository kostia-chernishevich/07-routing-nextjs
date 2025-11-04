"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import { NoteList } from "@/components/NoteList/NoteList";
import { Loader } from "@/components/Loader/Loader";

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", tag],
    queryFn: () => fetchNotes({ page: 1, perPage: 12, tag }),
  });

  if (isLoading) return <Loader />;
  if (isError) return <p>Error loading notes</p>;

  return <NoteList notes={data?.notes ?? []} isLoading={false} isError={false} />;
}
