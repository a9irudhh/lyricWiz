document.addEventListener("DOMContentLoaded", async () => {
  const titleElement = document.getElementById("website-title");
  const genius_api_input = document.getElementById("genius-api-input");
  const save_api_button = document.getElementById("save-api-button");

  save_api_button.addEventListener("click", async () => {

    localStorage.setItem("genius_api_key", genius_api_input.value);


  });

  try {
    // Get current tab

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const title = tab.title || "No title found";
    titleElement.innerText = title;


    genius_api_input.value = localStorage.getItem("genius_api_key");







  } catch (error) {
    console.error('Error:', error);
  }

});

