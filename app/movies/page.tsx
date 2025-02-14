import { createClient } from '@/utils/supabase/server';

export default async function Movies() {
  const supabase = await createClient();
  const { data: movies } = await supabase
    .from("movies")
    .select(`
      *,
      ratings (
        rating,
        comment
      )
    `);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Movies</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {movies?.map((movie) => (
          <div 
            key={movie.id} 
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
            {movie.description && (
              <p className="text-gray-600 mb-2">{movie.description}</p>
            )}
            {movie.release_year && (
              <p className="text-sm text-gray-500">Released: {movie.release_year}</p>
            )}
            <div className="mt-4">
              <h3 className="font-medium">Ratings</h3>
              {movie.ratings && movie.ratings.length > 0 ? (
                <div className="space-y-2">
                  {movie.ratings.map((rating, index) => (
                    <div key={index} className="text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Rating: {rating.rating}/5</span>
                      </div>
                      {rating.comment && (
                        <p className="text-gray-600">{rating.comment}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No ratings yet</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 