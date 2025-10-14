import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bug, TrendingUp } from "lucide-react";
import { RiskAnalysis } from "@/components/RiskAnalysis";
import { DevelopmentAnalysis } from "@/components/DevelopmentAnalysis";

interface DashboardProps {
  userName: string;
}

export const Dashboard = ({ userName }: DashboardProps) => {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-primary text-primary-foreground py-6 px-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">AgroHUB AI</h1>
          <p className="text-primary-foreground/80">
            Análise Preditiva Agrícola | Usuário: <span className="font-semibold">{userName}</span>
          </p>
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
