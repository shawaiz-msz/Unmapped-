import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useCountry } from '../context/CountryContext'
import StepBar from '../components/ui/StepBar'

export default function Step2Education({ updateForm, formData }) {
  const { t } = useTranslation()
  const { config } = useCountry()
  const navigate = useNavigate()
  const [selected, setSelected] = useState(formData.education_level || '')

  const handleNext = () => {
    updateForm({ education_level: selected })
    navigate('/step3')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="max-w-lg mx-auto w-full px-4 py-8 flex-1">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">UNMAPPED</h1>
        </div>

        <StepBar current={2} />

        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">{t('step_education')}</h2>
          <p className="text-sm text-gray-500 mb-6">
            Select your highest completed level. Partial completion counts — pick the level you reached.
          </p>

          <div className="space-y-2">
            {config.educationLevels.map(level => (
              <button
                key={level.value}
                onClick={() => setSelected(level.value)}
                className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${
                  selected === level.value
                    ? 'border-teal-400 bg-teal-50 text-teal-800'
                    : 'border-gray-100 hover:border-gray-300 text-gray-700'
                }`}
              >
                {level.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <button onClick={() => navigate('/step1')} className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50">
            {t('btn_back')}
          </button>
          <button
            onClick={handleNext}
            disabled={!selected}
            className="flex-1 py-3 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {t('btn_next')} →
          </button>
        </div>
      </div>
    </div>
  )
}