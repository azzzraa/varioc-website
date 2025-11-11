import { useEffect, useState } from "react";

function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [filterEmail, setFilterEmail] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({ name: "", email: "", message: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const [news, setNews] = useState([]);
  const [newsTitle, setNewsTitle] = useState("");
  const [newsLink, setNewsLink] = useState("");


  // Fetch messages from backend with filters & sorting
  const loadMessages = () => {
    const query = new URLSearchParams({
      name: filterName,
      email: filterEmail,
      sortBy,
      order,
    }).toString();

    fetch(`http://localhost:5000/messages?${query}`)
      .then(res => res.json())
      .then(data => setMessages(data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    loadMessages();
  }, [filterName, filterEmail, sortBy, order]);

  // Load all news
const loadNews = () => {
  fetch("http://localhost:5000/news")
    .then(res => res.json())
    .then(data => setNews(data))
    .catch(err => console.error("Napaka pri nalaganju novic:", err));
};

// Add a new news item
const addNews = async () => {
  if (!newsTitle.trim()) return alert("Vnesite naslov novice");
  
  await fetch("http://localhost:5000/news", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: newsTitle, link: newsLink }),
  });

  setNewsTitle("");
  setNewsLink("");
  loadNews();
};

// Delete a news item
const deleteNews = async (id) => {
  if (!window.confirm("Želite izbrisati to novico?")) return;
  await fetch(`http://localhost:5000/news/${id}`, { method: "DELETE" });
  loadNews();
};


  // Delete a message
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    await fetch(`http://localhost:5000/messages/${id}`, { method: "DELETE" });
    setMessages(messages.filter(msg => msg.id !== id));
  };

  // Start editing a row
  const startEdit = (msg) => {
    setEditingId(msg.id);
    setEditValues({ name: msg.name, email: msg.email, message: msg.message });
    setErrorMsg("");
  };

  // Validate before saving
  const validate = () => {
    if (!editValues.name.trim() || !editValues.email.trim() || !editValues.message.trim()) {
      setErrorMsg("All fields are required.");
      return false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(editValues.email)) {
      setErrorMsg("Invalid email address.");
      return false;
    }
    setErrorMsg("");
    return true;
  };

  // Save edits to backend
  const saveEdit = async (id) => {
    if (!validate()) return;

    await fetch(`http://localhost:5000/messages/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editValues),
    });

    setEditingId(null);
    loadMessages();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditValues(prev => ({ ...prev, [name]: value }));
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    window.location.href = "/login";
  };

  return (
    <div style={{ minHeight: "100vh", background: "#1a1a1a", padding: "40px", color: "white" }}>
      <div style={{
        maxWidth: "900px",
        margin: "0 auto",
        background: "#2b2b2b",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 0 15px rgba(0,0,0,0.5)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2>📩 Contact Form Messages</h2>
          <button onClick={handleLogout} style={buttonStyleLogout}>Logout</button>
        </div>

        {/* Filter Inputs */}
        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          <input
            placeholder="Filter by name"
            value={filterName}
            onChange={e => setFilterName(e.target.value)}
            style={inputStyle}
          />
          <input
            placeholder="Filter by email"
            value={filterEmail}
            onChange={e => setFilterEmail(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* Show validation error */}
        {errorMsg && <p style={{ color: "#ff4d4d", marginTop: "10px" }}>{errorMsg}</p>}

        {/* Messages Table */}
        {messages.length === 0 ? (
          <p style={{ marginTop: "20px", textAlign: "center", opacity: 0.7 }}>No messages yet.</p>
        ) : (
          <table style={{ width: "100%", marginTop: "25px", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#3c3c3c" }}>
                <th style={thStyle} onClick={() => { setSortBy("name"); setOrder(order === "asc" ? "desc" : "asc"); }}>Name</th>
                <th style={thStyle} onClick={() => { setSortBy("email"); setOrder(order === "asc" ? "desc" : "asc"); }}>Email</th>
                <th style={thStyle}>Message</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map(msg => (
                <tr key={msg.id} style={{
                  borderBottom: "1px solid #444",
                  backgroundColor: editingId === msg.id ? "#444422" : "transparent" // highlight edited row
                }}>
                  <td style={tdStyle}>
                    {editingId === msg.id ? (
                      <input name="name" value={editValues.name} onChange={handleChange} style={inputTableStyle}/>
                    ) : msg.name}
                  </td>
                  <td style={tdStyle}>
                    {editingId === msg.id ? (
                      <input name="email" value={editValues.email} onChange={handleChange} style={inputTableStyle}/>
                    ) : msg.email}
                  </td>
                  <td style={tdStyle}>
                    {editingId === msg.id ? (
                      <input name="message" value={editValues.message} onChange={handleChange} style={inputTableStyle}/>
                    ) : msg.message}
                  </td>
                  <td style={tdStyle}>
                    {editingId === msg.id ? (
                      <>
                        <button onClick={() => saveEdit(msg.id)} style={buttonStyleSave}>Save</button>
                        <button onClick={() => setEditingId(null)} style={buttonStyleCancel}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => startEdit(msg)} style={buttonStyleEdit}>Edit</button>
                        <button onClick={() => handleDelete(msg.id)} style={buttonStyleDelete}>Delete</button>
                      </>
                    )}
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
const thStyle = { padding: "12px", textAlign: "left", borderBottom: "2px solid #555", cursor: "pointer" };
const tdStyle = { padding: "12px", verticalAlign: "top" };
const inputStyle = { padding: "6px", borderRadius: "6px", border: "none", flex: 1 };
const inputTableStyle = { width: "100%", padding: "6px", borderRadius: "6px", border: "none", background: "#444", color: "white" };
const buttonStyleEdit = { padding: "6px 12px", borderRadius: "6px", background: "#ffcc00", border: "none", cursor: "pointer", color: "black", fontWeight: "bold", marginRight: "5px" };
const buttonStyleDelete = { padding: "6px 12px", borderRadius: "6px", background: "#ff7b00", border: "none", cursor: "pointer", color: "black", fontWeight: "bold" };
const buttonStyleSave = { padding: "6px 12px", borderRadius: "6px", background: "#00cc66", border: "none", cursor: "pointer", color: "black", fontWeight: "bold" };
const buttonStyleCancel = { padding: "6px 12px", borderRadius: "6px", background: "#888888", border: "none", cursor: "pointer", color: "white", fontWeight: "bold", marginLeft: "5px" };
const buttonStyleLogout = { padding: "8px 14px", borderRadius: "6px", background: "#ff4d4d", border: "none", cursor: "pointer", color: "white", fontWeight: "bold" };

export default AdminMessages;
