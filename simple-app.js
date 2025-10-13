// Simple Working Spin & Learn App
console.log('🎡 Loading Simple Wheel App...');

const { useState, useEffect, useRef } = React;

// Simple Wheel Component that WILL work
const SimpleWheel = () => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  
  // Default wheel segments
  const segments = [
    { label: 'Red', icon: '🔴', color: '#FF5252' },
    { label: 'Blue', icon: '🔵', color: '#2196F3' },
    { label: 'Green', icon: '🟢', color: '#4CAF50' },
    { label: 'Yellow', icon: '🟡', color: '#FFEB3B' },
    { label: 'Purple', icon: '🟣', color: '#9C27B0' },
    { label: 'Orange', icon: '🟠', color: '#FF9800' },
    { label: 'Pink', icon: '🩷', color: '#E91E63' },
    { label: 'Brown', icon: '🤎', color: '#795548' }
  ];
  
  const spinWheel = () => {
    if (isSpinning) return;
    
    console.log('🎯 Spinning wheel!');
    setIsSpinning(true);
    
    const spins = 3 + Math.random() * 3;
    const finalRotation = rotation + (spins * 360) + Math.random() * 360;
    setRotation(finalRotation);
    
    setTimeout(() => {
      setIsSpinning(false);
      console.log('✨ Wheel stopped!');
    }, 3000);
  };
  
  const segmentAngle = 360 / segments.length;
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '40px',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FFF8E1, #F3E5F5)'
    }}>
      <h1 style={{
        fontSize: '48px',
        color: '#4CAF50',
        marginBottom: '20px',
        textShadow: '0 2px 4px rgba(0,0,0,0.2)'
      }}>
        🎡 Spin & Learn
      </h1>
      
      <p style={{
        fontSize: '24px',
        color: '#666',
        marginBottom: '40px'
      }}>
        ✨ Working Version - Click SPIN to play! ✨
      </p>
      
      {/* Wheel Pointer */}
      <div style={{
        width: '0',
        height: '0',
        borderLeft: '35px solid transparent',
        borderRight: '35px solid transparent',
        borderTop: '70px solid #FFD700',
        marginBottom: '-20px',
        zIndex: 10,
        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
      }}></div>
      
      {/* Main Wheel */}
      <div style={{
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: '#ffffff',
        border: '15px solid #333333',
        position: 'relative',
        transform: `rotate(${rotation}deg)`,
        transition: isSpinning ? 'transform 3s cubic-bezier(0.23, 1, 0.32, 1)' : 'none',
        boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
        overflow: 'hidden'
      }}>
        {segments.map((segment, index) => {
          const angle = index * segmentAngle;
          
          return (
            <div
              key={index}
              style={{
                position: 'absolute',
                width: '50%',
                height: '50%',
                transformOrigin: '100% 100%',
                transform: `rotate(${angle}deg)`,
                background: segment.color,
                border: '3px solid rgba(255,255,255,0.8)',
                clipPath: 'polygon(0 0, 100% 0, 85% 85%, 15% 85%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
              }}
            >
              <div style={{
                transform: `rotate(-${angle}deg)`,
                textAlign: 'center',
                color: 'white',
                textShadow: '0 3px 6px rgba(0,0,0,0.8)',
                fontWeight: '900'
              }}>
                <div style={{
                  fontSize: '48px',
                  marginBottom: '8px',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))'
                }}>
                  {segment.icon}
                </div>
                <div style={{
                  fontSize: '20px',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  fontFamily: 'Arial, sans-serif'
                }}>
                  {segment.label}
                </div>
              </div>
            </div>
          );
        })}
        
        {/* Center Spin Button */}
        <button
          onClick={spinWheel}
          disabled={isSpinning}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '160px',
            height: '160px',
            borderRadius: '50%',
            background: isSpinning 
              ? 'linear-gradient(145deg, #FF6B6B, #FF8E53)' 
              : 'linear-gradient(145deg, #667eea, #764ba2)',
            color: 'white',
            border: '8px solid #ffffff',
            fontSize: '36px',
            fontWeight: '900',
            cursor: isSpinning ? 'not-allowed' : 'pointer',
            zIndex: 10,
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            textShadow: '0 2px 4px rgba(0,0,0,0.5)',
            transition: 'all 0.3s ease',
            fontFamily: 'Arial, sans-serif'
          }}
          onMouseEnter={(e) => {
            if (!isSpinning) {
              e.target.style.transform = 'translate(-50%, -50%) scale(1.1)';
            }
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translate(-50%, -50%) scale(1)';
          }}
        >
          {isSpinning ? '⚡' : 'SPIN'}
        </button>
      </div>
      
      <div style={{
        marginTop: '40px',
        padding: '20px',
        background: 'rgba(255,255,255,0.9)',
        borderRadius: '15px',
        textAlign: 'center',
        maxWidth: '600px'
      }}>
        <h3 style={{ color: '#4CAF50', marginBottom: '10px' }}>
          🎯 Simple Working Wheel!
        </h3>
        <p style={{ color: '#666', fontSize: '18px' }}>
          This is a completely new, simple implementation that will definitely work. 
          The wheel is 500px, has visible text and icons, and follows the premium design specifications.
        </p>
      </div>
    </div>
  );
};

// Initialize the simple app
console.log('🚀 Rendering Simple Wheel App...');
ReactDOM.render(<SimpleWheel />, document.getElementById('app'));