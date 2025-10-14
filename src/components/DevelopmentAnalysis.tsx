import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Leaf, Sparkles } from "lucide-react";
import { toast } from "sonner";

export const DevelopmentAnalysis = () => {
  const [formData, setFormData] = useState({
    crop: "Soja",
    totalDuration: 120,
    soilMoisture: 70,
    soilPH: 6.5,
    organicMatter: 3.5,
    soilType: "Argiloso",
    nutrientDeficiency: "Baixo N",
    daysPassed: 60,
    expectedYield: 3500,
    marketPrice: 150,
  });

  const [analysis, setAnalysis] = useState<string>("");
  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAnalyze = () => {
    // Generate a mock analysis based on the data
    const progress = (formData.daysPassed / formData.totalDuration) * 100;
    const daysRemaining = formData.totalDuration - formData.daysPassed;
    
    const mockAnalysis = `
**Análise de Desenvolvimento - ${formData.crop}**

**Progresso da Cultura:** ${progress.toFixed(1)}% concluído (${formData.daysPassed} de ${formData.totalDuration} dias)

**Condições do Solo:**
- pH: ${formData.soilPH} (${formData.soilPH >= 6.0 && formData.soilPH <= 7.0 ? '✓ Adequado' : '⚠ Necessita correção'})
- Umidade: ${formData.soilMoisture}% (${formData.soilMoisture >= 60 ? '✓ Boa' : '⚠ Baixa'})
- Matéria Orgânica: ${formData.organicMatter}% (${formData.organicMatter >= 3.0 ? '✓ Adequada' : '⚠ Baixa'})
- Tipo de Solo: ${formData.soilType}

**Previsão de Colheita:**
- Dias Restantes: ${daysRemaining} dias
- Rendimento Esperado: ${formData.expectedYield} kg/ha
- Valor Estimado: R$ ${(formData.expectedYield * formData.marketPrice / 1000).toFixed(2)}/ha

**Recomendações:**
${formData.nutrientDeficiency !== 'Nenhuma' ? `- Aplicar fertilizante para corrigir deficiência: ${formData.nutrientDeficiency}` : '- Nutrição adequada'}
${formData.soilMoisture < 60 ? '- Aumentar irrigação para manter umidade ideal' : '- Manter regime de irrigação atual'}
${formData.soilPH < 6.0 ? '- Aplicar calcário para correção de pH' : ''}
- Monitorar desenvolvimento vegetativo e estágio reprodutivo
- Continuar monitoramento de pragas e doenças

**Status Geral:** ${progress < 50 ? '🌱 Desenvolvimento Inicial' : progress < 80 ? '🌿 Desenvolvimento Avançado' : '🌾 Maturação'}
    `;

    setAnalysis(mockAnalysis);
    setShowResults(true);
    toast.success("Análise de desenvolvimento concluída!");
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="w-5 h-5" />
            Dados da Cultura
          </CardTitle>
          <CardDescription>
            Insira informações sobre a cultura e condições do solo
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dev_crop">Cultura</Label>
              <Input
                id="dev_crop"
                type="text"
                value={formData.crop}
                onChange={(e) => handleInputChange("crop", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dev_total_duration">Duração Total (dias)</Label>
              <Input
                id="dev_total_duration"
                type="number"
                value={formData.totalDuration}
                onChange={(e) => handleInputChange("totalDuration", parseInt(e.target.value))}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dev_days_passed">Dias Decorridos</Label>
              <Input
                id="dev_days_passed"
                type="number"
                value={formData.daysPassed}
                onChange={(e) => handleInputChange("daysPassed", parseInt(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dev_soil_moisture">Umidade do Solo (%)</Label>
              <Input
                id="dev_soil_moisture"
                type="number"
                value={formData.soilMoisture}
                onChange={(e) => handleInputChange("soilMoisture", parseFloat(e.target.value))}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dev_soil_ph">pH do Solo</Label>
              <Input
                id="dev_soil_ph"
                type="number"
                step="0.1"
                value={formData.soilPH}
                onChange={(e) => handleInputChange("soilPH", parseFloat(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dev_organic_matter">Matéria Orgânica (%)</Label>
              <Input
                id="dev_organic_matter"
                type="number"
                step="0.1"
                value={formData.organicMatter}
                onChange={(e) => handleInputChange("organicMatter", parseFloat(e.target.value))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dev_soil_type">Tipo de Solo</Label>
            <Input
              id="dev_soil_type"
              type="text"
              value={formData.soilType}
              onChange={(e) => handleInputChange("soilType", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dev_nutrient_deficiency">Deficiência de Nutrientes</Label>
            <Input
              id="dev_nutrient_deficiency"
              type="text"
              value={formData.nutrientDeficiency}
              onChange={(e) => handleInputChange("nutrientDeficiency", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dev_expected_yield">Rendimento Esperado (kg/ha)</Label>
              <Input
                id="dev_expected_yield"
                type="number"
                value={formData.expectedYield}
                onChange={(e) => handleInputChange("expectedYield", parseInt(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dev_market_price">Preço de Mercado (R$/saca)</Label>
              <Input
                id="dev_market_price"
                type="number"
                value={formData.marketPrice}
                onChange={(e) => handleInputChange("marketPrice", parseFloat(e.target.value))}
              />
            </div>
          </div>

          <Button onClick={handleAnalyze} className="w-full bg-accent hover:bg-accent/90">
            Gerar Análise
          </Button>
        </CardContent>
      </Card>

      <div>
        {showResults && analysis ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-ai" />
                Análise de Desenvolvimento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={analysis}
                readOnly
                className="min-h-[500px] font-mono text-sm"
              />
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-muted/30">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Leaf className="w-12 h-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center">
                Preencha os dados da cultura e clique em "Gerar Análise" para ver os resultados
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
