const NOME_CACHE = 'estoque-app-v2';
const ARQUIVOS_CACHE = [
  './',
  './estoque.html',
  './manifest.json'
];

// Instalar — guarda arquivos
self.addEventListener('install', evento => {
  evento.waitUntil(
    caches.open(NOME_CACHE)
      .then(cache => cache.addAll(ARQUIVOS_CACHE))
      .then(() => self.skipWaiting())
  );
});

// Ativar — limpa caches antigos
self.addEventListener('activate', evento => {
  evento.waitUntil(
    caches.keys().then(chaves => 
      Promise.all(
        chaves.filter(chave => chave !== NOME_CACHE)
              .map(chave => caches.delete(chave))
      )
    ).then(() => self.clients.claim())
  );
});

// Busca — usa cache se sem internet
self.addEventListener('fetch', evento => {
  evento.respondWith(
    caches.match(evento.request)
      .then(resposta => resposta || fetch(evento.request))
  );
});
