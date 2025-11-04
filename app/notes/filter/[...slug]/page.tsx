import { fetchNotes } from "@/lib/api";

interface TagPageProps {
  params: {
    tag?: string[];
  };
}

const TagPage = async ({ params }: TagPageProps) => {
  const tag = params.tag?.[0] || "all";

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
