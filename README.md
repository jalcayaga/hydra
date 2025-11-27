# Hydra SCADA - Sistema de Gestión de Invernadero

Hydra SCADA es una plataforma profesional de monitoreo y control diseñada para la gestión autónoma de invernaderos y sistemas hidropónicos. El sistema permite la visualización en tiempo real de métricas críticas, control de actuadores y gestión eficiente de recursos hídricos y energéticos.

## 🚀 Características Principales

-   **Monitorización Multi-Zona**:
    -   🌱 **Exterior**: Clima, humedad del suelo.
    -   🏠 **Invernadero**: Temperatura, humedad, CO2.
    -   💧 **Hidropónico**: pH, Electroconductividad (EC), temperatura del agua.
-   **Diagrama de Sistema Interactivo**: Visualización gráfica del flujo de agua, estado de bombas y niveles de tanques.
-   **Gestión de Energía**: Monitoreo de paneles solares, baterías LiFePO4 y generador de respaldo.
-   **Modos de Visualización**:
    -   **Modo Agrícola**: Iconografía y paleta de colores inspirada en la naturaleza.
    -   **Modo Industrial**: Estilo técnico de alto contraste para entornos de operación.
-   **Control en Tiempo Real**: Activación manual/automática de bombas, calefactores y sistemas de recirculación.

## 🛠️ Tecnologías Utilizadas

-   **Frontend**: [Next.js 14](https://nextjs.org/) (React)
-   **Estilos**: [Tailwind CSS](https://tailwindcss.com/)
-   **Iconos**: [Lucide React](https://lucide.dev/)
-   **Gráficos**: [Recharts](https://recharts.org/)
-   **Componentes UI**: [shadcn/ui](https://ui.shadcn.com/)

## 📦 Instalación y Despliegue

1.  **Clonar el repositorio**:
    ```bash
    git clone <url-del-repositorio>
    cd hydra
    ```

2.  **Instalar dependencias**:
    ```bash
    npm install
    ```

3.  **Iniciar servidor de desarrollo**:
    ```bash
    npm run dev
    ```
    El sistema estará disponible en `http://localhost:3000`.

4.  **Construir para producción**:
    ```bash
    npm run build
    npm start
    ```

## 📂 Estructura del Proyecto

```
hydra/
├── app/                  # Rutas y páginas de Next.js
├── components/           # Componentes de React
│   ├── dashboard/        # Componentes específicos del SCADA (Diagramas, Paneles)
│   └── ui/               # Componentes base de interfaz (Botones, Cards)
├── lib/                  # Utilidades y funciones auxiliares
└── public/               # Activos estáticos
```
