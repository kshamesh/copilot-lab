import { PostManagement } from "./components/PostManagement";
import { API_CONFIG } from "./config/apiConfig";
import "./App.css";

function App() {
  const getApiLabel = () => {
    if (API_CONFIG.baseUrl === "http://localhost:3000") {
      return "📦 json-server (local db.json)";
    }
    if (API_CONFIG.baseUrl === "https://jsonplaceholder.typicode.com") {
      return "🌐 JSONPlaceholder (fallback)";
    }
    return `🔗 ${API_CONFIG.baseUrl}`;
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Post Management Dashboard</h1>
        <p className="api-info">API: {getApiLabel()}</p>
      </header>

      <main className="app-main">
        <PostManagement />
      </main>
    </div>
  );
}

export default App;
