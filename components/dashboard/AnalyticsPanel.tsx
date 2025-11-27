import React from 'react';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Download, TrendingUp, Droplets, Zap } from 'lucide-react';

const tempData = [
    { time: 'Lun', max: 24, min: 12, avg: 18 },
    { time: 'Mar', max: 25, min: 13, avg: 19 },
    { time: 'Mie', max: 22, min: 11, avg: 16 },
    { time: 'Jue', max: 26, min: 14, avg: 20 },
    { time: 'Vie', max: 28, min: 15, avg: 21 },
    { time: 'Sab', max: 27, min: 14, avg: 20 },
    { time: 'Dom', max: 25, min: 13, avg: 19 },
];

const energyData = [
    { time: 'Lun', solar: 45, grid: 12 },
    { time: 'Mar', solar: 48, grid: 10 },
    { time: 'Mie', solar: 30, grid: 25 },
    { time: 'Jue', solar: 50, grid: 5 },
    { time: 'Vie', solar: 52, grid: 4 },
    { time: 'Sab', solar: 49, grid: 8 },
    { time: 'Dom', solar: 47, grid: 10 },
];

const waterData = [
    { time: 'Lun', irrigation: 1200, rain: 0 },
    { time: 'Mar', irrigation: 1100, rain: 0 },
    { time: 'Mie', irrigation: 800, rain: 15 },
    { time: 'Jue', irrigation: 1300, rain: 0 },
    { time: 'Vie', irrigation: 1250, rain: 0 },
    { time: 'Sab', irrigation: 1150, rain: 5 },
    { time: 'Dom', irrigation: 1200, rain: 0 },
];

export const AnalyticsPanel = () => {
    return (
        <div className="space-y-6">
            {/* Header Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="border-slate-700 text-gray-300 hover:bg-slate-800">
                        <Calendar className="w-4 h-4 mr-2" />
                        Últimos 7 Días
                    </Button>
                </div>
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
                    <Download className="w-4 h-4 mr-2" />
                    Exportar CSV
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Temperature Chart */}
                <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-rose-400" />
                            <CardTitle className="text-white">Tendencia Térmica</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={tempData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                    <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} unit="°C" />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                                        itemStyle={{ color: '#e2e8f0' }}
                                    />
                                    <Line type="monotone" dataKey="max" stroke="#f43f5e" strokeWidth={2} dot={false} name="Máx" />
                                    <Line type="monotone" dataKey="avg" stroke="#fbbf24" strokeWidth={2} dot={false} name="Prom" />
                                    <Line type="monotone" dataKey="min" stroke="#3b82f6" strokeWidth={2} dot={false} name="Mín" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Energy Chart */}
                <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Zap className="w-5 h-5 text-amber-400" />
                            <CardTitle className="text-white">Balance Energético (kWh)</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={energyData}>
                                    <defs>
                                        <linearGradient id="colorSolar" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#fbbf24" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorGrid" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#64748b" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#64748b" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                    <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                                        itemStyle={{ color: '#e2e8f0' }}
                                    />
                                    <Area type="monotone" dataKey="solar" stackId="1" stroke="#fbbf24" fill="url(#colorSolar)" name="Solar" />
                                    <Area type="monotone" dataKey="grid" stackId="1" stroke="#64748b" fill="url(#colorGrid)" name="Red" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Water Chart */}
                <Card className="lg:col-span-2 bg-slate-900/50 border-slate-800 backdrop-blur-sm">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Droplets className="w-5 h-5 text-blue-400" />
                            <CardTitle className="text-white">Gestión Hídrica (Litros)</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={waterData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                    <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                                        itemStyle={{ color: '#e2e8f0' }}
                                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                    />
                                    <Bar dataKey="irrigation" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Riego" />
                                    <Bar dataKey="rain" fill="#10b981" radius={[4, 4, 0, 0]} name="Lluvia Recolectada" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
