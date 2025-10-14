import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sprout, Sun } from "lucide-react";

interface WelcomeScreenProps {
  onStart: (name: string) => void;
}

export const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  const [name, setName] = useState("João Silva");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onStart(name.trim());
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-hero">
      <div className="w-full max-w-md p-8 bg-card rounded-2xl shadow-lg animate-slide-up">
        <div className="flex justify-center mb-6 space-x-4 text-6xl">
          <Sprout className="text-accent animate-grow" />
          <Sun className="text-warning animate-spin" style={{ animationDuration: '10s' }} />
        </div>
        
        <h1 className="text-4xl font-bold text-center mb-2 text-foreground">
          AgroHUB AI
        </h1>
        <p className="text-center text-muted-foreground mb-8">
          A inteligência artificial a serviço da sua colheita.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="userName">Seu Nome/Fazenda:</Label>
            <Input
              id="userName"
              type="text"
              placeholder="Ex: Fazenda Esperança"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-accent hover:bg-accent/90 animate-pulse-glow"
            size="lg"
          >
            Entrar no App
          </Button>
        </form>
      </div>
    </div>
  );
};
