import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, Info, XCircle, Filter, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

type AlarmSeverity = 'info' | 'warning' | 'critical';

interface Alarm {
    id: string;
    type: string;
    severity: AlarmSeverity;
    message: string;
    timestamp: Date;
    acknowledged: boolean;
}

const initialAlarms: Alarm[] = [
    {
        id: '1',
        type: 'Térmica',
        severity: 'warning',
        message: 'Temperatura carcasa aproximándose a límite inferior',
        timestamp: new Date(Date.now() - 3600000),
        acknowledged: false
    },
    {
        id: '2',
        type: 'Sistema',
        severity: 'info',
        message: 'Respaldo automático completado',
        timestamp: new Date(Date.now() - 7200000),
        acknowledged: true
    },
    {
        id: '3',
        type: 'Conectividad',
        severity: 'critical',
        message: 'Pérdida momentánea de señal satelital',
        timestamp: new Date(Date.now() - 18000000),
        acknowledged: true
    },
    {
        id: '4',
        type: 'Riego',
        severity: 'warning',
        message: 'Presión baja en sector 3',
        timestamp: new Date(Date.now() - 86400000),
        acknowledged: true
    }
];

export const AlarmsPanel = () => {
    const [alarms, setAlarms] = useState<Alarm[]>(initialAlarms);
    const [filter, setFilter] = useState<'all' | 'active' | 'history'>('active');

    const filteredAlarms = alarms.filter(alarm => {
        if (filter === 'active') return !alarm.acknowledged;
        if (filter === 'history') return alarm.acknowledged;
        return true;
    });

    const acknowledgeAlarm = (id: string) => {
        setAlarms(prev =>
            prev.map(a => a.id === id ? { ...a, acknowledged: true } : a)
        );
    };

    const getSeverityColor = (severity: AlarmSeverity) => {
        switch (severity) {
            case 'info': return 'text-blue-400 border-blue-500/30 bg-blue-500/10';
            case 'warning': return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
            case 'critical': return 'text-rose-400 border-rose-500/30 bg-rose-500/10';
        }
    };

    const getSeverityIcon = (severity: AlarmSeverity) => {
        switch (severity) {
            case 'info': return <Info className="w-5 h-5 text-blue-400" />;
            case 'warning': return <AlertTriangle className="w-5 h-5 text-amber-400" />;
            case 'critical': return <XCircle className="w-5 h-5 text-rose-400" />;
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Alarm Stats */}
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-rose-500/10 border-rose-500/20 backdrop-blur-sm">
                    <CardContent className="p-6 flex items-center justify-between">
                        <div>
                            <div className="text-sm text-rose-200">Críticas Activas</div>
                            <div className="text-3xl font-bold text-rose-400">
                                {alarms.filter(a => a.severity === 'critical' && !a.acknowledged).length}
                            </div>
                        </div>
                        <XCircle className="w-10 h-10 text-rose-400 opacity-50" />
                    </CardContent>
                </Card>
                <Card className="bg-amber-500/10 border-amber-500/20 backdrop-blur-sm">
                    <CardContent className="p-6 flex items-center justify-between">
                        <div>
                            <div className="text-sm text-amber-200">Advertencias</div>
                            <div className="text-3xl font-bold text-amber-400">
                                {alarms.filter(a => a.severity === 'warning' && !a.acknowledged).length}
                            </div>
                        </div>
                        <AlertTriangle className="w-10 h-10 text-amber-400 opacity-50" />
                    </CardContent>
                </Card>
                <Card className="bg-blue-500/10 border-blue-500/20 backdrop-blur-sm">
                    <CardContent className="p-6 flex items-center justify-between">
                        <div>
                            <div className="text-sm text-blue-200">Total Hoy</div>
                            <div className="text-3xl font-bold text-blue-400">
                                {alarms.filter(a => a.timestamp > new Date(Date.now() - 86400000)).length}
                            </div>
                        </div>
                        <Info className="w-10 h-10 text-blue-400 opacity-50" />
                    </CardContent>
                </Card>
            </div>

            {/* Main List */}
            <Card className="lg:col-span-3 bg-slate-900/50 border-slate-800 backdrop-blur-sm h-[600px] flex flex-col">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-white" />
                        <CardTitle className="text-white">Registro de Eventos</CardTitle>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant={filter === 'active' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setFilter('active')}
                            className={filter === 'active' ? 'bg-rose-500 hover:bg-rose-600' : 'border-slate-700 text-gray-300'}
                        >
                            Activas
                        </Button>
                        <Button
                            variant={filter === 'history' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setFilter('history')}
                            className={filter === 'history' ? 'bg-blue-500 hover:bg-blue-600' : 'border-slate-700 text-gray-300'}
                        >
                            Historial
                        </Button>
                        <Button
                            variant={filter === 'all' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setFilter('all')}
                            className={filter === 'all' ? 'bg-slate-700' : 'border-slate-700 text-gray-300'}
                        >
                            Todas
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-hidden">
                    <ScrollArea className="h-full pr-4">
                        <div className="space-y-3">
                            {filteredAlarms.length === 0 ? (
                                <div className="text-center py-20 text-gray-500">
                                    <CheckCircle2 className="w-16 h-16 mx-auto mb-4 opacity-20" />
                                    <p>No hay alarmas para mostrar</p>
                                </div>
                            ) : (
                                filteredAlarms.map((alarm) => (
                                    <div
                                        key={alarm.id}
                                        className={`flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl border transition-all ${!alarm.acknowledged ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-900/50 border-slate-800 opacity-70'
                                            }`}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className={`p-3 rounded-full border ${getSeverityColor(alarm.severity)}`}>
                                                {getSeverityIcon(alarm.severity)}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-bold text-white">{alarm.type}</span>
                                                    <Badge variant="outline" className="text-xs border-slate-600 text-slate-400">
                                                        {alarm.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </Badge>
                                                </div>
                                                <p className="text-gray-300 text-sm">{alarm.message}</p>
                                            </div>
                                        </div>

                                        {!alarm.acknowledged && (
                                            <Button
                                                size="sm"
                                                onClick={() => acknowledgeAlarm(alarm.id)}
                                                className="bg-slate-700 hover:bg-slate-600 text-white whitespace-nowrap"
                                            >
                                                Reconocer
                                            </Button>
                                        )}
                                        {alarm.acknowledged && (
                                            <div className="flex items-center gap-2 text-emerald-500 text-sm font-medium px-3 py-1.5 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                                                <CheckCircle2 className="w-4 h-4" />
                                                Resuelto
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    );
};
