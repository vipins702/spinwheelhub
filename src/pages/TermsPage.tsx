
import React from 'react'
import { Helmet } from 'react-helmet-async'

const TermsPage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Terms of Service | SpinWheelHub</title>
                <meta name="description" content="Terms and Conditions for using SpinWheelHub." />
            </Helmet>

            <div className="max-w-4xl mx-auto px-4 py-12 text-gray-300">
                <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>

                <div className="space-y-6 glass-card p-8 rounded-xl">
                    <p className="text-sm text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-3">1. Agreement to Terms</h2>
                        <p>
                            By accessing our website at SpinWheelHub, you agree to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-3">2. Use License</h2>
                        <p>
                            Permission is granted to temporarily download one copy of the materials (information or software) on SpinWheelHub's website for personal, non-commercial transitory viewing only.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-3">3. Disclaimer</h2>
                        <p>
                            The materials on SpinWheelHub's website are provided on an 'as is' basis. SpinWheelHub makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-3">4. Limitations</h2>
                        <p>
                            In no event shall SpinWheelHub or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on SpinWheelHub's website.
                        </p>
                    </section>
                </div>
            </div>
        </>
    )
}

export default TermsPage
