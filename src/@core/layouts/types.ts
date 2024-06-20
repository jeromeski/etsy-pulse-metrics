import { ReactNode } from 'react'
import { Settings } from 'src/@core/context/settingsContext'

export type Layout = 'vertical' | 'horizontal' | 'blank' | 'blankWithAppBar'

export type Skin = 'default' | 'bordered' | 'semi-dark'

export type ContentWidth = 'full' | 'boxed'

export type AppBar = 'fixed' | 'static' | 'hidden'

export type Footer = 'fixed' | 'static' | 'hidden'

export type ThemeColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'

export type VerticalNavToggle = 'accordion' | 'collapse'

export type HorizontalMenuToggle = 'hover' | 'click'

export type NavLink = {
  path?: string
  title: string
  action?: string
  subject?: string
  disabled?: boolean
  badgeContent?: string
  externalLink?: boolean
  openInNewTab?: boolean
  icon?: string | string[] | ReactNode
  badgeColor?: 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'
}

export type NavGroup = {
  title: string
  action?: string
  subject?: string
  badgeContent?: string
  children?: (NavGroup | NavLink)[]
  icon?: string | string[] | ReactNode
  badgeColor?: 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'
}

export type NavSectionTitle = {
  sectionTitle: string
  action?: string
  subject?: string
}

export type VerticalNavItemsType = (NavLink | NavGroup | NavSectionTitle)[]
export type HorizontalNavItemsType = (NavLink | NavGroup)[]

export type LayoutProps = {
  hidden: boolean
  settings: Settings
  children: ReactNode
  menuLockedIcon?: ReactNode
  menuUnlockedIcon?: ReactNode
  verticalNavItems?: VerticalNavItemsType
  scrollToTop?: (props?: any) => ReactNode
  saveSettings: (values: Settings) => void
  footerContent?: (props?: any) => ReactNode
  horizontalNavItems?: HorizontalNavItemsType
  verticalAppBarContent?: (props?: any) => ReactNode
  verticalNavMenuContent?: (props?: any) => ReactNode
  verticalNavMenuBranding?: (props?: any) => ReactNode
  horizontalAppBarContent?: (props?: any) => ReactNode
  horizontalAppBarBranding?: (props?: any) => ReactNode
  horizontalNavMenuContent?: (props?: any) => ReactNode
  afterVerticalNavMenuContent?: (props?: any) => ReactNode
  beforeVerticalNavMenuContent?: (props?: any) => ReactNode
}

export type BlankLayoutProps = {
  children: ReactNode
}

export type BlankLayoutWithAppBarProps = {
  children: ReactNode
}

export type UserProps = {
  location: {
    coordinates: [number | null, number | null]
    type: string
  }
  orders: any[]
  _id: string
  firstname: string
  lastname: string
  phone: string
  email: string
  password: string
  user_type: string
  state: string // Optional since it can be "N/A"
  address: string[]
  status: string // Optional since it can be "Active" or other statuses
  noteList: any[] // Optional and 'any' type since the array contents are not specified
  is_email_verified: boolean // Optional since it's a boolean
  is_phone_verified: boolean // Optional since it's a boolean
  createdAt?: string // Optional since it's a date in string format
  updatedAt?: string // Optional since it's a date in string format
  __v?: number // Optional since it's a version key
  profilePhoto: string // Optional since it's a URL to an image
  role: string // Optional since it can be "admin" or other roles
}

