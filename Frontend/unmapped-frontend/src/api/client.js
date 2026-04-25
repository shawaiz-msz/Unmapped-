import axios from 'axios'
import {
  mockGenerateProfile,
  mockAssessRisk,
  mockMatchOpportunities,
  mockGetPolicyData,
} from './mock'

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  timeout: 30000,
})

export const generateProfile = (formData) =>
  USE_MOCK ? mockGenerateProfile(formData) : http.post('/profile/generate', formData).then(r => r.data)

export const assessRisk = (profileId) =>
  USE_MOCK ? mockAssessRisk(profileId) : http.post('/risk/assess', { profile_id: profileId }).then(r => r.data)

export const matchOpportunities = (profileId) =>
  USE_MOCK ? mockMatchOpportunities(profileId) : http.post('/opportunities/match', { profile_id: profileId }).then(r => r.data)

export const getPolicyData = (countryCode) =>
  USE_MOCK ? mockGetPolicyData(countryCode) : http.get(`/policy/${countryCode}`).then(r => r.data)