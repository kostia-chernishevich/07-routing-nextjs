"use client";
import { useRouter } from "next/navigation";
import css from "./Modal.module.css";

export default function NoteModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const close = () => router.back();

  return (
    <div className={css.overlay} onClick={close}>
      <div className={css.content} onClick={(e) => e.stopPropagation()}>
        {children}
        <button onClick={close}>Close</button>
      </div>
    </div>
  );
}
