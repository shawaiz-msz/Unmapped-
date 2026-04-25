import { useState } from 'react'
import { generateProfile, assessRisk, matchOpportunities } from '../api/client'

export function useProfile() {
  const [formData, setFormData] = useState({})
  const [profile, setProfile] = useState(null)
  const [risk, setRisk] = useState(null)
  const [opportunities, setOpportunities] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const updateForm = (fields) => setFormData(prev => ({ ...prev, ...fields }))

  const submitProfile = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await generateProfile(formData)
      setProfile(result)
      return result
    } catch (e) {
      setError('Profile generation failed. Please try again.')
      throw e
    } finally {
      setLoading(false)
    }
  }

  const fetchRisk = async () => {
    if (!profile) return
    setLoading(true)
    try {
      const result = await assessRisk(profile.profile_id)
      setRisk(result)
      return result
    } catch (e) {
      setError('Risk assessment failed.')
      throw e
    } finally {
      setLoading(false)
    }
  }

  const fetchOpportunities = async () => {
    if (!profile) return
    setLoading(true)
    try {
      const result = await matchOpportunities(profile.profile_id)
      setOpportunities(result)
      return result
    } catch (e) {
      setError('Opportunity matching failed.')
      throw e
    } finally {
      setLoading(false)
    }
  }

  return {
    formData, updateForm,
    profile, submitProfile,
    risk, fetchRisk,
    opportunities, fetchOpportunities,
    loading, error,
  }
}