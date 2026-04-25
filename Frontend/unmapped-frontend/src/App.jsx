import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { CountryProvider } from './context/CountryContext'
import { useProfile } from './hooks/useProfile'
import './i18n'

import Step1Country from './pages/Step1Country'
import Step2Education from './pages/Step2Education'
import Step3Languages from './pages/Step3Languages'
import Step4Experience from './pages/Step4Experience'
import Step5Generating from './pages/Step5Generating'
import RiskView from './pages/RiskView'
import OpportunitiesView from './pages/OpportunitiesView'
import PolicyDashboard from './pages/PolicyDashboard'

function AppRoutes() {
  const profileState = useProfile()

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/step1" replace />} />
      <Route path="/step1" element={<Step1Country updateForm={profileState.updateForm} />} />
      <Route path="/step2" element={<Step2Education updateForm={profileState.updateForm} formData={profileState.formData} />} />
      <Route path="/step3" element={<Step3Languages updateForm={profileState.updateForm} formData={profileState.formData} />} />
      <Route path="/step4" element={<Step4Experience updateForm={profileState.updateForm} formData={profileState.formData} />} />
      <Route path="/step5" element={
        <Step5Generating
          submitProfile={profileState.submitProfile}
          profile={profileState.profile}
          loading={profileState.loading}
          error={profileState.error}
        />
      } />
      <Route path="/risk" element={
        <RiskView
          fetchRisk={profileState.fetchRisk}
          risk={profileState.risk}
          loading={profileState.loading}
          error={profileState.error}
        />
      } />
      <Route path="/opportunities" element={
        <OpportunitiesView
          fetchOpportunities={profileState.fetchOpportunities}
          opportunities={profileState.opportunities}
          loading={profileState.loading}
        />
      } />
      <Route path="/policy" element={<PolicyDashboard />} />
    </Routes>
  )
}

export default function App() {
  return (
    <CountryProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </CountryProvider>
  )
}