import React from 'react';
import { AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';

export type SystemStatus = 'OK' | 'WARNING' | 'CRITICAL';

interface StatusIndicatorProps {
  status: SystemStatus;
}

export const StatusIndicator = ({ status }: StatusIndicatorProps) => {
  const getStatusColor = (status: SystemStatus) => {
    switch (status) {
      case 'OK': return 'text-emerald-400';
      case 'WARNING': return 'text-amber-400';
      case 'CRITICAL': return 'text-rose-400';
    }
  };

  const getStatusBg = (status: SystemStatus) => {
    switch (status) {
      case 'OK': return 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/30';
      case 'WARNING': return 'from-amber-500/20 to-amber-500/5 border-amber-500/30';
      case 'CRITICAL': return 'from-rose-500/20 to-rose-500/5 border-rose-500/30';
    }
  };

  const Icon = status === 'OK' ? CheckCircle2 : status === 'WARNING' ? AlertTriangle : XCircle;

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${getStatusBg(status)} backdrop-blur-sm border-2 rounded-3xl p-6 shadow-2xl sm:p-8`}>
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-3xl" />
      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        <div className={`self-start rounded-2xl p-4 sm:p-6 ${status === 'OK' ? 'bg-emerald-500/20' : status === 'WARNING' ? 'bg-amber-500/20' : 'bg-rose-500/20'}`}>
          <Icon className={`h-16 w-16 sm:h-20 sm:w-20 ${getStatusColor(status)} drop-shadow-lg`} />
        </div>
        <div>
          <div className="text-sm font-medium text-gray-400 uppercase tracking-wider">Estado del Sistema</div>
          <div className={`mt-2 text-4xl font-black tracking-tight sm:text-5xl ${getStatusColor(status)}`}>{status}</div>
          <div className="text-sm text-gray-400 mt-1">
            {status === 'OK' && 'Operación normal'}
            {status === 'WARNING' && 'Requiere atención'}
            {status === 'CRITICAL' && 'Acción inmediata necesaria'}
          </div>
        </div>
      </div>
    </div>
  );
};
