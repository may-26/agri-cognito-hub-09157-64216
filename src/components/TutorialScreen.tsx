import { Button } from "@/components/ui/button";
import { CloudSun, Bot, TrendingUp } from "lucide-react";

interface TutorialScreenProps {
  userName: string;
  onClose: () => void;
}

export const TutorialScreen = ({ userName, onClose }: TutorialScreenProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-hero">
      <div className="w-full max-w-2xl p-8 bg-card rounded-2xl shadow-lg animate-slide-up">
        <h2 className="text-3xl font-bold text-center mb-2 text-foreground">
          Bem-vindo(a), <span className="text-accent">{userName}</span>!
        </h2>
        <p className="text-center text-muted-foreground mb-8">
          Veja como funciona o AgroHUB AI
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="text-center p-6 bg-muted/30 rounded-xl">
            <CloudSun className="w-12 h-12 mx-auto mb-4 text-accent" />
            <h3 className="font-bold mb-2">Previsão de Risco</h3>
            <p className="text-sm text-muted-foreground">
              Insira os dados do tempo e monitoramento de campo para calcular o Índice de Risco de pragas e doenças.
            </p>
          </div>

          <div className="text-center p-6 bg-muted/30 rounded-xl">
            <Bot className="w-12 h-12 mx-auto mb-4 text-ai" />
            <h3 className="font-bold mb-2">Assistente AI</h3>
            <p className="text-sm text-muted-foreground">
              Use a análise com IA para tirar dúvidas, receber relatórios detalhados e sugestões.
            </p>
          </div>

          <div className="text-center p-6 bg-muted/30 rounded-xl">
            <TrendingUp className="w-12 h-12 mx-auto mb-4 text-success" />
            <h3 className="font-bold mb-2">Análise de Desenvolvimento</h3>
            <p className="text-sm text-muted-foreground">
              Acesse a aba separada para uma previsão sobre o crescimento, colheita e fatores de atraso.
            </p>
          </div>
        </div>

        <Button 
          onClick={onClose}
          className="w-full bg-accent hover:bg-accent/90"
          size="lg"
        >
          Começar
        </Button>
      </div>
    </div>
  );
};
