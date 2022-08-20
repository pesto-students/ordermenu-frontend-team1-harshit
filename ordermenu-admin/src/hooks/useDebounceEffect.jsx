import { useEffect } from 'react'

const useDebounceEffect = (
  fn,
  waitTime,
  deps,
) => {
  useEffect(() => {
    const t = setTimeout(() => {
      fn.apply(undefined, deps)
    }, waitTime)

    return () => {
      clearTimeout(t)
    }
  }, deps)
}

export default useDebounceEffect
