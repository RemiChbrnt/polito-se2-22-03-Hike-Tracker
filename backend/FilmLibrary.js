function Film(id, title, favorite = false, watchdate, rating, user){
    this.id = id;
    this.title = title;
    this.favorite = favorite;
    this.watchdate = watchdate;
    (rating > 0 && rating < 6) ? this.rating = rating : this.rating = undefined;
    this.user = user;
}

function FilmLibrary(){
    this.films = [];

    this.addNewFilm = (film) => {
        this.films.push(film);
    }
}

module.exports = { FilmLibrary, Film };