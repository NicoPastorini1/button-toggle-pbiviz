# 🔘 Button Toggle — Custom Visual para Power BI

Un visual personalizado para Power BI que se renderiza como un **interruptor toggle estilo iOS/Android**, diseñado para filtrar reportes alternando entre dos estados: **ON** y **OFF**.

Desarrollado por [Nicolas Pastorini](https://www.linkedin.com/in/nicolas-pastorini/) · [GitHub](https://github.com/NicoPastorini1)

---

## 📸 Vista previa

```
OFF ●———————  ON
         ↕
OFF ———————● ON
```

Un switch animado con track, thumb y etiquetas completamente personalizables que aplica un filtro cruzado a todos los visuales de la página — incluyendo visuales de terceros como Gantt.

---

## 🚀 Cómo funciona

Este visual se conecta a una tabla DAX con dos filas (`ON` y `OFF`) y utiliza la Filter API de Power BI para aplicar un filtro a nivel de página cuando el usuario mueve el switch.

Tus medidas DAX pueden usar `SELECTEDVALUE` para reaccionar al filtro:

```dax
ToggleEstados = DATATABLE(
    "Estado", STRING,
    {
        {"ON"},
        {"OFF"}
    }
)
```

```dax
MiMedida =
IF(
    SELECTEDVALUE('ToggleEstados'[Estado]) = "ON",
    [MedidaON],
    [MedidaOFF]
)
```

---

## 🔧 Configuración

### 1. Importar el visual

Descargá el archivo `.pbiviz` desde [Releases](https://github.com/NicoPastorini1/button-toggle-pbiviz/releases) e importalo en tu reporte:

> **Inicio → Más objetos visuales → Importar desde archivo**

### 2. Crear la tabla DAX

Creá la tabla `ToggleEstados` en tu modelo usando el DAX de arriba.

### 3. Conectar el campo

Arrastrá `ToggleEstados[Estado]` al campo **Estado (ON/OFF)** del visual.

### 4. Sincronizar entre páginas (opcional)

Para mantener el estado del toggle al navegar entre páginas del reporte:

> **Ver → Sincronizar segmentaciones** → activar sincronización en todas las páginas

---

## 🎨 Opciones de formato

Todas las propiedades son configurables desde el **panel de Formato** de Power BI:

| Propiedad | Descripción | Valor por defecto |
|---|---|---|
| Track Color (ON) | Color del track cuando está en ON | `#4CD964` |
| Track Color (OFF) | Color del track cuando está en OFF | `#cccccc` |
| Track Width (px) | Ancho del track | `70` |
| Track Height (px) | Alto del track | `40` |
| Thumb Size (px) | Diámetro del thumb | `38` |
| Thumb Color | Color base del thumb | `#ffffff` |
| Thumb Gradient Effect | Activa gradiente radial 3D en el thumb | `true` |
| Thumb Shadow Effect | Activa sombra en el thumb | `true` |
| Label Font Size (px) | Tamaño de fuente de las etiquetas ON/OFF | `13` |
| Label Color (active) | Color de la etiqueta del estado activo | `#333333` |
| Label Color (inactive) | Color de la etiqueta del estado inactivo | `#aaaaaa` |
| Show ON/OFF Labels | Mostrar u ocultar las etiquetas de texto | `true` |

---

## 🛠️ Desarrollo

### Requisitos previos

- Node.js v16+
- Power BI Visuals Tools v7+

```bash
npm install -g powerbi-visuals-tools
```

### Instalar dependencias

```bash
npm install
```

### Ejecutar en modo desarrollo

```bash
pbiviz start
```

Luego en Power BI Desktop o Web, activá el **Visual de desarrollador** en Opciones e insertalo en tu reporte.

### Compilar para producción

```bash
pbiviz package
```

El archivo `.pbiviz` se generará en la carpeta `dist/`.

---

## 📁 Estructura del proyecto

```
button-toggle-pbiviz/
├── src/
│   ├── visual.ts         # Lógica principal del visual
│   └── settings.ts       # Modelo de configuración de formato
├── style/
│   └── visual.less       # (sin uso — los estilos son inline)
├── assets/
│   └── icon.png          # Ícono del visual
├── capabilities.json     # Roles de datos, mappings y propiedades de formato
├── pbiviz.json           # Metadatos del visual
└── package.json
```

---

## 📌 Persistencia del estado

El estado del toggle (`isOn`) se persiste directamente en los metadatos del reporte usando `persistProperties`. Esto significa que:

- El estado sobrevive la navegación entre páginas
- El estado se guarda junto al archivo `.pbix`
- El filtro se reaaplica automáticamente al cargar si el switch quedó en **ON**

---

## 📄 Licencia

MIT © [Nicolas Pastorini](https://www.linkedin.com/in/nicolas-pastorini/)
