# CART3R AI STUDIO — Mobile Starter

Starter PWA responsif untuk dikerjakan dari HP Android.

## Fitur saat ini
- Dashboard gelap merah.
- Prompt builder untuk generator gambar AI.
- Photo Lab lokal: pilih foto, atur brightness/contrast/saturation, simpan hasil.
- Pengaturan URL backend.
- PWA manifest dan service worker.

## Menjalankan dari HP
Cara paling mudah:
1. Ekstrak ZIP.
2. Upload isi folder ke repository GitHub baru.
3. Di GitHub, buka Settings → Pages.
4. Pilih Deploy from a branch, branch `main`, folder `/root`, lalu Save.
5. Buka URL GitHub Pages dari Chrome Android.
6. Pilih menu Chrome (⋮) → Add to Home screen / Install app.

Alternatif: buka file `index.html` di editor seperti Acode untuk pemeriksaan awal. Fitur PWA/offline memerlukan hosting HTTPS atau localhost.

## Catatan AI hybrid
Versi ini belum menghubungi model AI. Prompt builder dan photo editor berjalan di perangkat. Untuk generator AI sungguhan:
- Buat backend sendiri (misalnya FastAPI).
- Backend menerima prompt dan memanggil penyedia model melalui API.
- Simpan API key hanya di environment variable backend, jangan di `app.js` atau HTML.
- Isi URL backend di Settings setelah endpoint tersedia.
- Tambahkan autentikasi, rate limit, batas ukuran file, validasi input, dan kebijakan privasi sebelum menerima pengguna lain.

## APK Android
Starter ini adalah PWA, bukan APK native. Setelah versi web stabil, bungkus dengan Trusted Web Activity atau Capacitor menggunakan layanan/build environment yang tepercaya. Jangan memasang APK dari sumber tidak dikenal.

## Privasi dan penggunaan
Gunakan foto yang kamu miliki atau yang pemiliknya memberi izin. Jangan membuat manipulasi intim/non-konsensual atau menyesatkan. Fitur lokal tidak mengunggah foto secara otomatis.
