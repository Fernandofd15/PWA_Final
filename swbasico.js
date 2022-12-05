self.addEventListener('install', e => {
    const cacheProm = caches.open('nuevo')
        .then(cache =>{
            return cache.addAll([
                '/',
                'index.html',
                'css/style.css',
                'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css',
                'img/main.jpg',
                'js/app.js'
            ])
        });
    
    e.waitUntil(cacheProm);
});

self.addEventListener('fetch', e =>{
    //cache-only   
    e.respondWith(caches.match( e.request ));    
});

