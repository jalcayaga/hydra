import React from 'react';
import { Badge } from '@/components/ui/badge';

interface MetricCardProps {
    icon: any;
    label: string;
    value: string | number;
    unit: string;
    trend?: number;
    color?: 'blue' | 'green' | 'amber' | 'rose' | 'purple';
}

export const MetricCard = ({ icon: Icon, label, value, unit, trend, color = 'blue' }: MetricCardProps) => {
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
