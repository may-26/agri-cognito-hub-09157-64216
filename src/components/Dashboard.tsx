import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Bug, TrendingUp, LogOut } from "lucide-react";
import { RiskAnalysis } from "@/components/RiskAnalysis";
import { DevelopmentAnalysis } from "@/components/DevelopmentAnalysis";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface DashboardProps {
  userName: string;
}

export const Dashboard = ({ userName }: DashboardProps) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast.success("Logout realizado com sucesso!");
      navigate("/");
    } catch (error: any) {
      console.error("Erro no logout:", error);
      toast.error("Erro ao fazer logout");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-primary text-primary-foreground py-6 px-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">AgroHUB AI</h1>
            <p className="text-primary-foreground/80">
              Análise Preditiva Agrícola | <span className="font-semibold">{userName}</span>
            </p>
          </div>
          <Button 
            onClick={handleLogout} 
            variant="outline" 
            className="bg-transparent border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <Tabs defaultValue="risk" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="risk" className="flex items-center gap-2">
              <Bug className="w-4 h-4" />
              Previsão de Risco
            </TabsTrigger>
            <TabsTrigger value="development" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Desenvolvimento
            </TabsTrigger>
          </TabsList>

          <TabsContent value="risk">
            <RiskAnalysis />
          </TabsContent>

          <TabsContent value="development">
            <DevelopmentAnalysis />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};
