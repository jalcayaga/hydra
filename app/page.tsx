'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import {
  AlertTriangle,
  Thermometer,
  Droplets,
  Zap,
  Activity,
  Power,
  Sun,
  Battery,
  Gauge,
  Bell,
  Settings,
  BarChart3,
  Map,
  Server,
  AlertCircle,

  Waves,
  Eye,
  Wifi,
  Sprout,
  Camera,
  Leaf,
  Flame
} from 'lucide-react';
import { StatusIndicator, SystemStatus } from '@/components/dashboard/StatusIndicator';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { SensorCard } from '@/components/dashboard/SensorCard';
import { ControlSwitch } from '@/components/dashboard/ControlSwitch';
import { SystemDiagram } from '@/components/dashboard/SystemDiagram';
import { AgronomyPanel } from '@/components/dashboard/AgronomyPanel';
import { SustainabilityPanel } from '@/components/dashboard/SustainabilityPanel';
import { ConnectivityStatus } from '@/components/dashboard/ConnectivityStatus';
import { CameraFeed } from '@/components/dashboard/CameraFeed';
import { AlarmsPanel } from '@/components/dashboard/AlarmsPanel';
import { AnalyticsPanel } from '@/components/dashboard/AnalyticsPanel';
import { SettingsPanel } from '@/components/dashboard/SettingsPanel';
import { ZonePanel } from '@/components/dashboard/ZonePanel';

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
  const [isAgricultural, setIsAgricultural] = useState(true); // Default to agricultural for this user

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
                <h1 className="text-xl font-black text-white tracking-tight sm:text-2xl">Hydra SCADA</h1>
                <p className="text-xs text-gray-400 font-medium sm:text-sm">Sistema de Gestión de Invernadero</p>
              </div>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:justify-end">
              {/* Connectivity Status (Compact) */}
              <div className="hidden lg:block">
                <ConnectivityStatus />
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-200"
                  onClick={() => setIsAgricultural(!isAgricultural)}
                >
                  {isAgricultural ? <Leaf className="w-4 h-4 mr-2 text-emerald-400" /> : <Flame className="w-4 h-4 mr-2 text-orange-400" />}
                  <span className="hidden sm:inline">{isAgricultural ? 'Modo Agrícola' : 'Modo Industrial'}</span>
                </Button>
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
        <div className="sticky top-[60px] z-40 border-b border-slate-800/50 bg-slate-900/70 px-4 py-2 backdrop-blur-sm sm:top-[78px] sm:px-6 overflow-x-auto">
          <TabsList className="bg-transparent p-0 flex justify-start w-full">
            <TabsTrigger
              value="home"
              className="min-w-[100px] gap-2 px-3 py-2 text-[0.7rem] data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/20 data-[state=active]:to-cyan-500/20 data-[state=active]:shadow-lg sm:px-4 sm:text-sm"
            >
              <Map className="w-4 h-4 mr-2" />
              General
            </TabsTrigger>
            <TabsTrigger
              value="agronomy"
              className="min-w-[100px] gap-2 px-3 py-2 text-[0.7rem] data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500/20 data-[state=active]:to-green-500/20 data-[state=active]:shadow-lg sm:px-4 sm:text-sm"
            >
              <Sprout className="w-4 h-4 mr-2" />
              Agronomía
            </TabsTrigger>
            <TabsTrigger
              value="sensors"
              className="min-w-[100px] gap-2 px-3 py-2 text-[0.7rem] data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/20 data-[state=active]:to-cyan-500/20 data-[state=active]:shadow-lg sm:px-4 sm:text-sm"
            >
              <Activity className="w-4 h-4 mr-2" />
              Sensores
            </TabsTrigger>
            <TabsTrigger
              value="control"
              className="min-w-[100px] gap-2 px-3 py-2 text-[0.7rem] data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/20 data-[state=active]:to-cyan-500/20 data-[state=active]:shadow-lg sm:px-4 sm:text-sm"
            >
              <Power className="w-4 h-4 mr-2" />
              Control
            </TabsTrigger>
            <TabsTrigger
              value="cameras"
              className="min-w-[100px] gap-2 px-3 py-2 text-[0.7rem] data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/20 data-[state=active]:to-pink-500/20 data-[state=active]:shadow-lg sm:px-4 sm:text-sm"
            >
              <Camera className="w-4 h-4 mr-2" />
              Cámaras
            </TabsTrigger>
            <TabsTrigger
              value="alarms"
              className="min-w-[100px] gap-2 px-3 py-2 text-[0.7rem] data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/20 data-[state=active]:to-cyan-500/20 data-[state=active]:shadow-lg sm:px-4 sm:text-sm"
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Alarmas
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="min-w-[100px] gap-2 px-3 py-2 text-[0.7rem] data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/20 data-[state=active]:to-cyan-500/20 data-[state=active]:shadow-lg sm:px-4 sm:text-sm"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Analítica
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="min-w-[100px] gap-2 px-3 py-2 text-[0.7rem] data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/20 data-[state=active]:to-cyan-500/20 data-[state=active]:shadow-lg sm:px-4 sm:text-sm"
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

            {/* Zone Panel - 3 Cultivation Zones */}
            <ZonePanel />

            {/* Sustainability Panel */}
            <SustainabilityPanel />

            {/* Diagrama del sistema */}
            <SystemDiagram
              pumpOn={pumpOn}
              heaterOn={heaterOn}
              pipeHeaterOn={pipeHeaterOn}
              sensorData={sensorData}
              isAgricultural={isAgricultural}
            />
          </TabsContent>

          {/* AGRONOMY */}
          <TabsContent value="agronomy" className="mt-0 space-y-6">
            <AgronomyPanel />
          </TabsContent>

          {/* CAMERAS */}
          <TabsContent value="cameras" className="mt-0 space-y-6">
            <CameraFeed />
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
                    className={`w-full font-bold ${emergencyStop ? 'border-emerald-500/60 text-emerald-300' : ''
                      }`}
                    onClick={() => setEmergencyStop(!emergencyStop)}
                  >
                    {emergencyStop ? 'REARMAR SISTEMA' : 'PARADA DE EMERGENCIA'}
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* ALARMS */}
          <TabsContent value="alarms" className="mt-0 space-y-6">
            <AlarmsPanel />
          </TabsContent>

          {/* ANALYTICS */}
          <TabsContent value="analytics" className="mt-0 space-y-6">
            <AnalyticsPanel />
          </TabsContent>

          {/* SETTINGS */}
          <TabsContent value="settings" className="mt-0 space-y-6">
            <SettingsPanel />
          </TabsContent>

        </div>
      </Tabs>
    </div>
  );
};

export default Dashboard;
