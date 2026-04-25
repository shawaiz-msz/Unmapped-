import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { useCountry } from '../context/CountryContext'
import MetricCard from '../components/ui/MetricCard'
import LoadingSkeleton from '../components/ui/LoadingSkeleton'
import { getPolicyData } from '../api/client'

export default function PolicyDashboard() {
  const { t } = useTranslation()
  const { config } = useCountry()
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPolicyData(config.code).then(setData).finally(() => setLoading(false))
  }, [config.code])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <LoadingSkeleton lines={6} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-xs text-gray-400 mb-1 font-medium uppercase tracking-wide">Policy view</div>
            <h2 className="text-xl font-bold text-gray-900">{t('policy_title')}</h2>
            <p className="text-sm text-gray-500 mt-0.5">{config.label}</p>
          </div>
          <button onClick={() => navigate('/opportunities')} className="text-xs px-3 py-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50">
            Youth view
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <MetricCard label={t('policy_profiles')} value={data.total_profiles.toLocaleString()} sub="registered this month" />
          <MetricCard label={t('policy_avg_risk')} value={`${data.avg_automation_risk_pct}%`} sub="automation exposure avg." />
          <MetricCard label={t('policy_gap')} value={data.biggest_skills_gap} sub="highest demand vs supply gap" />
          <MetricCard label={t('policy_top_risk')} value={data.top_at_risk_occupation} sub="highest automation probability" />
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-4">Skills distribution by education level</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data.skills_distribution} layout="vertical">
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="level" tick={{ fontSize: 11 }} width={100} />
              <Tooltip />
              <Bar dataKey="count" fill="#1D9E75" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <p className="text-sm font-semibold text-gray-700 mb-4">Sector demand vs supply gap</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data.sector_gap}>
              <XAxis dataKey="sector" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="demand" name="Demand" fill="#1D9E75" radius={[4, 4, 0, 0]} />
              <Bar dataKey="supply" name="Supply" fill="#9FE1CB" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-gray-400 mt-3">Source: ILO ILOSTAT · World Bank Enterprise Surveys</p>
        </div>
      </div>
    </div>
  )
}