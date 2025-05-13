interface Props {
  title: string;
  wattage: number;
  current: number;
  voltage: string;
  temperature: number;
}

export default function PowerSensorCard({ title, wattage, current, voltage, temperature }: Props) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      <div className="grid grid-cols-2 gap-4 text-center">
        <div>
          <div className="text-2xl font-bold text-blue-600">{wattage}</div>
          <div className="text-sm text-gray-500">Watts</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-green-600">{current}</div>
          <div className="text-sm text-gray-500">Amps</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-yellow-600">{voltage}</div>
          <div className="text-sm text-gray-500">Volts</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-red-500">{temperature}°C</div>
          <div className="text-sm text-gray-500">Temp</div>
        </div>
      </div>
    </div>
  );
}
