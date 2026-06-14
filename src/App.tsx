import { useState } from "react";
import { CustomerManagement } from "./components/CustomerManagement";
import { PostManagement } from "./components/PostManagement";
import "./App.css";

type View = "customers" | "posts";

function App() {
  const [activeView, setActiveView] = useState<View>("customers");

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Data Management Dashboard</h1>
        <nav className="app-nav">
          <button
            className={`nav-button ${activeView === "customers" ? "active" : ""}`}
            onClick={() => setActiveView("customers")}
          >
            Customers
          </button>
          <button
            className={`nav-button ${activeView === "posts" ? "active" : ""}`}
            onClick={() => setActiveView("posts")}
          >
            Posts
          </button>
        </nav>
      </header>

      <main className="app-main">
        {activeView === "customers" && <CustomerManagement />}
        {activeView === "posts" && <PostManagement />}
      </main>
    </div>
  );
}

export default App;
