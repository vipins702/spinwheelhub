import React, { useRef, useEffect, useState, useCallback } from 'react'

interface WheelOption {
  id: string
  text: string
  color?: string
  weight?: number
}

interface CanvasWheelProps {
  options: WheelOption[]
  size?: number
  onSpinComplete?: (result: WheelOption) => void
  enableSound?: boolean
  showControls?: boolean
}

const ProfessionalCanvasWheel: React.FC<CanvasWheelProps> = ({
  options = [],
  size = 600,
  onSpinComplete,
  enableSound = false,
  showControls = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isSpinning, setIsSpinning] = useState(false)
  const [result, setResult] = useState<WheelOption | null>(null)
  const [animationId, setAnimationId] = useState<number | null>(null)
  
  // Physics state
  const [angle, setAngle] = useState(0)
  const [velocity, setVelocity] = useState(0)
  const [spinning, setSpinning] = useState(false)

  // Ensure we have valid options
  const validOptions = options.length > 0 ? options : [
    { id: '1', text: 'Option 1', color: '#6C5CE7' },
    { id: '2', text: 'Option 2', color: '#00B894' },
    { id: '3', text: 'Option 3', color: '#FD79A8' },
    { id: '4', text: 'Option 4', color: '#FDCB6E' }
  ]

  // Professional color palette
  const professionalColors = [
    '#6C5CE7', '#00B894', '#FD79A8', '#FDCB6E', '#E17055', '#74B9FF',
    '#A29BFE', '#FD79A8', '#FDCB6E', '#55A3FF', '#26DE81', '#FC5C65'
  ]

  // High-quality canvas setup with retina support
  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // High DPI support
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    
    canvas.width = size * dpr
    canvas.height = size * dpr
    canvas.style.width = `${size}px`
    canvas.style.height = `${size}px`
    
    ctx.scale(dpr, dpr)
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'
    
    return ctx
  }, [size])

  // Draw the wheel with professional styling
  const drawWheel = useCallback((ctx: CanvasRenderingContext2D, currentAngle: number = 0) => {
    const centerX = size / 2
    const centerY = size / 2
    const radius = (size / 2) - 20
    
    ctx.clearRect(0, 0, size, size)
    
    // Draw shadow/glow effect
    ctx.save()
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)'
    ctx.shadowBlur = 20
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 5
    
    // Draw wheel background
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
    ctx.fillStyle = '#ffffff'
    ctx.fill()
    ctx.restore()

    // Draw segments
    const segmentAngle = (Math.PI * 2) / validOptions.length
    
    validOptions.forEach((option, index) => {
      const startAngle = currentAngle + (index * segmentAngle) - Math.PI / 2
      const endAngle = startAngle + segmentAngle
      const color = option.color || professionalColors[index % professionalColors.length]
      
      // Draw segment
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, endAngle)
      ctx.closePath()
      ctx.fillStyle = color
      ctx.fill()
      
      // Segment border
      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = 2
      ctx.stroke()
      
      // Draw text
      ctx.save()
      const textAngle = startAngle + segmentAngle / 2
      const textRadius = radius * 0.7
      const textX = centerX + Math.cos(textAngle) * textRadius
      const textY = centerY + Math.sin(textAngle) * textRadius
      
      ctx.translate(textX, textY)
      ctx.rotate(textAngle + Math.PI / 2)
      
      ctx.fillStyle = '#ffffff'
      ctx.font = `bold ${Math.max(size / 25, 12)}px 'Roboto', sans-serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.shadowColor = 'rgba(0, 0, 0, 0.7)'
      ctx.shadowBlur = 2
      ctx.shadowOffsetX = 1
      ctx.shadowOffsetY = 1
      
      const text = option.text.length > 12 ? option.text.substring(0, 12) + '...' : option.text
      ctx.fillText(text.toUpperCase(), 0, 0)
      ctx.restore()
    })
    
    // Draw center circle
    ctx.beginPath()
    ctx.arc(centerX, centerY, 25, 0, Math.PI * 2)
    ctx.fillStyle = '#2D3436'
    ctx.fill()
    ctx.strokeStyle = '#ffffff'
    ctx.lineWidth = 3
    ctx.stroke()
    
    // Draw pointer (fixed at top)
    drawPointer(ctx, centerX, centerY - radius - 10)
  }, [size, validOptions, professionalColors])

  // Draw the pointer
  const drawPointer = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.save()
    ctx.translate(x, y)
    
    // Pointer shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)'
    ctx.shadowBlur = 8
    ctx.shadowOffsetY = 2
    
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(-15, -30)
    ctx.lineTo(15, -30)
    ctx.closePath()
    
    // Gradient fill
    const gradient = ctx.createLinearGradient(0, -30, 0, 0)
    gradient.addColorStop(0, '#FFD700')
    gradient.addColorStop(1, '#FFA500')
    ctx.fillStyle = gradient
    ctx.fill()
    
    ctx.strokeStyle = '#ffffff'
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.restore()
  }

  // Realistic physics animation
  const animate = useCallback(() => {
    if (!spinning) return

    const ctx = setupCanvas()
    if (!ctx) return

    // Apply physics: friction coefficient 0.98
    setVelocity(prev => prev * 0.98)
    setAngle(prev => prev + velocity)

    drawWheel(ctx, angle)

    // Stop when velocity is very low
    if (Math.abs(velocity) < 0.1) {
      setSpinning(false)
      setIsSpinning(false)
      
      // Calculate winner
      const normalizedAngle = ((angle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)
      const segmentAngle = (Math.PI * 2) / validOptions.length
      const winnerIndex = Math.floor(((Math.PI * 2 - normalizedAngle + Math.PI / 2) % (Math.PI * 2)) / segmentAngle)
      const winner = validOptions[winnerIndex % validOptions.length]
      
      setResult(winner)
      onSpinComplete?.(winner)
      
      // Optional bounce effect
      setTimeout(() => {
        setAngle(prev => prev - 0.1)
        const ctx = setupCanvas()
        if (ctx) drawWheel(ctx, angle - 0.1)
        
        setTimeout(() => {
          setAngle(prev => prev + 0.1)
          const ctx = setupCanvas()
          if (ctx) drawWheel(ctx, angle)
        }, 100)
      }, 100)
      
      return
    }

    const id = requestAnimationFrame(animate)
    setAnimationId(id)
  }, [spinning, velocity, angle, setupCanvas, drawWheel, validOptions, onSpinComplete])

  // Spin function with realistic physics
  const spinWheel = () => {
    if (isSpinning) return
    
    setIsSpinning(true)
    setResult(null)
    setSpinning(true)
    
    // Initial velocity: 20-40 (randomized)
    const initialVelocity = 0.3 + Math.random() * 0.7 // Converted to radians
    
    // Random bonus rotations: 5-10 full rotations
    const bonusRotations = (5 + Math.random() * 5) * Math.PI * 2
    
    setVelocity(initialVelocity)
    setAngle(prev => prev + bonusRotations)
    
    // Play spin sound if enabled
    if (enableSound) {
      // TODO: Add audio implementation
    }
  }

  // Initialize canvas
  useEffect(() => {
    const ctx = setupCanvas()
    if (ctx) {
      drawWheel(ctx, angle)
    }
  }, [setupCanvas, drawWheel, angle])

  // Animation loop
  useEffect(() => {
    if (spinning) {
      animate()
    }
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [spinning, animate, animationId])

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Canvas Wheel */}
      <div 
        className="relative"
        style={{ width: size, height: size }}
      >
        <canvas
          ref={canvasRef}
          className="rounded-full shadow-2xl cursor-pointer hover:shadow-3xl transition-shadow duration-300"
          onClick={spinWheel}
          style={{
            filter: 'drop-shadow(0 10px 25px rgba(0,0,0,0.15))',
          }}
        />
        
        {/* Hover glow effect */}
        <div 
          className="absolute inset-0 rounded-full pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300"
          style={{
            background: 'radial-gradient(circle, rgba(108, 92, 231, 0.1) 0%, transparent 70%)',
            boxShadow: '0 0 30px rgba(108, 92, 231, 0.3)'
          }}
        />
      </div>

      {/* Controls */}
      {showControls && (
        <div className="flex flex-col items-center space-y-4">
          <button
            onClick={spinWheel}
            disabled={isSpinning}
            className={`px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform ${
              isSpinning
                ? 'bg-gray-400 cursor-not-allowed scale-95'
                : 'bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700 text-white hover:scale-105 shadow-lg hover:shadow-xl animate-pulse'
            }`}
            style={{ 
              minWidth: '200px',
              boxShadow: isSpinning ? 'none' : '0 8px 25px rgba(108, 92, 231, 0.3)'
            }}
          >
            {isSpinning ? (
              <span className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>🎯 Spinning...</span>
              </span>
            ) : (
              <span className="flex items-center space-x-2">
                <span>🎲</span>
                <span>Spin the Wheel!</span>
                <span>✨</span>
              </span>
            )}
          </button>

          {result && !isSpinning && (
            <div className="text-center p-6 bg-white rounded-xl shadow-lg border-2 border-purple-200">
              <h3 className="text-2xl font-bold text-purple-600 mb-2">🎉 Winner!</h3>
              <p className="text-xl text-gray-800">{result.text}</p>
              <button
                onClick={() => setResult(null)}
                className="mt-3 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200"
              >
                Clear Result
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ProfessionalCanvasWheel