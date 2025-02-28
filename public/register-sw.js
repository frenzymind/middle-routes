if ('serviceWorker' in navigator) {
  console.log('worker OK')

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', { scope: '/' })
    console.log('loaded')
  })
} else {
  console.log('No worker')
}
