# NEON ARCADE — Fichero de videojuegos (cyberpunk)

Sitio web estático con fichas de videojuegos actuales reales (Baldur's Gate 3, Cyberpunk 2077: Phantom Liberty, Helldivers 2, Hades II, Elden Ring: Shadow of the Erdtree, Black Myth: Wukong, Balatro, Astro Bot, Silent Hill 2), con estética cyberpunk en rosa y neones: glitch, scanlines, cuadrícula HUD y tarjetas con brillo neón.

Archivos principales:
- `index.html` — estructura y contenido de las fichas
- `styles.css` — estética cyberpunk (rosa/neón), animaciones de glitch y scanlines
- `script.js` — buscador, filtros por género, orden por valoración y generación de estrellas (JavaScript vanilla, sin frameworks)

Ver localmente:

1) Abrir `index.html` directamente en el navegador (doble clic).

2) O ejecutar un servidor estático (recomendado para que las fuentes carguen bien):

```bash
# desde la carpeta del proyecto
python -m http.server 8000
# luego abrir http://localhost:8000
```

Personaliza las fichas editando `index.html`, los colores/efectos en `styles.css`, y la lógica de filtros/orden en `script.js`.
