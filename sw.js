// Check for service worker support

if ('serviceWorker' in navigator) {

    // Register the service worker script with a scope of '/' (entire website)
    navigator.serviceWorker.register('/sw.js', {
      scope: '/'
    })
    .then(registration => {
      console.log('Service worker registered: ', registration.scope);
  
      // Optional: Handle different service worker states (installing, activated)
      registration.addEventListener('updatefound', () => {
        console.log('New service worker found!');
      });
    })
    .catch(err => {
      console.log('Service worker registration failed: ', err);
    });
  }
// Inside your service worker script (sw.js)

async function callAPI() {
  try {
    const response = await fetch("https://evs-wordle.onrender.com/wakeup");
    if (!response.ok) {
      throw new Error(`API call failed with status ${response.status}`);
    }
    const data = await response.json();
    console.log('API data:', data);
  } catch (error) {
    console.error('API call error:', error);
  }
}

// Call the function repeatedly every 90 seconds (adjusted for milliseconds)
self.addEventListener('activate', (event) => {
  console.log('Service worker activated!');
  setInterval(callAPI, 300000);
});
