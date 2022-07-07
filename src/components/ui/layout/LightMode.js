import { useEffect, useState } from 'react'

export default () => {
  const [theme, setTheme] = useState('dark')

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light')
    document.body.classList.remove("dark");

    } else {
      setTheme('dark')
    document.body.classList.remove("light");

    }
  }

  useEffect(() => {
    const localTheme = localStorage.getItem('theme')
    if (localTheme) {
      setTheme(localTheme)
    }
  }, [])

  return {
    theme,
    toggleTheme,
  }
}