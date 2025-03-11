# 🎵 LyricWiz Chrome Extension

A beautiful Chrome extension that instantly fetches and displays lyrics for songs you're listening to online.

## 📖 Overview

LyricWiz is a Chrome extension that automatically detects songs from your browser's tab title and displays their lyrics in a beautifully animated interface. Using the Genius API, it finds song details and displays formatted lyrics right in your browser.

![LyricWiz Demo](images/image(1).png)
![LyricWiz Demo](images/image(2).png)
![LyricWiz Demo](images/image(3).png)
![LyricWiz Demo](images/image(4).png)
![LyricWiz Demo](images/image(5).png)



## ✨ Features

- **Automatic Song Detection**: Extracts song titles from your current browser tab
- **Beautiful Blue-Themed UI**: Modern design with smooth animations and transitions
- **Rich Lyric Formatting**: Displays lyrics with proper spacing and rhythm
- **Animated Elements**: Floating music notes and smooth transitions
- **Direct Genius Link**: Easily view full details on Genius.com
- **API Key Management**: Save your Genius API key for future use

## 🚀 Installation

### From Chrome Web Store
*(Coming Soon)*

### Manual Installation
1. Clone this repository:
   ```
   git clone https://github.com/a9irudhh/lyricwiz-chrome.git
   ```
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the `lyricwiz-chrome` directory
5. The extension will appear in your Chrome toolbar

## 🔑 Getting a Genius API Key

1. Sign up for a Genius account at [genius.com](https://genius.com)
2. Visit [Genius API Clients](https://genius.com/api-clients) and create a new API client
3. Copy your generated Client Access Token
4. Paste the token into the LyricWiz extension settings

## 🎮 Usage

1. Navigate to a webpage with a song title in the tab (e.g., YouTube music video)
2. Click the LyricWiz extension icon in your toolbar
3. The extension will automatically detect the song title and display lyrics
4. Enjoy reading along with your music!

## 🔧 Technical Details

### Architecture
- **Popup Interface**: HTML/CSS/JavaScript UI that displays when clicking the extension icon
- **Genius API Integration**: Fetches song details using the Genius API
- **Web Scraping**: Retrieves lyrics from Genius.com pages
- **Chrome Extension API**: Accesses current tab information

### File Structure
- `popup.html`: Main extension interface
- popup.js: JavaScript logic for the extension
- `popup.css`: Styling with animations
- manifest.json: Extension configuration
- `assets/`: Images and icons

## 📝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgements

- [Genius API](https://docs.genius.com/) for providing song data
- [Chrome Extension API](https://developer.chrome.com/docs/extensions/) documentation

---

Made with🎵 by [Anirudh Hanchinamani ](https://github.com/a9irudhh)and [Pavan H Bhakta](https://github.com/bPavan16)

