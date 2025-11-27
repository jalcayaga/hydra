import React from 'react';
import { Sun, CloudRain, Battery, Zap, Droplets } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const SustainabilityPanel = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Energy Management */}
            <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Sun className="w-5 h-5 text-amber-400" />
                        <CardTitle className="text-white">Gestión Energética</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="relative h-64 flex items-center justify-center">
                        {/* Solar */}
                        <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 z-10">
                            <div className="relative">
                                <div className="absolute inset-0 bg-amber-500/30 rounded-full blur-xl animate-pulse"></div>
                                <div className="relative p-4 rounded-full bg-gradient-to-br from-amber-500/30 to-amber-600/30 border-2 border-amber-500/60">
                                    <Sun className="w-8 h-8 text-amber-400" />
                                </div>
                            </div>
                            <div className="text-center bg-slate-800/80 px-3 py-2 rounded-lg border border-amber-500/30">
                                <div className="text-xs text-amber-300 font-medium">Solar</div>
                                <div className="text-lg font-black text-white">4.2 kW</div>
                            </div>
                        </div>

                        {/* Battery */}
                        <div className="absolute top-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10">
                            <div className="relative">
                                <div className="absolute inset-0 bg-emerald-500/30 rounded-full blur-xl animate-pulse"></div>
                                <div className="relative p-4 rounded-full bg-gradient-to-br from-emerald-500/30 to-emerald-600/30 border-2 border-emerald-500/60">
                                    <Battery className="w-8 h-8 text-emerald-400" />
                                </div>
                            </div>
                            <div className="text-center bg-slate-800/80 px-3 py-2 rounded-lg border border-emerald-500/30">
                                <div className="text-xs text-emerald-300 font-medium">Batería</div>
                                <div className="text-lg font-black text-white">87%</div>
                            </div>
                        </div>

                        {/* Grid/Load */}
                        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 z-10">
                            <div className="relative">
                                <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-xl animate-pulse"></div>
                                <div className="relative p-4 rounded-full bg-gradient-to-br from-blue-500/30 to-blue-600/30 border-2 border-blue-500/60">
                                    <Zap className="w-8 h-8 text-blue-400" />
                                </div>
                            </div>
                            <div className="text-center bg-slate-800/80 px-3 py-2 rounded-lg border border-blue-500/30">
                                <div className="text-xs text-blue-300 font-medium">Consumo</div>
                                <div className="text-lg font-black text-white">2.1 kW</div>
                            </div>
                        </div>

                        {/* Animated Flow Lines */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 256" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="solarFlow" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#fbbf24" stopOpacity="0" />
                                    <stop offset="50%" stopColor="#fbbf24" stopOpacity="1" />
                                    <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
                                </linearGradient>
                                <linearGradient id="batteryFlow" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#34d399" stopOpacity="0" />
                                    <stop offset="50%" stopColor="#34d399" stopOpacity="1" />
                                    <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            {/* Solar to Battery */}
                            <path
                                d="M 80 128 Q 150 80, 200 60"
                                stroke="url(#solarFlow)"
                                strokeWidth="3"
                                fill="none"
                                strokeDasharray="10 5"
                                className="animate-pulse"
                            />
                            {/* Battery to Load */}
                            <path
                                d="M 200 60 Q 250 80, 320 128"
                                stroke="url(#batteryFlow)"
                                strokeWidth="3"
                                fill="none"
                                strokeDasharray="10 5"
                                className="animate-pulse"
                                style={{ animationDelay: '0.5s' }}
                            />
                            {/* Flow indicators */}
                            <circle cx="120" cy="100" r="3" fill="#fbbf24" className="animate-ping" />
                            <circle cx="280" cy="100" r="3" fill="#34d399" className="animate-ping" style={{ animationDelay: '0.5s' }} />
                        </svg>
                    </div>
                </CardContent>
            </Card>

            {/* Water Management */}
            <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <CloudRain className="w-5 h-5 text-blue-400" />
                        <CardTitle className="text-white">Recolección de Aguas Lluvia</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between gap-8">
                        <div className="relative w-24 h-32 bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
                            <div className="absolute bottom-0 w-full h-[75%] bg-blue-500/60 backdrop-blur-sm transition-all duration-1000">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xl font-black text-white drop-shadow-md">75%</span>
                            </div>
                        </div>
                        <div className="flex-1 space-y-4">
                            <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <CloudRain className="w-5 h-5 text-blue-400" />
                                    <span className="text-sm text-gray-300">Lluvia Hoy</span>
                                </div>
                                <span className="font-bold text-white">12 mm</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Droplets className="w-5 h-5 text-emerald-400" />
                                    <span className="text-sm text-gray-300">Recolectado</span>
                                </div>
                                <span className="font-bold text-white">450 L</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
