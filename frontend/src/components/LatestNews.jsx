import React, { useEffect, useState } from "react";
import "./LatestNews.css"; 

function LatestNews() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/news")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setNews(data);
        else setNews([]);
      })
      .catch(err => {
        console.error("Error fetching news:", err);
        setNews([]);
      });
  }, []);

  if (news.length === 0) {
    return <p style={{ textAlign: "center", marginTop: "20px" }}>📰 Ni novic trenutno.</p>;
  }

  return (
    <section className="news-section">
      <h2>📰 Zadnje novice</h2>
      <div className="news-cards">
        {news.map(item => (
          <div key={item.id} className="news-card">
            <h3>{item.title}</h3>
            <p>{new Date(item.date).toLocaleDateString()}</p>
            {item.link && <a href={item.link} target="_blank" rel="noopener noreferrer">Preberi več →</a>}
          </div>
        ))}
      </div>
    </section>
  );
}

export default LatestNews;
