import { useTranslation } from 'react-i18next'
import { useCountry } from '../../context/CountryContext'
import clsx from 'clsx'

const pathwayColors = {
  immediate: 'bg-green-50 text-green-700 border-green-200',
  with_training: 'bg-amber-50 text-amber-700 border-amber-200',
  with_credential: 'bg-purple-50 text-purple-700 border-purple-200',
}

const pathwayLabels = {
  immediate: 'opp_pathway_immediate',
  with_training: 'opp_pathway_training',
  with_credential: 'opp_pathway_credential',
}

export default function OpportunityCard({ opp }) {
  const { t } = useTranslation()
  const { config } = useCountry()

  const wageLocal = Math.round(opp.wage_floor_usd_month * config.usdRate)

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5 hover:border-teal-200 transition-colors">
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-semibold text-gray-900 text-base">{opp.title}</h3>
        <span className={clsx('text-xs px-2 py-1 rounded-full border whitespace-nowrap font-medium', pathwayColors[opp.pathway])}>
          {t(pathwayLabels[opp.pathway])}
        </span>
      </div>

      <p className="text-sm text-gray-500 mb-4">{opp.match_reason}</p>

      <div className="flex gap-4 text-sm">
        <div>
          <p className="text-xs text-gray-400">{t('opp_wage')}</p>
          <p className="font-semibold text-gray-800">
            {config.currencySymbol}{wageLocal.toLocaleString()}<span className="text-gray-400 font-normal">/mo</span>
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-400">{t('opp_growth')}</p>
          <p className="font-semibold text-green-600">+{opp.sector_growth_pct.toFixed(1)}%</p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Sector</p>
          <p className="text-gray-700">{opp.sector}</p>
        </div>
      </div>

      <p className="text-xs text-gray-300 mt-3">Source: {opp.source}</p>
    </div>
  )
}