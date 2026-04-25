import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import StepBar from '../components/ui/StepBar'

const LANGUAGES = [
  'English', 'French', 'Arabic', 'Swahili', 'Hausa',
  'Twi / Akan', 'Yoruba', 'Amharic', 'Bengali', 'Hindi',
  'Urdu', 'Tagalog', 'Portuguese', 'Spanish', 'Mandarin',
]

export default function Step3Languages({ updateForm, formData }) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [selected, setSelected] = useState(formData.languages || [])

  const toggle = (lang) => {
    setSelected(prev =>
      prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]
    )
  }

  const handleNext = () => {
    updateForm({ languages: selected })
    navigate('/step4')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="max-w-lg mx-auto w-full px-4 py-8 flex-1">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">UNMAPPED</h1>
        </div>

        <StepBar current={3} />

        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">{t('step_languages')}</h2>
          <p className="text-sm text-gray-500 mb-5">Select all languages you can hold a work conversation in.</p>

          <div className="flex flex-wrap gap-2">
            {LANGUAGES.map(lang => (
              <button
                key={lang}
                onClick={() => toggle(lang)}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                  selected.includes(lang)
                    ? 'bg-teal-500 text-white border-teal-500'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-teal-300'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          {selected.length > 0 && (
            <p className="text-xs text-teal-700 mt-4 font-medium">{selected.length} selected</p>
          )}
        </div>

        <div className="flex gap-3 mt-4">
          <button onClick={() => navigate('/step2')} className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50">
            {t('btn_back')}
          </button>
          <button
            onClick={handleNext}
            disabled={selected.length === 0}
            className="flex-1 py-3 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-medium transition-colors disabled:opacity-40"
          >
            {t('btn_next')} →
          </button>
        </div>
      </div>
    </div>
  )
}