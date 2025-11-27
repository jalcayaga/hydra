import React from 'react';
import {
    ComposedChart,
    Line,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceArea
} from 'recharts';
import { Leaf, Droplets, Sprout, Timer, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const vpdData = [
    { time: '00:00', vpd: 0.4, temp: 18, humidity: 85 },
    { time: '04:00', vpd: 0.3, temp: 17, humidity: 88 },
    { time: '08:00', vpd: 0.8, temp: 22, humidity: 75 },
    { time: '12:00', vpd: 1.2, temp: 26, humidity: 60 },
    { time: '16:00', vpd: 1.4, temp: 28, humidity: 55 },
    { time: '20:00', vpd: 0.9, temp: 23, humidity: 70 },
    { time: '23:59', vpd: 0.6, temp: 20, humidity: 80 },
];

const NutrientTank = ({ label, value, max, color, unit }: any) => (
    <div className="flex flex-col items-center gap-2">
        <div className="relative h-32 w-12 rounded-full bg-slate-800 border border-slate-700 overflow-hidden">
            <div
                className={`absolute bottom-0 w-full transition-all duration-1000 ${color}`}
                style={{ height: `${(value / max) * 100}%` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent pointer-events-none" />
        </div>
        <div className="text-center">
            <div className="text-xs font-bold text-gray-400">{label}</div>
            <div className="text-sm font-bold text-white">{value}{unit}</div>
        </div>
    </div>
);

export const AgronomyPanel = () => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* VPD Chart */}
                <Card className="lg:col-span-2 bg-slate-900/50 border-slate-800 backdrop-blur-sm">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Leaf className="w-5 h-5 text-emerald-400" />
                                <CardTitle className="text-white">Déficit de Presión de Vapor (VPD)</CardTitle>
                            </div>
                            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                                Óptimo: 0.8 - 1.2 kPa
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <ComposedChart data={vpdData}>
                                    <defs>
                                        <linearGradient id="vpdGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                    <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} unit=" kPa" />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                                        itemStyle={{ color: '#e2e8f0' }}
                                    />
                                    <ReferenceArea y1={0.8} y2={1.2} fill="#10b981" fillOpacity={0.1} />
                                    <Area type="monotone" dataKey="vpd" stroke="#10b981" strokeWidth={3} fill="url(#vpdGradient)" />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Crop Cycle */}
                <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Sprout className="w-5 h-5 text-emerald-400" />
                            <CardTitle className="text-white">Ciclo de Cultivo</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="text-center">
                            <div className="text-4xl font-black text-white mb-1">Día 42</div>
                            <div className="text-sm text-emerald-400 font-medium">Fase Vegetativa Tardía</div>
                        </div>

                        <div className="relative pt-2">
                            <div className="flex mb-2 items-center justify-between">
                                <div className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-emerald-600 bg-emerald-200">
                                    Progreso
                                </div>
                                <div className="text-right">
                                    <span className="text-xs font-semibold inline-block text-emerald-400">
                                        65%
                                    </span>
                                </div>
                            </div>
                            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-slate-700">
                                <div style={{ width: "65%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500"></div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-500/10 rounded-lg">
                                    <Timer className="w-5 h-5 text-blue-400" />
                                </div>
                                <div>
                                    <div className="text-xs text-gray-400">Cosecha Est.</div>
                                    <div className="text-sm font-bold text-white">15 Nov</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-amber-500/10 rounded-lg">
                                    <AlertCircle className="w-5 h-5 text-amber-400" />
                                </div>
                                <div>
                                    <div className="text-xs text-gray-400">Riesgo Plagas</div>
                                    <div className="text-sm font-bold text-white">Bajo</div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Nutrients */}
            <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Droplets className="w-5 h-5 text-blue-400" />
                            <CardTitle className="text-white">Estado de Nutrientes (Fertirriego)</CardTitle>
                        </div>
                        <div className="flex gap-4 text-sm">
                            <div className="flex items-center gap-2">
                                <span className="text-gray-400">pH:</span>
                                <span className="font-bold text-emerald-400">6.2</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-gray-400">EC:</span>
                                <span className="font-bold text-blue-400">1.8 mS/cm</span>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap justify-around gap-8 py-4">
                        <NutrientTank label="Nitrógeno (N)" value={85} max={100} unit="%" color="bg-blue-500" />
                        <NutrientTank label="Fósforo (P)" value={45} max={100} unit="%" color="bg-purple-500" />
                        <NutrientTank label="Potasio (K)" value={60} max={100} unit="%" color="bg-amber-500" />
                        <NutrientTank label="Calcio (Ca)" value={90} max={100} unit="%" color="bg-slate-400" />
                        <NutrientTank label="Magnesio (Mg)" value={30} max={100} unit="%" color="bg-emerald-500" />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
