import {apiBooksGetCollection} from "../../../src/api/book/book";

export default async function BooksPage() {
  const {data: books} = await apiBooksGetCollection({page: 1});

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Books</h1>
        <p className="mt-2 text-gray-600">Manage your book collection</p>
      </div>

      {!books?.member || books.member.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📚</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No books found</h3>
          <p className="text-gray-500">Get started by adding your first book to the collection.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {books.member.map((book) => (
            <div key={book.id}
                 className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{book.title || book.id}</h2>
              {book.author && (
                <p className="text-gray-600 mb-2">by {book.author}</p>
              )}
              {book.isbn && (
                <p className="text-sm text-gray-500 mb-2">ISBN: {book.isbn}</p>
              )}
              {book.publicationDate && (
                <p className="text-sm text-gray-500">
                  Published: {new Date(book.publicationDate).toLocaleDateString()}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
