// REGISTER SERVICE WORKER
		if ('serviceWorker' in navigator) {
			window.addEventListener('load', function () {
				navigator.serviceWorker
					.register('../service-worker.js')
					.then(function () {
						console.log('Pendaftaran Service Worker Berhasil.');
					})
					.catch(function () {
						console.log('Pendaftaran Service Worker Gagal.');
					});
			});
		} else {
			console.log('Service Worker belum didukung browser ini.');
		}