function MovieCard(props){ //MovieCard({name,year})  <h3>{name}</h3> <span>{year}</span>
    return(
        <div style={{border:"1px solid black",borderRadius:"8px",width:"fit-content",height:"fit-content",padding:"10px",margin:"20px"}}>
            <h3>{props.movie_name}</h3>
            <div>{props.year}</div>
            <div>{props.genre}</div>
            <div>{props.director}</div>
        </div>
    )
}

export default MovieCard