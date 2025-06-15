"use client";

import { useState, useEffect, useCallback } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { Play, Pause, RotateCcw, Settings, TrendingUp, Zap } from "lucide-react";

// Simulation parameters interface
interface SimulationParams {
  frequency: number;
  pressure: number;
  radius: number;
  temperature: number;
}

// Data point interface for charts
interface DataPoint {
  time: number;
  radius: number;
  temperature: number;
  pressure: number;
  lightIntensity: number;
}

export default function Simulator() {
  const [isRunning, setIsRunning] = useState(false);
  const [params, setParams] = useState<SimulationParams>({
    frequency: 26.5, // kHz
    pressure: 1.5,   // atm  
    radius: 4.5,     // μm
    temperature: 300 // K
  });
  
  const [data, setData] = useState<DataPoint[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  // Simplified physics simulation (would be replaced with WASM)
  const simulateStep = useCallback((step: number, params: SimulationParams): DataPoint => {
    const t = step * 0.01; // time in seconds
    const omega = 2 * Math.PI * params.frequency * 1000; // angular frequency
    
    // Simplified bubble dynamics - actual simulation would be much more complex
    const radiusVariation = Math.sin(omega * t) * 0.3 + 1;
    const currentRadius = params.radius * radiusVariation;
    
    // Temperature spikes during collapse
    const tempMultiplier = radiusVariation < 0.8 ? Math.pow(1 / radiusVariation, 3) : 1;
    const currentTemp = params.temperature * tempMultiplier;
    
    // Pressure inverse relationship with radius
    const currentPressure = params.pressure / (radiusVariation * radiusVariation);
    
    // Light intensity correlates with temperature during collapse
    const lightIntensity = currentTemp > 10000 ? Math.pow((currentTemp - 10000) / 100000, 2) : 0;
    
    return {
      time: t,
      radius: currentRadius,
      temperature: Math.min(currentTemp, 1000000), // Cap at 1M Kelvin
      pressure: Math.min(currentPressure, 1000), // Cap pressure
      lightIntensity: Math.min(lightIntensity, 1) // Normalize light intensity
    };
  }, []);

  // Simulation loop
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setCurrentStep(prev => {
        const newStep = prev + 1;
        const newDataPoint = simulateStep(newStep, params);
        
        setData(prevData => {
          const newData = [...prevData, newDataPoint];
          // Keep only last 1000 points for performance
          return newData.length > 1000 ? newData.slice(-1000) : newData;
        });
        
        return newStep;
      });
    }, 16); // ~60 FPS

    return () => clearInterval(interval);
  }, [isRunning, params, simulateStep]);

  const handleReset = () => {
    setIsRunning(false);
    setData([]);
    setCurrentStep(0);
  };

  const handleParamChange = (param: keyof SimulationParams, value: number) => {
    setParams(prev => ({ ...prev, [param]: value }));
  };

  const formatValue = (value: number, decimals = 2) => {
    return value.toFixed(decimals);
  };

  return (
    <div className="min-h-screen pt-20 px-4 pb-8">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Sonoluminescence <span className="hero-text">Simulator</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Explore bubble collapse dynamics and light emission in real-time
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Control Panel */}
          <div className="lg:col-span-1">
            <div className="control-panel sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <Settings className="text-cyan-400" size={24} />
                <h2 className="text-xl font-semibold text-white">Controls</h2>
              </div>

              {/* Play/Pause Controls */}
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    isRunning 
                      ? 'bg-red-500 hover:bg-red-400 text-white' 
                      : 'bg-green-500 hover:bg-green-400 text-white'
                  }`}
                >
                  {isRunning ? <Pause size={20} /> : <Play size={20} />}
                  {isRunning ? 'Pause' : 'Start'}
                </button>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition-all"
                >
                  <RotateCcw size={20} />
                  Reset
                </button>
              </div>

              {/* Parameter Controls */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Frequency: {formatValue(params.frequency)} kHz
                  </label>
                  <input
                    type="range"
                    min="20"
                    max="40"
                    step="0.1"
                    value={params.frequency}
                    onChange={(e) => handleParamChange('frequency', parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Pressure: {formatValue(params.pressure)} atm
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="3"
                    step="0.1"
                    value={params.pressure}
                    onChange={(e) => handleParamChange('pressure', parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Initial Radius: {formatValue(params.radius)} μm
                  </label>
                  <input
                    type="range"
                    min="2"
                    max="10"
                    step="0.1"
                    value={params.radius}
                    onChange={(e) => handleParamChange('radius', parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              </div>

              {/* Current Values */}
              <div className="mt-8 space-y-3">
                <h3 className="text-lg font-semibold text-white mb-4">Current Values</h3>
                {data.length > 0 && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Radius:</span>
                      <span className="text-cyan-400">{formatValue(data[data.length - 1].radius)} μm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Temperature:</span>
                      <span className="text-orange-400">{formatValue(data[data.length - 1].temperature)} K</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Pressure:</span>
                      <span className="text-blue-400">{formatValue(data[data.length - 1].pressure)} atm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Light:</span>
                      <span className="text-green-400">{formatValue(data[data.length - 1].lightIntensity * 100)}%</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="lg:col-span-3 space-y-6">
            {/* Bubble Radius Chart */}
            <div className="space-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="text-cyan-400" size={20} />
                <h3 className="text-lg font-semibold text-white">Bubble Radius vs Time</h3>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                         <XAxis 
                       dataKey="time" 
                       stroke="#9CA3AF"
                       tickFormatter={(value) => `${Number(value).toFixed(3)}s`}
                     />
                     <YAxis 
                       stroke="#9CA3AF"
                       tickFormatter={(value) => `${Number(value).toFixed(1)}μm`}
                     />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1e293b', 
                        border: '1px solid #475569',
                        borderRadius: '8px'
                      }}
                      labelFormatter={(value) => `Time: ${Number(value).toFixed(3)}s`}
                      formatter={(value) => [`${Number(value).toFixed(2)}μm`, 'Radius']}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="radius" 
                      stroke="#22d3ee" 
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Temperature Chart */}
            <div className="space-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="text-orange-400" size={20} />
                <h3 className="text-lg font-semibold text-white">Temperature vs Time</h3>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="time" 
                      stroke="#9CA3AF"
                      tickFormatter={(value) => `${value.toFixed(3)}s`}
                    />
                    <YAxis 
                      stroke="#9CA3AF"
                      tickFormatter={(value) => `${(value/1000).toFixed(0)}K`}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1e293b', 
                        border: '1px solid #475569',
                        borderRadius: '8px'
                      }}
                      labelFormatter={(value) => `Time: ${Number(value).toFixed(3)}s`}
                      formatter={(value) => [`${Number(value).toFixed(0)}K`, 'Temperature']}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="temperature" 
                      stroke="#f97316" 
                      fill="#f97316"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Multi-parameter Chart */}
            <div className="space-card p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Multi-Parameter View</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="time" 
                      stroke="#9CA3AF"
                      tickFormatter={(value) => `${value.toFixed(3)}s`}
                    />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1e293b', 
                        border: '1px solid #475569',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="pressure" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      dot={false}
                      name="Pressure (atm)"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="lightIntensity" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      dot={false}
                      name="Light Intensity"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 