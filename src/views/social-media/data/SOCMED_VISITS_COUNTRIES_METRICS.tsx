import { DataType } from 'src/views/social-media/types'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'

export const SOCMED_VISITS_COUNTRIES: DataType[] = [
  {
    id: '7abcd',
    pageVisits: '894k',
    trendDir: 'up',
    title: '8,656k',
    avatarText: 'US',
    trendNumber: '25.8%',
    avatarColor: 'success',
    subtitle: 'United States of America',
    trend: <ChevronUp sx={{ mr: 0.5, color: 'success.main' }} />
  },
  {
    id: '8bcde',
    pageVisits: '645k',
    title: '2,415k',
    trendDir: 'down',
    avatarText: 'UK',
    trendNumber: '6.2%',
    avatarColor: 'error',
    subtitle: 'United Kingdom',
    trend: <ChevronDown sx={{ mr: 0.5, color: 'error.main' }} />
  },
  {
    id: '9cdef',
    pageVisits: '148k',
    title: '865k',
    trendDir: 'up',
    avatarText: 'IN',
    subtitle: 'India',
    trendNumber: '12.4%',
    avatarColor: 'warning',
    trend: <ChevronUp sx={{ mr: 0.5, color: 'success.main' }} />
  },
  {
    id: '10fgh',
    pageVisits: '86k',
    title: '745k',
    trendDir: 'down',
    avatarText: 'JA',
    subtitle: 'Japan',
    trendNumber: '11.9%',
    avatarColor: 'secondary',
    trend: <ChevronDown sx={{ mr: 0.5, color: 'error.main' }} />
  }
]
