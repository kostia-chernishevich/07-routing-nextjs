import { fetchNotes } from "@/lib/api";

interface TagPageProps {
  params: Promise<{
    tag?: string[];
  }>;
}

const TagPage = async ({ params }: TagPageProps) => {
  const resolvedParams = await params; // розгортаємо проміс
  const tag = resolvedParams.tag?.[0] || "all"; // тепер використовуємо розгорнуте значення

  const { notes } = await fetchNotes({
    page: 1,
    perPage: 12,
    search: "",
    tag: tag === "all" ? undefined : tag,
  });

  return (
    <div>
      <h1>Tag: {tag}</h1>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TagPage;
