"use client";

import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import type { Note } from "@/types/note";

import { SearchBox } from "../../../../components/SearchBox/SearchBox";
import { Pagination } from "../../../../components/Pagination/Pagination";
import { Modal } from "../../../../components/Modal/Modal";
import { NoteForm } from "../../../../components/NoteForm/NoteForm";
import { NoteList } from "../../../../components/NoteList/NoteList";

import styles from "./Notes.client.module.css";

type NotesClientProps = { tag?: string };

const PER_PAGE = 12;
const DEBOUNCE_MS = 350;

export default function NotesClient({ tag }: NotesClientProps) {
  // сторінка
  const [page, setPage] = useState(1);

  // пошук + debounce
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedSearch(searchInput.trim());
      setPage(1);
    }, DEBOUNCE_MS);
    return () => clearTimeout(id);
  }, [searchInput]);

  // модалка
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // дані
  const queryKey = useMemo(
    () => ["notes", { tag: tag ?? "all", page, search: debouncedSearch }],
    [tag, page, debouncedSearch]
  );

  const { data, isLoading, isFetching, error } = useQuery<{
    notes: Note[];
    totalPages: number;
  }>({
    queryKey,
    queryFn: () =>
      fetchNotes({
        tag,
        page,
        perPage: PER_PAGE,
        search: debouncedSearch,
      }),
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <section className={styles.wrapper}>
      {/* Пошук + створення */}
      <div className={styles.toolbar}>
        <div className={styles.search}>
          <SearchBox
            value={searchInput}
            onChange={(v: string) => setSearchInput(v)}
          />
        </div>
        <button type="button" className={styles.createBtn} onClick={openModal}>
          + Create note
        </button>
        {isFetching && <span className={styles.refreshing}>Refreshing…</span>}
      </div>

      {/* Пагінація ВГОРІ */}
      <Pagination
        page={page}
        totalPages={totalPages}
        onChangePage={(p: number) => setPage(p)}
      />

      {/* Список (NoteList сам показує Loader/помилку/порожній стан) */}
      <NoteList notes={notes} isLoading={isLoading} isError={!!error} />

      {/* Модалка */}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </section>
  );
}
