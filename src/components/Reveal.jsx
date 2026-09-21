import { useScrollReveal } from '../hooks/useScrollReveal.js'

/**
 * <Reveal> wraps any content and fades/slides it in once it enters
 * the viewport. `as` lets you change the wrapper tag, `variant`
 * picks the transform style, and `delay` (ms) staggers siblings.
 */
export function Reveal({ children, as: Tag = 'div', variant = 'up', delay = 0, className = '', ...rest }) {
  const [ref, isVisible] = useScrollReveal()

  const variantClass =
    variant === 'scale' ? 'reveal-scale' : variant === 'left' ? 'reveal-left' : variant === 'right' ? 'reveal-right' : 'reveal'

  return (
    <Tag
      ref={ref}
      className={`${variantClass} ${isVisible ? 'is-visible' : ''} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}
