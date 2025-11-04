"use client";

import css from "../page.module.css";
import { Pagination } from "@/components/Pagination/Pagination";
import { NoteList } from "@/components/NoteList/NoteList";
import { Modal } from "@/components/Modal/Modal";
import { NoteForm } from "@/components/NoteForm/NoteForm";
import { SearchBox } from "@/components/SearchBox/SearchBox";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../lib/api";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";

export default function NotesClient() {
  const perPage = 12;
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setPage(1), [debouncedSearch]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page, perPage, debouncedSearch],
    queryFn: () => fetchNotes({ page, perPage, search: debouncedSearch }),
    placeholderData: (prev) => prev,
    refetchOnMount: false, 
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const totalPages = data?.totalPages ?? 1;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={setSearch} />
        <button onClick={openModal} className={css.button}>
          Create note +
        </button>
        {totalPages > 1 && (
          <Pagination page={page} totalPages={totalPages} onChangePage={setPage} />
        )}
      </header>

      {data?.notes?.length ? (
        <NoteList notes={data.notes} isLoading={isLoading} isError={isError} />
      ) : (
        !isLoading && <p>No notes found.</p>
      )}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}

      <Toaster position="top-center" />
    </div>
  );
}
