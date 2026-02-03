
import React from 'react'
import { Helmet } from 'react-helmet-async'

const PrivacyPage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Privacy Policy | SpinWheelHub</title>
                <meta name="description" content="Privacy Policy for SpinWheelHub. Learn how we handle your data and cookies." />
            </Helmet>

            <div className="max-w-4xl mx-auto px-4 py-12 text-gray-300">
                <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>

                <div className="space-y-6 glass-card p-8 rounded-xl">
                    <p className="text-sm text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-3">1. Introduction</h2>
                        <p>
                            Welcome to SpinWheelHub. We respect your privacy and are committed to protecting your personal data.
                            This privacy policy will inform you as to how we look after your personal data when you visit our website
                            (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-3">2. Data We Collect</h2>
                        <p>
                            We collect minimal data necessary to operate the service. This includes:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-2">
                            <li><strong>Usage Data:</strong> Information about how you use our website, products, and services.</li>
                            <li><strong>Technical Data:</strong> Internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-3">3. Cookies & Ads</h2>
                        <p>
                            We use cookies to distinguish you from other users of our website. This helps us to provide you with a good experience when you browse our website and also allows us to improve our site.
                        </p>
                        <p className="mt-2">
                            We may use third-party advertising companies (like Google AdSense) to serve ads when you visit our website. These companies may use information (not including your name, address, email address, or telephone number) about your visits to this and other websites in order to provide advertisements about goods and services of interest to you.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-3">4. Contact Us</h2>
                        <p>
                            If you have any questions about this privacy policy or our privacy practices, please contact us at:
                            <a href="mailto:hello@spinwheelhub.vercel.app" className="text-neon-blue hover:underline ml-1">hello@spinwheelhub.vercel.app</a>
                        </p>
                    </section>
                </div>
            </div>
        </>
    )
}

export default PrivacyPage
