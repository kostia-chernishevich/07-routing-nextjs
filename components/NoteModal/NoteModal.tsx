"use client";
import { useRouter } from "next/navigation";


export default function NoteModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const close = () => router.back();

  return (
    <div  onClick={close}>
      <div  onClick={(e) => e.stopPropagation()}>
        {children}
        <button onClick={close}>Close</button>
      </div>
    </div>
  );
}
