import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useCountry } from '../context/CountryContext'
import StepBar from '../components/ui/StepBar'

export default function Step4Experience({ updateForm, formData }) {
  const { t } = useTranslation()
  const { config } = useCountry()
  const navigate = useNavigate()
  const [sector, setSector] = useState(formData.sector || '')
  const [years, setYears] = useState(formData.years_experience || '')
  const [description, setDescription] = useState(formData.experience_description || '')

  const handleNext = () => {
    updateForm({ sector, years_experience: years, experience_description: description })
    navigate('/step5')
  }

  const isValid = sector && years && description.length > 20

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="max-w-lg mx-auto w-full px-4 py-8 flex-1">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">UNMAPPED</h1>
        </div>

        <StepBar current={4} />

        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">{t('step_experience')}</h2>
            <p className="text-sm text-gray-500">Include informal and self-employed work. If you ran a business, say so.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Primary work area</label>
            <select
              value={sector}
              onChange={e => setSector(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:border-teal-400 focus:outline-none"
            >
              <option value="">Select a sector...</option>
              {config.sectors.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Years of experience</label>
            <input
              type="number"
              min="0"
              max="50"
              value={years}
              onChange={e => setYears(e.target.value)}
              placeholder="e.g. 3"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:border-teal-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Describe what you actually do
            </label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={5}
              placeholder="e.g. I repair smartphones and tablets — screens, batteries, charging ports. I deal with customers directly, diagnose problems, order parts, and run my own shop. I taught myself from YouTube and trial and error."
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:border-teal-400 focus:outline-none resize-none text-sm"
            />
            <p className="text-xs text-gray-400 mt-1">{description.length} characters — more detail = better profile</p>
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <button onClick={() => navigate('/step3')} className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50">
            {t('btn_back')}
          </button>
          <button
            onClick={handleNext}
            disabled={!isValid}
            className="flex-1 py-3 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-medium transition-colors disabled:opacity-40"
          >
            {t('btn_next')} →
          </button>
        </div>
      </div>
    </div>
  )
}