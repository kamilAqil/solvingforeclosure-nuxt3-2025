// app/router.options.ts
export default {
  scrollBehavior(to) {
    if (to.hash) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            el: to.hash,
            behavior: 'smooth',
          })
        }, 300) // Delay allows time for DOM to render
      })
    }
    return { top: 0 }
  },
}
