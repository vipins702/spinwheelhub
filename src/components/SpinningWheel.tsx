
import React, { useState, useRef, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { Settings, X, Play, Square, Volume2 } from 'lucide-react'

interface WheelOption {
  id: string
  text: string
  meaning?: string
  color?: string
}

interface SpinningWheelProps {
  options: WheelOption[]
  onSpinComplete?: (result: WheelOption) => void
  excludeAfterSpin?: boolean
  onOptionExcluded?: (optionId: string) => void
  size?: number
  showControls?: boolean
  enableSound?: boolean
  customizable?: boolean
}

const SpinningWheel: React.FC<SpinningWheelProps> = ({
  options = [],
  onSpinComplete,
  excludeAfterSpin = false,
  onOptionExcluded,
  size = 700,
  showControls = true,
  enableSound = false,
  customizable = true
}) => {
  const [isSpinning, setIsSpinning] = useState(false)
  const [result, setResult] = useState<WheelOption | null>(null)
  const [showCelebration, setShowCelebration] = useState(false)
  const [currentRotation, setCurrentRotation] = useState(0)
  const [showSettings, setShowSettings] = useState(false)

  // Settings state
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [soundType, setSoundType] = useState('Ticking sound')
  const [volume, setVolume] = useState(50)
  const [clappingSound, setClappingSound] = useState(true)
  const [displayDuplicates, setDisplayDuplicates] = useState(true)
  const [spinSlowly, setSpinSlowly] = useState(false)
  const [showTitle, setShowTitle] = useState(true)
  const [spinTime, setSpinTime] = useState(20)
  const [maxVisibleNames, setMaxVisibleNames] = useState(1000)
  const [showResultPopup, setShowResultPopup] = useState(false)

  const controls = useAnimation()
  const wheelRef = useRef<HTMLDivElement>(null)
  const sparkleCanvasRef = useRef<HTMLCanvasElement>(null)
  const celebrationCanvasRef = useRef<HTMLCanvasElement>(null)
  const audioContextRef = useRef<AudioContext | null>(null)

  // Sound functions
  const playSound = (frequency: number, duration: number, type: 'sine' | 'square' | 'triangle' = 'sine') => {
    if (!soundEnabled) return

    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      }

      const ctx = audioContextRef.current
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)

      oscillator.frequency.setValueAtTime(frequency, ctx.currentTime)
      oscillator.type = type

      gainNode.gain.setValueAtTime(0, ctx.currentTime)
      gainNode.gain.linearRampToValueAtTime(volume / 100 * 0.1, ctx.currentTime + 0.01)
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)

      oscillator.start(ctx.currentTime)
      oscillator.stop(ctx.currentTime + duration)
    } catch (error) {
      console.log('Audio not supported')
    }
  }

  const playTickingSound = () => {
    if (soundType === 'Ticking sound') {
      playSound(800, 0.1, 'square')
    } else if (soundType === 'Click sound') {
      playSound(1000, 0.05, 'sine')
    } else if (soundType === 'Bell sound') {
      playSound(660, 0.3, 'sine')
    }
  }

  const playClappingSound = () => {
    if (clappingSound && soundEnabled) {
      // Simulate clapping with multiple quick sounds
      setTimeout(() => playSound(200, 0.1, 'square'), 0)
      setTimeout(() => playSound(300, 0.1, 'square'), 100)
      setTimeout(() => playSound(250, 0.1, 'square'), 200)
      setTimeout(() => playSound(350, 0.15, 'square'), 300)
    }
  }

  // Ensure we have valid options
  const validOptions = options.length > 0 ? options : [
    { id: '1', text: 'Option 1', color: '#FF3B30' },
    { id: '2', text: 'Option 2', color: '#34C759' },
    { id: '3', text: 'Option 3', color: '#007AFF' },
    { id: '4', text: 'Option 4', color: '#FFD60A' }
  ]

  // Enhanced vibrant flat colors
  const magicalColors = [
    '#FF3B30', '#34C759', '#007AFF', '#FFD60A', '#FF9500', '#AF52DE',
    '#FF2D92', '#5AC8FA', '#FFCC02', '#30D158', '#BF5AF2', '#FF6482'
  ]

  // Enhanced celebration effect
  const triggerCelebration = () => {
    setShowCelebration(true)
    const canvas = celebrationCanvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const scale = window.devicePixelRatio || 1
    canvas.width = size * scale
    canvas.height = size * scale
    canvas.style.width = `${size}px`
    canvas.style.height = `${size}px`
    ctx.scale(scale, scale)

    const particles: Array<{
      x: number; y: number; vx: number; vy: number; color: string; size: number; life: number;
      shape: 'circle' | 'square' | 'triangle' | 'star'; rotation: number; rotationSpeed: number
    }> = []

    // Create massive celebration burst
    for (let i = 0; i < 120; i++) {
      const angle = (Math.PI * 2 * i) / 120
      particles.push({
        x: size / 2, y: size / 2,
        vx: Math.cos(angle) * (Math.random() * 6 + 3),
        vy: Math.sin(angle) * (Math.random() * 6 + 3),
        color: magicalColors[Math.floor(Math.random() * magicalColors.length)],
        size: Math.random() * 10 + 4, life: 1,
        shape: ['circle', 'square', 'triangle', 'star'][Math.floor(Math.random() * 4)] as any,
        rotation: 0, rotationSpeed: (Math.random() - 0.5) * 0.3
      })
    }

    let animationId: number
    const animate = () => {
      ctx.clearRect(0, 0, size, size)

      particles.forEach((particle, index) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.vy += 0.15
        particle.vx *= 0.996
        particle.rotation += particle.rotationSpeed
        particle.life -= 0.006

        ctx.save()
        ctx.globalAlpha = particle.life
        ctx.translate(particle.x, particle.y)
        ctx.rotate(particle.rotation)

        ctx.fillStyle = particle.color
        ctx.shadowColor = particle.color
        ctx.shadowBlur = 6

        if (particle.shape === 'circle') {
          ctx.beginPath()
          ctx.arc(0, 0, particle.size, 0, Math.PI * 2)
          ctx.fill()
        } else if (particle.shape === 'square') {
          ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size)
        } else if (particle.shape === 'triangle') {
          ctx.beginPath()
          ctx.moveTo(0, -particle.size)
          ctx.lineTo(-particle.size, particle.size)
          ctx.lineTo(particle.size, particle.size)
          ctx.closePath()
          ctx.fill()
        } else {
          ctx.beginPath()
          for (let i = 0; i < 5; i++) {
            const angle = (i * Math.PI * 2) / 5
            const x = Math.cos(angle) * particle.size
            const y = Math.sin(angle) * particle.size
            if (i === 0) ctx.moveTo(x, y)
            else ctx.lineTo(x, y)

            const innerAngle = ((i + 0.5) * Math.PI * 2) / 5
            const innerX = Math.cos(innerAngle) * particle.size * 0.4
            const innerY = Math.sin(innerAngle) * particle.size * 0.4
            ctx.lineTo(innerX, innerY)
          }
          ctx.closePath()
          ctx.fill()
        }

        ctx.restore()

        if (particle.life <= 0) {
          particles.splice(index, 1)
        }
      })

      if (particles.length > 0) {
        animationId = requestAnimationFrame(animate)
      } else {
        setShowCelebration(false)
      }
    }

    animate()

    setTimeout(() => {
      setShowCelebration(false)
    }, 4000)
  }

  // Magical sparkle effect
  const triggerSparkles = () => {
    const canvas = sparkleCanvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const scale = window.devicePixelRatio || 1
    canvas.width = size * scale
    canvas.height = size * scale
    canvas.style.width = `${size}px`
    canvas.style.height = `${size}px`
    ctx.scale(scale, scale)

    const sparkles: Array<{
      x: number; y: number; vx: number; vy: number; color: string; size: number; life: number;
      rotation: number; rotationSpeed: number
    }> = []

    for (let i = 0; i < 30; i++) {
      const angle = (Math.PI * 2 * i) / 30
      const radius = size * 0.35 + Math.random() * size * 0.1
      sparkles.push({
        x: size / 2 + Math.cos(angle) * radius,
        y: size / 2 + Math.sin(angle) * radius,
        vx: (Math.random() - 0.5) * 4, vy: (Math.random() - 0.5) * 4,
        color: magicalColors[Math.floor(Math.random() * magicalColors.length)],
        size: Math.random() * 6 + 3, life: 1,
        rotation: 0, rotationSpeed: (Math.random() - 0.5) * 0.3
      })
    }

    let animationId: number
    const animate = () => {
      ctx.clearRect(0, 0, size, size)

      sparkles.forEach((sparkle, index) => {
        sparkle.x += sparkle.vx
        sparkle.y += sparkle.vy
        sparkle.rotation += sparkle.rotationSpeed
        sparkle.life -= 0.01

        ctx.save()
        ctx.globalAlpha = sparkle.life
        ctx.translate(sparkle.x, sparkle.y)
        ctx.rotate(sparkle.rotation)

        ctx.fillStyle = sparkle.color
        ctx.shadowColor = sparkle.color
        ctx.shadowBlur = 8

        ctx.beginPath()
        for (let i = 0; i < 5; i++) {
          const angle = (i * Math.PI * 2) / 5
          const x = Math.cos(angle) * sparkle.size
          const y = Math.sin(angle) * sparkle.size
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)

          const innerAngle = ((i + 0.5) * Math.PI * 2) / 5
          const innerX = Math.cos(innerAngle) * sparkle.size * 0.4
          const innerY = Math.sin(innerAngle) * sparkle.size * 0.4
          ctx.lineTo(innerX, innerY)
        }
        ctx.closePath()
        ctx.fill()

        ctx.restore()

        if (sparkle.life <= 0) {
          sparkles.splice(index, 1)
        }
      })

      if (sparkles.length > 0) {
        animationId = requestAnimationFrame(animate)
      }
    }

    animate()
  }

  const spinWheel = async () => {
    if (isSpinning || validOptions.length === 0) return

    setIsSpinning(true)
    setResult(null)
    setShowCelebration(false)
    setShowResultPopup(false)

    triggerSparkles()

    // Play ticking sounds during spin
    const tickInterval = setInterval(() => {
      playTickingSound()
    }, 200)

    setTimeout(() => clearInterval(tickInterval), (spinTime * 1000 * 0.8))

    // Use visible options for both display and winning selection to ensure accuracy
    const visibleOptions = validOptions.slice(0, maxVisibleNames)
    const segmentCount = visibleOptions.length
    const segmentAngle = 360 / segmentCount

    // 1) Generate random spin amount (rotations and final position)
    const baseRotations = spinSlowly ? 3 : 6
    const minRotations = baseRotations + (spinTime - 4) // spinTime ranges 1-60 seconds
    const maxRotations = minRotations + 6
    const rotations = minRotations + Math.random() * (maxRotations - minRotations)

    // Random final position (0-360 degrees)
    const randomFinalAngle = Math.random() * 360

    // compute absolute new total rotation from currentRotation
    const newTotalRotation = currentRotation + rotations * 360 + randomFinalAngle

    try {
      // Phase 1: fast linear spin (build momentum)
      // Reduced duration slightly to get to deceleration faster
      const phase1Duration = Math.max(spinTime * 0.15, 0.5)
      await controls.start({
        rotate: currentRotation + (rotations - 2) * 360,
        transition: {
          duration: phase1Duration,
          ease: 'linear',
          type: 'tween'
        }
      })

      // Phase 2: smooth deceleration into the exact target
      // Extended duration for a much softer "glide" to stop
      const phase2Duration = Math.max(spinTime * 0.85, 2.5)
      await controls.start({
        rotate: newTotalRotation,
        transition: {
          duration: phase2Duration,
          // Custom Bezier for "Soft Friction" feel
          // Starts fast, then lengthy deceleration
          ease: [0.2, 0.8, 0.2, 1],
          type: 'tween'
        }
      })

      // Optional micro-settle (very subtle bounce) — enable if you want more realism
      // await controls.start({
      //   rotate: newTotalRotation - 6,
      //   transition: { duration: 0.12, ease: 'easeOut' }
      // });
      // await controls.start({
      //   rotate: newTotalRotation,
      //   transition: { duration: 0.08, ease: 'easeInOut' }
      // });

      // finalize - calculate which segment the pointer lands on
      const finalModulo360 = newTotalRotation % 360
      setCurrentRotation(newTotalRotation) // Keep full rotation for next spin

      // Calculate which segment the pointer (at top, 0 degrees) is pointing to
      // Since wheel rotates clockwise, we need to find which segment is at the top
      // Pointer is at 0 degrees (top), so we need to find which segment contains 0 degrees
      // after the wheel rotation
      const pointerAngle = (360 - finalModulo360) % 360
      const segmentIndex = Math.floor(pointerAngle / segmentAngle) % segmentCount
      const chosenOption = visibleOptions[segmentIndex]

      setResult(chosenOption)

      // Play clapping sound and show popup
      setTimeout(() => {
        playClappingSound()
        triggerCelebration()
        setShowResultPopup(true)
      }, 300)

      onSpinComplete?.(chosenOption)

      if (excludeAfterSpin && onOptionExcluded) {
        setTimeout(() => onOptionExcluded(chosenOption.id), 2500)
      }
    } catch (err) {
      console.error('Animation error', err)
    } finally {
      setIsSpinning(false)
    }
  }

  const resetWheel = () => {
    setResult(null)
    setShowCelebration(false)
    setShowResultPopup(false)
    setCurrentRotation(0)
    controls.set({ rotate: 0 })
  }

  // Responsive text size calculation - Balanced for visibility vs space
  const getTextSize = () => {
    const baseSize = Math.max(size / 24, 12) // Slightly reduced base size
    const optionCount = validOptions.length
    if (optionCount > 20) return Math.max(baseSize * 0.7, 10)
    if (optionCount > 12) return Math.max(baseSize * 0.8, 12)
    if (optionCount > 6) return Math.max(baseSize * 0.9, 14)
    return Math.max(baseSize * 1.0, 16)
  }

  // Calculate text radius for curved text
  const getTextRadius = () => {
    return (size / 2) * 0.65 // Slightly closer to center
  }

  return (
    <div className="flex flex-col items-center space-y-1 md:space-y-2 relative">
      {/* Wheel Container */}
      <div
        className="relative flex-shrink-0"
        style={{
          width: size,
          height: size,
          minWidth: Math.min(size, 320), // Mobile minimum
          minHeight: Math.min(size, 320)
        }}
      >
        {/* Magical glow background */}
        <div
          className="absolute inset-0 rounded-full opacity-20 md:opacity-30 animate-pulse"
          style={{
            background: `conic-gradient(from 0deg, ${magicalColors.join(', ')})`,
            filter: 'blur(15px)',
            transform: 'scale(1.1)'
          }}
        />

        {/* Canvas layers */}
        <canvas
          ref={sparkleCanvasRef}
          className="absolute inset-0 pointer-events-none z-30"
          style={{ width: size, height: size }}
        />

        <canvas
          ref={celebrationCanvasRef}
          className="absolute inset-0 pointer-events-none z-40"
          style={{ width: size, height: size }}
        />

        {/* Enhanced Pointer */}
        <div
          className="absolute top-0 left-1/2 transform -translate-x-1/2 z-20"
          style={{ top: '-6px' }}
        >
          <div
            className="relative"
            style={{
              width: Math.max(size * 0.045, 20),
              height: Math.max(size * 0.08, 32),
              filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.5))'
            }}
          >
            <div
              className="absolute inset-0 bg-gradient-to-b from-yellow-400 to-orange-500 transform rotate-180"
              style={{
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                borderRadius: '2px'
              }}
            />
            <div
              className="absolute inset-0 bg-gradient-to-b from-white to-yellow-200 transform rotate-180 opacity-50"
              style={{
                clipPath: 'polygon(50% 0%, 25% 75%, 75% 75%)'
              }}
            />
          </div>
        </div>

        {/* Enhanced Spinning Wheel */}
        <motion.div
          ref={wheelRef}
          animate={controls}
          onClick={spinWheel}
          className="relative rounded-full shadow-xl overflow-hidden bg-white cursor-pointer"
          style={{
            width: size,
            height: size,
            border: `${Math.max(size * 0.006, 2)}px solid #333`,
            filter: 'drop-shadow(0 8px 25px rgba(0,0,0,0.25))',
            transformOrigin: '50% 50%',   // ensure center rotation
            willChange: 'transform'      // hint for smoother animation
          }}
        >
          <svg
            width={size}
            height={size}
            className="absolute inset-0"
            style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.1))' }}
          >
            {validOptions.slice(0, maxVisibleNames).map((option, index) => {
              const visibleCount = Math.min(validOptions.length, maxVisibleNames)
              const angle = (360 / visibleCount) * index
              const nextAngle = (360 / visibleCount) * (index + 1)
              const color = option.color || magicalColors[index % magicalColors.length]

              const centerX = size / 2
              const centerY = size / 2
              const radius = size / 2 - Math.max(size * 0.006, 2)

              // Calculate path for pie slice
              const startAngleRad = (angle - 90) * (Math.PI / 180)
              const endAngleRad = (nextAngle - 90) * (Math.PI / 180)

              const x1 = centerX + radius * Math.cos(startAngleRad)
              const y1 = centerY + radius * Math.sin(startAngleRad)
              const x2 = centerX + radius * Math.cos(endAngleRad)
              const y2 = centerY + radius * Math.sin(endAngleRad)

              const largeArcFlag = (nextAngle - angle) > 180 ? 1 : 0

              const pathData = [
                `M ${centerX} ${centerY}`,
                `L ${x1} ${y1}`,
                `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                'Z'
              ].join(' ')

              // Smart Text Positioning
              // > 10 options: Radial (from center out)
              // <= 10 options: Tangential (perpendicular to radius)
              const isRadial = visibleCount > 10
              const midAngle = angle + (nextAngle - angle) / 2
              const midAngleRad = (midAngle - 90) * (Math.PI / 180)

              // Radial settings
              const radialRadius = radius * 0.65
              const radialX = centerX + radialRadius * Math.cos(midAngleRad)
              const radialY = centerY + radialRadius * Math.sin(midAngleRad)
              // Flip text on left side so it's readable
              const isLeftSide = midAngle > 90 && midAngle < 270
              const radialRotation = midAngle + (isLeftSide ? 180 : 0)

              // Tangential settings
              const tangentRadius = radius * 0.65
              const tangentX = centerX + tangentRadius * Math.cos(midAngleRad)
              const tangentY = centerY + tangentRadius * Math.sin(midAngleRad)
              const tangentRotation = midAngle + 90

              // Final values
              const textX = isRadial ? radialX : tangentX
              const textY = isRadial ? radialY : tangentY
              const rotation = isRadial ? radialRotation : tangentRotation

              // Truncate based on mode
              const maxChars = isRadial ? 18 : 14
              const displayText = option.text.length > maxChars
                ? option.text.substring(0, maxChars) + '...'
                : option.text

              return (
                <g key={option.id}>
                  <path
                    d={pathData}
                    fill={color}
                    stroke="#ffffff"
                    strokeWidth={Math.max(size * 0.004, 1)}
                    style={{
                      filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))'
                    }}
                  />

                  {/* Text with high-contrast Stroke */}
                  <text
                    x={textX}
                    y={textY}
                    fill="white"
                    stroke="rgba(0,0,0,0.6)"
                    strokeWidth="3"
                    paintOrder="stroke"
                    fontSize={getTextSize()}
                    fontWeight="800"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(${rotation}, ${textX}, ${textY})`}
                    style={{
                      filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.5))',
                      fontFamily: 'system-ui, -apple-system, sans-serif'
                    }}
                  >
                    {displayText}
                  </text>
                </g>
              )
            })}
          </svg>

          {/* Enhanced Center Circle */}
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center shadow-lg"
            style={{
              width: Math.max(size * 0.1, 40),
              height: Math.max(size * 0.1, 40),
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: `${Math.max(size * 0.003, 2)}px solid #fff`
            }}
          >
            <div
              className="text-white font-bold"
              style={{ fontSize: Math.max(size * 0.03, 16) }}
            >
              ✨
            </div>
          </div>
        </motion.div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-bold text-gray-900">Wheel Settings</h3>
              <button
                onClick={() => setShowSettings(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-6">
              {/* During Spin Tab */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-4 pb-2 border-b">During spin</h4>

                {/* Sound Settings */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">Sound</label>
                    <div className="flex items-center space-x-2">
                      <select
                        value={soundType}
                        onChange={(e) => setSoundType(e.target.value)}
                        className="text-sm border border-gray-300 rounded px-2 py-1"
                      >
                        <option>Ticking sound</option>
                        <option>Click sound</option>
                        <option>Bell sound</option>
                        <option>None</option>
                      </select>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Play className="w-4 h-4" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Square className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Volume Slider */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-700">Volume</label>
                      <Volume2 className="w-4 h-4 text-gray-500" />
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-xs text-gray-500 w-8">0%</span>
                      <div className="flex-1 relative">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={volume}
                          onChange={(e) => setVolume(Number(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                          style={{
                            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${volume}%, #e5e7eb ${volume}%, #e5e7eb 100%)`
                          }}
                        />
                        <div
                          className="absolute top-0 w-4 h-4 bg-blue-600 rounded-full transform -translate-y-1 -translate-x-2 shadow-md"
                          style={{ left: `${volume}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 w-10">100%</span>
                    </div>
                    <div className="text-center">
                      <span className="text-base text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-full">{volume}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Display Options */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-4 pb-2 border-b">Appearance</h4>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={displayDuplicates}
                      onChange={(e) => setDisplayDuplicates(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="text-sm">Display duplicates</span>
                  </label>

                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={spinSlowly}
                      onChange={(e) => setSpinSlowly(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="text-sm">Spin slowly</span>
                  </label>

                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={showTitle}
                      onChange={(e) => setShowTitle(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="text-sm">Show title</span>
                  </label>

                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={clappingSound}
                      onChange={(e) => setClappingSound(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="text-sm">Clapping sound on result</span>
                  </label>
                </div>
              </div>

              {/* Spin Time */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-4 pb-2 border-b">Spin time (seconds)</h4>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="1"
                    max="60"
                    value={spinTime}
                    onChange={(e) => setSpinTime(Number(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>1</span>
                    <span>10</span>
                    <span>20</span>
                    <span>30</span>
                    <span>40</span>
                    <span>50</span>
                    <span>60</span>
                  </div>
                  <div className="text-center">
                    <span className="text-sm text-blue-600 font-medium">{spinTime}s</span>
                  </div>
                </div>
              </div>

              {/* Max Visible Names */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-4 pb-2 border-b">Max number of names visible on the wheel</h4>
                <p className="text-xs text-gray-600 mb-3">All names in the text-box have the same chance of winning, regardless of this value.</p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-xs text-gray-500 w-6">4</span>
                    <div className="flex-1 relative">
                      <input
                        type="range"
                        min="4"
                        max="1000"
                        value={maxVisibleNames}
                        onChange={(e) => setMaxVisibleNames(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((maxVisibleNames - 4) / 996) * 100}%, #e5e7eb ${((maxVisibleNames - 4) / 996) * 100}%, #e5e7eb 100%)`
                        }}
                      />
                      <div
                        className="absolute top-0 w-4 h-4 bg-blue-600 rounded-full transform -translate-y-1 -translate-x-2 shadow-md"
                        style={{ left: `${((maxVisibleNames - 4) / 996) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 w-10">1000</span>
                  </div>
                  <div className="text-center">
                    <span className="text-base text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-full">{maxVisibleNames}</span>
                  </div>
                  <div className="text-xs text-gray-500 text-center">
                    Currently showing: {Math.min(validOptions.length, maxVisibleNames)} names
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4 border-t">
                <button
                  onClick={() => setShowSettings(false)}
                  className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowSettings(false)}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Result Popup Modal */}
      {showResultPopup && result && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 text-center transform transition-all duration-300 scale-100">
            <div className="text-6xl mb-4 animate-pulse">🎉</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Congratulations!</h3>
            <p className="text-lg text-gray-600 mb-4">The winner is:</p>
            <div className="text-3xl font-bold text-purple-600 mb-4 p-4 bg-purple-50 rounded-xl border-2 border-purple-200 animate-pulse">
              {result.text}
            </div>
            {result.meaning && (
              <div className="text-base text-gray-600 mb-4 p-3 bg-gray-50 rounded-lg border italic">
                <span className="font-semibold">Meaning:</span> {result.meaning}
              </div>
            )}
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => {
                  setShowResultPopup(false)
                  spinWheel()
                }}
                disabled={isSpinning}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg transition-all duration-200 font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                🎯 Spin Again
              </button>
              <button
                onClick={() => setShowResultPopup(false)}
                className="w-full px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium border border-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Controls */}
      <div className="flex flex-col items-center space-y-2 md:space-y-3 px-2">
        {/* Settings Button */}
        <button
          onClick={() => setShowSettings(true)}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors flex items-center space-x-2"
        >
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </button>

        <button
          onClick={spinWheel}
          disabled={isSpinning}
          className={`px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-white text-base md:text-lg transition-all duration-300 transform ${isSpinning
            ? 'bg-gray-400 cursor-not-allowed scale-95'
            : 'bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 hover:scale-105 shadow-lg hover:shadow-xl'
            }`}
          style={{
            minWidth: '200px',
            boxShadow: isSpinning ? 'none' : '0 8px 25px rgba(147, 51, 234, 0.3)'
          }}
        >
          {isSpinning ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 md:w-5 md:h-5 border-2 md:border-3 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>🌟 Spinning...</span>
            </div>
          ) : (
            <span className="flex items-center space-x-2">
              <span>🎯</span>
              <span>Spin the Wheel!</span>
              <span>✨</span>
            </span>
          )}
        </button>

        {result && !showCelebration && (
          <button
            onClick={resetWheel}
            className="px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-full transition-all duration-200 transform hover:scale-105 shadow-md text-sm md:text-base"
          >
            🔄 Reset Wheel
          </button>
        )}
      </div>
    </div>
  )
}

export default SpinningWheel
