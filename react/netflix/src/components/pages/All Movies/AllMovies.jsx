import MovieCard from "../../MovieCard"

function AllMovies(){
    const response={
    "movies": [
            {
            "id": 1,
            "title": "Inception",
            "year": 2010,
            "genre": ["Sci-Fi", "Action"],
            "director": "Christopher Nolan"
            },
            {
            "id": 2,
            "title": "The Dark Knight",
            "year": 2008,
            "genre": ["Action", "Crime"],
            "director": "Christopher Nolan"
            },
            {
            "id": 3,
            "title": "Interstellar",
            "year": 2014,
            "genre": ["Sci-Fi", "Drama"],
            "director": "Christopher Nolan"
            },
            {
            "id": 4,
            "title": "The Matrix",
            "year": 1999,
            "genre": ["Sci-Fi", "Action"],
            "director": "The Wachowskis"
            },
            {
            "id": 5,
            "title": "Avatar",
            "year": 2009,
            "genre": ["Sci-Fi", "Adventure"],
            "director": "James Cameron"
            },
            {
            "id": 6,
            "title": "Titanic",
            "year": 1997,
            "genre": ["Romance", "Drama"],
            "director": "James Cameron"
            },
            {
            "id": 7,
            "title": "Gladiator",
            "year": 2000,
            "genre": ["Action", "Drama"],
            "director": "Ridley Scott"
            },
            {
            "id": 8,
            "title": "The Shawshank Redemption",
            "year": 1994,
            "genre": ["Drama"],
            "director": "Frank Darabont"
            },
            {
            "id": 9,
            "title": "Forrest Gump",
            "year": 1994,
            "genre": ["Drama", "Romance"],
            "director": "Robert Zemeckis"
            },
            {
            "id": 10,
            "title": "The Lord of the Rings: The Fellowship of the Ring",
            "year": 2001,
            "genre": ["Fantasy", "Adventure"],
            "director": "Peter Jackson"
            }
        ]
}
    return(
    <>
    <h1>All Movies</h1>
    <div style={{display:"flex",flexWrap:"wrap"}}>
    {
        response.movies.map((movie)=>(
            
                <MovieCard key={movie.id} 
                movie_name={movie.title} 
                year={movie.year} 
                genre={movie.genre}
                director={movie.director}/>
            
        ))
    }
    </div>
    </>
    )
}

export default AllMovies