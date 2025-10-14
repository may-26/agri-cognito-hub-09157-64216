export function calculateRiskIndex(data: {
  temp: number;
  humidity: number;
  precipitation: number;
  leafWetness: number;
  trapCount: number;
  history: string;
}): number {
  let risk = 0;

  // Temperature factor (0-2.5 points)
  if (data.temp >= 20 && data.temp <= 30) {
    risk += 2.5;
  } else if (data.temp >= 15 && data.temp < 20) {
    risk += 1.5;
  } else if (data.temp > 30 && data.temp <= 35) {
    risk += 1.5;
  }

  // Humidity factor (0-2.5 points)
  if (data.humidity >= 80) {
    risk += 2.5;
  } else if (data.humidity >= 70) {
    risk += 1.8;
  } else if (data.humidity >= 60) {
    risk += 1.0;
  }

  // Precipitation factor (0-1.5 points)
  if (data.precipitation >= 10) {
    risk += 1.5;
  } else if (data.precipitation >= 5) {
    risk += 1.0;
  } else if (data.precipitation >= 2) {
    risk += 0.5;
  }

  // Leaf wetness factor (0-1.5 points)
  if (data.leafWetness >= 12) {
    risk += 1.5;
  } else if (data.leafWetness >= 6) {
    risk += 1.0;
  } else if (data.leafWetness >= 3) {
    risk += 0.5;
  }

  // Trap count factor (0-1.5 points)
  if (data.trapCount >= 30) {
    risk += 1.5;
  } else if (data.trapCount >= 20) {
    risk += 1.0;
  } else if (data.trapCount >= 10) {
    risk += 0.5;
  }

  // History factor (0-0.5 points)
  if (data.history === "alta") {
    risk += 0.5;
  } else if (data.history === "média") {
    risk += 0.3;
  }

  return Math.min(risk, 10);
}

export function getRiskLevel(index: number) {
  if (index < 3) {
    return {
      label: "Baixo",
      color: "#52C41A",
      icon: "🌱",
      description: "Condições favoráveis. Monitoramento de rotina recomendado.",
    };
  } else if (index < 5.5) {
    return {
      label: "Moderado",
      color: "#FAAD14",
      icon: "🌾",
      description: "Atenção necessária. Acompanhe de perto os indicadores.",
    };
  } else if (index < 7.5) {
    return {
      label: "Alto",
      color: "#FF7A00",
      icon: "🌿",
      description: "Risco elevado. Considere medidas preventivas imediatas.",
    };
  } else {
    return {
      label: "Extremo",
      color: "#F5222D",
      icon: "🌋",
      description: "Risco crítico. Ação urgente necessária!",
    };
  }
}

export function getRiskRecommendations(index: number): string[] {
  if (index < 3) {
    return [
      "Continuar monitoramento de rotina",
      "Manter práticas preventivas básicas",
      "Documentar condições atuais para referência futura",
    ];
  } else if (index < 5.5) {
    return [
      "Aumentar frequência de monitoramento",
      "Verificar armadilhas com mais frequência",
      "Preparar produtos de controle biológico",
      "Avaliar necessidade de aplicação preventiva",
    ];
  } else if (index < 7.5) {
    return [
      "Implementar medidas de controle imediatamente",
      "Considerar aplicação de defensivos",
      "Aumentar vigilância em áreas de risco",
      "Consultar engenheiro agrônomo",
      "Preparar plano de contingência",
    ];
  } else {
    return [
      "AÇÃO URGENTE: Aplicar defensivos específicos",
      "Isolar áreas mais afetadas",
      "Contatar assistência técnica especializada",
      "Implementar controle integrado de pragas",
      "Documentar perdas para seguro agrícola",
      "Avaliar impacto na produtividade esperada",
    ];
  }
}
