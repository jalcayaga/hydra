import React from 'react';
import { Switch } from '@/components/ui/switch';

interface ControlSwitchProps {
    label: string;
    icon: any;
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
}

export const ControlSwitch = ({ label, icon: Icon, checked, onChange, disabled = false }: ControlSwitchProps) => (
    <div
        className={`bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border ${checked ? 'border-emerald-500/40 shadow-emerald-500/20' : 'border-slate-700/50'
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
