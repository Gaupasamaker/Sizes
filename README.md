# 📏 Sizes - Personal Size Manager

**Sizes** is a Progressive Web App (PWA) designed to solve a common problem: forgetting your (or your family's) clothing and shoe sizes across different brands. Keep all size information in one place, accessible offline, and easy to share.

**[🇪🇸 Ver versión en español abajo]**

---

![App Screenshot](https://raw.githubusercontent.com/Gaupasamaker/sizes/main/public/screenshots/hero.png)
*(Note: Add screenshots to public/screenshots)*

## ✨ Features

- **👥 Multi-Profile**: Manage sizes for yourself, your partner, children, or friends. Each profile has its own color coding.
- **🏷️ Brand & Category Organization**: Store sizes specifically by brand (Nike, Zara, Adidas...) and category (Tops, Pants, Shoes, Outerwear).
- **📝 Detailed Info**: Add notes (e.g., "Runs small", "Buy one size up") and photos of physical labels for reference.
- **🌍 Internationalization**: Fully translated into **English** and **Spanish** (auto-dectect + manual toggle).
- **📏 Size Guide**: Built-in reference tables for international conversions (EU, UK, US) for men, women, and shoes.
- **📤 Sharing**: Share specific profiles via a generated link or native sharing menu.
- **💾 Offline First**: Built with **IndexedDB**, all data is stored locally on your device. Works without an internet connection.
- **🎨 Dark/Light Mode**: Automatic or manual theme switching.
- **📱 PWA Ready**: Installable on iOS and Android for a native app-like experience.

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite
- **Styling**: Vanilla CSS (CSS Variables, Flexbox/Grid) for a lightweight, custom design.
- **Icons**: Lucide React
- **Rounding**: React Router DOM v6
- **Storage**: IDB (IndexedDB wrapper)
- **Deployment**: Vercel

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/Gaupasamaker/sizes.git
   cd sizes
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 📱 How to Use

1. **Create a Profile**: Add a profile for "Dad", "Mom", or "Kids".
2. **Add Brands**: Inside a profile, add brands you frequently buy (e.g., "Zara").
3. **Add Sizes**: Record your specific size for that brand (e.g., "M" for Tops, "42" for Pants).
4. **Add Context**: Take a photo of the tag or add a note like "Slim fit, feels tight".
5. **Share**: Send a profile link to someone easily so they know what to buy.

---

# 🇪🇸 Sizes - Gestor de Tallas Personal

**Sizes** es una Aplicación Web Progresiva (PWA) diseñada para solucionar el problema de olvidar tus tallas (o las de tu familia) en diferentes marcas. Guarda toda la información en un solo lugar, accesible sin internet y fácil de compartir.

## ✨ Características

- **👥 Multi-Perfil**: Gestiona tallas para ti, tu pareja, hijos o amigos.
- **🏷️ Organización por Marca y Categoría**: Guarda tallas específicas por marca y tipo de prenda (Camisetas, Pantalones, Calzado...).
- **📝 Información Detallada**: Añade notas (ej: "Talla pequeño") y fotos de las etiquetas reales.
- **🌍 Internacionalización**: Traducida completamente al **Español** e **Inglés**.
- **📏 Guía de Tallas**: Tablas de referencia integradas para conversiones internacionales (EU, UK, US).
- **📤 Compartir**: Comparte perfiles específicos mediante enlaces generados.
- **💾 Offline First**: Construida con **IndexedDB**, todos los datos quedan en tu dispositivo. Funciona sin internet.
- **🎨 Modo Oscuro/Claro**: Cambio de tema manual o automático.
- **📱 PWA**: Instalable en iOS y Android.

## 🚀 Instalación

1. **Clonar repositorio**
   ```bash
   git clone https://github.com/Gaupasamaker/sizes.git
   cd sizes
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Arrancar servidor local**
   ```bash
   npm run dev
   ```

## 📄 Licencia

MIT License
