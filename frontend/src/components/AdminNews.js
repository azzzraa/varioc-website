import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminNews() {
  const [newsList, setNewsList] = useState([]);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [date, setDate] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  // Load all news from backend
  const loadNews = () => {
    fetch("http://localhost:5000/news")
      .then(res => res.json())
      .then(data => setNewsList(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    loadNews();
  }, []);

  // Add new news
  const handleAddNews = async () => {
    if (!title.trim()) {
      setErrorMsg("Title is required.");
      return;
    }
    const newsData = { title, link, date: date || new Date().toISOString() };

    try {
      const res = await fetch("http://localhost:5000/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newsData),
      });
      const result = await res.json();
      if (result.success) {
        setTitle("");
        setLink("");
        setDate("");
        setErrorMsg("");
        loadNews();
      } else {
        setErrorMsg("Failed to add news.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Error adding news.");
    }
  };

  // Delete news
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this news item?")) return;
    await fetch(`http://localhost:5000/news/${id}`, { method: "DELETE" });
    loadNews();
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  return (
    <div style={{ padding: "40px", minHeight: "100vh", background: "#1a1a1a", color: "white" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>📰 Manage News</h2>
        <div>
          <button
            onClick={() => navigate("/")}
            style={{ ...buttonStyleAdd, background: "#888888", marginRight: "10px" }}
          >
            Back to Home
          </button>
          <button onClick={handleLogout} style={buttonStyleDelete}>Logout</button>
        </div>
      </div>

      <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", maxWidth: "500px" }}>
        {errorMsg && <p style={{ color: "#ff4d4d" }}>{errorMsg}</p>}

        <input
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          style={inputStyle}
        />
        <input
          placeholder="Link (optional)"
          value={link}
          onChange={e => setLink(e.target.value)}
          style={inputStyle}
        />
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          style={inputStyle}
        />
        <button onClick={handleAddNews} style={buttonStyleAdd}>Add News</button>
      </div>

      <div style={{ marginTop: "40px" }}>
        {newsList.length === 0 ? (
          <p>No news yet.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #555" }}>
                <th style={thStyle}>Title</th>
                <th style={thStyle}>Link</th>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {newsList.map(item => (
                <tr key={item.id} style={{ borderBottom: "1px solid #444" }}>
                  <td style={tdStyle}>{item.title}</td>
                  <td style={tdStyle}>
                    {item.link ? <a href={item.link} target="_blank" rel="noopener noreferrer">{item.link}</a> : "-"}
                  </td>
                  <td style={tdStyle}>{new Date(item.date).toLocaleDateString()}</td>
                  <td style={tdStyle}>
                    <button onClick={() => handleDelete(item.id)} style={buttonStyleDelete}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// --- Styles ---
const inputStyle = { padding: "8px", marginBottom: "10px", borderRadius: "6px", border: "none" };
const buttonStyleAdd = { padding: "8px 14px", borderRadius: "6px", background: "#00cc66", border: "none", cursor: "pointer", color: "black", fontWeight: "bold" };
const buttonStyleDelete = { padding: "4px 10px", borderRadius: "6px", background: "#ff4d4d", border: "none", cursor: "pointer", color: "white", fontWeight: "bold" };
const thStyle = { textAlign: "left", padding: "12px" };
const tdStyle = { padding: "12px" };

export default AdminNews;
