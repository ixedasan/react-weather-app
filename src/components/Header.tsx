import { Link } from 'react-router-dom'

import Logo from './common/Logo'
import ThemeSwitcher from './common/ThemeSwitcher'
import SearchCity from './features/city/Search'

const Header = () => {
  return (
    <header className="sticky top-0 z-10 border-b bg-background/50 py-2 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link to="/">
          <Logo />
        </Link>
        <div className="flex gap-4">
          <SearchCity />
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  )
}
export default Header
