const Parser = require('rss-parser');
const parser = new Parser();

const FEEDS = {
  "Washington Post - World": "https://feeds.washingtonpost.com/rss/world",
  "Washington Post - Tech": "https://feeds.washingtonpost.com/rss/technology",
  "Earth.com - All": "https://www.earth.com/feed/",
  "Nature - Environmental Sciences": "https://www.nature.com/subjects/environmental-sciences.rss",
  "WSJ - World News": "https://feeds.a.dj.com/rss/RSSWorldNews.xml",
  "NYT - Home": "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml",
  "NYT - Technology": "https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml"
};

async function fetchAllFeeds() {
  const container = document.getElementById("news-container");
  container.innerHTML = "<p>Loading news...</p>";

  container.innerHTML = ""; // Clear any previous content

  for (const [sourceName, url] of Object.entries(FEEDS)) {
    try {
      const feed = await parser.parseURL(url);
      const section = document.createElement("div");
      section.innerHTML = `<h2>${sourceName}</h2>`;

      feed.items.slice(0, 5).forEach(item => {
        const entry = document.createElement("div");
        entry.classList.add("article");
        entry.innerHTML = `
          <h3>${item.title}</h3>
          <p>${item.contentSnippet || ''}</p>
          <a href="${item.link}" target="_blank">Read more</a>
          <hr />
        `;
        section.appendChild(entry);
      });

      container.appendChild(section);
    } catch (err) {
      const errorSection = document.createElement("div");
      errorSection.innerHTML = `<h2>${sourceName}</h2><p style="color: red;">Failed to load feed.</p>`;
      container.appendChild(errorSection);
      console.error(`Failed to fetch ${sourceName}:`, err);
    }
  }
}

window.fetchNews = fetchAllFeeds;
