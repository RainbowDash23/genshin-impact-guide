#  Genshin Quest Guide

Una guía interactiva de **misiones de mundo** para todas las regiones de Genshin Impact. Construida como proyecto de portfolio con React, TypeScript y Tailwind CSS.

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)

---

##  Funcionalidades

- **6 regiones de Teyvat** — Mondstadt, Liyue, Inazuma, Sumeru, Fontaine y Natlan
- **+80 misiones de mundo** documentadas con ubicación, requisitos y guía de completado
- **Sistema de progreso** — marca misiones como completadas, guardado automático en el navegador
- **Barra de progreso global** visible en el header en tiempo real
- **Filtro por sub-zona** dentro de cada región
- **Búsqueda** por nombre de misión o ubicación
- **Modal de detalle** con toda la información de cada misión
- **Diseño adaptable** a móvil y escritorio

---

##  Stack Tecnológico

| Herramienta | Propósito |
|---|---|
| **React 19** | Interfaz de usuario basada en componentes |
| **TypeScript** | Tipado estático, interfaces de datos |
| **Vite** | Bundler y servidor de desarrollo |
| **Tailwind CSS v4** | Estilos utilitarios |
| **Lucide React** | Librería de iconos SVG |
| **localStorage** | Persistencia del progreso del usuario |

---

##  Estructura del Proyecto

```
src/
├── assets/
│   ├── regions/          ← Emblemas de cada región (PNG)
│   └── index.ts          ← Exporta todas las imágenes en un solo lugar
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx    ← Barra superior con progreso global
│   │   └── Footer.tsx
│   ├── quest/
│   │   ├── QuestCard.tsx ← Tarjeta individual de misión
│   │   └── QuestModal.tsx← Modal de detalle al hacer clic
│   └── ui/
│       ├── RegionNav.tsx ← Navegación entre regiones
│       └── FilterBar.tsx ← Búsqueda y filtro por sub-zona
│
├── data/
│   └── regions/          ← Un archivo por región con sus misiones
│       ├── mondstadt.ts
│       ├── liyue.ts
│       ├── inazuma.ts
│       ├── sumeru.ts
│       ├── fontaine.ts
│       ├── natlan.ts
│       └── index.ts      ← Punto de entrada único para los datos
│
├── hooks/
│   ├── useQuestFilter.ts    ← Lógica de búsqueda y filtrado
│   └── useQuestProgress.ts  ← Lógica de completado con localStorage
│
├── types/
│   └── quest.ts          ← Interfaces TypeScript (Quest, Region)
│
└── App.tsx               ← Componente raíz, orquesta todo
```

---


##  Conceptos aplicados

Este proyecto fue construido como práctica de desarrollo frontend. Los conceptos aplicados incluyen:

- **Componentización** — cada pieza de UI es un componente independiente y reutilizable
- **Props y estado** — comunicación entre componentes padre e hijo
- **Custom Hooks** — encapsulación de lógica reutilizable (`useQuestFilter`, `useQuestProgress`)
- **useMemo** — optimización para evitar recalcular filtros en cada render
- **TypeScript interfaces** — tipado estricto de todos los modelos de datos
- **localStorage** — persistencia de datos en el navegador sin necesidad de backend


*Proyecto personal  — los datos de misiones son de elaboración propia basados en Genshin Impact de HoYoverse.*
