import { useEffect, useState } from "react";

function AdminMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/messages")
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.log(err));
  }, []);

  const deleteMessage = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this message?");
    if (!confirmDelete) return;

    await fetch(`http://localhost:5000/messages/${id}`, { method: "DELETE" });

    setMessages(messages.filter((message) => message.id !== id));
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
          <button
            onClick={handleLogout}
            style={{
              padding: "8px 14px",
              borderRadius: "6px",
              background: "#ff4d4d",
              border: "none",
              cursor: "pointer",
              color: "white",
              fontWeight: "bold"
            }}
          >
            Logout
          </button>
        </div>

        {messages.length === 0 ? (
          <p style={{ marginTop: "20px", textAlign: "center", opacity: 0.7 }}>
            No messages yet.
          </p>
        ) : (
          <table style={{ width: "100%", marginTop: "25px", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#3c3c3c" }}>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Message</th>
                <th style={thStyle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr key={msg.id} style={{ borderBottom: "1px solid #444" }}>
                  <td style={tdStyle}>{msg.name}</td>
                  <td style={tdStyle}>{msg.email}</td>
                  <td style={tdStyle}>{msg.message}</td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => deleteMessage(msg.id)}
                      style={{
                        padding: "6px 12px",
                        borderRadius: "6px",
                        background: "#ff7b00",
                        border: "none",
                        cursor: "pointer",
                        color: "black",
                        fontWeight: "bold"
                      }}
                    >
                      Delete
                    </button>
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

const thStyle = {
  padding: "12px",
  textAlign: "left",
  borderBottom: "2px solid #555"
};

const tdStyle = {
  padding: "12px",
  verticalAlign: "top"
};

export default AdminMessages;
