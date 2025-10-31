import { apiBooksGetCollection } from "../../src/api/book/book";

export default async function Page() {
  const response = await apiBooksGetCollection();

  if (response.status !== 200) {
    return <div>Error loading books</div>;
  }

  const books = response.data["hydra:member"] || [];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Books</h1>
      {books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <ul className="space-y-4">
          {books.map((book) => (
            <li key={book.id} className="border p-4 rounded">
              <h2 className="text-xl font-semibold">{book.title}</h2>
              {book.author && <p className="text-gray-600">by {book.author}</p>}
              {book.isbn && <p className="text-sm text-gray-500">ISBN: {book.isbn}</p>}
              {book.publicationDate && (
                <p className="text-sm text-gray-500">
                  Published: {new Date(book.publicationDate).toLocaleDateString()}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
