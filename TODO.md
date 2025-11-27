# Lista de Tareas Pendientes (TODO) - Hydra SCADA

## 🔌 Integración de Hardware
- [ ] **Conexión PLC**: Implementar protocolo Modbus TCP/IP para comunicación con el PLC.
- [ ] **Sensores Reales**: Reemplazar datos simulados (`Math.random`) con lecturas reales de sensores.
- [ ] **Control de Actuadores**: Vincular los interruptores de la UI con los relés físicos (Bombas, Calefactores).

## 📊 Paneles y Visualización
- [ ] **Panel de Energía Avanzado**: Crear vista detallada de consumo, producción histórica y estado de celdas de batería.
- [ ] **Gestión de Agua**: Implementar panel dedicado para balance hídrico, ciclos de riego y calidad del agua.
- [ ] **Cámaras**: Integrar stream RTSP/WebRTC para las cámaras de vigilancia.

## ⚙️ Backend y Datos
- [ ] **Base de Datos**: Configurar TimescaleDB o InfluxDB para almacenamiento de series temporales.
- [ ] **API**: Desarrollar endpoints para recepción de datos de telemetría.
- [ ] **Autenticación**: Implementar sistema de login seguro para operadores.

## 📱 UI/UX
- [ ] **Modo Móvil**: Refinar aún más la experiencia en pantallas pequeñas.
- [ ] **Alertas**: Configurar notificaciones Push o SMS para alarmas críticas.
