import './CtaButton.css'

/**
 * Two-tier CTA. `call` is the only filled button on the page so that the
 * primary action always wins visually; `request` is an outline on every
 * surface. `tone` picks the outline colour for light vs dark grounds.
 */
function CtaButton({
  variant = 'call',
  tone = 'dark',
  href,
  children,
  className = '',
  ...rest
}) {
  const classes = ['cta', `cta--${variant}`, `cta--on-${tone}`, className]
    .filter(Boolean)
    .join(' ')

  return (
    <a className={classes} href={href} {...rest}>
      {variant === 'call' && <PhoneIcon />}
      <span>{children}</span>
    </a>
  )
}

function PhoneIcon() {
  return (
    <svg
      className="cta__icon"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.5.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.2.2 2.4.57 3.5a1 1 0 0 1-.25 1z"
      />
    </svg>
  )
}

export default CtaButton
