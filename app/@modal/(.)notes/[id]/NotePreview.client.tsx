"use client";

import css from "@/components/NotePreview/NotePreview.module.css";
import type { Note } from "@/types/note";

interface NotePreviewProps {
  note: Note;
}

export default function NotePreviewClient({ note }: NotePreviewProps) {
  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>{note.title}</h2>
      <p className={css.content}>{note.content}</p>
      <span className={css.tag}>{note.tag}</span>
    </div>
  );
}
