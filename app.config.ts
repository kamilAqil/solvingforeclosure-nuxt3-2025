export default defineAppConfig({
  ui: {
    button: {
      slots: {
        base: 'font-bold'
      }
    },
    colors: {
             primary: 'var(--ui-primary)',
        secondary: 'var(--ui-secondary)',
        tertiary: 'var(--ui-tertiary)',

        info: 'var(--ui-info)',
        success: 'var(--ui-success)',
        warning: 'var(--ui-warning)',
        error: 'var(--ui-error)',

        bg: 'var(--ui-bg)',
        text: 'var(--ui-text)',
    },
  }
})

