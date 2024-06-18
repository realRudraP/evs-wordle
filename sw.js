if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js', {
      scope: '/'
    })
    .then(registration => {
      console.log('Service worker registered: ', registration.scope);
  
      registration.addEventListener('updatefound', () => {
        console.log('New service worker found!');
      });
    })
    .catch(err => {
      console.log('Service worker registration failed: ', err);
    });
  }


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


self.addEventListener('activate', (event) => {
  console.log('Service worker activated!');
  setInterval(callAPI, 300000);
});
