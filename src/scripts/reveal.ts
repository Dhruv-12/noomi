/**
 * Scroll reveals, one observer:
 *   [data-reveal]      settles in once, when it enters the viewport
 *   [data-strike]      gets .is-struck as it crosses the middle of the screen
 * Content is visible by default; the hidden state is only armed with JS.
 */
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

if ('IntersectionObserver' in window && !reduce) {
  const reveal = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-in'); reveal.unobserve(e.target); }
  }, { rootMargin: '0px 0px -10% 0px' });
  document.querySelectorAll('[data-reveal]').forEach((el) => reveal.observe(el));

  const strike = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-struck'); strike.unobserve(e.target); }
  }, { rootMargin: '0px 0px -40% 0px' });
  document.querySelectorAll('[data-strike]').forEach((el) => strike.observe(el));
} else {
  document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-in'));
  document.querySelectorAll('[data-strike]').forEach((el) => el.classList.add('is-struck'));
}
