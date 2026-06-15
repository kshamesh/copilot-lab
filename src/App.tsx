import { PostManagement } from "./components/PostManagement";
import { API_CONFIG } from "./config/apiConfig";
import "./App.css";

function App() {
  const getEnvironmentBadge = () => {
    const badges: Record<string, { label: string; color: string }> = {
      devlocal: { label: "📦 Local", color: "#27ae60" },
      development: { label: "🔵 Dev", color: "#3498db" },
      qa: { label: "🟡 QA", color: "#f39c12" },
      uat: { label: "🟣 UAT", color: "#9b59b6" },
      production: { label: "🔴 Production", color: "#e74c3c" },
    };

    const badge = badges[API_CONFIG.env] || {
      label: "Unknown",
      color: "#95a5a6",
    };

    return (
      <span style={{ color: badge.color, fontWeight: "bold" }}>
        {badge.label}
      </span>
    );
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Post Management Dashboard</h1>
        <div className="api-info">
          <p>Environment: {getEnvironmentBadge()}</p>
          <p style={{ fontSize: "12px", color: "#7f8c8d", marginTop: "5px" }}>
            API: {API_CONFIG.baseUrl}
          </p>
        </div>
      </header>

      <main className="app-main">
        <PostManagement />
      </main>
    </div>
  );
}

export default App;
