"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Play, Pause, RotateCcw, Settings, TrendingUp, Zap, Thermometer, Gauge, Eye, Lightbulb } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Text } from "@react-three/drei";
import * as THREE from "three";

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
  phase: 'expansion' | 'collapse' | 'emission';
}

// 3D Bubble Visualization Component
function BubbleVisualization({ 
  radius, 
  temperature, 
  lightIntensity, 
  phase 
}: { 
  radius: number; 
  temperature: number; 
  lightIntensity: number; 
  phase: string;
}) {
  const bubbleRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (bubbleRef.current && glowRef.current && lightRef.current) {
      // Animate bubble size based on radius
      const scale = radius / 4.5; // Normalize to initial radius
      bubbleRef.current.scale.setScalar(scale);
      
      // Glow effect based on temperature
      const glowScale = scale + (temperature / 100000) * 0.5;
      glowRef.current.scale.setScalar(glowScale);
      
      // Color changes based on temperature
      const material = bubbleRef.current.material as THREE.MeshPhysicalMaterial;
      if (temperature > 50000) {
        material.emissive.setHex(0xff4400); // Hot orange-red
        material.emissiveIntensity = Math.min(temperature / 100000, 2);
      } else if (temperature > 10000) {
        material.emissive.setHex(0x0088ff); // Blue-white
        material.emissiveIntensity = Math.min(temperature / 50000, 1);
      } else {
        material.emissive.setHex(0x00ffff); // Cyan
        material.emissiveIntensity = 0.1;
      }
      
      // Light emission effect
      lightRef.current.intensity = lightIntensity * 10;
      lightRef.current.color.setHex(temperature > 50000 ? 0xffffff : 0x00ffff);
      
      // Phase-based animations
      if (phase === 'collapse') {
        bubbleRef.current.rotation.x += 0.1;
        bubbleRef.current.rotation.y += 0.1;
      } else if (phase === 'emission') {
        const pulse = Math.sin(state.clock.elapsedTime * 20) * 0.1 + 1;
        lightRef.current.intensity = lightIntensity * 10 * pulse;
      }
    }
  });

  return (
    <group>
      {/* Main bubble */}
      <Sphere ref={bubbleRef} args={[1, 32, 32]}>
        <meshPhysicalMaterial
          color="#00ccff"
          transmission={0.8}
          thickness={0.1}
          roughness={0}
          envMapIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0}
          ior={1.4}
          emissive="#00ffff"
          emissiveIntensity={0.1}
        />
      </Sphere>
      
      {/* Outer glow */}
      <Sphere ref={glowRef} args={[1.2, 16, 16]}>
        <meshBasicMaterial
          color="#00ffff"
          transparent
          opacity={0.2}
          side={THREE.BackSide}
        />
      </Sphere>
      
      {/* Light source */}
      <pointLight
        ref={lightRef}
        position={[0, 0, 0]}
        intensity={0}
        color="#00ffff"
        distance={10}
      />
      
      {/* Phase indicator text */}
      <Text
        position={[0, -2, 0]}
        fontSize={0.3}
        color={phase === 'emission' ? '#ffff00' : phase === 'collapse' ? '#ff4400' : '#00ffff'}
        anchorX="center"
        anchorY="middle"
      >
        {phase.toUpperCase()}
      </Text>
    </group>
  );
}

// Visual Status Indicators
function StatusIndicator({ 
  icon: Icon, 
  label, 
  value, 
  unit, 
  color, 
  maxValue, 
  warningThreshold 
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: number;
  unit: string;
  color: string;
  maxValue: number;
  warningThreshold?: number;
}) {
  const percentage = Math.min((value / maxValue) * 100, 100);
  const isWarning = warningThreshold && value > warningThreshold;
  
  return (
    <div className="space-card p-4">
      <div className="flex items-center gap-2 mb-2">
        <Icon size={20} className={`text-${color}-400`} />
        <span className="text-sm font-medium text-slate-300">{label}</span>
      </div>
      <div className="text-2xl font-bold text-white mb-2">
        {value.toFixed(1)} <span className="text-sm text-slate-400">{unit}</span>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-300 ${
            isWarning ? 'bg-red-500' : `bg-${color}-500`
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {isWarning && (
        <div className="text-xs text-red-400 mt-1">⚠️ Extreme conditions!</div>
      )}
    </div>
  );
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
  const [currentPhase, setCurrentPhase] = useState<'expansion' | 'collapse' | 'emission'>('expansion');

  // Enhanced physics simulation
  const simulateStep = useCallback((step: number, params: SimulationParams): DataPoint => {
    const t = step * 0.01; // time in seconds
    const omega = 2 * Math.PI * params.frequency * 1000; // angular frequency
    
    // More realistic bubble dynamics
    const radiusVariation = Math.sin(omega * t) * 0.4 + 1;
    const currentRadius = params.radius * radiusVariation;
    
    // Determine phase
    let phase: 'expansion' | 'collapse' | 'emission' = 'expansion';
    if (radiusVariation < 0.7) {
      phase = 'collapse';
    } else if (radiusVariation < 0.8) {
      phase = 'emission';
    }
    
    // Temperature spikes dramatically during collapse
    let tempMultiplier = 1;
    if (phase === 'collapse') {
      tempMultiplier = Math.pow(1 / radiusVariation, 4); // More dramatic
    } else if (phase === 'emission') {
      tempMultiplier = Math.pow(1 / radiusVariation, 2);
    }
    const currentTemp = params.temperature * tempMultiplier;
    
    // Pressure follows ideal gas law approximation
    const currentPressure = params.pressure * Math.pow(params.radius / currentRadius, 3);
    
    // Light emission only during extreme collapse
    let lightIntensity = 0;
    if (currentTemp > 50000) {
      lightIntensity = Math.pow((currentTemp - 50000) / 500000, 1.5);
    }
    
    return {
      time: t,
      radius: currentRadius,
      temperature: Math.min(currentTemp, 2000000), // Cap at 2M Kelvin
      pressure: Math.min(currentPressure, 2000), // Cap pressure
      lightIntensity: Math.min(lightIntensity, 1),
      phase
    };
  }, []);

  // Simulation loop
  useEffect(() => {
    if (!isRunning) return;

    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      const newDataPoint = simulateStep(step, params);
      
      setCurrentPhase(newDataPoint.phase);
      
      setData(prevData => {
        const newData = [...prevData, newDataPoint];
        // Keep only last 500 points for performance
        return newData.length > 500 ? newData.slice(-500) : newData;
      });
    }, 32); // ~30 FPS for smoother animation

    return () => clearInterval(interval);
  }, [isRunning, params, simulateStep]);

  const handleReset = () => {
    setIsRunning(false);
    setData([]);
    setCurrentPhase('expansion');
  };

  const handleParamChange = (param: keyof SimulationParams, value: number) => {
    setParams(prev => ({ ...prev, [param]: value }));
  };

  const formatValue = (value: number, decimals = 2) => {
    return value.toFixed(decimals);
  };

  const currentData = data.length > 0 ? data[data.length - 1] : null;

  return (
    <div className="min-h-screen pt-20 px-4 pb-8">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Sonoluminescence <span className="hero-text">Simulator</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Watch bubble collapse dynamics and light emission in real-time 3D
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* 3D Visualization */}
          <div className="lg:col-span-2">
            <div className="space-card p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Eye className="text-cyan-400" size={20} />
                <h3 className="text-lg font-semibold text-white">3D Bubble Visualization</h3>
                <div className={`ml-auto px-3 py-1 rounded-full text-xs font-medium ${
                  currentPhase === 'emission' ? 'bg-yellow-500 text-black' :
                  currentPhase === 'collapse' ? 'bg-red-500 text-white' :
                  'bg-cyan-500 text-black'
                }`}>
                  {currentPhase.toUpperCase()}
                </div>
              </div>
              <div className="h-96 bg-slate-900 rounded-lg overflow-hidden">
                <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                  <ambientLight intensity={0.3} />
                  <pointLight position={[5, 5, 5]} intensity={0.5} />
                  {currentData && (
                    <BubbleVisualization
                      radius={currentData.radius}
                      temperature={currentData.temperature}
                      lightIntensity={currentData.lightIntensity}
                      phase={currentData.phase}
                    />
                  )}
                </Canvas>
              </div>
              
              {/* Phase Explanation */}
              <div className="mt-4 p-4 bg-slate-800 rounded-lg">
                <div className="text-sm text-slate-300">
                  {currentPhase === 'expansion' && (
                    <div>
                      <strong className="text-cyan-400">EXPANSION PHASE:</strong> The bubble grows as acoustic pressure decreases. 
                      Temperature and pressure are at normal levels.
                    </div>
                  )}
                  {currentPhase === 'collapse' && (
                    <div>
                      <strong className="text-red-400">COLLAPSE PHASE:</strong> Rapid bubble compression creates extreme 
                      temperatures and pressures. Energy concentrates into tiny volume.
                    </div>
                  )}
                  {currentPhase === 'emission' && (
                    <div>
                      <strong className="text-yellow-400">EMISSION PHASE:</strong> Peak conditions reached! 
                      Light emission occurs due to extreme temperatures and plasma formation.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Status Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {currentData && (
                <>
                  <StatusIndicator
                    icon={Gauge}
                    label="Radius"
                    value={currentData.radius}
                    unit="μm"
                    color="cyan"
                    maxValue={10}
                  />
                  <StatusIndicator
                    icon={Thermometer}
                    label="Temperature"
                    value={currentData.temperature / 1000}
                    unit="kK"
                    color="orange"
                    maxValue={2000}
                    warningThreshold={100}
                  />
                  <StatusIndicator
                    icon={Zap}
                    label="Pressure"
                    value={currentData.pressure}
                    unit="atm"
                    color="blue"
                    maxValue={2000}
                    warningThreshold={100}
                  />
                  <StatusIndicator
                    icon={Lightbulb}
                    label="Light"
                    value={currentData.lightIntensity * 100}
                    unit="%"
                    color="yellow"
                    maxValue={100}
                  />
                </>
              )}
            </div>

            {/* Charts */}
            <div className="space-y-6">
              {/* Multi-parameter chart */}
              <div className="space-card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="text-cyan-400" size={20} />
                  <h3 className="text-lg font-semibold text-white">Real-time Dynamics</h3>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data.slice(-100)}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis 
                        dataKey="time" 
                        stroke="#9CA3AF"
                        tickFormatter={(value) => `${value.toFixed(2)}s`}
                      />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px'
                        }}
                        formatter={(value: number, name: string) => {
                          const formatters: { [key: string]: (v: number) => string } = {
                            radius: (v) => `${v.toFixed(2)} μm`,
                            temperature: (v) => `${(v/1000).toFixed(1)} kK`,
                            pressure: (v) => `${v.toFixed(1)} atm`,
                            lightIntensity: (v) => `${(v*100).toFixed(1)}%`
                          };
                          return [formatters[name]?.(value) || value, name];
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="radius" 
                        stroke="#22D3EE" 
                        strokeWidth={2}
                        dot={false}
                        name="radius"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="temperature" 
                        stroke="#FB923C" 
                        strokeWidth={2}
                        dot={false}
                        name="temperature"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="pressure" 
                        stroke="#60A5FA" 
                        strokeWidth={2}
                        dot={false}
                        name="pressure"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="lightIntensity" 
                        stroke="#FDE047" 
                        strokeWidth={3}
                        dot={false}
                        name="lightIntensity"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

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
                    Sound Frequency: {formatValue(params.frequency)} kHz
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
                  <div className="text-xs text-slate-400 mt-1">
                    Higher frequency = faster oscillation
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Ambient Pressure: {formatValue(params.pressure)} atm
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
                  <div className="text-xs text-slate-400 mt-1">
                    Higher pressure = more stable bubble
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Initial Bubble Radius: {formatValue(params.radius)} μm
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
                  <div className="text-xs text-slate-400 mt-1">
                    Smaller bubbles = more extreme conditions
                  </div>
                </div>
              </div>

              {/* Educational Info */}
              <div className="mt-8 p-4 bg-slate-800 rounded-lg">
                <h3 className="text-sm font-semibold text-white mb-2">💡 Did You Know?</h3>
                <div className="text-xs text-slate-300 space-y-2">
                  <p>• Bubble collapse happens in microseconds</p>
                  <p>• Temperatures can exceed 1 million Kelvin</p>
                  <p>• Light flashes last only 100 picoseconds</p>
                  <p>• The phenomenon is still not fully understood</p>
                </div>
              </div>

              {/* Current Extreme Values Alert */}
              {currentData && (currentData.temperature > 100000 || currentData.pressure > 100) && (
                <div className="mt-4 p-4 bg-red-900/50 border border-red-500 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="text-red-400" size={16} />
                    <span className="text-sm font-semibold text-red-400">EXTREME CONDITIONS!</span>
                  </div>
                  <div className="text-xs text-red-300">
                    The bubble is experiencing conditions similar to stellar cores!
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 