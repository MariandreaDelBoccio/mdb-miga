# miga.

Pastelería por capas. Pieza 02: storytelling + comercio.

## Promesa

Pasteles artesanos pensados para celebrar. Cada capa tiene su momento.

## Flujo

`Home (scroll por capas) → Crea el tuyo (configurador) → Bolsa`

## Qué demuestra

Scrollytelling con velos sobre una sola imagen, configurador con estado compartible por URL, carrito mínimo bilingüe.

## Paleta

| Nombre | Hex | Uso |
| --- | --- | --- |
| Ivory | `#F7F1E8` | Fondo |
| Burgundy | `#8D173B` | Acento / H1 / CTA |
| Ink | `#806C6B` | Texto |

## Tipografía

- Display: Cormorant Garamond
- Sans: Inter

## Caso de estudio

### Problema
Una pastelería en plantilla se reduce a grid de productos y foto hero. No transmite el oficio ni justifica un ticket premium.

### Decisión de diseño
Contar el pastel de arriba abajo (cobertura → base) con una sola fotografía y velos que revelan la capa activa. El mismo lenguaje visual alimenta el configurador.

### Decisión técnica
`position: sticky` + `IntersectionObserver` para sincronizar beats y velos; estado del pastel en search params para compartir configuraciones.

### Por qué una plantilla no puede
Las plantillas no sincronizan storytelling visual con lógica de producto (precio, raciones, capas) ni permiten un scrollytelling a medida ligado a la compra.

### Métricas objetivo
Lighthouse Performance ≥ 90 en móvil; peso de imagen hero < 400 KB; `prefers-reduced-motion` respeta sin romper el flujo.
