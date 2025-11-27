import React from 'react';
import { Save, RefreshCw, Wifi, Bell, Shield, Database, Cpu } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';

export const SettingsPanel = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar Navigation (Simulated) */}
            <div className="lg:col-span-1 space-y-4">
                <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
                    <CardContent className="p-4 space-y-2">
                        <Button variant="ghost" className="w-full justify-start bg-slate-800 text-white font-medium">
                            <Cpu className="w-4 h-4 mr-3" /> Sistema
                        </Button>
                        <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-white hover:bg-slate-800">
                            <Wifi className="w-4 h-4 mr-3" /> Red & Conectividad
                        </Button>
                        <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-white hover:bg-slate-800">
                            <Bell className="w-4 h-4 mr-3" /> Notificaciones
                        </Button>
                        <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-white hover:bg-slate-800">
                            <Shield className="w-4 h-4 mr-3" /> Seguridad
                        </Button>
                        <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-white hover:bg-slate-800">
                            <Database className="w-4 h-4 mr-3" /> Datos & Backup
                        </Button>
                    </CardContent>
                </Card>

                <Card className="bg-emerald-900/20 border-emerald-900/30">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-sm font-medium text-emerald-400">Sistema Operativo</span>
                        </div>
                        <div className="text-xs text-gray-400 space-y-1">
                            <p>Versión: v2.4.1-stable</p>
                            <p>Uptime: 14d 2h 12m</p>
                            <p>CPU: 12% | RAM: 45%</p>
                        </div>
                        <Button size="sm" variant="outline" className="w-full mt-4 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10">
                            <RefreshCw className="w-3 h-3 mr-2" /> Buscar Actualizaciones
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
                {/* Thresholds */}
                <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-white">Umbrales de Operación</CardTitle>
                        <CardDescription className="text-gray-400">Configura los límites para las alertas automáticas</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <Label className="text-gray-200">Temp. Máxima Invernadero</Label>
                                <span className="text-sm font-bold text-emerald-400">28°C</span>
                            </div>
                            <Slider defaultValue={[28]} max={40} step={1} className="py-2" />
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <Label className="text-gray-200">Temp. Mínima Crítica</Label>
                                <span className="text-sm font-bold text-rose-400">5°C</span>
                            </div>
                            <Slider defaultValue={[5]} max={15} step={0.5} className="py-2" />
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <Label className="text-gray-200">Humedad Objetivo (VPD)</Label>
                                <span className="text-sm font-bold text-blue-400">65%</span>
                            </div>
                            <Slider defaultValue={[65]} max={100} step={1} className="py-2" />
                        </div>
                    </CardContent>
                </Card>

                {/* Notifications */}
                <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-white">Canales de Notificación</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50">
                            <div className="space-y-0.5">
                                <Label className="text-base text-white">Alertas por Email</Label>
                                <p className="text-xs text-gray-400">Recibe reportes diarios y alertas críticas</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                        <Separator className="bg-slate-800" />
                        <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50">
                            <div className="space-y-0.5">
                                <Label className="text-base text-white">SMS / WhatsApp</Label>
                                <p className="text-xs text-gray-400">Solo para emergencias críticas (Costo adicional)</p>
                            </div>
                            <Switch />
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-4">
                    <Button variant="ghost" className="text-gray-400 hover:text-white">Cancelar</Button>
                    <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
                        <Save className="w-4 h-4 mr-2" /> Guardar Cambios
                    </Button>
                </div>
            </div>
        </div>
    );
};
