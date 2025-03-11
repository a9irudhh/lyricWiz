document.addEventListener("DOMContentLoaded", async () => {
  const titleElement = document.getElementById("website-title");
  const genius_api_input = document.getElementById("genius-api-input");
  const save_api_button = document.getElementById("save-api-button");
  const lyricsElement1 = document.getElementById("lyrics-container-1");
  const lyricsElement2 = document.getElementById("lyrics-container-2");
  const songIdElement = document.getElementById("songid-container");

  const storedApiKey = localStorage.getItem("genius_api_key");
  genius_api_input.value = storedApiKey || "hh4Tf0IbFQ0zyhm7ewxAA-2Z2qLqmyYpmjkHGJAKs_fdPVHz46VtZT4YKYQXbfXF";

  const fetchLyrics = async (title) => {
    const genius_api_key = localStorage.getItem("genius_api_key");
    console.log("Using API Key:", genius_api_key);
    console.log("Fetching lyrics for title:", title);

    const url = `https://api.genius.com/search?q=${encodeURIComponent(title)}`;

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${genius_api_key}`
        }
      });

      const data = await response.json();
      console.log("Fetched Lyrics Data:", data);
      return data;
    } catch (error) {
      console.error("Error fetching lyrics:", error);
      return null;
    }
  };

  const fetchSongDetails = async (songId) => {
    const genius_api_key = localStorage.getItem("genius_api_key");
    const url = `https://api.genius.com/songs/${songId}`;

    console.log("Fetching song details for ID:", songId);

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${genius_api_key}`
        }
      });

      const data = await response.json();
      console.log("Fetched Song Details:", data);
      return data;
    } catch (error) {
      console.error("Error fetching song details:", error);
      return null;
    }
  };

  const scrapeLyricsFromGenius = async (geniusUrl) => {
    console.log("Fetching Genius page:", geniusUrl);

    try {
      const response = await fetch(geniusUrl);
      const htmlText = await response.text();

      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, "text/html");

      // Select all divs with the correct class for lyrics
      const lyricsDivs = doc.querySelectorAll("div.Lyrics-sc-7c7d0940-1.gVRfzh");

      if (lyricsDivs.length === 0) {
        console.warn("Lyrics not found on Genius page.");
        return "Lyrics not available.";
      }

      // Extract text from all found divs and join them with line breaks
      let lyrics = Array.from(lyricsDivs)
        .map(div => div.innerText.trim()) // Get text, trim spaces
        .join("\n\n"); // Add spacing between verses

      return lyrics;
    } catch (error) {
      console.error("Error scraping lyrics:", error);
      return "Failed to load lyrics.";
    }
  };

  save_api_button.addEventListener("click", () => {
    localStorage.setItem("genius_api_key", genius_api_input.value);
    console.log("Saved API Key:", genius_api_input.value);
  });

  try {
    // Get current tab title
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const title = tab.title || "No title found";
    const cleanTitle = title.split(" - ")[0].trim();

    titleElement.innerText = cleanTitle;
    console.log("Detected song title:", cleanTitle);

    const data = await fetchLyrics(cleanTitle);
    if (!data || !data.response.hits.length) {
      console.warn("No song found for:", cleanTitle);
      lyricsElement1.innerHTML = "<p>No lyrics found.</p>";
      return;
    }

    const songId = data.response.hits[0].result.id;
    songIdElement.innerText = `Song ID: ${songId}`;
    console.log("Fetched Song ID:", songId);

    const songData = await fetchSongDetails(songId);
    if (!songData || !songData.response.song) {
      console.warn("Song details not available.");
      return;
    }

    const { url: lyricUrl, primary_artist, title: songTitle } = songData.response.song;
    const songArtist = primary_artist.name;

    lyricsElement1.innerHTML = `<h2>${songTitle}</h2> <h3>${songArtist}</h3>`;
    lyricsElement2.innerHTML = `<a href="${lyricUrl}" target="_blank"> <button>View Lyrics on Genius</button> </a>`;

    console.log("Lyrics URL:", lyricUrl);

    // **Scrape lyrics from Genius page**
    const scrapedLyrics = await scrapeLyricsFromGenius(lyricUrl);
    lyricsElement1.innerHTML += `<p>${scrapedLyrics.replace(/\n/g, "<br>")}</p>`;

  } catch (error) {
    console.error("Error in main execution:", error);
  }
});
