import { useEffect, useState } from 'react'
import { Download, X } from 'lucide-react'

// Shows a small "Add to Home Screen" banner when the browser offers install.
// This is the main way casual visitors can "remember" and return to the site.
const InstallPrompt = () => {
    const [deferred, setDeferred] = useState<any>(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const dismissed = localStorage.getItem('swh_install_dismissed')
        const onPrompt = (e: any) => {
            e.preventDefault()
            setDeferred(e)
            if (!dismissed) setVisible(true)
        }
        window.addEventListener('beforeinstallprompt', onPrompt)
        window.addEventListener('appinstalled', () => setVisible(false))
        return () => window.removeEventListener('beforeinstallprompt', onPrompt)
    }, [])

    const install = async () => {
        if (!deferred) return
        deferred.prompt()
        await deferred.userChoice
        setDeferred(null)
        setVisible(false)
    }

    const dismiss = () => {
        localStorage.setItem('swh_install_dismissed', '1')
        setVisible(false)
    }

    if (!visible) return null

    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md">
            <div className="bg-white rounded-2xl shadow-2xl border border-purple-100 p-4 flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center flex-shrink-0">
                    <Download className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 text-sm">Add SpinWheelHub to your home screen</p>
                    <p className="text-xs text-gray-500">One tap to open the wheel anytime — no app store needed.</p>
                </div>
                <button onClick={install} className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold text-sm hover:bg-purple-700 flex-shrink-0">
                    Install
                </button>
                <button onClick={dismiss} aria-label="Dismiss" className="text-gray-400 hover:text-gray-600 flex-shrink-0">
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    )
}

export default InstallPrompt
