import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [allPalettes, setAllPalettes] = useState([]);
  const [userPalettes, setUserPalettes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([
    "#ffffff",
    "#ffffff",
    "#ffffff",
  ]);
  const [paletteTitle, setPaletteTitle] = useState("");
  const [temperature, setTemperature] = useState("neutral");
  const [error, setError] = useState("");
  const [copyMessage, setCopyMessage] = useState("");

  const API_BASE_URL = "http://localhost:8080/api";

  const handleLogin = async (e) => {
    console.log("handleLogin fired");
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();

      //logging the response data from debugging
      console.log("response data:", data);

      if (data && data.id) {
        setUser(data);
        setIsLoggedIn(true);
        fetchAllPalettes();
        fetchUserPalettes(data.id);
      } else {
        console.log("no data received");
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      setError("Login failed. Please check your credentials.");
    }
  };

  const fetchAllPalettes = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/palettes`);

      if (!response.ok) {
        throw new Error("Failed to fetch palettes");
      }

      const data = await response.json();
      setAllPalettes(data || []);
    } catch (error) {
      console.error("Failed to fetch all palettes:", error);
    }
  };

  const fetchUserPalettes = async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}/palettes`);

      if (!response.ok) {
        throw new Error("Failed to fetch user palettes");
      }

      const data = await response.json();
      setUserPalettes(data || []);
    } catch (error) {
      console.error("Failed to fetch user palettes:", error);
    }
  };

  const handleColorChange = (index, color) => {
    const newColors = [...selectedColors];
    newColors[index] = color;
    setSelectedColors(newColors);
  };

  const createPalette = async (e) => {
    e.preventDefault();
    if (!user || !paletteTitle.trim()) return;

    try {
      const response = await fetch(
        `${API_BASE_URL}/users/${user.id}/palettes/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: paletteTitle,
            colors: selectedColors,
            temperature,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create palette");
      }

      const data = await response.json();

      if (data) {
        setUserPalettes([...userPalettes, data]);
        setAllPalettes([...allPalettes, data]);
        setPaletteTitle("");
        setSelectedColors(["#ffffff", "#ffffff", "#ffffff"]);
        setTemperature("neutral");
      }
    } catch (error) {
      console.error("Failed to create palette:", error);
    }
  };

  const generateRandomColor = () => {
    return (
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
    );
  };

  const randomizePalette = () => {
    setSelectedColors(
      Array(3)
        .fill()
        .map(() => generateRandomColor())
    );
  };

  const copyColorToClipboard = async (color) => {
    try {
      await navigator.clipboard.writeText(color);
      setCopyMessage(`Copied ${color}!`);
      setTimeout(() => setCopyMessage(""), 2000);
    } catch (error) {
      console.error("Failed to copy color:", error);
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = color;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopyMessage(`Copied ${color}!`);
      setTimeout(() => setCopyMessage(""), 2000);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <div className="login-form">
          <h2>Welcome to Palette Picker</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="error">{error}</div>}
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="left-section">
        <div className="all-palettes">
          <h3>All Palettes</h3>
          <div className="palettes-scroll">
            {allPalettes.map((palette, index) => (
              <div key={index} className="palette-card">
                <h4>{palette.title}</h4>
                <div className="palette-colors">
                  {palette.colors.map((color, colorIndex) => (
                    <div
                      key={colorIndex}
                      className="palette-color"
                      style={{ backgroundColor: color }}
                      title={`Click to copy ${color}`}
                      onClick={() => copyColorToClipboard(color)}
                    />
                  ))}
                </div>
                <div className="palette-info">
                  <span className="temperature">{palette.temperature}</span>
                  <div className="palette-meta">
                    <span className="creator">
                      by {palette.username || "Unknown"}
                    </span>
                    <span className="date">
                      {new Date(palette.date_made).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="right-section">
        <div className="palette-creator">
          <h3>Create New Palette</h3>
          <form onSubmit={createPalette}>
            <div className="color-picker">
              {selectedColors.map((color, index) => (
                <div key={index} className="color-input">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => handleColorChange(index, e.target.value)}
                  />
                  <span className="color-hex">{color}</span>
                </div>
              ))}
            </div>

            <div className="palette-controls">
              <button
                type="button"
                onClick={randomizePalette}
                className="randomize-btn"
              >
                Randomize Colors
              </button>

              <input
                type="text"
                placeholder="Palette Title"
                value={paletteTitle}
                onChange={(e) => setPaletteTitle(e.target.value)}
                required
              />

              <select
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
              >
                <option value="warm">Warm</option>
                <option value="cool">Cool</option>
                <option value="neutral">Neutral</option>
              </select>

              <button type="submit">Create Palette</button>
            </div>
          </form>
        </div>

        <div className="palettes-display">
          <h3>Your Palettes</h3>
          <div className="palettes-grid">
            {userPalettes.map((palette, index) => (
              <div key={index} className="palette-card">
                <h4>{palette.title}</h4>
                <div className="palette-colors">
                  {palette.colors.map((color, colorIndex) => (
                    <div
                      key={colorIndex}
                      className="palette-color"
                      style={{ backgroundColor: color }}
                      title={`Click to copy ${color}`}
                      onClick={() => copyColorToClipboard(color)}
                    />
                  ))}
                </div>
                <div className="palette-info">
                  <span className="temperature">{palette.temperature}</span>
                  <div className="palette-meta">
                    <span className="creator">
                      by {palette.username || "Unknown"}
                    </span>
                    <span className="date">
                      {new Date(palette.date_made).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {copyMessage && <div className="copy-notification">{copyMessage}</div>}
    </div>
  );
}

export default App;
