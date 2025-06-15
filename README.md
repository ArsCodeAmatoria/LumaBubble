██╗     ██╗   ██╗███╗   ███╗ █████╗ ██████╗ ██╗   ██╗██████╗ ██████╗ ██╗     ███████╗
██║     ██║   ██║████╗ ████║██╔══██╗██╔══██╗██║   ██║██╔══██╗██╔══██╗██║     ██╔════╝
██║     ██║   ██║██╔████╔██║███████║██████╔╝██║   ██║██████╔╝██████╔╝██║     █████╗  
██║     ██║   ██║██║╚██╔╝██║██╔══██║██╔══██╗██║   ██║██╔══██╗██╔══██╗██║     ██╔══╝  
███████╗╚██████╔╝██║ ╚═╝ ██║██║  ██║██████╔╝╚██████╔╝██████╔╝██████╔╝███████╗███████╗
╚══════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═╝╚═════╝  ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝╚══════╝
```

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-14.0+-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-r160+-000000?style=for-the-badge&logo=threedotjs&logoColor=white)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0+-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Haskell](https://img.shields.io/badge/Haskell-WebAssembly-5D4F85?style=for-the-badge&logo=haskell&logoColor=white)](https://www.haskell.org/)
[![React](https://img.shields.io/badge/React-18.0+-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)

**Where sound meets light, and physics meets wonder**

</div>

---

![LumaBubble Simulator](https://github.com/user-attachments/assets/f48c3a57-018f-4104-9f07-e02e1e32736a)

## About

LumaBubble is an interactive sonoluminescence simulator that brings one of physics' most mysterious phenomena to life. Experience the fascinating world where tiny gas bubbles emit brilliant flashes of light when collapsed by sound waves, reaching temperatures that rival stellar cores.

### Features

- **Interactive 3D Visualization** - Three.js powered bubble simulation with realistic physics
- **Real-time Parameter Control** - Adjust frequency, pressure, and bubble radius
- **Live Data Charts** - Monitor temperature, pressure, and light emission in real-time
- **Educational Content** - Comprehensive physics explanations and theories
- **WebAssembly Performance** - Haskell-compiled physics engine for optimal speed
- **Responsive Design** - Beautiful dark space theme that works on all devices

### The Physics

Sonoluminescence occurs when acoustic cavitation creates extreme conditions inside collapsing bubbles:

- **Temperature**: Exceeds 1,000,000 Kelvin (hotter than the sun's surface)
- **Duration**: Light flashes last ~100 picoseconds
- **Pressure**: Thousands of times atmospheric pressure
- **Size**: Bubbles typically 2-10 micrometers in diameter

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **3D Graphics**: Three.js, React Three Fiber, React Three Drei
- **Styling**: Tailwind CSS v4 with custom dark theme
- **Charts**: Recharts for real-time data visualization
- **Physics Engine**: Haskell compiled to WebAssembly
- **Icons**: Lucide React
- **Animation**: Framer Motion

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository
```bash
git clone https://github.com/ArsCodeAmatoria/LumaBubble.git
cd LumaBubble
```

2. Install dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
LumaBubble/
├── src/
│   ├── app/                 # Next.js app router pages
│   │   ├── about/          # Physics education page
│   │   ├── simulator/      # Interactive simulator
│   │   └── faq/           # Frequently asked questions
│   ├── components/         # React components
│   │   ├── HeroScene.tsx  # Three.js 3D hero section
│   │   └── Navigation.tsx # Site navigation
│   └── simulation/         # Haskell physics engine
├── public/
│   └── wasm/              # WebAssembly compiled files
└── tailwind.config.ts     # Tailwind configuration
```

## Simulation Controls

| Parameter | Range | Description |
|-----------|-------|-------------|
| Frequency | 20-40 kHz | Sound wave frequency driving bubble oscillation |
| Pressure | 1-3 atm | Ambient pressure affecting bubble stability |
| Radius | 2-10 μm | Initial bubble radius |

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Scientific Background

Sonoluminescence remains one of physics' great unsolved mysteries. Leading theories include:

- **Plasma Formation**: Extreme temperatures ionize gas creating light-emitting plasma
- **Bremsstrahlung Radiation**: Accelerated electrons emit electromagnetic radiation
- **Quantum Effects**: Speculative quantum vacuum interactions

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Seth Putterman (UCLA) - Pioneering sonoluminescence research
- The Three.js community for incredible 3D web capabilities
- Next.js team for the excellent React framework
- Haskell community for functional programming excellence

---

<div align="center">

Built with passion for physics and education

[Report Bug](https://github.com/ArsCodeAmatoria/LumaBubble/issues) • [Request Feature](https://github.com/ArsCodeAmatoria/LumaBubble/issues) • [Documentation](https://github.com/ArsCodeAmatoria/LumaBubble/wiki)

</div>
