import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import SkillTag from '../components/ui/SkillTag'
import LoadingSkeleton from '../components/ui/LoadingSkeleton'

export default function RiskView({ fetchRisk, risk, loading, error }) {
  const { t } = useTranslation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!risk) fetchRisk().catch(() => {})
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-sm w-full px-6">
          <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          <LoadingSkeleton lines={5} />
        </div>
      </div>
    )
  }

  if (!risk) return null

  const riskPct = Math.round(risk.automation_score_lmic_calibrated * 100)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-lg mx-auto px-4 py-8">
        <h2 className="text-xl font-bold text-gray-900 mb-1">{t('risk_title')}</h2>
        <p className="text-sm text-gray-500 mb-6">Based on ILO task indices and Frey-Osborne automation scores.</p>

        <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{t('risk_score_label')}</p>
          <div className="flex items-end gap-3">
            <span className="text-4xl font-bold text-gray-900">{riskPct}%</span>
            <div className="mb-1">
              <span className="text-xs text-gray-500">Global: {Math.round(risk.automation_score_global * 100)}%</span>
              <p className="text-xs text-teal-600 font-medium">{risk.calibration_note}</p>
            </div>
          </div>
          <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-2 rounded-full transition-all ${riskPct < 40 ? 'bg-green-400' : riskPct < 65 ? 'bg-amber-400' : 'bg-red-400'}`}
              style={{ width: `${riskPct}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-red-50 border border-red-100 rounded-xl p-4">
            <p className="text-xs font-semibold text-red-600 mb-3">{t('risk_at_risk')}</p>
            <div className="space-y-2">
              {risk.at_risk_tasks.map(s => <SkillTag key={s} label={s} variant="risk" />)}
            </div>
          </div>
          <div className="bg-green-50 border border-green-100 rounded-xl p-4">
            <p className="text-xs font-semibold text-green-700 mb-3">{t('risk_durable')}</p>
            <div className="space-y-2">
              {risk.durable_skills.map(s => <SkillTag key={s} label={s} variant="durable" />)}
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
            <p className="text-xs font-semibold text-amber-700 mb-3">{t('risk_adjacent')}</p>
            <div className="space-y-2">
              {risk.adjacent_skills.map(s => <SkillTag key={s} label={s} variant="adjacent" />)}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Education completion trend in your region</p>
          <p className="text-xs text-gray-500 mb-4">Secondary level — Wittgenstein Centre projections 2025–2035</p>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={risk.wittgenstein_trend}>
              <XAxis dataKey="year" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} unit="%" domain={[30, 60]} />
              <Tooltip formatter={(v) => `${v}%`} />
              <Line type="monotone" dataKey="pct" stroke="#1D9E75" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-xs text-gray-400 mt-2">Rising completion rates increase credential competition — skill differentiation matters more.</p>
        </div>

        <button
          onClick={() => navigate('/opportunities')}
          className="w-full py-3 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-medium transition-colors"
        >
          {t('btn_opportunities')} →
        </button>
      </div>
    </div>
  )
}