import React from 'react';
import { Badge } from '@/components/ui/badge';

interface SensorCardProps {
    icon: any;
    label: string;
    value: number;
    unit: string;
    status?: 'OK' | 'WARNING' | 'CRITICAL';
    min?: number;
    max?: number;
    color?: 'blue' | 'green' | 'amber' | 'rose' | 'purple';
}

export const SensorCard = ({ icon: Icon, label, value, unit, status = 'OK', min, max, color = 'blue' }: SensorCardProps) => {
    const percentage = typeof value === 'number' && min !== undefined && max !== undefined
        ? ((value - min) / (max - min)) * 100
        : null;

    const colorMap: any = {
        blue: 'text-blue-400 bg-blue-500/10',
        green: 'text-emerald-400 bg-emerald-500/10',
        amber: 'text-amber-400 bg-amber-500/10',
        rose: 'text-rose-400 bg-rose-500/10',
        purple: 'text-purple-400 bg-purple-500/10',
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
                        className={`absolute h-2 rounded-full transition-all duration-500 ${status === 'OK' ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' :
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
