import { fetchNoteById } from "@/lib/api";
import NotePreview from "../../../../components/NotePreview/NotePreview";


export default async function NotePage({
  params,
}: {
  params: { id: string };
}) {
  const note = await fetchNoteById(params.id);
  return (
    
      <NotePreview note={note} />
   
  );
}