
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {Mail, Clock, Send, MessageCircleDashed as MessageCircle, HelpCircle, Bug} from 'lucide-react'
import SEOHead from '../components/SEOHead'

const CONTACT_EMAIL = 'hello@spinwheelhub.org'

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // There is no mail backend, so the form opens the visitor's email app with the message filled in.
  // The form is left filled so nothing is lost if no email app opens.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = `[${formData.category}] ${formData.subject}`
    const body = `${formData.message}\n\nFrom: ${formData.name} (${formData.email})`
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setIsSubmitted(true)
  }

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      details: CONTACT_EMAIL,
      href: `mailto:${CONTACT_EMAIL}`,
      description: "Questions, bug reports and wheel ideas all go here"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Replies",
      details: "Every message is read",
      description: "SpinWheelHub is run by one person, so replies can take a few days"
    }
  ]

  const supportCategories = [
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: "General Support",
      description: "Questions about using SpinWheelHub features and functionality"
    },
    {
      icon: <HelpCircle className="h-8 w-8" />,
      title: "Feature Requests",
      description: "Suggest new wheel categories or platform improvements"
    },
    {
      icon: <Bug className="h-8 w-8" />,
      title: "Bug Reports",
      description: "Report technical issues or unexpected behavior"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
      <SEOHead
        title="Contact SpinWheelHub | Questions, Bugs and Wheel Ideas"
        description="Get in touch with SpinWheelHub. Email hello@spinwheelhub.org with a question, a bug report or an idea for a new wheel. Every message is read."
      />
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Get in <span className="text-gradient">Touch</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Found a bug, want a new wheel, or have a question? Send a message.
            SpinWheelHub is run by one person, and every message gets read.
          </p>
        </motion.div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-xl"
              id="contact-form"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Send a Message</h2>
              <p className="text-sm text-gray-500 mb-6">
                This opens your email app with your message filled in. Press Send there to finish.
              </p>

              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-blue-50 border border-blue-300 text-blue-800 px-4 py-3 rounded-lg mb-6"
                >
                  Your email app should now be open with the message ready. Remember to press Send.
                  If nothing opened, email <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold underline">{CONTACT_EMAIL}</a> directly.
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="feature">Feature Request</option>
                    <option value="bug">Bug Report</option>
                    <option value="business">Business Partnership</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-primary py-4 text-lg font-semibold flex items-center justify-center gap-2"
                >
                  <Send className="h-5 w-5" />
                  Write Email
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Information</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Prefer your own email app? Write to the address below.
                </p>
              </div>

              <div className="grid gap-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-purple-600 mt-1">{info.icon}</div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{info.title}</h3>
                        {info.href
                          ? <a href={info.href} className="text-purple-600 font-medium mb-1 block hover:underline">{info.details}</a>
                          : <p className="text-purple-600 font-medium mb-1">{info.details}</p>}
                        <p className="text-gray-600 text-sm">{info.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Support Categories */}
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">What can we help you with?</h3>
                <div className="space-y-4">
                  {supportCategories.map((category, index) => (
                    <motion.div
                      key={category.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className="text-blue-600">{category.icon}</div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">{category.title}</h4>
                          <p className="text-gray-600">{category.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">
              Quick answers before you write
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: "How do I make my own spin wheel?",
                answer: <>Open the <Link to="/custom-wheel-of-names" className="text-purple-600 font-semibold hover:underline">custom wheel</Link>, type your options into Manual Entry, and spin. You can also start from any ready-made wheel and edit its list.</>
              },
              {
                question: "Is SpinWheelHub free to use?",
                answer: "Yes. Every wheel and tool is free, with no account and no paywall."
              },
              {
                question: "Can I save my wheel?",
                answer: <>Yes. On the <Link to="/custom-wheel-of-names" className="text-purple-600 font-semibold hover:underline">custom wheel</Link> page, use Save & Share to get a link to your wheel. On any wheel you can also export your list to a text file and import it later.</>
              },
              {
                question: "Can I request a new wheel?",
                answer: <>Yes, please do. Use the form on this page, or browse the <Link to="/hub" className="text-purple-600 font-semibold hover:underline">wheel hub</Link> first to see if it already exists.</>
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl font-bold mb-6">Still have questions?</h2>
          <p className="text-xl mb-8 opacity-90">
            Write in with anything: a question, a bug, or an idea for a wheel you'd use.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors"
            onClick={() => document.querySelector('#contact-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Send a Message
          </motion.button>
        </motion.div>
      </section>
    </div>
  )
}

export default ContactPage
