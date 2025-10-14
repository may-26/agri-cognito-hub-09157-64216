import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts";

interface RiskChartProps {
  factors: {
    temp: number;
    humidity: number;
    precipitation: number;
    leafWetness: number;
    trapCount: number;
  };
}

export const RiskChart = ({ factors }: RiskChartProps) => {
  // Normalize factors to 0-10 scale
  const normalizedData = [
    {
      factor: "Temperatura",
      value: Math.min((factors.temp / 35) * 10, 10),
    },
    {
      factor: "Umidade",
      value: (factors.humidity / 100) * 10,
    },
    {
      factor: "Precipitação",
      value: Math.min((factors.precipitation / 20) * 10, 10),
    },
    {
      factor: "Molhamento",
      value: Math.min((factors.leafWetness / 20) * 10, 10),
    },
    {
      factor: "Armadilhas",
      value: Math.min((factors.trapCount / 50) * 10, 10),
    },
  ];

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={normalizedData}>
          <PolarGrid stroke="hsl(var(--border))" />
          <PolarAngleAxis dataKey="factor" tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }} />
          <PolarRadiusAxis angle={90} domain={[0, 10]} tick={{ fill: "hsl(var(--muted-foreground))" }} />
          <Radar
            name="Fatores de Risco"
            dataKey="value"
            stroke="hsl(var(--accent))"
            fill="hsl(var(--accent))"
            fillOpacity={0.3}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
