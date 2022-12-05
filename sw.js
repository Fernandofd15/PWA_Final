self.addEventListener('install', e =>{
    const cacheProm = caches.open('cache-v1')
        .then(cache => {
            return cache.addAll([
                'css/estilos.css',
                'index.html',
                'img/AMD_Logo.svg',
                'img/amdslide.jpg',
                'img/facebook.png',
                'img/farcry6.jpg',
                'img/godofwar.jpg',
                'img/instagram.png',
                'img/logo.jpg',
                'img/radeon.png',
                'img/rayzen.png',
                'img/rx600.png',
                'img/slide.jpeg',
                'img/twiter.png',
                'video/Far Cry 6.mp4',
                'video/God of War.mp4',
                'video/Halo_Infinite.mp4',
                'js/app.js'
            ])
            
        });
    e.waitUntil(cacheProm);
});

self.addEventListener('fetch', e =>{
    //cache with network fallback
    const respuesta = caches.match( e.request )
        .then ( res => {
            if ( res ) return res;
            //no existe el archivo
            //tengo que ir a la web
            console.log('No existe', e.request.url);
            return fetch( e.request ).then ( newResp => {
                caches.open('cache-v1')
                    .then( cache => {
                        cache.put( e.request, newResp);
                    }

                    )
                return newResp.clone;
            });
        });
        e.respondWith(respuesta);
    //only cache
    //e.respondWith( caches.match(e.request));
});