# Inventario de Suplementos (PWA)
Instalación rápida (iPhone):
1) Descarga y descomprime el ZIP.
2) Sube la carpeta completa a cualquier hosting estático (ej. GitHub Pages, Netlify, Vercel) o abre `index.html` desde Archivos (Safari permite abrirlo local).
3) En Safari, abre la URL y presiona Compartir → “Agregar a pantalla de inicio”.

Funciones:
- Agregar suplementos con: nombre, cápsulas por frasco, número de frascos, dosis, días de la semana, URLs (iHerb/Amazon/ML) y notas.
- Cálculo automático de días restantes (umbral fijo 15 días).
- Botón “Terminé un frasco” y “+1 frasco”.
- “Checar precio” abre las URLs guardadas (sin servidor).
- Búsqueda, exportar/importar respaldo en JSON.
- PWA offline (cachea los archivos).

Seguridad:
- PIN local opcional. (Biométrico requiere implementación WebAuthn con un pequeño backend; no incluido en este MVP).

Límites del MVP sin servidor:
- No puede verificar ofertas automáticamente ni hacer scraping por CORS.
- Las notificaciones “push” requieren servidor. Este MVP muestra alertas solo dentro de la app.

