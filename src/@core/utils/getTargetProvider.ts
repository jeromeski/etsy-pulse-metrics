export const getTargetProvider = (providerList: any, slug: string | undefined) => {
  return slug && typeof slug === 'string'
    ? providerList.find((provider: any) => provider.slug.toLowerCase() === slug.toLowerCase())
    : providerList
}
