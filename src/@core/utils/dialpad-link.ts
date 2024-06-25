const createDialpadLink = (phoneNumber: string | number): string =>
  `dialpad://${phoneNumber}?launchMinimode=1&confirmPhone=1&crmLogging=0&showDispositions=1`

export default createDialpadLink
