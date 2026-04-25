import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import OpportunityCard from '../components/ui/OpportunityCard'
import LoadingSkeleton from '../components/ui/LoadingSkeleton'

export default function OpportunitiesView({ fetchOpportunities, opportunities, loading }) {
  const { t } = useTranslation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!opportunities) fetchOpportunities().catch(() => {})
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-sm w-full px-6">
          <div className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          <LoadingSkeleton lines={4} />
        </div>
      </div>
    )
  }

  if (!opportunities) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-lg mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{t('opp_title')}</h2>
            <p className="text-sm text-gray-500 mt-0.5">Grounded in ILOSTAT wage and employment data.</p>
          </div>
          <button
            onClick={() => navigate('/policy')}
            className="text-xs px-3 py-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50"
          >
            Policy view
          </button>
        </div>

        <div className="space-y-4">
          {opportunities.map(opp => (
            <OpportunityCard key={opp.id} opp={opp} />
          ))}
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-100 text-center">
          <p className="text-xs text-gray-400">Data sources: ILO ILOSTAT · World Bank WDI · Frey-Osborne (2013, LMIC calibrated)</p>
          <button
            onClick={() => navigate('/step1')}
            className="text-xs text-teal-600 mt-2 underline"
          >
            Start a new profile
          </button>
        </div>
      </div>
    </div>
  )
}