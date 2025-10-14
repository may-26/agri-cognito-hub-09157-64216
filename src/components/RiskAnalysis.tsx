import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle, Download, Copy, Sparkles, BarChart3 } from "lucide-react";
import { toast } from "sonner";
import { RiskChart } from "@/components/RiskChart";
import { calculateRiskIndex, getRiskLevel, getRiskRecommendations } from "@/lib/riskCalculations";

export const RiskAnalysis = () => {
  const [formData, setFormData] = useState({
    temp: 25,
    humidity: 70,
    precipitation: 5,
    leafWetness: 6,
    trapCount: 15,
    history: "média",
    location: "Sul do Brasil",
    crop: "Soja",
  });

  const [riskData, setRiskData] = useState<any>(null);
  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSimulate = () => {
    // Simulate random weather data
    const randomData = {
      temp: Math.floor(Math.random() * 15) + 15,
      humidity: Math.floor(Math.random() * 30) + 60,
      precipitation: Math.floor(Math.random() * 15),
      leafWetness: Math.floor(Math.random() * 18),
      trapCount: Math.floor(Math.random() * 40) + 5,
      history: formData.history,
      location: formData.location,
      crop: formData.crop,
    };
    setFormData(randomData);
    toast.success("Dados climáticos simulados!");
  };

  const handleCalculate = () => {
    const riskIndex = calculateRiskIndex(formData);
    const level = getRiskLevel(riskIndex);
    const recommendations = getRiskRecommendations(riskIndex);

    setRiskData({
      index: riskIndex,
      level,
      recommendations,
      factors: {
        temp: formData.temp,
        humidity: formData.humidity,
        precipitation: formData.precipitation,
        leafWetness: formData.leafWetness,
        trapCount: formData.trapCount,
      }
    });
    setShowResults(true);
    toast.success("Análise de risco calculada!");
  };

  const handleReset = () => {
    setFormData({
      temp: 25,
      humidity: 70,
      precipitation: 5,
      leafWetness: 6,
      trapCount: 15,
      history: "média",
      location: "Sul do Brasil",
      crop: "Soja",
    });
    setShowResults(false);
    setRiskData(null);
    toast.info("Formulário resetado");
  };

  const handleExportJson = () => {
    if (!riskData) return;
    
    const report = {
      timestamp: new Date().toISOString(),
      userData: formData,
      results: riskData,
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relatorio-risco-${Date.now()}.json`;
    a.click();
    toast.success("Relatório exportado!");
  };

  const handleCopyJson = () => {
    if (!riskData) return;
    
    const report = {
      timestamp: new Date().toISOString(),
      userData: formData,
      results: riskData,
    };

    navigator.clipboard.writeText(JSON.stringify(report, null, 2));
    toast.success("Relatório copiado!");
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Dados de Entrada
          </CardTitle>
          <CardDescription>
            Insira os dados climáticos e de monitoramento
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="temp">Temperatura (°C)</Label>
              <Input
                id="temp"
                type="number"
                value={formData.temp}
                onChange={(e) => handleInputChange("temp", parseFloat(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="humidity">Umidade (%)</Label>
              <Input
                id="humidity"
                type="number"
                value={formData.humidity}
                onChange={(e) => handleInputChange("humidity", parseFloat(e.target.value))}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="precipitation">Precipitação (mm)</Label>
              <Input
                id="precipitation"
                type="number"
                value={formData.precipitation}
                onChange={(e) => handleInputChange("precipitation", parseFloat(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="leafWetness">Molhamento Foliar (h)</Label>
              <Input
                id="leafWetness"
                type="number"
                value={formData.leafWetness}
                onChange={(e) => handleInputChange("leafWetness", parseFloat(e.target.value))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="trapCount">Contagem de Armadilhas</Label>
            <Input
              id="trapCount"
              type="number"
              value={formData.trapCount}
              onChange={(e) => handleInputChange("trapCount", parseInt(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="crop">Cultura</Label>
            <Input
              id="crop"
              type="text"
              value={formData.crop}
              onChange={(e) => handleInputChange("crop", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Localização</Label>
            <Input
              id="location"
              type="text"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={handleSimulate} variant="outline" className="flex-1">
              Simular Dados
            </Button>
            <Button onClick={handleCalculate} className="flex-1 bg-accent hover:bg-accent/90">
              Calcular Risco
            </Button>
            <Button onClick={handleReset} variant="destructive">
              Resetar
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {showResults && riskData && (
          <>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Índice de Risco
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="text-6xl font-bold" style={{ color: riskData.level.color }}>
                    {riskData.index.toFixed(1)}
                  </div>
                  <div className="text-2xl font-semibold" style={{ color: riskData.level.color }}>
                    {riskData.level.icon} {riskData.level.label}
                  </div>
                  <div className="text-muted-foreground">
                    {riskData.level.description}
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold mb-2">Recomendações:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {riskData.recommendations.map((rec: string, idx: number) => (
                      <li key={idx}>• {rec}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-2 mt-6">
                  <Button onClick={handleExportJson} variant="outline" size="sm" className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Exportar JSON
                  </Button>
                  <Button onClick={handleCopyJson} variant="outline" size="sm" className="flex-1">
                    <Copy className="w-4 h-4 mr-2" />
                    Copiar
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fatores de Risco</CardTitle>
              </CardHeader>
              <CardContent>
                <RiskChart factors={riskData.factors} />
              </CardContent>
            </Card>
          </>
        )}

        {!showResults && (
          <Card className="bg-muted/30">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Sparkles className="w-12 h-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center">
                Preencha os dados e clique em "Calcular Risco" para ver os resultados
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
