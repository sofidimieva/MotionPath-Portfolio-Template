import Galaxy from './components/Galaxy'

function App() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        background: '#000',
        overflow: 'hidden',
      }}
    >
      <Galaxy
        mouseRepulsion={false}
        mouseInteraction
        density={1}
        glowIntensity={0.3}
        saturation={0}
        hueShift={140}
        twinkleIntensity={0.3}
        rotationSpeed={0.1}
        repulsionStrength={2}
        autoCenterRepulsion={0}
        starSpeed={0.5}
        speed={1}
        transparent={false}
      />
    </div>
  )
}

export default App