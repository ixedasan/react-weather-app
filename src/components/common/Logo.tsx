const Logo = () => {
  return (
    <div className="group flex cursor-pointer items-center space-x-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary/80 to-secondary shadow-lg transition-all duration-300 group-hover:shadow-xl">
        <svg
          className="h-6 w-6 transform text-primary-foreground transition-transform duration-300 group-hover:scale-110"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
          />
        </svg>
      </div>
      <span className="hidden bg-gradient-to-r from-primary to-secondary bg-clip-text text-xl font-bold text-transparent transition-all duration-300 group-hover:from-primary/90 group-hover:to-secondary/90 sm:block">
        WeatherApp
      </span>
    </div>
  )
}

export default Logo
