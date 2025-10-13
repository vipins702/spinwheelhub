
import React from 'react'
import { motion } from 'framer-motion'
import {Target, Users, Award, Heart, Zap, Shield} from 'lucide-react'

const AboutPage: React.FC = () => {
  const features = [
    {
      icon: <Target className="h-8 w-8" />,
      title: "Smart Decision Making",
      description: "Our advanced algorithms help you make better decisions with weighted options and intelligent suggestions."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community Driven",
      description: "Join millions of users who trust SpinWheelHub for their daily decisions, big and small."
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Proven Results",
      description: "Over 10 million decisions made and counting, with 95% user satisfaction rate."
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "User Focused",
      description: "Built with love and attention to user experience, making decision-making fun and engaging."
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning Fast",
      description: "Instant results with smooth animations and responsive design across all devices."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Privacy First",
      description: "Your decisions are private and secure. We never share your personal choices."
    }
  ]

  const team = [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      bio: "Passionate about helping people make better decisions through technology.",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
    },
    {
      name: "Sarah Chen",
      role: "Head of Product",
      bio: "UX expert focused on creating intuitive and delightful user experiences.",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
    },
    {
      name: "Michael Rodriguez",
      role: "Lead Developer",
      bio: "Full-stack engineer building the future of decision-making platforms.",
      image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
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
            We believe that making decisions shouldn't be stressful. Our spin wheel platform combines the fun of spinning wheels 
            with intelligent algorithms to help you make choices with confidence and joy.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-purple-600">10M+</div>
              <div className="text-gray-600">Decisions Made</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-blue-600">500K+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-green-600">95%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
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
              To transform decision-making from a source of stress into a moment of clarity and excitement. 
              We're building spin wheel tools that make choices feel effortless, whether you're picking what to eat 
              for lunch or making life-changing decisions.
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
              SpinWheelHub was born out of a simple frustration: the paralysis that comes with having too many options. 
              Our founder, Alex, spent 20 minutes every morning deciding what to wear, what to eat, and which route to take to work.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              The idea struck during a particularly indecisive moment at a restaurant. "What if there was a fun, 
              interactive spin wheel to make decisions?" Alex thought. That evening, the first prototype of SpinWheelHub was born.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              What started as a simple spin wheel has evolved into a comprehensive decision-making platform. 
              We've helped millions of people choose everything from baby names to travel destinations, 
              making the process enjoyable rather than overwhelming.
            </p>
            <p className="text-lg leading-relaxed">
              Today, we continue to innovate, adding new categories, improving our algorithms, and building features 
              that make decision-making not just easier, but genuinely fun.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The passionate people behind SpinWheelHub, dedicated to making your decisions easier and more enjoyable.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 shadow-lg text-center hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-6 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-purple-600 font-medium mb-4">{member.role}</p>
                <p className="text-gray-600 leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
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
            Join millions of users who have discovered the joy of decision-making with SpinWheelHub.
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
