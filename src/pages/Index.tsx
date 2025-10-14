import { useState } from "react";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { TutorialScreen } from "@/components/TutorialScreen";
import { Dashboard } from "@/components/Dashboard";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<"welcome" | "tutorial" | "dashboard">("welcome");
  const [userName, setUserName] = useState("");

  const handleStartApp = (name: string) => {
    setUserName(name);
    setCurrentScreen("tutorial");
  };

  const handleCloseTutorial = () => {
    setCurrentScreen("dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      {currentScreen === "welcome" && (
        <WelcomeScreen onStart={handleStartApp} />
      )}
      {currentScreen === "tutorial" && (
        <TutorialScreen userName={userName} onClose={handleCloseTutorial} />
      )}
      {currentScreen === "dashboard" && (
        <Dashboard userName={userName} />
      )}
    </div>
  );
};

export default Index;
