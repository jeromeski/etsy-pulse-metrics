export const sizes = {
  mobileXs: '1px',
  mobileXsCeil: '319px',
  mobileS: '320px',
  mobileSCeil: '374px',
  mobileM: '375px',
  mobileMCeil: '424px',
  mobileL: '425px',
  mobileLCeil: '767px',
  tablet: '768px',
  tabletCeil: '1023px',
  laptop: '1024px',
  laptopCeil: '1439px',
  laptopL: '1440px',
  laptopLCeil: '2559px',
  desktop: '2560'
}

export const devicesMinWidth = {
  mobileXs: `(min-width: ${sizes.mobileXs})`,
  mobileS: `(min-width: ${sizes.mobileS})`,
  mobileM: `(min-width: ${sizes.mobileM})`,
  mobileL: `(min-width: ${sizes.mobileL})`,
  tablet: `(min-width: ${sizes.tablet})`,
  laptop: `(min-width: ${sizes.laptop})`,
  laptopL: `(min-width: ${sizes.laptopL})`,
  desktop: `(min-width: ${sizes.desktop})`
}

export const devicesMaxWidth = {
  mobileXs: `(max-width: ${sizes.mobileXs})`,
  mobileS: `(max-width: ${sizes.mobileS})`,
  mobileM: `(max-width: ${sizes.mobileM})`,
  mobileL: `(max-width: ${sizes.mobileL})`,
  tablet: `(max-width: ${sizes.tablet})`,
  laptop: `(max-width: ${sizes.laptop})`,
  laptopL: `(max-width: ${sizes.laptopL})`,
  desktop: `(max-width: ${sizes.desktop})`
}