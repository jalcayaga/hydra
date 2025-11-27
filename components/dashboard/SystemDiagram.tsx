
import React from 'react';
import { Eye, Leaf, Home, Droplets, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
interface SystemDiagramProps {
    pumpOn: boolean;
    heaterOn: boolean;
    pipeHeaterOn: boolean;
    sensorData: {
        solarProduction: number;
        batteryLevel: number;
        pumpCasingTemp: number;
        flowRate: number;
    };
    isAgricultural: boolean;
}

export const SystemDiagram = ({ pumpOn, heaterOn, pipeHeaterOn, sensorData, isAgricultural }: SystemDiagramProps) => {
    return (
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-6 shadow-xl sm:p-8 relative">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <Eye className="w-6 h-6 text-blue-400" />
                    <h3 className="text-xl font-bold text-white">Vista del Sistema - 3 Zonas de Cultivo</h3>
                </div>
                <div className="flex gap-3">
                    <div className="flex items-center gap-2 text-sm px-3 py-1.5 bg-emerald-500/10 rounded-lg border border-emerald-500/30">
                        <Leaf className={`w - 4 h - 4 ${isAgricultural ? 'text-orange-400' : 'text-emerald-400'} `} />
                        <span className="text-emerald-300 font-medium">Exterior</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm px-3 py-1.5 bg-blue-500/10 rounded-lg border border-blue-500/30">
                        <Home className={`w - 4 h - 4 ${isAgricultural ? 'text-gray-400' : 'text-blue-400'} `} />
                        <span className="text-blue-300 font-medium">Invernadero</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm px-3 py-1.5 bg-purple-500/10 rounded-lg border border-purple-500/30">
                        <Droplets className={`w - 4 h - 4 ${isAgricultural ? 'text-yellow-400' : 'text-purple-400'} `} />
                        <span className="text-purple-300 font-medium">Hidropónico</span>
                    </div>
                </div>
            </div>

            <div className="relative min-h-[400px] h-[500px] md:h-[600px] rounded-2xl border border-slate-700/30 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-2 sm:p-4 md:p-8 overflow-hidden">
                {/* Animated background */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/30 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                    <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
                </div>

                <div className="h-full w-full overflow-x-auto overflow-y-hidden relative z-10">
                    <svg viewBox="0 0 1400 480" className="h-full w-full min-w-[900px] md:min-w-[1200px]" preserveAspectRatio="xMidYMid meet">
                        <defs>
                            <linearGradient id="waterFlow" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.8" />
                                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
                            </linearGradient>
                            <linearGradient id="energyFlow" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.3" />
                                <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.8" />
                                <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.3" />
                            </linearGradient>
                            <filter id="glow">
                                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                            <filter id="strongGlow">
                                <feGaussianBlur stdDeviation="5" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        {/* SECCIÓN IZQUIERDA: INFRAESTRUCTURA HÍDRICA */}

                        {/* Tanque Principal de Agua */}
                        <g filter="url(#glow)">
                            <rect x="50" y="150" width="120" height="180" fill="#020617" stroke="#3b82f6" strokeWidth="3" rx="10" />
                            <rect x="60" y="240" width="100" height="80" fill="#1e40af" opacity="0.6" rx="6">
                                <animate attributeName="opacity" values="0.6;0.4;0.6" dur="3s" repeatCount="indefinite" />
                            </rect>
                            <text x="110" y="200" textAnchor="middle" fill="#60a5fa" fontSize="14" fontWeight="bold">TANQUE</text>
                            <text x="110" y="220" textAnchor="middle" fill="#60a5fa" fontSize="12">PRINCIPAL</text>
                            <text x="110" y="290" textAnchor="middle" fill="#34d399" fontSize="20" fontWeight="bold">5,000L</text>
                            <text x="110" y="310" textAnchor="middle" fill="#94a3b8" fontSize="11">78%</text>
                        </g>

                        {/* Sistema de Bombeo Central */}
                        <g filter={pumpOn ? "url(#strongGlow)" : "url(#glow)"}>
                            <circle cx="250" cy="240" r="45" fill="#020617" stroke={pumpOn ? '#10b981' : '#64748b'} strokeWidth="3" />
                            <text x="250" y="235" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="bold">BOMBA</text>
                            <text x="250" y="250" textAnchor="middle" fill={pumpOn ? '#10b981' : '#64748b'} fontSize="11" fontWeight="bold">
                                {pumpOn ? 'ON' : 'OFF'}
                            </text>
                            <text x="250" y="265" textAnchor="middle" fill="#94a3b8" fontSize="9">{sensorData.flowRate.toFixed(1)} L/min</text>
                        </g>

                        {/* Tuberías principales */}
                        <line x1="170" y1="240" x2="205" y2="240" stroke="url(#waterFlow)" strokeWidth="8" strokeLinecap="round" />
                        <line x1="295" y1="240" x2="380" y2="240" stroke="url(#waterFlow)" strokeWidth="6" strokeLinecap="round" />

                        {/* SECCIÓN CENTRAL: 3 ZONAS DE CULTIVO (VERTICALMENTE ORDENADAS) */}

                        {/* Ramificación vertical a 3 zonas */}
                        <line x1="380" y1="240" x2="450" y2="100" stroke="url(#waterFlow)" strokeWidth="5" strokeLinecap="round" />
                        <line x1="380" y1="240" x2="450" y2="240" stroke="url(#waterFlow)" strokeWidth="5" strokeLinecap="round" />
                        <line x1="380" y1="240" x2="450" y2="380" stroke="url(#waterFlow)" strokeWidth="5" strokeLinecap="round" />

                        {/* ZONA 1: EXTERIOR (Arriba) */}
                        <g filter="url(#glow)">
                            <rect x="470" y="40" width="260" height="120" fill="#020617" stroke="#22c55e" strokeWidth="3" rx="12" />
                            <rect x="480" y="50" width="240" height="30" fill="#065f46" opacity="0.4" rx="8" />
                            <text x="600" y="72" textAnchor="middle" fill="#22c55e" fontSize="16" fontWeight="bold">🌱 EXTERIOR</text>

                            <circle cx="500" cy="98" r="6" fill="#10b981" />
                            <text x="515" y="102" fill="#e2e8f0" fontSize="11" fontWeight="500">Temp: 18°C</text>

                            <circle cx="500" cy="120" r="6" fill="#3b82f6" />
                            <text x="515" y="124" fill="#e2e8f0" fontSize="11" fontWeight="500">Hum: 65%</text>

                            <circle cx="500" cy="142" r="6" fill="#f59e0b" />
                            <text x="515" y="146" fill="#e2e8f0" fontSize="11" fontWeight="500">Suelo: OK</text>
                        </g>

                        {/* ZONA 2: INVERNADERO (Centro) */}
                        <g filter="url(#glow)">
                            <rect x="470" y="180" width="260" height="120" fill="#020617" stroke="#3b82f6" strokeWidth="3" rx="12" />
                            <rect x="480" y="190" width="240" height="30" fill="#1e3a8a" opacity="0.4" rx="8" />
                            <text x="600" y="212" textAnchor="middle" fill="#3b82f6" fontSize="16" fontWeight="bold">🏠 INVERNADERO</text>

                            <circle cx="500" cy="238" r="6" fill="#10b981" />
                            <text x="515" y="242" fill="#e2e8f0" fontSize="11" fontWeight="500">Temp: 24°C</text>

                            <circle cx="500" cy="260" r="6" fill="#3b82f6" />
                            <text x="515" y="264" fill="#e2e8f0" fontSize="11" fontWeight="500">Hum: 70%</text>

                            <circle cx="500" cy="282" r="6" fill="#a855f7" />
                            <text x="515" y="286" fill="#e2e8f0" fontSize="11" fontWeight="500">CO₂: 800ppm</text>
                        </g>

                        {/* ZONA 3: HIDROPÓNICO (Abajo) */}
                        <g filter="url(#glow)">
                            <rect x="470" y="320" width="260" height="120" fill="#020617" stroke="#a855f7" strokeWidth="3" rx="12" />
                            <rect x="480" y="330" width="240" height="30" fill="#581c87" opacity="0.4" rx="8" />
                            <text x="600" y="352" textAnchor="middle" fill="#a855f7" fontSize="16" fontWeight="bold">💧 HIDROPÓNICO</text>

                            <circle cx="500" cy="378" r="6" fill="#ec4899" />
                            <text x="515" y="382" fill="#e2e8f0" fontSize="11" fontWeight="500">pH: 6.2</text>

                            <circle cx="500" cy="400" r="6" fill="#06b6d4" />
                            <text x="515" y="404" fill="#e2e8f0" fontSize="11" fontWeight="500">EC: 1.8 mS</text>

                            <circle cx="500" cy="422" r="6" fill="#10b981" />
                            <text x="515" y="426" fill="#e2e8f0" fontSize="11" fontWeight="500">Temp: 21°C</text>
                        </g>

                        {/* SECCIÓN DERECHA: ENERGÍA Y CONTROL */}

                        {/* Paneles Solares */}
                        <g filter="url(#glow)">
                            <rect x="1050" y="50" width="180" height="100" fill="#020617" stroke="#eab308" strokeWidth="3" rx="10" />
                            {[0, 1, 2, 3, 4].map((i) => (
                                <line
                                    key={i}
                                    x1="1070"
                                    y1={70 + i * 16}
                                    x2="1220"
                                    y2={70 + i * 16}
                                    stroke="#eab308"
                                    strokeWidth="2"
                                    opacity={0.6}
                                />
                            ))}
                            <text x="1140" y="40" textAnchor="middle" fill="#eab308" fontSize="13" fontWeight="bold">⚡ SOLAR 15kW</text>
                            <text x="1140" y="135" textAnchor="middle" fill="#34d399" fontSize="16" fontWeight="bold">
                                {sensorData.solarProduction.toFixed(1)} kW
                            </text>
                        </g>

                        {/* Baterías */}
                        <g filter="url(#glow)">
                            <rect x="1050" y="180" width="180" height="100" fill="#020617" stroke="#22c55e" strokeWidth="3" rx="12" />
                            <rect x="1230" y="210" width="12" height="40" fill="#22c55e" rx="3" />
                            <rect
                                x="1060"
                                y="190"
                                width={Math.max(10, (sensorData.batteryLevel / 100) * 160)}
                                height="80"
                                fill="#22c55e"
                                opacity="0.6"
                                rx="5"
                            >
                                <animate attributeName="opacity" values="0.6;0.4;0.6" dur="3s" repeatCount="indefinite" />
                            </rect>
                            <text x="1140" y="235" textAnchor="middle" fill="#bbf7d0" fontSize="18" fontWeight="bold">
                                {sensorData.batteryLevel.toFixed(0)}%
                            </text>
                            <text x="1140" y="255" textAnchor="middle" fill="#4ade80" fontSize="11">30 kWh LiFePO4</text>
                        </g>

                        {/* Generador */}
                        <g filter="url(#glow)">
                            <rect x="1050" y="310" width="180" height="100" fill="#020617" stroke="#f97316" strokeWidth="3" rx="12" />
                            <text x="1140" y="345" textAnchor="middle" fill="#f97316" fontSize="14" fontWeight="bold">GENERADOR</text>
                            <text x="1140" y="365" textAnchor="middle" fill="#94a3b8" fontSize="11">20 kVA Diésel</text>
                            <circle cx="1140" cy="380" r="6" fill="#64748b" />
                            <text x="1140" y="395" textAnchor="middle" fill="#64748b" fontSize="9">STANDBY</text>
                        </g>

                        {/* Centro de Control */}
                        <g filter="url(#glow)">
                            <rect x="800" y="180" width="200" height="120" fill="#020617" stroke="#64748b" strokeWidth="3" rx="12" />
                            <rect x="810" y="190" width="180" height="30" fill="#1e293b" rx="6" />
                            <text x="900" y="210" textAnchor="middle" fill="#e2e8f0" fontSize="15" fontWeight="bold">CONTROL CENTRAL</text>
                            <text x="900" y="235" textAnchor="middle" fill="#38bdf8" fontSize="10">PLC + Servidor + Starlink</text>

                            {/* Status LEDs en fila */}
                            <circle cx="830" cy="265" r="6" fill={pumpOn ? "#22c55e" : "#374151"}>
                                {pumpOn && <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />}
                            </circle>
                            <circle cx="865" cy="265" r="6" fill={heaterOn ? "#eab308" : "#374151"}>
                                {heaterOn && <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />}
                            </circle>
                            <circle cx="900" cy="265" r="6" fill="#3b82f6">
                                <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
                            </circle>
                            <circle cx="935" cy="265" r="6" fill="#a855f7">
                                <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
                            </circle>
                            <circle cx="970" cy="265" r="6" fill="#f97316" />

                            <text x="900" y="288" textAnchor="middle" fill="#9ca3af" fontSize="9">Sistema Operativo</text>
                        </g>

                        {/* Conexiones de datos (Zonas → Control) */}
                        <g opacity="0.5">
                            <line x1="730" y1="100" x2="800" y2="220" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="5 5" />
                            <line x1="730" y1="240" x2="800" y2="240" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="5 5" />
                            <line x1="730" y1="380" x2="800" y2="260" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="5 5" />
                        </g>

                        {/* Conexiones de energía (Control → Energía) */}
                        <g opacity="0.4">
                            <line x1="1000" y1="220" x2="1050" y2="100" stroke="#fbbf24" strokeWidth="2" strokeDasharray="5 5" />
                            <line x1="1000" y1="240" x2="1050" y2="230" stroke="#22c55e" strokeWidth="2" strokeDasharray="5 5" />
                        </g>

                        {/* Indicadores de flujo animados */}
                        {pumpOn && (
                            <>
                                <circle cx="320" cy="240" r="4" fill="#3b82f6">
                                    <animate attributeName="cx" from="320" to="380" dur="2s" repeatCount="indefinite" />
                                    <animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite" />
                                </circle>
                                <circle cx="415" cy="170" r="3" fill="#22c55e">
                                    <animate attributeName="cy" from="240" to="100" dur="1.5s" repeatCount="indefinite" />
                                    <animate attributeName="opacity" values="1;0;1" dur="1.5s" repeatCount="indefinite" />
                                </circle>
                                <circle cx="415" cy="240" r="3" fill="#3b82f6">
                                    <animate attributeName="cx" from="380" to="450" dur="1.5s" repeatCount="indefinite" />
                                    <animate attributeName="opacity" values="1;0;1" dur="1.5s" repeatCount="indefinite" />
                                </circle>
                                <circle cx="415" cy="310" r="3" fill="#a855f7">
                                    <animate attributeName="cy" from="240" to="380" dur="1.5s" repeatCount="indefinite" />
                                    <animate attributeName="opacity" values="1;0;1" dur="1.5s" repeatCount="indefinite" />
                                </circle>
                            </>
                        )}
                    </svg>
                </div>
            </div>
        </div>
    );
};
