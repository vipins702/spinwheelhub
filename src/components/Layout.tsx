
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Shuffle, Info, Mail, Menu, X, Grid, BookOpen } from 'lucide-react'
import { useState } from 'react'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'All Wheels', href: '/hub', icon: Grid },
    { name: 'Blog', href: '/blog', icon: BookOpen },
    { name: 'About', href: '/about', icon: Info },
    { name: 'Contact', href: '/contact', icon: Mail },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-obsidian-900/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full">
                <Shuffle className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold gradient-text">
                  SpinWheelHub
                </span>
                <div className="text-xs text-gray-400">Free Spin Wheel Generator</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${location.pathname === item.href
                      ? 'bg-white/10 text-neon-blue shadow-md border border-white/5'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-white/5 py-4">
              <nav className="space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${location.pathname === item.href
                        ? 'bg-white/10 text-neon-blue'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  )
                })}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Ad Banner */}
      <div className="bg-gradient-to-r from-obsidian-800 to-obsidian-900 border-b border-white/5 text-center py-2">
        <div className="text-neon-gold text-sm font-medium animate-pulse">
          📢 Premium features coming soon! Get early access with 50% off
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-obsidian-950 border-t border-white/5 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full">
                  <Shuffle className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold gradient-text">SpinWheelHub</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Free and easy-to-use spinner for random name picking, classroom activities,
                giveaways and presentations. Customize, save and share wheels!
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-neon-blue transition-colors">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-neon-blue transition-colors">Twitter</a>
                <a href="#" className="text-gray-400 hover:text-neon-blue transition-colors">Instagram</a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-neon-purple transition-colors">Home</Link></li>
                <li><Link to="/hub" className="text-gray-400 hover:text-neon-purple transition-colors">All Wheels</Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-neon-purple transition-colors">About</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-neon-purple transition-colors">Contact</Link></li>
                <li><Link to="/privacy" className="text-gray-400 hover:text-neon-purple transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-gray-400 hover:text-neon-purple transition-colors">Terms of Service</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Popular Wheels</h3>
              <ul className="space-y-2">
                <li><Link to="/wheel/yes-no" className="text-gray-400 hover:text-neon-pink transition-colors">Yes or No</Link></li>
                <li><Link to="/wheel/roblox-game-picker" className="text-gray-400 hover:text-neon-pink transition-colors">Roblox Picker</Link></li>
                <li><Link to="/wheel/what-for-dinner" className="text-gray-400 hover:text-neon-pink transition-colors">Dinner Idea</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 mt-8 pt-8 text-center text-gray-500">
            <div className="mt-8 text-center">
              <p>&copy; 2024 SpinWheelHub. All rights reserved.</p>
              <p className="mt-2 text-xs">
                Creating fun and fair decisions since 2024
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout
