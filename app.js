// Main App.js - Spin & Learn Educational App
// COPPA Compliant - Child-Directed Content

const { useState, useEffect, useRef, useCallback } = React;

// Utility functions
// COPPA-Compliant Ad Banner Component
const AdBanner = ({ settings, purchases }) => {
  const [adVisible, setAdVisible] = useState(true);
  const [adError, setAdError] = useState(false);
  
  // Don't show ads if user purchased ad-free version
  if (purchases.noAds) {
    return null;
  }
  
  // Don't show ads if hidden by user
  if (!adVisible) {
    return null;
  }
  
  // Simulate ad loading (in real implementation, this would use AdMob/AdSense)
  useEffect(() => {
    // Configure ad request with child-directed tagging
    const configureChildDirectedAds = () => {
      // Pseudo-code for actual implementation:
      /*
      if (window.googletag) {
        googletag.cmd.push(function() {
          googletag.pubads().setTagForChildDirectedTreatment(1);
          googletag.pubads().setTagForUnderAgeOfConsent(1);
          googletag.pubads().setRequestNonPersonalizedAds(1);
        });
      }
      */
      
      // For demo purposes, we'll just show a placeholder
      console.log('Ad configured with child-directed settings:', {
        childDirected: true,
        underAgeConsent: true,
        nonPersonalized: true,
        noUserTracking: true
      });
    };
    
    configureChildDirectedAds();
  }, []);
  
  const handleAdClose = () => {
    setAdVisible(false);
    // In parent mode, ads can be re-enabled
  };
  
  const AdContent = () => {
    // This would be replaced with actual ad content in production
    return (
      <div className="ad-content" style={{
        padding: '10px',
        background: 'linear-gradient(45deg, #f0f8ff, #e6f3ff)',
        border: '1px solid #ddd',
        borderRadius: '8px',
        textAlign: 'center',
        fontSize: '14px',
        color: '#666'
      }}>
        <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>🌟 Educational Games</div>
        <div style={{ fontSize: '12px' }}>Child-Safe • No Personal Data</div>
        <div style={{ fontSize: '11px', marginTop: '5px', opacity: 0.7 }}>Advertisement</div>
      </div>
    );
  };
  
  return (
    <div 
      className="ad-banner" 
      role="banner" 
      aria-label="Child-directed advertisement"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        background: '#fafafa',
        borderTop: '2px solid #ddd',
        zIndex: 100,
        padding: '8px',
        boxShadow: '0 -2px 10px rgba(0,0,0,0.1)'
      }}
    >
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        gap: '10px'
      }}>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <AdContent />
        </div>
        
        <button
          onClick={handleAdClose}
          style={{
            background: 'transparent',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '4px 8px',
            fontSize: '12px',
            cursor: 'pointer',
            color: '#666'
          }}
          aria-label="Close advertisement"
        >
          ×
        </button>
      </div>
      
      {/* COPPA Compliance Notice */}
      <div style={{
        fontSize: '10px',
        textAlign: 'center',
        color: '#999',
        marginTop: '2px'
      }}>
        🔒 Child-Directed • Non-Personalized • Privacy-Safe
      </div>
    </div>
  );
};

// Privacy Policy Component
const PrivacyScreen = ({ onBack }) => {
  return (
    <div className="privacy-screen">
      <div className="nav-header">
        <h2 className="nav-title">🔒 Privacy Policy</h2>
        <button className="btn btn-secondary" onClick={onBack}>
          ← Back
        </button>
      </div>
      
      <div className="card">
        <h3>Child Privacy Protection</h3>
        <p style={{ fontSize: '18px', lineHeight: '1.6', marginBottom: '20px' }}>
          Spin & Learn is designed to be safe for children and complies with the Children's Online Privacy Protection Act (COPPA).
        </p>
        
        <h4 style={{ color: 'var(--primary-color)', marginTop: '30px', marginBottom: '15px' }}>What We DO NOT Collect:</h4>
        <ul style={{ fontSize: '16px', lineHeight: '1.8', color: '#333' }}>
          <li>✅ No names, email addresses, or contact information</li>
          <li>✅ No photos or videos</li>
          <li>✅ No location data</li>
          <li>✅ No device identifiers or persistent tracking</li>
          <li>✅ No behavioral profiling or personalized advertising</li>
          <li>✅ No social media connections</li>
        </ul>
        
        <h4 style={{ color: 'var(--primary-color)', marginTop: '30px', marginBottom: '15px' }}>What We Do Collect (Locally Only):</h4>
        <ul style={{ fontSize: '16px', lineHeight: '1.8', color: '#333' }}>
          <li>ℹ️ Game progress and scores (stored on your device only)</li>
          <li>ℹ️ App settings and preferences (stored on your device only)</li>
          <li>ℹ️ Anonymous usage statistics (only if enabled by parent)</li>
        </ul>
        
        <h4 style={{ color: 'var(--primary-color)', marginTop: '30px', marginBottom: '15px' }}>Advertising:</h4>
        <ul style={{ fontSize: '16px', lineHeight: '1.8', color: '#333' }}>
          <li>✅ All ads are marked as child-directed content</li>
          <li>✅ No personalized or behavioral advertising</li>
          <li>✅ No ad tracking or profiling</li>
          <li>✅ Contextual, educational content only</li>
          <li>✅ Can be disabled through parental controls</li>
        </ul>
        
        <h4 style={{ color: 'var(--primary-color)', marginTop: '30px', marginBottom: '15px' }}>Parental Rights:</h4>
        <ul style={{ fontSize: '16px', lineHeight: '1.8', color: '#333' }}>
          <li>🛡️ Full control over all app settings</li>
          <li>🛡️ Ability to export or delete all data</li>
          <li>🛡️ Control over ads and analytics</li>
          <li>🛡️ No purchases without parental verification</li>
        </ul>
        
        <div style={{ 
          background: '#E8F5E8', 
          padding: '20px', 
          borderRadius: '12px', 
          marginTop: '30px',
          textAlign: 'center'
        }}>
          <h4 style={{ color: '#4CAF50', marginBottom: '10px' }}>✅ COPPA Compliant</h4>
          <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
            This app is designed specifically for children and follows all COPPA requirements for child-directed content.
          </p>
        </div>
        
        <div style={{ marginTop: '30px', fontSize: '14px', color: '#666' }}>
          <p>Last Updated: {new Date().toLocaleDateString()}</p>
          <p>For questions about this privacy policy, parents can contact us through the app store.</p>
        </div>
      </div>
    </div>
  );
};

const generateRandomCode = () => {
  return Math.floor(10 + Math.random() * 90).toString();
};

// Purchase Component for Ad-Free Experience
const PurchaseScreen = ({ onBack, onPurchaseComplete }) => {
  const [purchasing, setPurchasing] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState(false);
  
  const handlePurchase = async () => {
    setPurchasing(true);
    
    // Simulate purchase process (in real app, this would use app store APIs)
    try {
      // In a real implementation:
      // - Use Apple App Store or Google Play billing APIs
      // - Verify purchase on server
      // - Handle purchase restoration
      
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      
      // Update local storage
      window.dataManager.updatePurchase('noAds', true);
      
      setPurchaseComplete(true);
      setPurchasing(false);
      
      // Notify parent component
      onPurchaseComplete?.();
      
    } catch (error) {
      setPurchasing(false);
      alert('Purchase failed. Please try again.');
    }
  };
  
  if (purchaseComplete) {
    return (
      <div className="purchase-screen">
        <div className="nav-header">
          <h2 className="nav-title">🛒 Purchase Complete</h2>
          <button className="btn btn-secondary" onClick={onBack}>
            ← Back
          </button>
        </div>
        
        <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{ fontSize: '80px', marginBottom: '20px' }}>✅</div>
          <h3 style={{ color: 'var(--success-color)', marginBottom: '20px' }}>Thank You!</h3>
          <p style={{ fontSize: '18px', marginBottom: '30px' }}>
            Ads have been removed from Spin & Learn. Your child can now enjoy an uninterrupted learning experience!
          </p>
          <button className="btn btn-primary btn-large" onClick={onBack}>
            Continue Learning
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="purchase-screen">
      <div className="nav-header">
        <h2 className="nav-title">🛒 Remove Ads</h2>
        <button className="btn btn-secondary" onClick={onBack}>
          ← Back
        </button>
      </div>
      
      <div className="card">
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ fontSize: '60px', marginBottom: '15px' }}>🎆</div>
          <h3>Ad-Free Learning Experience</h3>
          <p style={{ fontSize: '18px', color: '#666', marginTop: '10px' }}>
            Remove all advertisements for a cleaner, more focused learning environment.
          </p>
        </div>
        
        <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '12px', marginBottom: '20px' }}>
          <h4 style={{ marginBottom: '15px' }}>What you get:</h4>
          <ul style={{ fontSize: '16px', lineHeight: '1.8' }}>
            <li>✅ No advertisements during gameplay</li>
            <li>✅ Cleaner, distraction-free interface</li>
            <li>✅ Faster loading times</li>
            <li>✅ One-time purchase, lifetime benefit</li>
            <li>✅ Still COPPA compliant and privacy-safe</li>
          </ul>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--primary-color)', marginBottom: '20px' }}>
            $2.99
          </div>
          
          <button 
            className="btn btn-primary btn-large"
            onClick={handlePurchase}
            disabled={purchasing}
            style={{ minWidth: '200px' }}
          >
            {purchasing ? (
              <>
                <div style={{ 
                  display: 'inline-block', 
                  width: '20px', 
                  height: '20px', 
                  border: '2px solid white', 
                  borderTop: '2px solid transparent', 
                  borderRadius: '50%', 
                  animation: 'spin 1s linear infinite',
                  marginRight: '10px'
                }}></div>
                Processing...
              </>
            ) : (
              'Purchase Ad-Free Version'
            )}
          </button>
          
          <p style={{ fontSize: '12px', color: '#666', marginTop: '15px' }}>
            Secure purchase through your device's app store
          </p>
        </div>
      </div>
    </div>
  );
};
const playSound = (type, settings) => {
  if (!settings.sound) return;
  
  // Create audio context for sound effects
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Different sounds for different actions
    switch (type) {
      case 'spin':
        // Spinning wheel sound
        const spinOsc = audioContext.createOscillator();
        const spinGain = audioContext.createGain();
        spinOsc.connect(spinGain);
        spinGain.connect(audioContext.destination);
        
        spinOsc.frequency.setValueAtTime(200, audioContext.currentTime);
        spinOsc.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.3);
        spinGain.gain.setValueAtTime(0.1, audioContext.currentTime);
        spinGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        spinOsc.start(audioContext.currentTime);
        spinOsc.stop(audioContext.currentTime + 0.3);
        break;
        
      case 'win':
        // Victory fanfare
        const winFreqs = [523, 659, 784, 1047]; // C, E, G, C octave
        winFreqs.forEach((freq, i) => {
          const osc = audioContext.createOscillator();
          const gain = audioContext.createGain();
          osc.connect(gain);
          gain.connect(audioContext.destination);
          osc.frequency.setValueAtTime(freq, audioContext.currentTime + i * 0.15);
          gain.gain.setValueAtTime(0.15, audioContext.currentTime + i * 0.15);
          gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + i * 0.15 + 0.4);
          osc.start(audioContext.currentTime + i * 0.15);
          osc.stop(audioContext.currentTime + i * 0.15 + 0.4);
        });
        break;
        
      case 'click':
        // Button click sound
        const clickOsc = audioContext.createOscillator();
        const clickGain = audioContext.createGain();
        clickOsc.connect(clickGain);
        clickGain.connect(audioContext.destination);
        clickOsc.frequency.setValueAtTime(800, audioContext.currentTime);
        clickGain.gain.setValueAtTime(0.1, audioContext.currentTime);
        clickGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        clickOsc.start(audioContext.currentTime);
        clickOsc.stop(audioContext.currentTime + 0.1);
        break;
    }
  } catch (e) {
    console.log('Audio not supported:', e);
  }
};

// Enhanced confetti effect with different shapes
const createConfetti = () => {
  const colors = ['#FF5722', '#FF9800', '#FFC107', '#4CAF50', '#2196F3', '#9C27B0', '#E91E63', '#00BCD4'];
  const shapes = ['confetti-circle', 'confetti-square', 'confetti-star', 'confetti-heart'];
  const confettiCount = 80;
  
  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    
    confetti.className = `confetti ${shape}`;
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.animationDelay = Math.random() * 3 + 's';
    confetti.style.animationDuration = (Math.random() * 3 + 3) + 's';
    
    if (shape === 'confetti-circle' || shape === 'confetti-square') {
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    }
    
    document.body.appendChild(confetti);
    
    // Remove confetti after animation
    setTimeout(() => {
      if (confetti.parentNode) {
        confetti.parentNode.removeChild(confetti);
      }
    }, 6000);
  }
};

// Create star explosion effect
const createStarExplosion = (x, y) => {
  const stars = ['⭐', '✨', '🌟', '💫', '⚡'];
  const explosionCount = 8;
  
  for (let i = 0; i < explosionCount; i++) {
    const star = document.createElement('div');
    star.className = 'star-explosion';
    star.innerHTML = stars[Math.floor(Math.random() * stars.length)];
    
    const angle = (360 / explosionCount) * i;
    const distance = 50 + Math.random() * 50;
    
    star.style.left = x + Math.cos(angle * Math.PI / 180) * distance + 'px';
    star.style.top = y + Math.sin(angle * Math.PI / 180) * distance + 'px';
    star.style.animationDelay = (i * 0.1) + 's';
    
    document.body.appendChild(star);
    
    // Remove star after animation
    setTimeout(() => {
      if (star.parentNode) {
        star.parentNode.removeChild(star);
      }
    }, 1000 + (i * 100));
  }
};

// Wheel Component
const Wheel = ({ wheel, onResult, disabled, settings }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef(null);
  
  // Ensure wheel has segments
  const segments = wheel?.segments || [];
  
  if (!wheel || segments.length === 0) {
    return (
      <div className="wheel-container">
        <div style={{ 
          width: '500px', 
          height: '500px', 
          border: '8px solid #ccc',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f5f5f5',
          fontSize: '24px',
          color: '#666'
        }}>
          {wheel ? 'No segments available' : 'Loading wheel...'}
        </div>
      </div>
    );
  }
  
  const segmentAngle = 360 / segments.length;
  
  // Determine wheel theme based on wheel type
  const getWheelTheme = (wheelId) => {
    switch (wheelId) {
      case 'colors': return 'colors-theme';
      case 'math': return 'math-theme';
      case 'quiz': return 'quiz-theme';
      case 'actions': return 'actions-theme';
      case 'teams': return 'teams-theme';
      default: return '';
    }
  };
  
  // Debug: Log wheel dimensions
  useEffect(() => {
    console.log('Wheel component mounted with wheel:', wheel.name);
    console.log('Segments:', wheel.segments?.length);
    if (wheelRef.current) {
      const rect = wheelRef.current.getBoundingClientRect();
      console.log('Wheel dimensions:', rect.width + 'x' + rect.height);
    }
  }, [wheel]);
  
  const spinWheel = useCallback(() => {
    if (isSpinning || disabled) return;
    
    // Debug: Log wheel dimensions
    if (wheelRef.current) {
      const wheelRect = wheelRef.current.getBoundingClientRect();
      console.log('Enhanced Wheel Dimensions:', {
        width: wheelRect.width,
        height: wheelRect.height,
        expected: '420px',
        enhanced: 'v2.0'
      });
    }
    
    playSound('spin', settings);
    setIsSpinning(true);
    
    // Generate random spin
    const minSpins = 3;
    const maxSpins = 6;
    const spins = minSpins + Math.random() * (maxSpins - minSpins);
    const finalRotation = rotation + (spins * 360) + Math.random() * 360;
    
    setRotation(finalRotation);
    
    // Calculate which segment wins
    const normalizedRotation = (360 - (finalRotation % 360)) % 360;
    const winningIndex = Math.floor(normalizedRotation / segmentAngle) % segments.length;
    const winningSegment = segments[winningIndex];
    
    // Set CSS variables for animation
    if (wheelRef.current) {
      wheelRef.current.style.setProperty('--spin-rotation', `${finalRotation}deg`);
      wheelRef.current.style.setProperty('--spin-duration', `${2 + Math.random() * 2}s`);
    }
    
    // End spin after animation
    setTimeout(() => {
      setIsSpinning(false);
      if (winningSegment) {
        playSound('win', settings);
        
        // Create enhanced celebration effects
        createConfetti();
        
        // Create star explosion at wheel center
        const wheelElement = wheelRef.current;
        if (wheelElement) {
          const rect = wheelElement.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          createStarExplosion(centerX, centerY);
        }
        
        // Trigger haptic feedback if available
        if (navigator.vibrate) {
          navigator.vibrate([200, 100, 200]);
        }
        
        onResult(winningSegment);
      }
    }, (2 + Math.random() * 2) * 1000);
  }, [isSpinning, disabled, rotation, segments, segmentAngle, onResult, settings]);
  
  return (
    <div className="wheel-container">
      <div className="wheel-pointer" aria-hidden="true"></div>
      <div 
        ref={wheelRef}
        className={`wheel ${isSpinning ? 'spinning' : ''} ${getWheelTheme(wheel.id)}`}
        style={{ 
          transform: `rotate(${rotation}deg)`
        }}
        role="button"
        tabIndex={0}
        aria-label={`${wheel.name} wheel with ${segments.length} segments`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            spinWheel();
          }
        }}
      >
        {segments.map((segment, index) => {
          const angle = index * segmentAngle;
          return (
            <div
              key={segment.id}
              className="wheel-segment"
              style={{
                transform: `rotate(${angle}deg)`,
                background: `linear-gradient(135deg, 
                  ${segment.color} 0%, 
                  ${segment.color}dd 50%, 
                  ${segment.color}bb 100%)`,
                borderColor: 'rgba(255,255,255,0.8)'
              }}
              aria-label={`Segment: ${segment.label}`}
            >
              <div style={{ 
                transform: `rotate(-${angle}deg) translate(-40%, -40%)`,
                textAlign: 'center',
                zIndex: 10,
                position: 'relative',
                padding: '8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{ 
                  fontSize: '42px', 
                  marginBottom: '8px',
                  filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.7))',
                  lineHeight: '1'
                }}>{segment.icon}</div>
                <div style={{ 
                  fontSize: '18px', 
                  fontWeight: '900',
                  textShadow: '0 3px 10px rgba(0,0,0,0.9), 0 0 15px rgba(0,0,0,0.7)',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  lineHeight: '1.2',
                  color: 'white',
                  textAlign: 'center',
                  wordWrap: 'break-word',
                  maxWidth: '80px'
                }}>
                  {segment.label}
                </div>
              </div>
            </div>
          );
        })}
        
        <button
          className="spin-button"
          onClick={spinWheel}
          disabled={isSpinning || disabled}
          aria-label={isSpinning ? 'Wheel is spinning' : 'Spin the wheel'}
        >
          {isSpinning ? (
            <div style={{ 
              animation: 'spin 1s linear infinite',
              fontSize: '36px'
            }}>⚡</div>
          ) : (
            'SPIN'
          )}
        </button>
      </div>
    </div>
  );
};

// Parental Gate Component
const ParentalGate = ({ isOpen, onClose, onSuccess }) => {
  const [code, setCode] = useState('');
  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState('');
  
  useEffect(() => {
    if (isOpen) {
      setCode(generateRandomCode());
      setUserInput('');
      setError('');
    }
  }, [isOpen]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput === code) {
      onSuccess();
      onClose();
    } else {
      setError('Incorrect code. Please try again.');
      setCode(generateRandomCode()); // Generate new code
      setUserInput('');
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="parental-gate" role="dialog" aria-modal="true" aria-labelledby="gate-title">
      <div className="gate-content">
        <h2 id="gate-title">Parent Verification</h2>
        <p>Please enter the code shown below to continue:</p>
        <div className="gate-code" aria-label={`Verification code: ${code.split('').join(' ')}`}>
          {code}
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="gate-input"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Enter code"
            maxLength={2}
            aria-label="Enter verification code"
            autoFocus
          />
          {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button type="submit" className="btn btn-primary">
              Verify
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Home Screen Component
const HomeScreen = ({ onSelectWheel, onParentMode, onPrivacyPolicy, onPurchase, settings, purchases }) => {
  const wheels = window.dataManager.getWheels();
  const progress = window.dataManager.getProgressStats();
  
  return (
    <div className="home-screen">
      <div className="nav-header">
        <h1 className="nav-title">🎡 Spin & Learn</h1>
        <div style={{ fontSize: '12px', color: '#4CAF50', fontWeight: 'bold', textAlign: 'center' }}>
          ✨ DEBUG Version 5.0 - Troubleshooting Wheel Display! ✨
        </div>
        <div className="nav-buttons">
          <button 
            className="btn btn-secondary"
            onClick={onParentMode}
            aria-label="Parent settings and controls"
          >
            👨‍👩‍👧‍👦 Parent
          </button>
          <button 
            className="btn btn-secondary"
            onClick={onPrivacyPolicy}
            aria-label="Privacy policy and safety information"
          >
            🔒 Privacy
          </button>
          {!purchases.noAds && (
            <button 
              className="btn"
              onClick={onPurchase}
              style={{ background: '#FF9800', color: 'white' }}
              aria-label="Remove advertisements"
            >
              🚫📺 Remove Ads
            </button>
          )}
        </div>
      </div>
      
      <div className="reward-bar" role="banner" aria-label="Your progress">
        <div>
          <span style={{ fontSize: '24px' }}>⭐</span>
          <span style={{ marginLeft: '10px', fontSize: '20px' }}>
            {progress.totalStars} Stars Earned!
          </span>
        </div>
        <div style={{ fontSize: '16px', color: '#666' }}>
          {progress.totalSpins} spins completed
          {purchases.noAds && (
            <span style={{ marginLeft: '15px', color: 'var(--success-color)', fontWeight: 'bold' }}>
              ✅ Ad-Free
            </span>
          )}
        </div>
      </div>
      
      <div className="wheel-grid">
        {wheels.map(wheel => (
          <div
            key={wheel.id}
            className="wheel-card"
            onClick={() => {
              playSound('click', settings);
              onSelectWheel(wheel);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                playSound('click', settings);
                onSelectWheel(wheel);
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={`Play ${wheel.name} wheel: ${wheel.description}`}
          >
            <div className="wheel-icon">{wheel.icon}</div>
            <div className="wheel-title">{wheel.name}</div>
            <div className="wheel-description">{wheel.description}</div>
            <div style={{ marginTop: '10px', fontSize: '14px', color: '#888' }}>
              Difficulty: {wheel.difficulty}
            </div>
          </div>
        ))}
      </div>
      
      {/* Privacy notice */}
      <div style={{ 
        textAlign: 'center', 
        padding: '20px', 
        fontSize: '12px', 
        color: '#666',
        background: '#f9f9f9',
        borderRadius: '8px',
        margin: '20px 0'
      }}>
        🔒 <strong>Privacy Safe:</strong> No personal information collected. COPPA compliant.
        <br />
        Child-directed content only. Tap "Privacy" for full details.
      </div>
    </div>
  );
};

// Wheel Play Screen Component
const WheelPlayScreen = ({ wheel, onBack, onResult, settings }) => {
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);
  
  const handleResult = (segment) => {
    setResult(segment);
    setShowResult(true);
    
    // Log progress
    window.dataManager.addProgress(wheel.id, 'success');
    window.dataManager.logEvent('spin_complete', {
      wheelType: wheel.id,
      difficulty: wheel.difficulty,
      outcome: 'success'
    });
    
    onResult?.(segment);
  };
  
  const handlePlayAgain = () => {
    setResult(null);
    setShowResult(false);
    playSound('click', settings);
  };
  
  const getResultMessage = (segment) => {
    switch (segment.type) {
      case 'color':
        return `Great! You got ${segment.label}! Can you find something ${segment.label.toLowerCase()} around you?`;
      case 'number':
        return `Awesome! You spun ${segment.label}! Can you count to ${segment.value}?`;
      case 'word':
        return `Wonderful! You got "${segment.label}"! Can you spell it out loud?`;
      case 'math':
        return `Excellent! ${segment.label} = ${segment.answer}! You're great at math!`;
      case 'action':
        return `Time to ${segment.label}! Have fun and be safe!`;
      default:
        return `Amazing! You got ${segment.label}!`;
    }
  };
  
  return (
    <div className="wheel-play-screen">
      <div className="nav-header">
        <h2 className="nav-title">{wheel.icon} {wheel.name}</h2>
        <button className="btn btn-secondary" onClick={onBack} aria-label="Go back to home">
          ← Back
        </button>
      </div>
      
      {!showResult ? (
        <div>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <p style={{ fontSize: '24px', marginBottom: '15px' }}>
              🎯 Give the wheel a spin!
            </p>
            <p style={{ fontSize: '18px', color: '#666' }}>
              {wheel.description}
            </p>
          </div>
          
          <Wheel 
            wheel={wheel} 
            onResult={handleResult}
            settings={settings}
          />
        </div>
      ) : (
        <div className="result-screen" style={{ 
          textAlign: 'center', 
          padding: '40px',
          background: 'linear-gradient(135deg, #FFF8E1, #F3E5F5)',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          margin: '20px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ 
            position: 'absolute',
            top: '-50px',
            left: '-50px',
            width: '100px',
            height: '100px',
            background: 'radial-gradient(circle, rgba(255,193,7,0.3), transparent)',
            borderRadius: '50%',
            animation: 'float 3s ease-in-out infinite'
          }}></div>
          
          <div style={{ 
            fontSize: '120px', 
            marginBottom: '20px',
            animation: 'bounce 1s ease-in-out',
            filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.3))'
          }}>
            {result.icon}
          </div>
          
          <h2 style={{ 
            fontSize: '48px', 
            marginBottom: '20px', 
            color: result.color,
            textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
            animation: 'fadeInUp 0.8s ease-out 0.3s both'
          }}>
            {result.label}
          </h2>
          
          <p style={{ 
            fontSize: '24px', 
            marginBottom: '40px', 
            lineHeight: '1.6',
            color: '#333',
            animation: 'fadeInUp 0.8s ease-out 0.6s both'
          }}>
            {getResultMessage(result)}
          </p>
          
          <div style={{ 
            display: 'flex', 
            gap: '25px', 
            justifyContent: 'center',
            flexWrap: 'wrap',
            animation: 'fadeInUp 0.8s ease-out 0.9s both'
          }}>
            <button 
              className="btn btn-primary btn-large"
              onClick={handlePlayAgain}
              aria-label="Spin the wheel again"
              style={{
                background: 'linear-gradient(135deg, #4CAF50, #45a049)',
                transform: 'scale(1)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05) translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1) translateY(0)'}
            >
              🎡 Spin Again
            </button>
            <button 
              className="btn btn-secondary btn-large"
              onClick={onBack}
              aria-label="Choose a different wheel"
              style={{
                background: 'linear-gradient(135deg, #FF9800, #f57c00)',
                transform: 'scale(1)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05) translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1) translateY(0)'}
            >
              🏠 Choose Wheel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Parent Mode Screen with enhanced features
const ParentModeScreen = ({ onBack }) => {
  const [settings, setSettings] = useState(window.dataManager.getSettings());
  const [wheels, setWheels] = useState(window.dataManager.getWheels());
  const [selectedWheel, setSelectedWheel] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const progress = window.dataManager.getProgressStats();
  
  const updateSetting = (key, value) => {
    window.dataManager.updateSetting(key, value);
    setSettings(window.dataManager.getSettings());
  };
  
  const exportData = () => {
    const data = window.dataManager.exportData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `spin-learn-progress-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const resetData = () => {
    if (confirm('Are you sure you want to reset all progress data? This cannot be undone.')) {
      window.dataManager.resetAllData();
      setWheels(window.dataManager.getWheels());
      setSettings(window.dataManager.getSettings());
      alert('All data has been reset.');
    }
  };
  
  const WheelEditor = ({ wheel, onClose, onSave }) => {
    const [editedWheel, setEditedWheel] = useState({ ...wheel });
    
    const addSegment = () => {
      const newSegment = {
        id: `segment_${Date.now()}`,
        label: 'New Item',
        icon: '⭐',
        type: 'custom',
        color: '#4CAF50'
      };
      setEditedWheel({
        ...editedWheel,
        segments: [...editedWheel.segments, newSegment]
      });
    };
    
    const updateSegment = (index, updates) => {
      const newSegments = [...editedWheel.segments];
      newSegments[index] = { ...newSegments[index], ...updates };
      setEditedWheel({ ...editedWheel, segments: newSegments });
    };
    
    const removeSegment = (index) => {
      const newSegments = editedWheel.segments.filter((_, i) => i !== index);
      setEditedWheel({ ...editedWheel, segments: newSegments });
    };
    
    const saveWheel = () => {
      window.dataManager.updateWheel(wheel.id, editedWheel);
      onSave();
      onClose();
    };
    
    return (
      <div className="wheel-editor" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0,0,0,0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '30px',
          maxWidth: '600px',
          maxHeight: '80vh',
          overflow: 'auto',
          width: '100%'
        }}>
          <h3>Edit {wheel.name}</h3>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Wheel Name:</label>
            <input
              type="text"
              value={editedWheel.name}
              onChange={(e) => setEditedWheel({ ...editedWheel, name: e.target.value })}
              style={{
                width: '100%',
                padding: '10px',
                border: '2px solid #ddd',
                borderRadius: '8px',
                fontSize: '16px'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Description:</label>
            <input
              type="text"
              value={editedWheel.description}
              onChange={(e) => setEditedWheel({ ...editedWheel, description: e.target.value })}
              style={{
                width: '100%',
                padding: '10px',
                border: '2px solid #ddd',
                borderRadius: '8px',
                fontSize: '16px'
              }}
            />
          </div>
          
          <h4>Segments:</h4>
          {editedWheel.segments.map((segment, index) => (
            <div key={segment.id} style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '15px',
              marginBottom: '10px',
              background: '#f9f9f9'
            }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
                <input
                  type="text"
                  value={segment.icon}
                  onChange={(e) => updateSegment(index, { icon: e.target.value })}
                  style={{ width: '60px', padding: '5px', textAlign: 'center', fontSize: '20px' }}
                  placeholder="🎯"
                />
                <input
                  type="text"
                  value={segment.label}
                  onChange={(e) => updateSegment(index, { label: e.target.value })}
                  style={{ flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                  placeholder="Label"
                />
                <input
                  type="color"
                  value={segment.color}
                  onChange={(e) => updateSegment(index, { color: e.target.value })}
                  style={{ width: '50px', height: '40px', border: 'none', borderRadius: '4px' }}
                />
                <button
                  onClick={() => removeSegment(index)}
                  style={{
                    background: '#f44336',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '8px 12px',
                    cursor: 'pointer'
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          
          <button
            onClick={addSegment}
            style={{
              background: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 20px',
              marginBottom: '20px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            + Add Segment
          </button>
          
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button onClick={onClose} className="btn btn-secondary">Cancel</button>
            <button onClick={saveWheel} className="btn btn-primary">Save Changes</button>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="parent-mode-screen">
      <div className="nav-header">
        <h2 className="nav-title">👨‍👩‍👧‍👦 Parent Mode</h2>
        <button className="btn btn-secondary" onClick={onBack}>
          ← Back
        </button>
      </div>
      
      {/* Progress Overview */}
      <div className="card">
        <h3 style={{ color: 'var(--primary-color)', marginBottom: '20px' }}>📊 Progress Overview</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px' }}>
          <div style={{ textAlign: 'center', padding: '15px', background: '#E8F5E8', borderRadius: '12px' }}>
            <div style={{ fontSize: '32px', marginBottom: '5px' }}>🎯</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#4CAF50' }}>{progress.totalSpins}</div>
            <div style={{ fontSize: '14px', color: '#666' }}>Total Spins</div>
          </div>
          <div style={{ textAlign: 'center', padding: '15px', background: '#FFF3E0', borderRadius: '12px' }}>
            <div style={{ fontSize: '32px', marginBottom: '5px' }}>⭐</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#FF9800' }}>{progress.totalStars}</div>
            <div style={{ fontSize: '14px', color: '#666' }}>Stars Earned</div>
          </div>
          <div style={{ textAlign: 'center', padding: '15px', background: '#E3F2FD', borderRadius: '12px' }}>
            <div style={{ fontSize: '32px', marginBottom: '5px' }}>📈</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2196F3' }}>{Math.round(progress.successRate)}%</div>
            <div style={{ fontSize: '14px', color: '#666' }}>Success Rate</div>
          </div>
        </div>
      </div>
      
      {/* App Settings */}
      <div className="card">
        <h3 style={{ color: 'var(--primary-color)', marginBottom: '20px' }}>⚙️ App Settings</h3>
        
        <div className="settings-group">
          <label className="settings-label">🔊 Sound Effects</label>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={settings.sound}
              onChange={(e) => updateSetting('sound', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
          <p style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>Enable or disable all sound effects</p>
        </div>
        
        <div className="settings-group">
          <label className="settings-label">📊 Anonymous Analytics</label>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={settings.analytics}
              onChange={(e) => updateSetting('analytics', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
          <p style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>Only anonymous usage data. No personal information collected.</p>
        </div>
        
        <div className="settings-group">
          <label className="settings-label">🌗 High Contrast Mode</label>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={settings.highContrast}
              onChange={(e) => updateSetting('highContrast', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
          <p style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>Improve visibility with high contrast colors</p>
        </div>
        
        <div className="settings-group">
          <label className="settings-label">🔍 Large Text</label>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={settings.largeText}
              onChange={(e) => updateSetting('largeText', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
          <p style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>Increase text size for better readability</p>
        </div>
        
        <div className="settings-group">
          <label className="settings-label">🌊 Reduced Motion</label>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={settings.reducedMotion}
              onChange={(e) => updateSetting('reducedMotion', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
          <p style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>Reduce animations for motion sensitivity</p>
        </div>
      </div>
      
      {/* Wheel Management */}
      <div className="card">
        <h3 style={{ color: 'var(--primary-color)', marginBottom: '20px' }}>🎡 Manage Wheels</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
          {wheels.map(wheel => (
            <div key={wheel.id} style={{
              border: '2px solid #ddd',
              borderRadius: '12px',
              padding: '15px',
              textAlign: 'center',
              background: '#f9f9f9',
              transition: 'all 0.2s ease'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>{wheel.icon}</div>
              <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{wheel.name}</div>
              <div style={{ fontSize: '12px', color: '#666', marginBottom: '15px' }}>{wheel.description}</div>
              <button
                onClick={() => {
                  setSelectedWheel(wheel);
                  setEditMode(true);
                }}
                className="btn btn-primary"
                style={{ fontSize: '14px', padding: '8px 16px' }}
              >
                Edit Wheel
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {/* Privacy & Safety */}
      <div className="card">
        <h3 style={{ color: 'var(--primary-color)', marginBottom: '20px' }}>🔒 Privacy & Safety</h3>
        <div style={{ background: '#E8F5E8', padding: '20px', borderRadius: '12px', marginBottom: '20px' }}>
          <h4 style={{ color: '#4CAF50', marginBottom: '15px' }}>✅ COPPA Compliant Features</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '8px' }}>✅ No personal information collected</li>
            <li style={{ marginBottom: '8px' }}>✅ Child-directed ads only (when enabled)</li>
            <li style={{ marginBottom: '8px' }}>✅ Data stored locally on device only</li>
            <li style={{ marginBottom: '8px' }}>✅ No account creation required</li>
            <li style={{ marginBottom: '8px' }}>✅ Parental controls for all settings</li>
            <li style={{ marginBottom: '8px' }}>✅ Anonymous analytics (opt-in only)</li>
          </ul>
        </div>
        
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <button onClick={exportData} className="btn btn-secondary">
            📤 Export Progress Data
          </button>
          <button onClick={resetData} className="btn" style={{ background: '#f44336', color: 'white' }}>
            🗑️ Reset All Data
          </button>
        </div>
      </div>
      
      {editMode && selectedWheel && (
        <WheelEditor
          wheel={selectedWheel}
          onClose={() => {
            setEditMode(false);
            setSelectedWheel(null);
          }}
          onSave={() => {
            setWheels(window.dataManager.getWheels());
          }}
        />
      )}
    </div>
  );
};

// Main App Component
const App = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedWheel, setSelectedWheel] = useState(null);
  const [showParentalGate, setShowParentalGate] = useState(false);
  const [parentalGateCallback, setParentalGateCallback] = useState(null);
  const [settings, setSettings] = useState(window.dataManager.getSettings());
  const [purchases, setPurchases] = useState(window.dataManager.getPurchases());
  
  // Update settings and purchases when they change
  useEffect(() => {
    const updateData = () => {
      const newSettings = window.dataManager.getSettings();
      const newPurchases = window.dataManager.getPurchases();
      setSettings(newSettings);
      setPurchases(newPurchases);
      
      // Apply accessibility settings to document
      if (newSettings.highContrast) {
        document.body.classList.add('high-contrast');
      } else {
        document.body.classList.remove('high-contrast');
      }
      
      if (newSettings.largeText) {
        document.body.classList.add('large-text');
      } else {
        document.body.classList.remove('large-text');
      }
      
      if (newSettings.reducedMotion) {
        document.body.classList.add('reduced-motion');
      } else {
        document.body.classList.remove('reduced-motion');
      }
    };
    
    updateData();
    
    // Listen for storage changes
    window.addEventListener('storage', updateData);
    return () => window.removeEventListener('storage', updateData);
  }, []);
  
  const handleSelectWheel = (wheel) => {
    setSelectedWheel(wheel);
    setCurrentScreen('play');
  };
  
  const handleParentMode = () => {
    setParentalGateCallback(() => () => setCurrentScreen('parent'));
    setShowParentalGate(true);
  };
  
  const handlePrivacyPolicy = () => {
    setCurrentScreen('privacy');
  };
  
  const handlePurchase = () => {
    setParentalGateCallback(() => () => setCurrentScreen('purchase'));
    setShowParentalGate(true);
  };
  
  const handleParentalGateSuccess = () => {
    if (parentalGateCallback) {
      parentalGateCallback();
      setParentalGateCallback(null);
    }
  };
  
  const handleBack = () => {
    setCurrentScreen('home');
    setSelectedWheel(null);
  };
  
  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <HomeScreen 
            onSelectWheel={handleSelectWheel}
            onParentMode={handleParentMode}
            onPrivacyPolicy={handlePrivacyPolicy}
            onPurchase={handlePurchase}
            settings={settings}
            purchases={purchases}
          />
        );
      case 'play':
        return selectedWheel ? (
          <WheelPlayScreen 
            wheel={selectedWheel}
            onBack={handleBack}
            settings={settings}
          />
        ) : null;
      case 'parent':
        return (
          <ParentModeScreen 
            onBack={handleBack}
          />
        );
      case 'privacy':
        return (
          <PrivacyScreen 
            onBack={handleBack}
          />
        );
      case 'purchase':
        return (
          <PurchaseScreen 
            onBack={handleBack}
            onPurchaseComplete={() => {
              setPurchases(window.dataManager.getPurchases());
            }}
          />
        );
      default:
        return (
          <HomeScreen 
            onSelectWheel={handleSelectWheel}
            onParentMode={handleParentMode}
            onPrivacyPolicy={handlePrivacyPolicy}
            onPurchase={handlePurchase}
            settings={settings}
            purchases={purchases}
          />
        );
    }
  };
  
  return (
    <div className="app">
      {renderScreen()}
      
      {/* COPPA-Compliant Ad Banner */}
      <AdBanner settings={settings} purchases={purchases} />
      
      <ParentalGate
        isOpen={showParentalGate}
        onClose={() => {
          setShowParentalGate(false);
          setParentalGateCallback(null);
        }}
        onSuccess={handleParentalGateSuccess}
      />
    </div>
  );
};

// Initialize the app
console.log('Initializing Spin & Learn App v4.0...');
console.log('Available wheels:', window.dataManager ? window.dataManager.getWheels().length : 'DataManager not loaded');

// Add error handling
window.addEventListener('error', function(e) {
  console.error('App Error:', e.error);
});

ReactDOM.render(<App />, document.getElementById('app'));
      <div className="nav-header">
        <h2 className="nav-title">👨‍👩‍👧‍👦 Parent Mode</h2>
        <button className="btn btn-secondary" onClick={onBack}>
          ← Back
        </button>
      </div>
      
      {/* Progress Overview */}
      <div className="card">
        <h3 style={{ color: 'var(--primary-color)', marginBottom: '20px' }}>📊 Progress Overview</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px' }}>
          <div style={{ textAlign: 'center', padding: '15px', background: '#E8F5E8', borderRadius: '12px' }}>
            <div style={{ fontSize: '32px', marginBottom: '5px' }}>🎯</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#4CAF50' }}>{progress.totalSpins}</div>
            <div style={{ fontSize: '14px', color: '#666' }}>Total Spins</div>
          </div>
          <div style={{ textAlign: 'center', padding: '15px', background: '#FFF3E0', borderRadius: '12px' }}>
            <div style={{ fontSize: '32px', marginBottom: '5px' }}>⭐</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#FF9800' }}>{progress.totalStars}</div>
            <div style={{ fontSize: '14px', color: '#666' }}>Stars Earned</div>
          </div>
          <div style={{ textAlign: 'center', padding: '15px', background: '#E3F2FD', borderRadius: '12px' }}>
            <div style={{ fontSize: '32px', marginBottom: '5px' }}>📈</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2196F3' }}>{Math.round(progress.successRate)}%</div>
            <div style={{ fontSize: '14px', color: '#666' }}>Success Rate</div>
          </div>
        </div>
      </div>
      
      {/* App Settings */}
      <div className="card">
        <h3 style={{ color: 'var(--primary-color)', marginBottom: '20px' }}>⚙️ App Settings</h3>
        
        <div className="settings-group">
          <label className="settings-label">🔊 Sound Effects</label>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={settings.sound}
              onChange={(e) => updateSetting('sound', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
          <p style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>Enable or disable all sound effects</p>
        </div>
        
        <div className="settings-group">
          <label className="settings-label">📊 Anonymous Analytics</label>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={settings.analytics}
              onChange={(e) => updateSetting('analytics', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
          <p style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>Only anonymous usage data. No personal information collected.</p>
        </div>
        
        <div className="settings-group">
          <label className="settings-label">🌗 High Contrast Mode</label>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={settings.highContrast}
              onChange={(e) => updateSetting('highContrast', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
          <p style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>Improve visibility with high contrast colors</p>
        </div>
        
        <div className="settings-group">
          <label className="settings-label">🔍 Large Text</label>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={settings.largeText}
              onChange={(e) => updateSetting('largeText', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
          <p style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>Increase text size for better readability</p>
        </div>
        
        <div className="settings-group">
          <label className="settings-label">🌊 Reduced Motion</label>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={settings.reducedMotion}
              onChange={(e) => updateSetting('reducedMotion', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
          <p style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>Reduce animations for motion sensitivity</p>
        </div>
      </div>
      
      {/* Wheel Management */}
      <div className="card">
        <h3 style={{ color: 'var(--primary-color)', marginBottom: '20px' }}>🎡 Manage Wheels</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
          {wheels.map(wheel => (
            <div key={wheel.id} style={{
              border: '2px solid #ddd',
              borderRadius: '12px',
              padding: '15px',
              textAlign: 'center',
              background: '#f9f9f9',
              transition: 'all 0.2s ease'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>{wheel.icon}</div>
              <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{wheel.name}</div>
              <div style={{ fontSize: '12px', color: '#666', marginBottom: '15px' }}>{wheel.description}</div>
              <button
                onClick={() => {
                  setSelectedWheel(wheel);
                  setEditMode(true);
                }}
                className="btn btn-primary"
                style={{ fontSize: '14px', padding: '8px 16px' }}
              >
                Edit Wheel
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {/* Privacy & Safety */}
      <div className="card">
        <h3 style={{ color: 'var(--primary-color)', marginBottom: '20px' }}>🔒 Privacy & Safety</h3>
        <div style={{ background: '#E8F5E8', padding: '20px', borderRadius: '12px', marginBottom: '20px' }}>
          <h4 style={{ color: '#4CAF50', marginBottom: '15px' }}>✅ COPPA Compliant Features</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '8px' }}>✅ No personal information collected</li>
            <li style={{ marginBottom: '8px' }}>✅ Child-directed ads only (when enabled)</li>
            <li style={{ marginBottom: '8px' }}>✅ Data stored locally on device only</li>
            <li style={{ marginBottom: '8px' }}>✅ No account creation required</li>
            <li style={{ marginBottom: '8px' }}>✅ Parental controls for all settings</li>
            <li style={{ marginBottom: '8px' }}>✅ Anonymous analytics (opt-in only)</li>
          </ul>
        </div>
        
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <button onClick={exportData} className="btn btn-secondary">
            📤 Export Progress Data
          </button>
          <button onClick={resetData} className="btn" style={{ background: '#f44336', color: 'white' }}>
            🗑️ Reset All Data
          </button>
        </div>
      </div>
      
      {editMode && selectedWheel && (
        <WheelEditor
          wheel={selectedWheel}
          onClose={() => {
            setEditMode(false);
            setSelectedWheel(null);
          }}
          onSave={() => {
            setWheels(window.dataManager.getWheels());
          }}
        />
      )}
    </div>
  );
};

// Main App Component
const App = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedWheel, setSelectedWheel] = useState(null);
  const [showParentalGate, setShowParentalGate] = useState(false);
  const [parentalGateCallback, setParentalGateCallback] = useState(null);
  const [settings, setSettings] = useState(window.dataManager.getSettings());
  const [purchases, setPurchases] = useState(window.dataManager.getPurchases());
  
  // Update settings and purchases when they change
  useEffect(() => {
    const updateData = () => {
      const newSettings = window.dataManager.getSettings();
      const newPurchases = window.dataManager.getPurchases();
      setSettings(newSettings);
      setPurchases(newPurchases);
      
      // Apply accessibility settings to document
      if (newSettings.highContrast) {
        document.body.classList.add('high-contrast');
      } else {
        document.body.classList.remove('high-contrast');
      }
      
      if (newSettings.largeText) {
        document.body.classList.add('large-text');
      } else {
        document.body.classList.remove('large-text');
      }
      
      if (newSettings.reducedMotion) {
        document.body.classList.add('reduced-motion');
      } else {
        document.body.classList.remove('reduced-motion');
      }
    };
    
    updateData();
    
    // Listen for storage changes
    window.addEventListener('storage', updateData);
    return () => window.removeEventListener('storage', updateData);
  }, []);
  
  const handleSelectWheel = (wheel) => {
    setSelectedWheel(wheel);
    setCurrentScreen('play');
  };
  
  const handleParentMode = () => {
    setParentalGateCallback(() => () => setCurrentScreen('parent'));
    setShowParentalGate(true);
  };
  
  const handlePrivacyPolicy = () => {
    setCurrentScreen('privacy');
  };
  
  const handlePurchase = () => {
    setParentalGateCallback(() => () => setCurrentScreen('purchase'));
    setShowParentalGate(true);
  };
  
  const handleParentalGateSuccess = () => {
    if (parentalGateCallback) {
      parentalGateCallback();
      setParentalGateCallback(null);
    }
  };
  
  const handleBack = () => {
    setCurrentScreen('home');
    setSelectedWheel(null);
  };
  
  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <HomeScreen 
            onSelectWheel={handleSelectWheel}
            onParentMode={handleParentMode}
            onPrivacyPolicy={handlePrivacyPolicy}
            onPurchase={handlePurchase}
            settings={settings}
            purchases={purchases}
          />
        );
      case 'play':
        return selectedWheel ? (
          <WheelPlayScreen 
            wheel={selectedWheel}
            onBack={handleBack}
            settings={settings}
          />
        ) : null;
      case 'parent':
        return (
          <ParentModeScreen 
            onBack={handleBack}
          />
        );
      case 'privacy':
        return (
          <PrivacyScreen 
            onBack={handleBack}
          />
        );
      case 'purchase':
        return (
          <PurchaseScreen 
            onBack={handleBack}
            onPurchaseComplete={() => {
              setPurchases(window.dataManager.getPurchases());
            }}
          />
        );
      default:
        return (
          <HomeScreen 
            onSelectWheel={handleSelectWheel}
            onParentMode={handleParentMode}
            onPrivacyPolicy={handlePrivacyPolicy}
            onPurchase={handlePurchase}
            settings={settings}
            purchases={purchases}
          />
        );
    }
  };
  
  return (
    <div className="app">
      {renderScreen()}
      
      {/* COPPA-Compliant Ad Banner */}
      <AdBanner settings={settings} purchases={purchases} />
      
      <ParentalGate
        isOpen={showParentalGate}
        onClose={() => {
          setShowParentalGate(false);
          setParentalGateCallback(null);
        }}
        onSuccess={handleParentalGateSuccess}
      />
    </div>
  );
};

// Initialize the app
ReactDOM.render(<App />, document.getElementById('app'));          setParentalGateCallback(null);
        }}
        onSuccess={handleParentalGateSuccess}
      />
    </div>
  );
};

// Initialize the app
ReactDOM.render(<App />, document.getElementById('app'));            onParentMode={handleParentMode}
            onPrivacyPolicy={handlePrivacyPolicy}
            onPurchase={handlePurchase}
            settings={settings}
            purchases={purchases}
          />
        );
    }
  };
  
  return (
    <div className="app">
      {renderScreen()}
      
      {/* COPPA-Compliant Ad Banner */}
      <AdBanner settings={settings} purchases={purchases} />
      
      <ParentalGate
        isOpen={showParentalGate}
        onClose={() => {
          setShowParentalGate(false);
          setParentalGateCallback(null);
        }}
        onSuccess={handleParentalGateSuccess}
      />
    </div>
  );
};

// Initialize the app
ReactDOM.render(<App />, document.getElementById('app'));          setParentalGateCallback(null);
        }}
        onSuccess={handleParentalGateSuccess}
      />
    </div>
  );
};

// Initialize the app
ReactDOM.render(<App />, document.getElementById('app'));