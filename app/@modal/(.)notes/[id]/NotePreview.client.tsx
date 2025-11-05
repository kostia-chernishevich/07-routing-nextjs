"use client";

import { useRouter, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { Modal } from "../../../../components/Modal/Modal";
import css from "./NotePreview.module.css";

export default function NotePreview() {
  const router = useRouter();
  const params = useParams();

  // ⬇️ id із URL
  const id = Array.isArray(params?.id) ? params.id[0] : (params?.id as string);

  // ⬇️ Запит нотатки через React Query
  const { data: note, isLoading, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  // ⬇️ Стан завантаження/помилки
  if (isLoading) {
    return (
      <Modal onClose={() => router.back()}>
        <p>Loading note...</p>
      </Modal>
    );
  }

  if (isError || !note) {
    return (
      <Modal onClose={() => router.back()}>
        <p>Failed to load note.</p>
      </Modal>
    );
  }

  // ⬇️ Рендер нотатки у модалці
  return (
    <Modal onClose={() => router.back()}>
      <div className={css.preview}>
        <h2 className={css.title}>{note.title}</h2>
        <p className={css.content}>{note.content}</p>
        <div className={css.footer}>
          <span className={css.tag}>{note.tag}</span>
          <span className={css.date}>
            Created at: {new Date(note.createdAt).toLocaleString()}
          </span>
        </div>
        <button onClick={() => router.back()} className={css.closeBtn}>
          Close
        </button>
      </div>
    </Modal>
  );
}
