document.addEventListener("DOMContentLoaded", async () => {
  const titleElement = document.getElementById("website-title");
  const genius_api_input = document.getElementById("genius-api-input");
  const save_api_button = document.getElementById("save-api-button");
  const lyricsElement1 = document.getElementById("lyrics-container-1");
  const lyricsElement2 = document.getElementById("lyrics-container-2");
  const SongId = document.getElementById("songid-container");
  const APIKey = "hh4Tf0IbFQ0zyhm7ewxAA-2Z2qLqmyYpmjkHGJAKs_fdPVHz46VtZT4YKYQXbfXF"



  const fetchLyrics = async (title) => {
    const genius_api_key = localStorage.getItem("genius_api key");
    const url = `https://api.genius.com/search?q=${title}`;



    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${APIKey}`
      }
    });

    const data = await response.json();
    return data;

  };


  save_api_button.addEventListener("click", async () => {

    localStorage.setItem("genius_api_key", genius_api_input.value);

  });

  const fetchSongLyrics = async (songId) => {

    const genius_api_key = localStorage.getItem("genius_api")

    const url = `https://api.genius.com/songs/${songId}`

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${APIKey}`
      }
    });

    const data = await response.json();

    return data;

  }


  try {
    // Get current tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const title = tab.title || "No title found";
    const cleanTitle = title.split(" - ")[0].trim();

    titleElement.innerText = cleanTitle;

    genius_api_input.value = localStorage.getItem("genius_api_key");

    const data = await fetchLyrics(cleanTitle);

    const songId = data.response.hits[0].result.id;

    // console.log(lyrics);


    SongId.innerText = songId;

    const songData = await fetchSongLyrics(songId);

    const LyricUrl = songData.response.song.url;
    const SongArtist = songData.response.song.primary_artist.name;
    const SongTitle = songData.response.song.title;
    const SongLyrics = songData.response.song.lyrics;


    lyricsElement1.innerHTML = `<h2>${SongTitle}</h2> <h3>${SongArtist}</h3> <p>${SongLyrics}</p>`;


    lyricsElement2.innerHTML = `<a href="${LyricUrl}" target="_blank"> <button>View Lyrics</button> </a>`;



  } catch (error) {
    console.error('Error:', error);
  }

});


