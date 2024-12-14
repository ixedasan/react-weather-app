import { MoonIcon, SunIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { useTheme } from '../ThemeProvider'

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant={'ghost'}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </Button>
  )
}

export default ThemeSwitcher
