const mainForm = document.querySelector(".main-form");
const listMovies = document.querySelector(".list-movies");

let allMovies = [];

let id = 1;

const getDataUser = () => {
  id++;
  const movie = {
    id: id,
    title: mainForm.movieTitle.value,
    genre: mainForm.movieGender.value,
    isBeen: mainForm.isBeen.checked,
  };

  allMovies.push(movie);
};

const createMovie = (movie) => {
  const movieMockup = document.createElement("article");
  movieMockup.className = "movie d-flex align-items-center px-2 py-1 rounded";

  const genreMovie = colorsByGenre(movie.genre);
  const isBeenMovie = movie.isBeen
    ? "bi bi-eye text-success"
    : "bi bi-eye-slash text-secondary";

  movieMockup.innerHTML = ` 
     
     <h2 class="movie__title fs-5 mb-0 me-2">${movie.title}</h2>

     <span class="movie__genre badge ${genreMovie} me-auto">${movie.genre}</span>

     <i class="icon isSeen-icon ${isBeenMovie} fs-3 "></i>
     <i class="icon delete-icon bi bi-trash fs-3 text-danger ms-2"></i>
  
  `;

  const iconEye = movieMockup.querySelector(".isSeen-icon");
  const iconTrash = movieMockup.querySelector(".delete-icon");

  iconEye.addEventListener("click", () => {
    changeSeenMovie(movie.id);
  });

  iconTrash.addEventListener("click", () => {
    deleteMovie(movie.id);
  });
  return movieMockup;
};

const printMovie = () => {
  listMovies.innerHTML = "";

  allMovies.forEach((m) => {
    const movieMockup = createMovie(m);
    listMovies.append(movieMockup);
  });
};

const colorsByGenre = (genre) => {
  if (genre === "Aventuras") {
    return "text-bg-info";
  } else if (genre === "Acción") {
    return "text-bg-light";
  } else if (genre === "Drama") {
    return "text-bg-dark";
  } else if (genre === "Terror") {
    return "text-bg-warning";
  }
};

const changeSeenMovie = (id) => {
  allMovies = allMovies.map((m) => {
    if (m.id === id) {
      return { ...m, isBeen: !m.isBeen };
    } else {
      return { ...m };
    }
  });

  printMovie();
};

const deleteMovie = (id) => {
  allMovies = allMovies.filter((item) => item.id !== id);

  printMovie();
};

const submit = (e) => {
  e.preventDefault();

  getDataUser();

  printMovie();

  mainForm.reset();
};

mainForm.addEventListener("submit", submit);
