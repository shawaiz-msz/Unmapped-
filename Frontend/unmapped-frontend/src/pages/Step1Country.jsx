import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useCountry } from '../context/CountryContext'
import { COUNTRY_CONFIGS } from '../data/countries'
import StepBar from '../components/ui/StepBar'

export default function Step1Country({ updateForm }) {
  const { t } = useTranslation()
  const { countryCode, switchCountry } = useCountry()
  const navigate = useNavigate()

  const handleNext = () => {
    updateForm({ country_code: countryCode })
    navigate('/step2')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="max-w-lg mx-auto w-full px-4 py-8 flex-1">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">UNMAPPED</h1>
          <p className="text-gray-500 text-sm mt-1">{t('app_tagline')}</p>
        </div>

        <StepBar current={1} />

        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">{t('step_country')}</h2>
          <p className="text-sm text-gray-500 mb-6">Select the region and economic context that fits your situation.</p>

          <div className="space-y-3">
            {Object.values(COUNTRY_CONFIGS).map(cfg => (
              <button
                key={cfg.code}
                onClick={() => switchCountry(cfg.code)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  countryCode === cfg.code
                    ? 'border-teal-400 bg-teal-50'
                    : 'border-gray-100 hover:border-gray-300 bg-white'
                }`}
              >
                <p className={`font-medium ${countryCode === cfg.code ? 'text-teal-800' : 'text-gray-800'}`}>
                  {cfg.label}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{cfg.currency} · {cfg.automationLabel}</p>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleNext}
          className="w-full mt-4 bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 rounded-xl transition-colors"
        >
          {t('btn_next')} →
        </button>
      </div>
    </div>
  )
}