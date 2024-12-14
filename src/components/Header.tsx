import { Link } from 'react-router-dom'

import Logo from './common/Logo'
import ThemeSwitcher from './common/ThemeSwitcher'

const Header = () => {
  return (
    <header className="sticky top-0 z-10 border-b bg-background/50 py-2 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div>
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <div className="flex gap-4">
          {/* TODO: search */}
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  )
}
export default Header
