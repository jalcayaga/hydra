'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Thermometer, 
  Droplets, 
  Zap, 
  Activity,
  Power,
  Wind,
  Sun,
  Battery,
  Gauge,
  TrendingUp,
  Bell,
  Settings,
  BarChart3,
  Map,
  Server,
  Radio,
  AlertCircle,
  Flame,
  Waves,
  CloudSnow,
  Eye,
  Wifi
} from 'lucide-react';
import { ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type SystemStatus = 'OK' | 'WARNING' | 'CRITICAL';
type AlarmSeverity = 'info' | 'warning' | 'critical';

interface Alarm {
  id: string;
  type: string;
  severity: AlarmSeverity;
  message: string;
  timestamp: Date;
  acknowledged: boolean;
}

interface SensorData {
  ambientTemp: number;
  pumpCasingTemp: number;
  inletTemp: number;
  outletTemp: number;
  pipeTemp: number;
  flowRate: number;
  pressure: number;
  voltage: number;
  current: number;
  power: number;
  vibration: number;
  batteryLevel: number;
  solarProduction: number;
}

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [systemStatus, setSystemStatus] = useState<SystemStatus>('OK');
  const [isAutoMode, setIsAutoMode] = useState(true);
  const [heaterOn, setHeaterOn] = useState(false);
  const [pipeHeaterOn, setPipeHeaterOn] = useState(false);
  const [pumpOn, setPumpOn] = useState(true);
  const [recirculationOn, setRecirculationOn] = useState(false);
  const [emergencyStop, setEmergencyStop] = useState(false);
  const [minPumpTemp, setMinPumpTemp] = useState(2);
  const [minPipeTemp, setMinPipeTemp] = useState(1);
  const [autoRecovery, setAutoRecovery] = useState(true);
  const [preventiveAlerts, setPreventiveAlerts] = useState(true);
  const [commsAlerts, setCommsAlerts] = useState(true);

  const [alarms, setAlarms] = useState<Alarm[]>([
    {
      id: '1',
      type: 'Térmica',
      severity: 'warning',
      message: 'Temperatura carcasa aproximándose a límite inferior',
      timestamp: new Date(Date.now() - 3600000),
      acknowledged: false
    }
  ]);

  const [sensorData, setSensorData] = useState<SensorData>({
    ambientTemp: -8.5,
    pumpCasingTemp: 4.2,
    inletTemp: 3.8,
    outletTemp: 5.1,
    pipeTemp: 2.9,
    flowRate: 45.3,
    pressure: 3.2,
    voltage: 380,
    current: 12.5,
    power: 7.9,
    vibration: 0.8,
    batteryLevel: 87,
    solarProduction: 0.5
  });

  const [historicalData] = useState([
    { time: '00:00', temp: 2.1, power: 8.2, heater: 1, ambient: -5.2, solarProduction: 0.2 },
    { time: '04:00', temp: -1.2, power: 9.5, heater: 1, ambient: -8.1, solarProduction: 0.1 },
    { time: '08:00', temp: -3.5, power: 10.1, heater: 1, ambient: -9.2, solarProduction: 0.0 },
    { time: '12:00', temp: 1.8, power: 7.8, heater: 0, ambient: -2.5, solarProduction: 0.9 },
    { time: '16:00', temp: 3.2, power: 7.5, heater: 0, ambient: 0.8, solarProduction: 1.3 },
    { time: '20:00', temp: -0.5, power: 8.9, heater: 1, ambient: -6.3, solarProduction: 0.4 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(prev => ({
        ...prev,
        pumpCasingTemp: Math.max(-5, Math.min(15, prev.pumpCasingTemp + (Math.random() - 0.5) * 0.3)),
        ambientTemp: Math.max(-15, Math.min(10, prev.ambientTemp + (Math.random() - 0.5) * 0.2)),
        flowRate: Math.max(30, Math.min(60, prev.flowRate + (Math.random() - 0.5) * 2)),
        vibration: Math.max(0, Math.min(2, prev.vibration + (Math.random() - 0.5) * 0.1))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Lógica de estado global y calefactor
    if (sensorData.pumpCasingTemp < 0) {
      setSystemStatus('CRITICAL');
      if (isAutoMode) setHeaterOn(true);
    } else if (sensorData.pumpCasingTemp < 2) {
      setSystemStatus('WARNING');
      if (!heaterOn && isAutoMode) setHeaterOn(true);
    } else {
      setSystemStatus('OK');
      if (sensorData.pumpCasingTemp > 6 && heaterOn && isAutoMode) {
        setHeaterOn(false);
      }
    }

    if (emergencyStop) {
      setPumpOn(false);
      setHeaterOn(false);
      setPipeHeaterOn(false);
      setRecirculationOn(false);
    }
  }, [sensorData.pumpCasingTemp, heaterOn, isAutoMode, emergencyStop]);

  const getStatusColor = (status: SystemStatus) => {
    switch (status) {
      case 'OK': return 'text-emerald-400';
      case 'WARNING': return 'text-amber-400';
      case 'CRITICAL': return 'text-rose-400';
    }
  };

  const getStatusBg = (status: SystemStatus) => {
    switch (status) {
      case 'OK': return 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/30';
      case 'WARNING': return 'from-amber-500/20 to-amber-500/5 border-amber-500/30';
      case 'CRITICAL': return 'from-rose-500/20 to-rose-500/5 border-rose-500/30';
    }
  };

  const StatusIndicator = ({ status }: { status: SystemStatus }) => {
    const Icon = status === 'OK' ? CheckCircle2 : status === 'WARNING' ? AlertTriangle : XCircle;
    return (
      <div className={`relative overflow-hidden bg-gradient-to-br ${getStatusBg(status)} backdrop-blur-sm border-2 rounded-3xl p-6 shadow-2xl sm:p-8`}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-3xl" />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <div className={`self-start rounded-2xl p-4 sm:p-6 ${status === 'OK' ? 'bg-emerald-500/20' : status === 'WARNING' ? 'bg-amber-500/20' : 'bg-rose-500/20'}`}>
            <Icon className={`h-16 w-16 sm:h-20 sm:w-20 ${getStatusColor(status)} drop-shadow-lg`} />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-400 uppercase tracking-wider">Estado del Sistema</div>
            <div className={`mt-2 text-4xl font-black tracking-tight sm:text-5xl ${getStatusColor(status)}`}>{status}</div>
            <div className="text-sm text-gray-400 mt-1">
              {status === 'OK' && 'Operación normal'}
              {status === 'WARNING' && 'Requiere atención'}
              {status === 'CRITICAL' && 'Acción inmediata necesaria'}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const MetricCard = ({ icon: Icon, label, value, unit, trend, color = 'blue' }: any) => {
    const colorMap: any = {
      blue: 'from-blue-500/20 to-blue-500/5 border-blue-500/30 text-blue-400',
      green: 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/30 text-emerald-400',
      amber: 'from-amber-500/20 to-amber-500/5 border-amber-500/30 text-amber-400',
      rose: 'from-rose-500/20 to-rose-500/5 border-rose-500/30 text-rose-400',
      purple: 'from-purple-500/20 to-purple-500/5 border-purple-500/30 text-purple-400',
    };

    const classes = colorMap[color] ?? colorMap.blue;
    const iconColorClass = classes.split(' ')[4] ?? 'text-blue-400';

    return (
      <div className={`relative overflow-hidden bg-gradient-to-br ${classes} backdrop-blur-sm border rounded-2xl p-4 transition-transform duration-300 shadow-xl sm:p-6 sm:hover:scale-105`}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl" />
        <div className="relative">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <Icon className={`w-8 h-8 ${iconColorClass}`} />
            {typeof trend === 'number' && (
              <Badge variant="outline" className="border-white/20 text-white/80">
                {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
              </Badge>
            )}
          </div>
          <div className="text-sm font-medium text-gray-300 mb-1">{label}</div>
          <div className="text-3xl font-black text-white">
            {value} <span className="text-xl font-normal text-gray-400">{unit}</span>
          </div>
        </div>
      </div>
    );
  };

  const SensorCard = ({ icon: Icon, label, value, unit, status = 'OK', min, max, color = 'blue' }: any) => {
    const percentage = typeof value === 'number' && min !== undefined && max !== undefined
      ? ((value - min) / (max - min)) * 100
      : null;

    const colorMap: any = {
      blue: 'text-blue-400 bg-blue-500/10',
      green: 'text-emerald-400 bg-emerald-500/10',
      amber: 'text-amber-400 bg-amber-500/10',
      rose: 'text-rose-400 bg-rose-500/10',
    };

    const classes = colorMap[color] ?? colorMap.blue;
    const iconColor = classes.split(' ')[0];

    return (
      <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-4 transition-all duration-300 shadow-lg hover:border-slate-600/50 sm:p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-left">
            <div className={`p-2.5 rounded-xl ${classes}`}>
              <Icon className={`w-5 h-5 ${iconColor}`} />
            </div>
            <span className="text-sm font-medium text-gray-300">{label}</span>
          </div>
          <Badge 
            variant={status === 'OK' ? 'default' : status === 'WARNING' ? 'secondary' : 'destructive'}
            className="text-xs"
          >
            {status}
          </Badge>
        </div>
        <div className="mb-3 text-3xl font-bold text-white sm:text-4xl">
          {typeof value === 'number' ? value.toFixed(1) : value} 
          <span className="ml-1 text-lg font-normal text-gray-400">{unit}</span>
        </div>
        {percentage !== null && (
          <div className="relative w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
            <div 
              className={`absolute h-2 rounded-full transition-all duration-500 ${
                status === 'OK' ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' : 
                status === 'WARNING' ? 'bg-gradient-to-r from-amber-500 to-amber-400' : 
                'bg-gradient-to-r from-rose-500 to-rose-400'
              }`}
              style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
            />
          </div>
        )}
      </div>
    );
  };

  const ControlSwitch = ({ label, icon: Icon, checked, onChange, disabled = false }: any) => (
    <div
      className={`bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border ${
        checked ? 'border-emerald-500/40 shadow-emerald-500/20' : 'border-slate-700/50'
      } rounded-2xl p-4 transition-all duration-300 shadow-lg hover:border-slate-600/50 sm:p-5`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-xl ${checked ? 'bg-emerald-500/20' : 'bg-slate-700/50'}`}>
            <Icon className={`w-6 h-6 ${checked ? 'text-emerald-400' : 'text-gray-400'}`} />
          </div>
          <div>
            <div className="font-semibold text-white text-base">{label}</div>
            <div className={`text-xs font-medium ${checked ? 'text-emerald-400' : 'text-gray-500'}`}>
              {checked ? '● ENCENDIDO' : '○ APAGADO'}
            </div>
          </div>
        </div>
        <Switch 
          checked={checked} 
          onCheckedChange={onChange}
          disabled={disabled}
          className="data-[state=checked]:bg-emerald-500 sm:scale-110"
        />
      </div>
    </div>
  );

  const acknowledgeAlarm = (id: string) => {
    setAlarms(prev =>
      prev.map(a => a.id === id ? { ...a, acknowledged: true } : a)
    );
  };

  const getAlarmBadgeColor = (severity: AlarmSeverity) => {
    switch (severity) {
      case 'info': return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'warning': return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'critical': return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
    }
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });

  const getTempStatus = (temp: number): 'OK' | 'WARNING' | 'CRITICAL' => {
    if (temp < 0) return 'CRITICAL';
    if (temp < 2) return 'WARNING';
    return 'OK';
  };

  const getFlowStatus = (flow: number): 'OK' | 'WARNING' | 'CRITICAL' => {
    if (flow < 35) return 'WARNING';
    if (flow < 25) return 'CRITICAL';
    return 'OK';
  };

  const getVibrationStatus = (v: number): 'OK' | 'WARNING' | 'CRITICAL' => {
    if (v > 1.5) return 'CRITICAL';
    if (v > 1.0) return 'WARNING';
    return 'OK';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/50 shadow-2xl">
        <div className="px-4 py-3 sm:px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg shadow-blue-500/50">
                <Server className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-black text-white tracking-tight sm:text-2xl">SCADA Industrial</h1>
                <p className="text-xs text-gray-400 font-medium sm:text-sm">Sistema de Calentamiento · Sierra Nevada</p>
              </div>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:justify-end">
              <div className="flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2">
                <div className="relative">
                  <Wifi className="w-5 h-5 text-emerald-400" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                </div>
                <div>
                  <div className="text-xs text-gray-400">Conexión</div>
                  <div className="text-sm font-bold text-emerald-400">ONLINE</div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  className="relative w-full justify-center bg-slate-800 border-slate-700 hover:bg-slate-700 sm:w-auto"
                >
                  <Bell className="w-4 h-4" />
                  {alarms.filter(a => !a.acknowledged).length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
                      {alarms.filter(a => !a.acknowledged).length}
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs navegación */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="sticky top-[60px] z-40 border-b border-slate-800/50 bg-slate-900/70 px-4 py-2 backdrop-blur-sm sm:top-[78px] sm:px-6">
          <TabsList className="bg-transparent p-0">
            <TabsTrigger
              value="home"
              className="min-w-[120px] gap-2 px-3 py-2 text-[0.7rem] data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/20 data-[state=active]:to-cyan-500/20 data-[state=active]:shadow-lg sm:px-4 sm:text-sm"
            >
              <Map className="w-4 h-4 mr-2" />
              General
            </TabsTrigger>
            <TabsTrigger
              value="sensors"
              className="min-w-[120px] gap-2 px-3 py-2 text-[0.7rem] data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/20 data-[state=active]:to-cyan-500/20 data-[state=active]:shadow-lg sm:px-4 sm:text-sm"
            >
              <Activity className="w-4 h-4 mr-2" />
              Sensores
            </TabsTrigger>
            <TabsTrigger
              value="control"
              className="min-w-[120px] gap-2 px-3 py-2 text-[0.7rem] data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/20 data-[state=active]:to-cyan-500/20 data-[state=active]:shadow-lg sm:px-4 sm:text-sm"
            >
              <Power className="w-4 h-4 mr-2" />
              Control
            </TabsTrigger>
            <TabsTrigger
              value="alarms"
              className="min-w-[120px] gap-2 px-3 py-2 text-[0.7rem] data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/20 data-[state=active]:to-cyan-500/20 data-[state=active]:shadow-lg sm:px-4 sm:text-sm"
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Alarmas
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="min-w-[120px] gap-2 px-3 py-2 text-[0.7rem] data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/20 data-[state=active]:to-cyan-500/20 data-[state=active]:shadow-lg sm:px-4 sm:text-sm"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Analítica
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="min-w-[120px] gap-2 px-3 py-2 text-[0.7rem] data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/20 data-[state=active]:to-cyan-500/20 data-[state=active]:shadow-lg sm:px-4 sm:text-sm"
            >
              <Settings className="w-4 h-4 mr-2" />
              Config
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="mx-auto max-w-[1800px] px-4 py-6 sm:px-6">
          {/* HOME */}
          <TabsContent value="home" className="mt-0 space-y-6">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6">
              <div className="lg:col-span-8">
                <StatusIndicator status={systemStatus} />
              </div>
              <div className="lg:col-span-4">
                <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-5 shadow-xl sm:p-6">
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <Settings className="w-6 h-6 text-blue-400" />
                        <h3 className="text-lg font-bold text-white">Modo de Operación</h3>
                      </div>
                      <div className="mb-4 flex flex-col gap-4 rounded-xl bg-slate-800/50 p-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <div className="text-sm text-gray-400">Sistema Automático</div>
                          <div className={`text-lg font-bold ${isAutoMode ? 'text-emerald-400' : 'text-gray-500'}`}>
                            {isAutoMode ? 'ACTIVADO' : 'DESACTIVADO'}
                          </div>
                        </div>
                        <Switch 
                          checked={isAutoMode} 
                          onCheckedChange={setIsAutoMode}
                          className="data-[state=checked]:bg-blue-500 sm:scale-125"
                        />
                      </div>
                    </div>
                    <div className="rounded-lg bg-slate-800/30 p-3 text-xs text-gray-400">
                      {isAutoMode 
                        ? '🤖 El sistema está siendo controlado por lógica automática de protección térmica'
                        : '👤 Control manual activo - el operador tiene control total de los actuadores'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
              <MetricCard 
                icon={Thermometer}
                label="Temp. Mínima Hoy"
                value="-3.5"
                unit="°C"
                trend={-5}
                color="blue"
              />
              <MetricCard 
                icon={Flame}
                label="Horas de Calefactor"
                value="14.2"
                unit="hrs"
                trend={8}
                color="amber"
              />
              <MetricCard 
                icon={Zap}
                label="Consumo Diario"
                value="127"
                unit="kWh"
                trend={-3}
                color="green"
              />
              <MetricCard 
                icon={AlertCircle}
                label="Alarmas Activas"
                value={alarms.filter(a => !a.acknowledged).length}
                unit=""
                color="rose"
              />
            </div>

            {/* Diagrama del sistema */}
            <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-6 shadow-xl sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Eye className="w-6 h-6 text-blue-400" />
                  <h3 className="text-xl font-bold text-white">Vista del Sistema</h3>
                </div>
                <div className="flex gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-gray-400">Operativo</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 bg-amber-400 rounded-full" />
                    <span className="text-gray-400">Calefacción</span>
                  </div>
                </div>
              </div>
              <div className="relative h-[360px] rounded-2xl border border-slate-700/30 bg-gradient-to-br from-slate-900 to-slate-950 p-4 sm:h-80 sm:p-8">
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-800/70 to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-slate-900/80 to-transparent pointer-events-none" />
                <div className="h-full w-full overflow-x-auto">
                  <svg viewBox="0 0 1000 350" className="h-full min-w-[720px]">
                  <defs>
                    <linearGradient id="pipeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor={pipeHeaterOn ? "#f59e0b" : "#3b82f6"} />
                      <stop offset="100%" stopColor={pipeHeaterOn ? "#ef4444" : "#60a5fa"} />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Nieve de fondo */}
                  <g opacity="0.35">
                    {Array.from({ length: 30 }).map((_, i) => (
                      <circle
                        key={i}
                        cx={Math.random() * 1000}
                        cy={Math.random() * 350}
                        r={Math.random() * 2 + 0.5}
                        fill="#e5e7eb"
                      />
                    ))}
                  </g>
                  
                  {/* Tanque */}
                  <g filter="url(#glow)">
                    <rect x="50" y="120" width="120" height="150" fill="#020617" stroke="#3b82f6" strokeWidth="3" rx="8"/>
                    <rect x="60" y="195" width="100" height="65" fill="#1e3a8a" opacity="0.55" rx="4"/>
                    <text x="110" y="185" textAnchor="middle" fill="#60a5fa" fontSize="16" fontWeight="bold">TANQUE</text>
                    <text x="110" y="240" textAnchor="middle" fill="#34d399" fontSize="20" fontWeight="bold">78%</text>
                  </g>
                  
                  {/* Bomba */}
                  <g filter="url(#glow)">
                    <circle cx="320" cy="195" r="55" fill={pumpOn ? '#10b981' : '#ef4444'} opacity="0.14"/>
                    <circle cx="320" cy="195" r="50" fill="#020617" stroke={pumpOn ? '#10b981' : '#ef4444'} strokeWidth="4"/>
                    <text x="320" y="193" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="bold">BOMBA</text>
                    <text x="320" y="215" textAnchor="middle" fill={pumpOn ? '#10b981' : '#ef4444'} fontSize="12" fontWeight="bold">
                      {pumpOn ? 'ON' : 'OFF'}
                    </text>
                    
                    {/* Calefactor de bomba */}
                    {heaterOn && (
                      <>
                        <rect x="270" y="140" width="100" height="20" fill="#f59e0b" opacity="0.6" rx="4"/>
                        <text x="320" y="154" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">🔥 CALEFACTOR</text>
                      </>
                    )}
                  </g>
                  
                  {/* Tuberías */}
                  <line x1="170" y1="195" x2="265" y2="195" stroke="url(#pipeGradient)" strokeWidth="8" strokeLinecap="round"/>
                  <line x1="375" y1="195" x2="600" y2="195" stroke="url(#pipeGradient)" strokeWidth="8" strokeLinecap="round"/>
                  
                  {/* Indicadores de flujo */}
                  {pumpOn && (
                    <>
                      <polygon points="220,195 230,190 230,200" fill="#60a5fa" opacity="0.8"/>
                      <polygon points="450,195 460,190 460,200" fill="#60a5fa" opacity="0.8"/>
                    </>
                  )}
                  
                  {/* Panel Solar */}
                  <g filter="url(#glow)">
                    <rect x="680" y="60" width="150" height="100" fill="#020617" stroke="#eab308" strokeWidth="3" rx="8"/>
                    <line x1="700" y1="80" x2="830" y2="80" stroke="#eab308" strokeWidth="2"/>
                    <line x1="700" y1="95" x2="830" y2="95" stroke="#eab308" strokeWidth="2"/>
                    <line x1="700" y1="110" x2="830" y2="110" stroke="#eab308" strokeWidth="2"/>
                    <line x1="700" y1="125" x2="830" y2="125" stroke="#eab308" strokeWidth="2"/>
                    <text x="755" y="50" textAnchor="middle" fill="#eab308" fontSize="14" fontWeight="bold">⚡ SOLAR</text>
                    <text x="755" y="145" textAnchor="middle" fill="#34d399" fontSize="18" fontWeight="bold">
                      {sensorData.solarProduction.toFixed(1)} kW
                    </text>
                  </g>
                  
                  {/* Batería */}
                  <g filter="url(#glow)">
                    <rect x="690" y="210" width="90" height="60" fill="#020617" stroke="#22c55e" strokeWidth="3" rx="6"/>
                    <rect x="782" y="225" width="10" height="30" fill="#22c55e" rx="2"/>
                    <rect
                      x="698"
                      y="218"
                      width={Math.max(10, (sensorData.batteryLevel / 100) * 74)}
                      height="44"
                      fill="#22c55e"
                      opacity="0.6"
                      rx="4"
                    />
                    <text x="735" y="247" textAnchor="middle" fill="#bbf7d0" fontSize="14" fontWeight="bold">
                      {sensorData.batteryLevel.toFixed(0)}%
                    </text>
                    <text x="735" y="268" textAnchor="middle" fill="#4ade80" fontSize="11">
                      BATERÍA
                    </text>
                  </g>

                  {/* Caseta de control */}
                  <g filter="url(#glow)">
                    <rect x="500" y="100" width="130" height="140" fill="#020617" stroke="#64748b" strokeWidth="3" rx="10"/>
                    <text x="565" y="125" textAnchor="middle" fill="#e2e8f0" fontSize="13" fontWeight="bold">
                      CASETA
                    </text>
                    <text x="565" y="145" textAnchor="middle" fill="#38bdf8" fontSize="11">
                      Control · IoT
                    </text>
                    <circle cx="530" cy="170" r="6" fill="#22c55e" />
                    <circle cx="565" cy="170" r="6" fill="#eab308" />
                    <circle cx="600" cy="170" r="6" fill="#f97316" />
                    <text x="565" y="195" textAnchor="middle" fill="#9ca3af" fontSize="10">
                      ESP32 · Sensores · Relés
                    </text>
                  </g>
                  </svg>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* SENSORES */}
          <TabsContent value="sensors" className="mt-0 space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 xl:gap-5">
              <SensorCard
                icon={Thermometer}
                label="Temp. Ambiente"
                value={sensorData.ambientTemp}
                unit="°C"
                min={-20}
                max={10}
                status={getTempStatus(sensorData.ambientTemp)}
                color="blue"
              />
              <SensorCard
                icon={Thermometer}
                label="Temp. Carcasa Bomba"
                value={sensorData.pumpCasingTemp}
                unit="°C"
                min={-5}
                max={15}
                status={getTempStatus(sensorData.pumpCasingTemp)}
                color="amber"
              />
              <SensorCard
                icon={Thermometer}
                label="Temp. Tubería"
                value={sensorData.pipeTemp}
                unit="°C"
                min={-5}
                max={15}
                status={getTempStatus(sensorData.pipeTemp)}
                color="amber"
              />
              <SensorCard
                icon={Droplets}
                label="Caudal"
                value={sensorData.flowRate}
                unit="L/min"
                min={30}
                max={60}
                status={getFlowStatus(sensorData.flowRate)}
                color="green"
              />
              <SensorCard
                icon={Gauge}
                label="Presión"
                value={sensorData.pressure}
                unit="bar"
                min={0}
                max={8}
                status="OK"
                color="blue"
              />
              <SensorCard
                icon={Zap}
                label="Potencia Bomba"
                value={sensorData.power}
                unit="kW"
                min={0}
                max={15}
                status="OK"
                color="purple"
              />
              <SensorCard
                icon={Battery}
                label="Batería"
                value={sensorData.batteryLevel}
                unit="%"
                min={0}
                max={100}
                status={sensorData.batteryLevel < 25 ? 'WARNING' : 'OK'}
                color="green"
              />
              <SensorCard
                icon={Sun}
                label="Producción Solar"
                value={sensorData.solarProduction}
                unit="kW"
                min={0}
                max={5}
                status="OK"
                color="amber"
              />
              <SensorCard
                icon={Activity}
                label="Vibración"
                value={sensorData.vibration}
                unit="g"
                min={0}
                max={2}
                status={getVibrationStatus(sensorData.vibration)}
                color="rose"
              />
            </div>
          </TabsContent>

          {/* CONTROL */}
          <TabsContent value="control" className="mt-0 space-y-6">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-5">
              <div className="space-y-4 lg:col-span-2">
                <ControlSwitch
                  icon={Power}
                  label="Bomba Principal"
                  checked={pumpOn}
                  onChange={(v: boolean) => setPumpOn(v)}
                  disabled={emergencyStop}
                />
                <ControlSwitch
                  icon={Flame}
                  label="Calefactor Carcasa"
                  checked={heaterOn}
                  onChange={(v: boolean) => {
                    setHeaterOn(v);
                    if (!isAutoMode && v && sensorData.pipeTemp < 2) {
                      setPipeHeaterOn(true);
                    }
                  }}
                  disabled={isAutoMode || emergencyStop}
                />
                <ControlSwitch
                  icon={Waves}
                  label="Calefactor Tuberías"
                  checked={pipeHeaterOn}
                  onChange={setPipeHeaterOn}
                  disabled={isAutoMode || emergencyStop}
                />
                <ControlSwitch
                  icon={Activity}
                  label="Bomba Recirculación"
                  checked={recirculationOn}
                  onChange={setRecirculationOn}
                  disabled={emergencyStop}
                />
              </div>
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-rose-900/40 to-rose-950/70 border border-rose-700/60 rounded-2xl p-5 shadow-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <AlertTriangle className="w-6 h-6 text-rose-400" />
                    <h3 className="font-semibold text-rose-50">Paro de Emergencia</h3>
                  </div>
                  <p className="text-sm text-rose-100/80 mb-4">
                    Detiene inmediatamente bomba y sistemas de calefacción. Requiere rearme manual.
                  </p>
                  <Button
                    variant={emergencyStop ? 'outline' : 'destructive'}
                    className={`w-full font-bold ${
                      emergencyStop ? 'border-emerald-500/60 text-emerald-300' : ''
                    }`}
                    onClick={() => setEmergencyStop(prev => !prev)}
                  >
                    {emergencyStop ? 'REARMAR SISTEMA' : 'ACTIVAR PARO DE EMERGENCIA'}
                  </Button>
                  {emergencyStop && (
                    <p className="mt-3 text-xs text-amber-200/90">
                      El sistema permanecerá bloqueado hasta que desactives el paro de emergencia.
                    </p>
                  )}
                </div>
                <div className="bg-slate-900/80 border border-slate-700/60 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Radio className="w-4 h-4 text-sky-400" />
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Telemetría</p>
                      <p className="text-base font-semibold text-white">Enlace Satelital · AWS IoT</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-slate-300">
                    <div>
                      <p className="text-xs text-slate-500">Paquetes/min</p>
                      <p className="text-lg font-bold text-white">118</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Latencia promedio</p>
                      <p className="text-lg font-bold text-white">420 ms</p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-xs text-slate-500">Canal</p>
                      <div className="flex items-center gap-2 font-semibold text-blue-300">
                        <Wifi className="w-3.5 h-3.5" />
                        LoraWAN
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-xs text-slate-500">Backup</p>
                      <div className="flex items-center gap-2 font-semibold text-emerald-300">
                        <Battery className="w-3.5 h-3.5" />
                        OK 87%
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4 border-slate-700 hover:bg-slate-800 text-slate-200">
                    Diagnóstico remoto
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* ALARMAS */}
          <TabsContent value="alarms" className="mt-0 space-y-6">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5">
              {alarms.map(alarm => (
                <Card key={alarm.id} className="bg-slate-900/70 border-slate-800/80">
                  <CardHeader className="flex flex-row items-start justify-between space-y-0">
                    <div>
                      <CardTitle className="text-xl text-white">{alarm.type}</CardTitle>
                      <CardDescription className="text-slate-400">
                        Detectado a las {formatTime(alarm.timestamp)}
                      </CardDescription>
                    </div>
                    <Badge className={`border ${getAlarmBadgeColor(alarm.severity)}`}>
                      {alarm.severity.toUpperCase()}
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-slate-200">{alarm.message}</p>
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Estado: {alarm.acknowledged ? 'Reconocida' : 'Pendiente'}</span>
                      <span>
                        Hace{' '}
                        {Math.max(
                          1,
                          Math.round((Date.now() - alarm.timestamp.getTime()) / 60000)
                        )}{' '}
                        min
                      </span>
                    </div>
                    {!alarm.acknowledged && (
                      <Button
                        size="sm"
                        className="bg-emerald-600 hover:bg-emerald-500"
                        onClick={() => acknowledgeAlarm(alarm.id)}
                      >
                        Reconocer alarma
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
              {alarms.length === 0 && (
                <Card className="border-dashed border-slate-700 bg-slate-900/40">
                  <CardHeader>
                    <CardTitle className="text-center text-lg">Sin alarmas activas 🎉</CardTitle>
                    <CardDescription className="text-center">
                      Continúa el monitoreo preventivo, todo se ve estable.
                    </CardDescription>
                  </CardHeader>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* ANALÍTICA */}
          <TabsContent value="analytics" className="mt-0 space-y-6">
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-5">
              <Card className="bg-slate-900/70 border-slate-800/70">
                <CardHeader>
                  <CardTitle>Tendencia térmica vs consumo</CardTitle>
                  <CardDescription>
                    Comparativa de temperatura carcasa y potencia eléctrica cada 4 horas.
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={historicalData}>
                      <CartesianGrid strokeDasharray="3" stroke="#1e293b" />
                      <XAxis dataKey="time" stroke="#64748b" />
                      <YAxis
                        yAxisId="temp"
                        stroke="#38bdf8"
                        domain={[-10, 12]}
                        tickFormatter={v => `${v}°`}
                      />
                      <YAxis
                        yAxisId="power"
                        orientation="right"
                        stroke="#f97316"
                        domain={[0, 12]}
                        tickFormatter={v => `${v}kW`}
                      />
                      <Tooltip contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b' }} />
                      <Legend />
                      <Area
                        yAxisId="temp"
                        type="monotone"
                        dataKey="ambient"
                        stroke="#0ea5e9"
                        fill="#0ea5e980"
                        name="Ambiente"
                      />
                      <Line
                        yAxisId="temp"
                        type="monotone"
                        dataKey="temp"
                        stroke="#f472b6"
                        strokeWidth={2}
                        name="Carcasa"
                      />
                      <Bar
                        yAxisId="power"
                        dataKey="power"
                        fill="#f97316"
                        name="Potencia"
                        radius={[6, 6, 0, 0]}
                        opacity={0.8}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card className="bg-slate-900/70 border-slate-800/70">
                <CardHeader>
                  <CardTitle>Estado energético</CardTitle>
                  <CardDescription>
                    Balance entre generación solar y consumo de bombas.
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={historicalData}>
                      <CartesianGrid strokeDasharray="3" stroke="#1e293b" />
                      <XAxis dataKey="time" stroke="#64748b" />
                      <YAxis stroke="#64748b" tickFormatter={v => `${v} kW`} />
                      <Tooltip contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b' }} />
                      <Legend />
                      <Area type="monotone" dataKey="solarProduction" stroke="#38bdf8" fill="#38bdf880" name="Solar" />
                      <Line type="monotone" dataKey="power" stroke="#34d399" strokeWidth={2} name="Bomba" />
                      <Line type="monotone" dataKey="heater" stroke="#facc15" strokeDasharray="4 4" name="Calefactor" />
                    </ComposedChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* CONFIGURACIÓN */}
          <TabsContent value="settings" className="mt-0 space-y-6">
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-2 xl:gap-6">
              <Card className="bg-slate-900/70 border-slate-800/70">
                <CardHeader>
                  <CardTitle>Automatización</CardTitle>
                  <CardDescription>Umbrales de control para calefactores y alarmas.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm text-slate-400">Temperatura mínima carcasa (°C)</label>
                    <input
                      type="number"
                      value={minPumpTemp}
                      onChange={e => setMinPumpTemp(Number(e.target.value) || 0)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-slate-400">Temperatura mínima tuberías (°C)</label>
                    <input
                      type="number"
                      value={minPipeTemp}
                      onChange={e => setMinPipeTemp(Number(e.target.value) || 0)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center justify-between rounded-2xl border border-slate-800/60 px-4 py-3">
                    <div>
                      <p className="text-sm font-semibold text-white">Rearme automático</p>
                      <p className="text-xs text-slate-400">Restablece bombas al salir de modo crítico.</p>
                    </div>
                    <Switch
                      checked={autoRecovery}
                      onCheckedChange={setAutoRecovery}
                      className="data-[state=checked]:bg-emerald-500"
                    />
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-500">Guardar cambios</Button>
                </CardContent>
              </Card>
              <Card className="bg-slate-900/70 border-slate-800/70">
                <CardHeader>
                  <CardTitle>Notificaciones</CardTitle>
                  <CardDescription>Define qué eventos generan alertas al equipo de guardia.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-white">Alertas críticas</p>
                      <p className="text-xs text-slate-400">Siempre activadas por política.</p>
                    </div>
                    <Badge variant="destructive">Obligatorio</Badge>
                  </div>
                  <div className="flex items-center justify-between border border-slate-800/60 rounded-2xl px-4 py-3">
                    <div>
                      <p className="font-medium text-white">Alertas preventivas</p>
                      <p className="text-xs text-slate-400">Temperaturas cercanas al límite.</p>
                    </div>
                    <Switch
                      checked={preventiveAlerts}
                      onCheckedChange={setPreventiveAlerts}
                      className="data-[state=checked]:bg-amber-500"
                    />
                  </div>
                  <div className="flex items-center justify-between border border-slate-800/60 rounded-2xl px-4 py-3">
                    <div>
                      <p className="font-medium text-white">Eventos de conectividad</p>
                      <p className="text-xs text-slate-400">Fallas de red o respaldo.</p>
                    </div>
                    <Switch
                      checked={commsAlerts}
                      onCheckedChange={setCommsAlerts}
                      className="data-[state=checked]:bg-sky-500"
                    />
                  </div>
                  <Alert className="border-slate-800/70 bg-slate-900/60">
                    <AlertTitle>Registro auditado</AlertTitle>
                    <AlertDescription>
                      Cada cambio queda almacenado en la bitácora de mantenimiento y se envía a SAP PM.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default function Page() {
  return <Dashboard />;
}
