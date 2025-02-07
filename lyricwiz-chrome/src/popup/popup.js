document.addEventListener("DOMContentLoaded", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    document.querySelector("h2").innerText = tab.title || "No title found";
  });
  