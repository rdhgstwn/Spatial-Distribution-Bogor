# Analysis of Spatial Distribution Patterns in Bogor City (2004, 2014, 2024) 🌍🌡️

Aplikasi WebGIS interaktif berbasis **Google Earth Engine (GEE)** sebagai lampiran visualisasi data spasial untuk publikasi ilmiah mengenai dinamika iklim mikro dan penggunaan lahan di Kota Bogor.

## 🔗 Tautan Publikasi Jurnal
Algoritma, metodologi, dan hasil analisis dalam repositori ini merujuk secara resmi pada publikasi berikut:
> **Analisis Pola Distribusi Spasial Perubahan Penggunaan Lahan, Land Surface Temperature, dan Temperature Humidity Indek di Kota Bogor Tahun 2004, 2014, 2024**  
> Peneliti: Ridho Gustiawan (Universitas Ibn Khaldun Bogor)  
> **[Baca Jurnal Lengkap di Sini](https://jpips.fkip.unila.ac.id/index.php/jpg/article/view/21)**

## 🚀 Akses Aplikasi (GEE Apps)
Visualisasi interaktif dari penelitian ini dapat diakses secara publik melalui:
**https://ee-rdhgstwnn18.projects.earthengine.app/view/perubahan-land-use-lst-dan-thi-kota-bogor-2014-2014-2024**

## 📊 Abstrak & Konteks Riset
* **Konteks:** Pertumbuhan penduduk dan urbanisasi pesat di Kota Bogor mendorong perluasan permukiman secara masif, mengurangi lahan pertanian dan tutupan vegetasi.
* **Masalah:** Penurunan vegetasi (NDVI) memicu turunnya kelembapan (RH) dan naiknya suhu permukaan (LST). Hal ini berujung pada tingginya indeks ketidaknyamanan termal (THI) serta memicu risiko *Urban Heat Island* (UHI).
* **Metode:** Menggunakan penginderaan jauh berbasis Google Earth Engine (GEE) dan *machine learning* Random Forest (RF) yang terbukti memiliki akurasi sangat tinggi (89,53%) dibandingkan SVM (74,07%).
* **Tujuan:** Memetakan dinamika jangka panjang untuk mengungkap distribusi spasial alih fungsi lahan dan kenaikan suhu, sebagai dasar strategi mitigasi iklim kota.

## 🔬 Formulasi Algoritma
Penelitian ini menggunakan formulasi ekstraksi nilai dari citra Landsat (5, 8, dan 9):
1. **LST** = `(K2 / ln(K1 / L + 1)) - 273.15`
2. **NDVI** = `(NIR - Red) / (NIR + Red)`
3. **Suhu Udara (Ta)** = `2.5701 + (0.9147 × LST) - (0.0047 × DEM)`
4. **Kelembapan (RH)** = `112.4677 - (1.3478 × LST) + (23.1877 × NDVI)`
5. **THI** = `Ta - ((0.55 - 0.0055 × RH) × (Ta - 14.5))`
