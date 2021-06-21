const d = document,
  $form = d.getElementById("searchSong"),
  $loader = d.querySelector(".loader"),
  $error = d.querySelector(".error"),
  $main = d.querySelector("main"),
  $artist = d.querySelector(".artist"),
  $song = d.querySelector(".song");

$form.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    $loader.style.display = "block";
    let artist = e.target.artist.value.toLowerCase(),
      song = e.target.song.value.toLowerCase(),
      $artistTemplate = "",
      $songTemplate = "",
      artistApi = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artist}`,
      songApi = `https://api.vagalume.com.br/search.php?apikey=660a4395f992ff67786584e238f501aa&art=${artist}&mus=${song}`,
      artistFetch = fetch(artistApi),
      songFetch = fetch(songApi),
      [artistRes, songRes] = await Promise.all([artistFetch, songFetch]),
      artistData = await artistRes.json(),
      songData = await songRes.json();

    console.log(artistData, songData);
    if (songData.type === "song_notfound") {
      $songTemplate = /*html*/ `<h2>la cancion no existe</h2>`;
    } else {
      let lyrics = songData.mus[0];
      $songTemplate = /*html*/ `
        <h2>${lyrics.name.toUpperCase()}</h2>
        <blockquote>${lyrics.text}</blockquote>
      `;
    }
    if (artistData.artists === null) {
      $artistTemplate = /*html*/ `<h2>no existe el artista</h2>`;
    } else {
      let artist = artistData.artists[0];
      $artistTemplate = /*html*/ `
        <h2>${artist.strArtist.toUpperCase()}</h2>
        <img src="${artist.strArtistThumb}"/>
        <p>
          ${artist.intBornYear || "no tiene"} - ${
        artist.intDiedYear || "Presente"
      }
        </p>
        <p>${artist.strCountry}</p>
        <p>${artist.strGenre} - ${artist.strStyle}</p>
        <a href="http://${artist.strWebsite}" target="_blank">Sitio Web</a>
        <p>${artist.strBiographyEN}</p>
      `;
    }

    $loader.style.display = "none";
    $artist.innerHTML = $artistTemplate;
    $song.innerHTML = $songTemplate;
  } catch (err) {
    console.error(err);
    let message = err.statusText || "ocurrio un error";
    $error.innerHTML = `${err.status}: ${message}`;
    $loader.style.display = "none";
  }
});
