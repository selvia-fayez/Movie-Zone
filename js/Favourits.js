// let movies;
//     const add2Fav = (movie) => {
//          movies = localStorage.getItem("favMovies")
//     ? JSON.parse(localStorage.getItem("favMovies"))
//     : [];
//   const movieIndex = movies.findIndex((m) => m.id == movie.id);//movie ده الفيلم ال دوست عليه
//   if (movieIndex >= 0) {
//     alert("movie already exist in your fav");
//     return true;
//   }
//   movies.push(movie);
//   movies = JSON.stringify(movies);
//   localStorage.setItem("favMovies", movies);
//       };
//       console.log(movies);
function getCart() {
  let cart = JSON.parse(localStorage.getItem("cart"));
  console.log(cart);
  let cartona = ``;
  for (let i = 0; i < cart.length; i++) {
    cartona += `
        <div style="margin-top:50px;">
            <div style="float:left; width:30%; height:500px; "  >
                <img src="https://image.tmdb.org/t/p/w500${cart[i].poster_path}" style="height:450px; margin-left:100px; "/>
            </div>
            <div style="float:right; width:65%; height:500px; " class="MovieInfo">
                <h2>${cart[i].title}</h2><br>
                <lable>Overview: </lable><p>${cart[i].overview}</p><br>
                <lable>Raing: ${cart[i].vote_average} </lable><br><br>
                <lable>Release: ${cart[i].release_date}</lable> 
            </div>    
                 
        </div>
        `;
  }
  document.getElementById("body").innerHTML = cartona;
}

function EmptyFav() {
  localStorage.removeItem("cart");
}
