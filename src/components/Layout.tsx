import type { PropsWithChildren } from 'react'
import { Heart } from 'lucide-react'

import Header from './Header'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-gradient-to-br from-background to-muted">
      <Header />
      <main className="container mx-auto min-h-screen py-8">{children}</main>
      <footer className="border-t border-border bg-background/50 py-2 backdrop-blur-sm">
        <p className="container mx-auto py-4 text-center text-gray-500">
          Made with <Heart className="mb-1 inline-block text-primary" /> by{' '}
          <a
            href="https://github.com/ixedasan"
            target="_blank"
            className="text-lg text-primary"
          >
            ixedasan
          </a>
        </p>
      </footer>
    </div>
  )
}
export default Layout
