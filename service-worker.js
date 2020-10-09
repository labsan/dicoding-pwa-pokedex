// Nama cache
const CACHE_NAME = "pwa-pokedex-v0";

// Daftar asset dan halaman 
var urltoCache = [
    "/",
    "/index.html",
    "/css/materialize.min.css",
    "/css/style.css",
    "/images/icons/favicon-144.png",
    "/images/icons/favicon-192.png",
    "/images/icons/favicon-512.png",
    "/images/icons/hamburger-icon.png",
    "/images/pokedexs/electric/raichu.png",
    "/images/pokedexs/electric/pikachu.png",
    "/images/pokedexs/electric/pichu.png",
    "/images/pokedexs/fire/typhlosion.png",
    "/images/pokedexs/fire/quilava.png",
    "/images/pokedexs/fire/cyndaquil.png",
    "/images/pokedexs/grass/meganium.png",
    "/images/pokedexs/grass/chikorita.png",
    "/images/pokedexs/grass/bayleef.png",
    "/images/pokedexs/poison/nidorina.png",
    "/images/pokedexs/poison/grimer.png",
    "/images/pokedexs/poison/arbok.png",
    "/images/pokedexs/water/croconaw.png",
    "/images/pokedexs/water/feraligatr.png",
    "/images/pokedexs/water/totodile.png",
    "/images/logo-website.png",
    "/js/materialize.min.js",
    "/js/nav.js",
    "/pages/home.html",
    "/pages/nav.html",
    "/pages/electric.html",
    "/pages/fire.html",
    "/pages/grass.html",
    "/pages/poison.html",
    "/pages/water.html"
];

// Registrasi cache
self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {

            // Simpan asset dan halaman dalam cache storage
            return cache.addAll(urltoCache);
        })
    );
});

// Gunakan asset dari cache storage
self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches
        .match(event.request, {
            cacheName: CACHE_NAME
        })
        .then(function (response) {
            if (response) {
                console.log("Serviceworker: Gunakan asset dari cache: ", response.url);
                return response;
            }

            console.log("Serviceworker: Memuat aset dari server: ", event.request.url);
            return fetch(event.request);
        })
    )
})

// Hapus cache storage lama
self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheName) {
            return Promise.all(
                cacheName.map(function (cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("Serviceworker: cache" + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            )
        })
    )
})