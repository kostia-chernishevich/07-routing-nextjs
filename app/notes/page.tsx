import { redirect } from "next/navigation";

export default function NotesRedirectPage() {
  redirect("/notes/filter/all");
}