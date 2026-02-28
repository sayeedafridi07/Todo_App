import React, { useState } from "react";
import Background from "./components/Background";
import Foreground from "./components/Foreground";

const App = () => {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="relative w-full h-screen bg-zinc-100 dark:bg-zinc-800 transition-colors duration-300">
        <Background />
        <Foreground
          darkMode={darkMode}
          toggleDarkMode={() => setDarkMode((d) => !d)}
        />
      </div>
    </div>
  );
};

export default App;
