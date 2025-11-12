import React, { useEffect, useState } from "react";
import "./LatestNews.css";

import welding1 from "../assets/welding1.jpg";
import welding2 from "../assets/welding2.jpg";
import welding3 from "../assets/welding3.jpg";
import welding4 from "../assets/welding4.jpg";

const images = [welding1, welding2, welding3, welding4];

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
        {news.map((item, idx) => (
          <div
            key={item.id}
            className="news-card"
            style={{ backgroundImage: `url(${images[idx % images.length]})` }}
          >
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
