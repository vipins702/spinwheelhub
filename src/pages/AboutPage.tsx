import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Target, Users, Award, Heart, Zap, Shield } from 'lucide-react'
import { wheelTemplates } from '../data/wheelTemplates'

// Standalone tools outside the wheel templates (custom wheel, number wheel, giveaway, team, secret santa, RPS)
const TOOL_COUNT = 6

const AboutPage: React.FC = () => {
  const features = [
    {
      icon: <Target className="h-8 w-8" />,
      title: "Fair Spins",
      description: "Every slice on a wheel is the same size and the wheel stops at a random point, so every option has the same chance."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Made for Groups",
      description: "Teachers, streamers, families and office teams use the wheels on a shared screen so everyone sees the result."
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Free, No Account",
      description: "Every wheel and tool is free. There is no sign-up, no paywall and no limit on how much you spin."
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Independent",
      description: "SpinWheelHub is built and run by one person, not a big company. Suggestions from visitors shape what gets built next."
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Works Anywhere",
      description: "Phone, tablet, laptop or classroom projector. Open the page and spin, with nothing to install."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Private by Default",
      description: "Spinning runs in your browser. Your lists are only stored if you choose to save and share a wheel."
    }
  ]

  // Removed unused team array to avoid confusion
  // const team = [...] 

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Helmet>
        <title>About SpinWheelHub | Free Spin Wheel Tools</title>
        <meta name="description" content="SpinWheelHub is a free collection of spin wheels and random pickers, built and run by Vipin S. Learn who makes it and how the wheels work." />
        <link rel="canonical" href="https://spinwheelhub.org/about" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "SpinWheelHub",
            "url": "https://spinwheelhub.org",
            "logo": "https://spinwheelhub.org/logo.png",
            "founder": {
              "@type": "Person",
              "name": "Vipin S.",
              "jobTitle": "Manager at MNC & Technologist",
              "url": "https://www.linkedin.com/in/vipin-s-1132182b",
              "sameAs": ["https://www.linkedin.com/in/vipin-s-1132182b"]
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "email": "hello@spinwheelhub.org",
              "contactType": "customer service"
            }
          })}
        </script>
      </Helmet>
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            About <span className="text-gradient">SpinWheelHub</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Small decisions shouldn't take twenty minutes. SpinWheelHub gives you a fair, quick way to pick a name,
            a winner, a meal or a game, and makes it a bit of fun while you're at it.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-purple-600">{wheelTemplates.length}</div>
              <div className="text-gray-600">Ready-made Wheels</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-blue-600">{TOOL_COUNT}</div>
              <div className="text-gray-600">Free Tools</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-green-600">0</div>
              <div className="text-gray-600">Sign-ups Needed</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              To make the small, everyday choices quick and fair. Who goes first, what's for dinner,
              which student answers next, who wins the giveaway. Spin, get an answer, move on.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="text-purple-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="prose prose-lg mx-auto text-gray-600"
          >
            <p className="text-lg leading-relaxed mb-6">
              SpinWheelHub started as a single spinning wheel: type in some names, spin, get a winner.
              It's built and run by Vipin S. as an independent project.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              Since then it has grown into a set of free tools. There's a <Link to="/custom-wheel-of-names" className="text-purple-600 font-semibold hover:underline">custom wheel</Link> you can save and share,
              a <Link to="/team-generator" className="text-purple-600 font-semibold hover:underline">random team generator</Link>, a <Link to="/secret-santa" className="text-purple-600 font-semibold hover:underline">Secret Santa generator</Link>,
              a <Link to="/giveaway" className="text-purple-600 font-semibold hover:underline">giveaway picker</Link> with proof links, and ready-made wheels for classrooms, games and food.
            </p>
            <p className="text-lg leading-relaxed">
              New wheels get added based on what people actually search for and ask for. If there's a wheel you wish existed,
              <Link to="/contact" className="text-purple-600 font-semibold hover:underline"> send a suggestion</Link>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Meet the Founder</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Driven by a passion for technology and user experience.
            </p>
          </motion.div>

          <div className="bg-white rounded-xl p-8 shadow-lg max-w-2xl mx-auto text-center hover:shadow-xl transition-all duration-300">
            <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl text-white font-bold">
              VS
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">Vipin S.</h3>
            <p className="text-purple-600 font-bold text-lg mb-4">Owner & Creator</p>

            <div className="space-y-4 text-gray-600 leading-relaxed mb-8">
              <p>
                Manager at a leading MNC with over 10+ years of experience in technology,
                enterprise systems, and digital risk mitigation.
              </p>
              <p>
                Vipin built SpinWheelHub to bring fairness, fun, and reliable technology to everyday decision-making.
                His background in enterprise systems ensures that this platform is built with the highest standards
                of security and performance.
              </p>
            </div>

            <a
              href="https://www.linkedin.com/in/vipin-s-1132182b"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-semibold transition-colors bg-blue-50 px-6 py-3 rounded-full hover:bg-blue-100"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.853 3.37-1.853 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span>Connect on LinkedIn</span>
            </a>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">Simplicity</h3>
                <p className="opacity-90">Making complex decisions feel simple and intuitive.</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">Joy</h3>
                <p className="opacity-90">Bringing fun and excitement to everyday choices.</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">Trust</h3>
                <p className="opacity-90">Building reliable tools you can depend on for important decisions.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Spin Your Way to Better Decisions?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Pick a wheel and give it a spin. It's free, and you don't need an account.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary text-lg px-8 py-4"
            onClick={() => window.location.href = '/'}
          >
            Start Spinning Now
          </motion.button>
        </motion.div>
      </section>
    </div>
  )
}

export default AboutPage
