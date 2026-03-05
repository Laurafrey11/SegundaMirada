import { useTranslation } from 'react-i18next';
import { Globe, Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

export function SettingsToggle() {
    const { i18n } = useTranslation();
    const { theme, setTheme } = useTheme();
    const [showLangs, setShowLangs] = useState(false);

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        setShowLangs(false);
    };

    return (
        <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-3">
            {/* Theme Toggle */}
            <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 shadow-lg border border-slate-200 dark:border-slate-700 hover:scale-105 transition-transform"
                aria-label="Toggle theme"
            >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Language Toggle */}
            <div className="relative">
                {showLangs && (
                    <div className="absolute bottom-full mb-2 left-0 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-2 min-w-[120px] overflow-hidden">
                        <button
                            onClick={() => changeLanguage('es')}
                            className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${i18n.language === 'es' ? 'font-bold text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300'
                                }`}
                        >
                            Español
                        </button>
                        <button
                            onClick={() => changeLanguage('en')}
                            className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${i18n.language === 'en' ? 'font-bold text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300'
                                }`}
                        >
                            English
                        </button>
                    </div>
                )}
                <button
                    onClick={() => setShowLangs(!showLangs)}
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 shadow-lg border border-slate-200 dark:border-slate-700 hover:scale-105 transition-transform"
                    aria-label="Change language"
                >
                    <Globe className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
