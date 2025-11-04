import { fetchNoteById } from "@/lib/api";
import NotePreview from "../../../../../../components/NotePreview/NotePreview";
import NoteModal from "../../../../../../components/NoteModal/NoteModal"

export default async function NotePage({
  params,
}: {
  params: { id: string };
}) {
  const note = await fetchNoteById(params.id);
  return (
    <NoteModal>
      <NotePreview note={note} />
    </NoteModal>
  );
}