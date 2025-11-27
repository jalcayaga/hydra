import React from 'react';
import { Camera, Maximize2, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const CameraView = ({ label, status, image }: any) => (
    <div className="relative aspect-video bg-slate-900 rounded-lg overflow-hidden border border-slate-800 group">
        {/* Placeholder Image */}
        <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
            {image ? (
                <img src={image} alt={label} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
            ) : (
                <Camera className="w-12 h-12 text-slate-700" />
            )}
        </div>

        {/* Overlay UI */}
        <div className="absolute inset-0 p-3 flex flex-col justify-between bg-gradient-to-b from-black/60 via-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex justify-between items-start">
                <Badge variant={status === 'LIVE' ? 'destructive' : 'secondary'} className="font-mono text-xs">
                    {status === 'LIVE' && <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />}
                    {status}
                </Badge>
                <Button size="icon" variant="ghost" className="h-8 w-8 text-white hover:bg-white/20">
                    <Maximize2 className="w-4 h-4" />
                </Button>
            </div>
            <div className="flex justify-between items-end">
                <span className="font-medium text-white text-sm drop-shadow-md">{label}</span>
                <span className="font-mono text-xs text-gray-300">1080p • 30fps</span>
            </div>
        </div>
    </div>
);

export const CameraFeed = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Feed Grid */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                <CameraView
                    label="Cámara 1: Entrada Principal"
                    status="LIVE"
                    image="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=800&auto=format&fit=crop"
                />
                <CameraView
                    label="Cámara 2: Zona de Cultivo A"
                    status="LIVE"
                    image="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=800&auto=format&fit=crop"
                />
                <CameraView
                    label="Cámara 3: Zona de Cultivo B"
                    status="REC"
                    image="https://images.unsplash.com/photo-1611589753666-2d85212b95a6?q=80&w=800&auto=format&fit=crop"
                />
                <CameraView
                    label="Cámara 4: Tanques de Agua"
                    status="OFFLINE"
                />
            </div>

            {/* PTZ Controls */}
            <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm h-fit">
                <CardHeader>
                    <CardTitle className="text-white text-sm uppercase tracking-wider">Control PTZ</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center gap-6">
                        <div className="relative w-40 h-40 bg-slate-800/50 rounded-full border border-slate-700 flex items-center justify-center">
                            <Button variant="ghost" className="absolute top-2 left-1/2 -translate-x-1/2 hover:bg-slate-700 text-white">
                                <ChevronUp className="w-6 h-6" />
                            </Button>
                            <Button variant="ghost" className="absolute bottom-2 left-1/2 -translate-x-1/2 hover:bg-slate-700 text-white">
                                <ChevronDown className="w-6 h-6" />
                            </Button>
                            <Button variant="ghost" className="absolute left-2 top-1/2 -translate-y-1/2 hover:bg-slate-700 text-white">
                                <ChevronLeft className="w-6 h-6" />
                            </Button>
                            <Button variant="ghost" className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-slate-700 text-white">
                                <ChevronRight className="w-6 h-6" />
                            </Button>
                            <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center border border-slate-600">
                                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                            </div>
                        </div>

                        <div className="flex gap-4 w-full">
                            <Button variant="outline" className="flex-1 border-slate-700 bg-slate-800/50 text-white hover:bg-slate-700">
                                <ZoomOut className="w-4 h-4 mr-2" /> Zoom -
                            </Button>
                            <Button variant="outline" className="flex-1 border-slate-700 bg-slate-800/50 text-white hover:bg-slate-700">
                                <ZoomIn className="w-4 h-4 mr-2" /> Zoom +
                            </Button>
                        </div>

                        <div className="w-full space-y-2">
                            <div className="text-xs text-gray-400 font-medium">PRESETS</div>
                            <div className="grid grid-cols-2 gap-2">
                                <Button variant="secondary" size="sm" className="bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-white">
                                    Vista General
                                </Button>
                                <Button variant="secondary" size="sm" className="bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-white">
                                    Puerta Norte
                                </Button>
                                <Button variant="secondary" size="sm" className="bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-white">
                                    Sensores
                                </Button>
                                <Button variant="secondary" size="sm" className="bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-white">
                                    Tanques
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
