/**
 * Navbar scroll shadow — adds .navbar--scrolled class on scroll.
 * Imported by Navbar.astro's <script> tag.
 */
export function initNavbarScroll(): void {
  const navbar = document.querySelector('.navbar') as HTMLElement | null
  if (!navbar) return

  let ticking = false
  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (window.scrollY > 0) {
          navbar.classList.add('navbar--scrolled')
        } else {
          navbar.classList.remove('navbar--scrolled')
        }
        ticking = false
      })
      ticking = true
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
}
