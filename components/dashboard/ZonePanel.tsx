import React, { useState } from 'react';
import { Leaf, Home, Droplets, Thermometer, Wind, Sun, Activity, Gauge } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const ZonePanel = () => {
    const [activeZone, setActiveZone] = useState('exterior');

    return (
        <div className="space-y-6">
            {/* Zone Selector */}
            <Tabs value={activeZone} onValueChange={setActiveZone} className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-slate-800/50">
                    <TabsTrigger
                        value="exterior"
                        className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400"
                    >
                        <Leaf className="w-4 h-4 mr-2" />
                        Exterior
                    </TabsTrigger>
                    <TabsTrigger
                        value="greenhouse"
                        className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400"
                    >
                        <Home className="w-4 h-4 mr-2" />
                        Invernadero
                    </TabsTrigger>
                    <TabsTrigger
                        value="hydroponic"
                        className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
                    >
                        <Droplets className="w-4 h-4 mr-2" />
                        Hidropónico
                    </TabsTrigger>
                </TabsList>

                {/* EXTERIOR */}
                <TabsContent value="exterior" className="mt-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Card className="bg-emerald-900/20 border-emerald-900/30">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm flex items-center gap-2 text-emerald-400">
                                    <Thermometer className="w-4 h-4" />
                                    Temperatura
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-white">18°C</div>
                                <div className="text-xs text-gray-400 mt-1">Rango: 12-25°C</div>
                            </CardContent>
                        </Card>

                        <Card className="bg-emerald-900/20 border-emerald-900/30">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm flex items-center gap-2 text-emerald-400">
                                    <Droplets className="w-4 h-4" />
                                    Humedad Suelo
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-white">65%</div>
                                <div className="text-xs text-gray-400 mt-1">Óptimo: 60-70%</div>
                            </CardContent>
                        </Card>

                        <Card className="bg-emerald-900/20 border-emerald-900/30">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm flex items-center gap-2 text-emerald-400">
                                    <Sun className="w-4 h-4" />
                                    Radiación Solar
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-white">850</div>
                                <div className="text-xs text-gray-400 mt-1">W/m² (Bueno)</div>
                            </CardContent>
                        </Card>

                        <Card className="bg-emerald-900/20 border-emerald-900/30">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm flex items-center gap-2 text-emerald-400">
                                    <Wind className="w-4 h-4" />
                                    Viento
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-white">12</div>
                                <div className="text-xs text-gray-400 mt-1">km/h NE</div>
                            </CardContent>
                        </Card>

                        <Card className="bg-emerald-900/20 border-emerald-900/30">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm flex items-center gap-2 text-emerald-400">
                                    <Gauge className="w-4 h-4" />
                                    pH Suelo
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-white">6.8</div>
                                <div className="text-xs text-gray-400 mt-1">Neutro</div>
                            </CardContent>
                        </Card>

                        <Card className="bg-emerald-900/20 border-emerald-900/30">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm flex items-center gap-2 text-emerald-400">
                                    <Activity className="w-4 h-4" />
                                    Riego Activo
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-emerald-400">ON</div>
                                <div className="text-xs text-gray-400 mt-1">Goteo 2.5 L/h</div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="bg-emerald-900/10 border-emerald-900/20">
                        <CardHeader>
                            <CardTitle className="text-white">Estado del Cultivo</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-300">Tipo de Cultivo</span>
                                    <span className="font-bold text-white">Tomates</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-300">Días desde siembra</span>
                                    <span className="font-bold text-white">45 días</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-300">Fase</span>
                                    <span className="font-bold text-emerald-400">Floración</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* INVERNADERO */}
                <TabsContent value="greenhouse" className="mt-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Card className="bg-blue-900/20 border-blue-900/30">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm flex items-center gap-2 text-blue-400">
                                    <Thermometer className="w-4 h-4" />
                                    Temperatura
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-white">24°C</div>
                                <div className="text-xs text-gray-400 mt-1">Objetivo: 22-26°C</div>
                            </CardContent>
                        </Card>

                        <Card className="bg-blue-900/20 border-blue-900/30">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm flex items-center gap-2 text-blue-400">
                                    <Droplets className="w-4 h-4" />
                                    Humedad Relativa
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-white">70%</div>
                                <div className="text-xs text-gray-400 mt-1">Óptimo</div>
                            </CardContent>
                        </Card>

                        <Card className="bg-blue-900/20 border-blue-900/30">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm flex items-center gap-2 text-blue-400">
                                    <Activity className="w-4 h-4" />
                                    CO₂
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-white">800</div>
                                <div className="text-xs text-gray-400 mt-1">ppm (Bueno)</div>
                            </CardContent>
                        </Card>

                        <Card className="bg-blue-900/20 border-blue-900/30">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm flex items-center gap-2 text-blue-400">
                                    <Sun className="w-4 h-4" />
                                    PAR
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-white">450</div>
                                <div className="text-xs text-gray-400 mt-1">µmol/m²/s</div>
                            </CardContent>
                        </Card>

                        <Card className="bg-blue-900/20 border-blue-900/30">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm flex items-center gap-2 text-blue-400">
                                    <Wind className="w-4 h-4" />
                                    Ventilación
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-blue-400">AUTO</div>
                                <div className="text-xs text-gray-400 mt-1">45% Apertura</div>
                            </CardContent>
                        </Card>

                        <Card className="bg-blue-900/20 border-blue-900/30">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm flex items-center gap-2 text-blue-400">
                                    <Thermometer className="w-4 h-4" />
                                    Calefacción
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-gray-500">OFF</div>
                                <div className="text-xs text-gray-400 mt-1">No requerida</div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="bg-blue-900/10 border-blue-900/20">
                        <CardHeader>
                            <CardTitle className="text-white">Control Climático</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-300">Cortinas</span>
                                    <span className="font-bold text-white">50% Cerradas</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-300">Nebulización</span>
                                    <span className="font-bold text-blue-400">Activa</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-300">Iluminación LED</span>
                                    <span className="font-bold text-white">6h restantes</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* HIDROPÓNICO */}
                <TabsContent value="hydroponic" className="mt-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Card className="bg-purple-900/20 border-purple-900/30">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm flex items-center gap-2 text-purple-400">
                                    <Gauge className="w-4 h-4" />
                                    pH
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-white">6.2</div>
                                <div className="text-xs text-gray-400 mt-1">Objetivo: 5.8-6.5</div>
                            </CardContent>
                        </Card>

                        <Card className="bg-purple-900/20 border-purple-900/30">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm flex items-center gap-2 text-purple-400">
                                    <Activity className="w-4 h-4" />
                                    EC
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-white">1.8</div>
                                <div className="text-xs text-gray-400 mt-1">mS/cm (Óptimo)</div>
                            </CardContent>
                        </Card>

                        <Card className="bg-purple-900/20 border-purple-900/30">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm flex items-center gap-2 text-purple-400">
                                    <Thermometer className="w-4 h-4" />
                                    Temp. Solución
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-white">21°C</div>
                                <div className="text-xs text-gray-400 mt-1">Ideal: 18-22°C</div>
                            </CardContent>
                        </Card>

                        <Card className="bg-purple-900/20 border-purple-900/30">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm flex items-center gap-2 text-purple-400">
                                    <Droplets className="w-4 h-4" />
                                    OD
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-white">8.2</div>
                                <div className="text-xs text-gray-400 mt-1">mg/L (Bueno)</div>
                            </CardContent>
                        </Card>

                        <Card className="bg-purple-900/20 border-purple-900/30">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm flex items-center gap-2 text-purple-400">
                                    <Activity className="w-4 h-4" />
                                    Bomba NFT
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-purple-400">ON</div>
                                <div className="text-xs text-gray-400 mt-1">Flujo continuo</div>
                            </CardContent>
                        </Card>

                        <Card className="bg-purple-900/20 border-purple-900/30">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm flex items-center gap-2 text-purple-400">
                                    <Sun className="w-4 h-4" />
                                    LED Espectro
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-white">100%</div>
                                <div className="text-xs text-gray-400 mt-1">Full spectrum</div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="bg-purple-900/10 border-purple-900/20">
                        <CardHeader>
                            <CardTitle className="text-white">Dosificación de Nutrientes</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-300">Tanque A (NPK)</span>
                                    <span className="font-bold text-white">450 L</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-300">Tanque B (Ca+Mg)</span>
                                    <span className="font-bold text-white">420 L</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-300">Última dosificación</span>
                                    <span className="font-bold text-purple-400">Hace 2h</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};
