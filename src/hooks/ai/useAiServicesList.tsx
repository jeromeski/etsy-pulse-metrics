// **React Imports
import { useState, useCallback } from 'react'

// **Next Imports
import { useRouter } from 'next/router'

// **Types Imports
import { AiProvidersItemType } from 'src/types/ai'

// **Helper Imports
import useMimicFetch from 'src/hooks/ai/useMimicFetch'

export default function useAiServicesList() {
  const { handleLoading } = useMimicFetch()
  const [isGoCharlesLoading, setIsGoCharlesLoading] = useState<boolean>(false)
  const [isUpleadLoading, setIsUpleadLoading] = useState<boolean>(false)
  const [isRocketReachLoading, setIsRocketReachLoading] = useState<boolean>(false)
  const [isSalesIntelLoading, setIsSalesIntelLoading] = useState<boolean>(false)
  const [isCienceLoading, setIsCienceLoading] = useState<boolean>(false)
  const [isGoCharlesConnected, setIsGoCharlesConnected] = useState<boolean>(false)
  const [isUpleadConnected, setIsUpleadConnected] = useState<boolean>(false)
  const [isRocketReachConnected, setIsRocketReachConnected] = useState<boolean>(false)
  const [isSalesIntelConnected, setIsSalesIntelConnected] = useState<boolean>(false)
  const [isCienceConnected, setIsCienceConnected] = useState<boolean>(false)

  const router = useRouter()

  const handleGoCharlesLogin = useCallback(
    async (id: string) => {
      await handleLoading(setIsGoCharlesLoading)
      if (!isGoCharlesConnected) {
        router.push(`/ai-register/${id}`)
      }
    },
    [
      // handleLoading,
      // setIsGoCharlesLoading,
      // isGoCharlesConnected,
      // router
    ]
  )

  const handleGoCharlesLogout = async (id: string) => {}

  const handleUpleadLogin = useCallback(async (id: string) => {
    await handleLoading(setIsUpleadLoading)
    if (!isGoCharlesConnected) {
      router.push(`/ai-register/${id}`)
    }
  }, [])

  const handleUpleadLogout = async (id: string) => {}

  const handleRocketReachLogin = useCallback(async (id: string) => {
    await handleLoading(setIsRocketReachLoading)
    if (!isGoCharlesConnected) {
      router.push(`/ai-register/${id}`)
    }
  }, [])

  const handleRocketReachLogout = async (id: string) => {}

  const handleSalesIntelLogin = useCallback(async (id: string) => {
    await handleLoading(setIsSalesIntelLoading)
    if (!isGoCharlesConnected) {
      router.push(`/ai-register/${id}`)
    }
  }, [])
  const handleSalesIntelLogout = async (id: string) => {}

  const handleCienceLogin = useCallback(async (id: string) => {
    await handleLoading(setIsCienceLoading)
    if (!isGoCharlesConnected) {
      router.push(`/ai-register/${id}`)
    }
  }, [])

  const handleCienceLogout = async (id: string) => {}

  const AI_PROVIDERS = [
    {
      providerLogo: '/images/logos/gocharles-company-logo.png',
      name: 'GoCharles.ai',
      providerName: 'gocharlesai',
      slug: 'gocharlesai',
      providerDescription: 'Boost sales with AI-driven insights',
      isLoading: isGoCharlesLoading,
      isConnected: isGoCharlesConnected,
      onLogin: handleGoCharlesLogin,
      onLogout: handleGoCharlesLogout,
      heroImage: '/images/register/placeholder_hero_01_544x616.png'
    },
    {
      providerLogo: '/images/logos/uplead-logo-200x35.png',
      name: 'Uplead',
      providerName: 'uplead',
      slug: 'uplead',
      providerDescription: 'Automate customer interactions seamlessly.',
      isLoading: isUpleadLoading,
      isConnected: isUpleadConnected,
      onLogin: handleUpleadLogin,
      onLogout: handleUpleadLogout,
      heroImage: '/images/register/placeholder_grey_544x616.png'
    },
    {
      providerLogo: '/images/logos/rocket-reach-logo.png',
      name: 'Rocket Reach',
      providerName: 'rocketreach',
      slug: 'rocketreach',
      providerDescription: 'Optimize supply chain with predictive analytics.',
      isLoading: isRocketReachLoading,
      isConnected: isRocketReachConnected,
      onLogin: handleRocketReachLogin,
      onLogout: handleRocketReachLogout,
      heroImage: '/images/register/placeholder_grey_544x616.png'
    },
    {
      providerLogo: '/images/logos/sales-intel-logo-200x35.png',
      name: 'Sales Intel',
      providerName: 'salesintel',
      slug: 'salesintel',
      providerDescription: 'Enhance CRM with intelligent data analysis.',
      isLoading: isSalesIntelLoading,
      isConnected: isSalesIntelConnected,
      onLogin: handleSalesIntelLogin,
      onLogout: handleSalesIntelLogout,
      heroImage: '/images/register/placeholder_grey_544x616.png'
    },
    {
      providerLogo: '/images/logos/cience-logo-200x35.png',
      name: 'Cience',
      providerName: 'cience',
      slug: 'cience',
      providerDescription: 'Drive ecommerce growth with personalized recommendations.',
      isLoading: isCienceLoading,
      isConnected: isCienceConnected,
      onLogin: handleCienceLogin,
      onLogout: handleCienceLogout,
      heroImage: '/images/register/placeholder_grey_544x616.png'
    }
    // Add more services as needed
  ]
  return AI_PROVIDERS
}
