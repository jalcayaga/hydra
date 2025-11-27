import React from 'react';
import { Wifi, Globe, Activity, ArrowUp, ArrowDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const ConnectivityStatus = () => {
    return (
        <Card className="bg-slate-900/80 border-slate-800 backdrop-blur-sm">
            <CardContent className="p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-white/5 rounded-full border border-white/10 relative">
                            <Globe className="w-6 h-6 text-white" />
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-900 animate-pulse" />
                        </div>
                        <div>
                            <div className="text-xs font-medium text-gray-400 uppercase tracking-wider">Red Satelital</div>
                            <div className="text-lg font-bold text-white flex items-center gap-2">
                                STARLINK <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">CONECTADO</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 text-sm">
                        <div className="flex flex-col items-end">
                            <span className="text-gray-500 text-xs">Latencia</span>
                            <span className="font-mono font-bold text-white flex items-center gap-1">
                                <Activity className="w-3 h-3 text-emerald-400" /> 24ms
                            </span>
                        </div>
                        <div className="w-px h-8 bg-slate-800" />
                        <div className="flex flex-col items-end">
                            <span className="text-gray-500 text-xs">Bajada</span>
                            <span className="font-mono font-bold text-white flex items-center gap-1">
                                <ArrowDown className="w-3 h-3 text-blue-400" /> 180 Mbps
                            </span>
                        </div>
                        <div className="w-px h-8 bg-slate-800" />
                        <div className="flex flex-col items-end">
                            <span className="text-gray-500 text-xs">Subida</span>
                            <span className="font-mono font-bold text-white flex items-center gap-1">
                                <ArrowUp className="w-3 h-3 text-purple-400" /> 25 Mbps
                            </span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
