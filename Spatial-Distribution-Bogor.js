// ======================================================================
// GEE APP: SPATIAL DISTRIBUTION ANALYSIS BOGOR (2004, 2014, 2024)
// ======================================================================

var ROI = ee.FeatureCollection("projects/ee-rdhgstwnn18/assets/Batas_Administrasi_KotaBogor");

// ======================================================================
// MULTILANGUAGE DICTIONARY (TXT) & DATA DICTIONARY
// ======================================================================
var LANG = 'ID'; 
var langElems = [];

var TXT = {
  EN: {
    appTitle: 'Spatial Distribution Bogor',
    btnInfo: 'ℹ️ BACKGROUND & METHODOLOGY',
    step1: '1. Select Analysis Year:',
    step2: '2. Select Spatial Parameter:',
    btnRun: '▶ RENDER MAP & CHARTS',
    hintRun: '*System automatically fetches SHP data & processes charts.',
    dashTitle: 'ANALYSIS RESULT',
    lblLegend: 'CLASS LEGEND:',
    chartLoading: '⏳ Calculating charts...',
    chartTitle: 'Area Distribution (Ha) - ',
    hAxisClass: 'Class',
    vAxisHa: 'Area (Hectares)',
    btnTrend: '📈 Calculate Trend (2004-2024)',
    hintTrend: '*Note: Requires extra computing time to process raw Landsat imagery.',
    trendTitle: 'Historical Mean Trend (2004 - 2024)',
    hAxisYear: 'Year',
    vAxisMean: 'Mean Value',
    btnClose: '✖ Close',
    btnMenu: '☰ MAIN MENU',
    btnDash: '📊 DASHBOARD',
    
    // Modal Info Text
    modalTitle: 'ANALYSIS OF SPATIAL DISTRIBUTION PATTERNS OF LAND USE CHANGE, LAND SURFACE TEMPERATURE, AND TEMPERATURE HUMIDITY INDEX IN BOGOR CITY (2004, 2014, 2024)',
    modP1: '• Context: Rapid population growth and urbanization in Bogor City drive significant residential expansion, reducing agricultural land and vegetation cover.',
    modP2: '• Problem: The decline in vegetation decreases Relative Humidity (RH) and increases Land Surface Temperature (LST). This condition leads to a higher Temperature Humidity Index (THI), triggering Urban Heat Island (UHI) risks.',
    modP3: '• Method: Utilizing Google Earth Engine (GEE) and the Random Forest (RF) machine learning algorithm. RF has proven to be highly accurate (89.53%) compared to SVM (74.07%).',
    modFormTitle: '• Algorithm Formulation:',
    modForm1: '1. LST = (K2 / ln(K1 / L + 1)) - 273.15',
    modForm2: '2. NDVI = (NIR - Red) / (NIR + Red)',
    modForm3: '3. Air Temp (Ta) = 2.5701 + (0.9147 × LST) - (0.0047 × DEM)',
    modForm4: '4. Humidity (RH) = 112.4677 - (1.3478 × LST) + (23.1877 × NDVI)',
    modForm5: '5. THI = Ta - ((0.55 - 0.0055 × RH) × (Ta - 14.5))',
    modP4: '• Objective: To map long-term spatial dynamics to uncover the distribution of land conversion and temperature rise as a basis for climate mitigation strategies.',
    modSource: '🔗 Read My Published Journal',
    modFooter1: 'Researcher: RIDHO GUSTIAWAN - 201106040785',
    modFooter2: 'Geospatial Info. Technology | Universitas Ibn Khaldun'
  },
  ID: {
    appTitle: 'DINAMIKA SPASIAL BOGOR',
    btnInfo: 'ℹ️ BACA LATAR BELAKANG & METODE',
    step1: '1. Pilih Tahun Analisis:',
    step2: '2. Pilih Parameter Spasial:',
    btnRun: '▶ TAMPILKAN PETA & GRAFIK',
    hintRun: '*Sistem otomatis mengambil data SHP & memproses grafik.',
    dashTitle: 'HASIL ANALISIS',
    lblLegend: 'LEGENDA KELAS:',
    chartLoading: '⏳ Sedang menghitung grafik...',
    chartTitle: 'Distribusi Area (Ha) - ',
    hAxisClass: 'Kelas',
    vAxisHa: 'Luas (Hektar)',
    btnTrend: '📈 Hitung Tren Rerata (2004-2024)',
    hintTrend: '*Catatan: Membutuhkan waktu komputasi ekstra untuk memproses citra mentah Landsat.',
    trendTitle: 'Tren Rerata Historis (2004 - 2024)',
    hAxisYear: 'Tahun',
    vAxisMean: 'Nilai Rerata',
    btnClose: '✖ Tutup',
    btnMenu: '☰ MENU UTAMA',
    btnDash: '📊 DASHBOARD',
    
    // Modal Info Text
    modalTitle: 'ANALISIS POLA DISTRIBUSI SPASIAL PERUBAHAN PENGGUNAAN LAHAN, LAND SURFACE TEMPERATURE DAN TEMPERATURE HUMIDITY INDEK DI KOTA BOGOR TAHUN 2004, 2014, 2024',
    modP1: '• Konteks: Pertumbuhan penduduk dan urbanisasi pesat di Kota Bogor mendorong perluasan permukiman secara masif, yang berakibat pada berkurangnya lahan pertanian dan tutupan vegetasi.',
    modP2: '• Masalah: Penurunan vegetasi (NDVI) memicu turunnya kelembapan (RH) dan naiknya suhu permukaan (LST). Hal ini berujung pada tingginya indeks ketidaknyamanan termal (THI) serta memicu risiko Urban Heat Island (UHI).',
    modP3: '• Metode: Menggunakan penginderaan jauh berbasis Google Earth Engine (GEE) dan machine learning Random Forest (RF) yang terbukti memiliki akurasi sangat tinggi (89,53%) dibandingkan SVM (74,07%).',
    modFormTitle: '• Formulasi Algoritma:',
    modForm1: '1. LST = (K2 / ln(K1 / L + 1)) - 273.15',
    modForm2: '2. NDVI = (NIR - Red) / (NIR + Red)',
    modForm3: '3. Suhu Udara (Ta) = 2.5701 + (0.9147 × LST) - (0.0047 × DEM)',
    modForm4: '4. Kelembapan (RH) = 112.4677 - (1.3478 × LST) + (23.1877 × NDVI)',
    modForm5: '5. THI = Ta - ((0.55 - 0.0055 × RH) × (Ta - 14.5))',
    modP4: '• Tujuan: Memetakan dinamika jangka panjang untuk mengungkap distribusi spasial alih fungsi lahan dan kenaikan suhu, sebagai dasar strategi mitigasi iklim kota.',
    modSource: '🔗 Baca Jurnal Publikasi Saya',
    modFooter1: 'Peneliti: RIDHO GUSTIAWAN - 201106040785',
    modFooter2: 'Geospatial Information Technology | Universitas Ibn Khaldun Bogor'
  }
};

// Data Dict
var DATA_DICT = {
  'Penggunaan Lahan': {
    en_key: 'Land Use',
    assets: { '2004': "projects/ee-rdhgstwnn18/assets/Lu_Kota_Bogor_2004", '2014': "projects/ee-rdhgstwnn18/assets/Lu_Kota_Bogor_2014", '2024': "projects/ee-rdhgstwnn18/assets/Lu_Kota_Bogor_2024" },
    xProp: 'Nama_kelas', min: 0, max: 6, palette: ['0000FF', 'FF0000', 'ADFF2F', 'FFFF00', '006400', 'FFA500', '800080'],
    classes: { ID: ['Badan Air', 'Lahan Terbangun', 'Kebun', 'Sawah', 'Hutan', 'Lahan Terbuka', 'Semak Belukar'], EN: ['Water Body', 'Built-up Area', 'Plantation', 'Paddy Field', 'Forest', 'Open Land', 'Shrub'] }
  },
  'Land Surface Temperature (LST)': {
    en_key: 'Land Surface Temperature (LST)',
    assets: { '2004': "projects/ee-rdhgstwnn18/assets/Lst_Kota_Bogor_2004", '2014': "projects/ee-rdhgstwnn18/assets/Lst_Kota_Bogor_2014", '2024': "projects/ee-rdhgstwnn18/assets/Lst_Kota_Bogor_2024" },
    xProp: 'Suhu_°C', min: 1, max: 5, palette: ['008000', '90EE90', 'FFFF00', 'FFA500', 'FF8C00'],
    classes: { ID: ['< 24°C', '24°C - 26°C', '26°C - 28°C', '28°C - 30°C', '> 30°C'], EN: ['< 24°C', '24°C - 26°C', '26°C - 28°C', '28°C - 30°C', '> 30°C'] }
  },
  'Suhu Udara (Ta)': {
    en_key: 'Air Temperature (Ta)',
    assets: { '2004': "projects/ee-rdhgstwnn18/assets/Ta_Kota_Bogor_2004", '2014': "projects/ee-rdhgstwnn18/assets/Ta_Kota_Bogor_2014", '2024': "projects/ee-rdhgstwnn18/assets/Ta_Kota_Bogor_2024" },
    xProp: 'Suhu_°C', min: 1, max: 6, palette: ['008000', '90EE90', 'FFFF00', 'FFA500', 'FF8C00', 'FF0000'],
    classes: { ID: ['< 22°C', '22°C - 24°C', '24°C - 26°C', '26°C - 28°C', '28°C - 30°C', '> 30°C'], EN: ['< 22°C', '22°C - 24°C', '24°C - 26°C', '26°C - 28°C', '28°C - 30°C', '> 30°C'] }
  },
  'Kelembapan Relatif (RH)': {
    en_key: 'Relative Humidity (RH)',
    assets: { '2004': "projects/ee-rdhgstwnn18/assets/Rh_Kota_Bogor_2004", '2014': "projects/ee-rdhgstwnn18/assets/Rh_Kota_Bogor_2014", '2024': "projects/ee-rdhgstwnn18/assets/Rh_Kota_Bogor_2024" },
    xProp: 'Persen', min: 1, max: 5, palette: ['A52A2A', 'FFFFFF', '90EE90', '008000', '006400'],
    classes: { ID: ['< 20%', '20% - 40%', '40% - 60%', '74% - 80%', '> 80%'], EN: ['< 20%', '20% - 40%', '40% - 60%', '74% - 80%', '> 80%'] }
  },
  'Temperature Humidity Index (THI)': {
    en_key: 'Temperature Humidity Index (THI)',
    assets: { '2004': "projects/ee-rdhgstwnn18/assets/Thi_Kota_Bogor_2004", '2014': "projects/ee-rdhgstwnn18/assets/Thi_Kota_Bogor_2014", '2024': "projects/ee-rdhgstwnn18/assets/Thi_Kota_Bogor_2024" },
    xProp: 'THI', min: 1, max: 4, palette: ['030FFC', '03FC0B', 'FCF003', 'FC0303'],
    classes: { ID: ['Tdk Nyaman (Sejuk)', 'Nyaman', 'Cukup Nyaman', 'Tdk Nyaman (Panas)'], EN: ['Uncomfortable (Cold)', 'Comfortable', 'Moderately Comfortable', 'Uncomfortable (Hot)'] }
  },
  'Normalized Difference Vegetation Index (NDVI)': {
    en_key: 'Normalized Difference Veg. Index (NDVI)',
    assets: { '2004': "projects/ee-rdhgstwnn18/assets/Ndvi_Kota_Bogor_2004", '2014': "projects/ee-rdhgstwnn18/assets/Ndvi_Kota_Bogor_2014", '2024': "projects/ee-rdhgstwnn18/assets/Ndvi_Kota_Bogor_2024" },
    xProp: 'NDVI', min: 1, max: 3, palette: ['FFFFFF', '90EE90', '008000'],
    classes: { ID: ['Vegetasi Jarang', 'Vegetasi Sedang', 'Vegetasi Lebat'], EN: ['Sparse Vegetation', 'Moderate Vegetation', 'Dense Vegetation'] }
  }
};

// ======================================================================
// UI HELPER FUNCTIONS
// ======================================================================
function T(id, type, w) { langElems.push({id: id, type: type, w: w}); return w; }
function lblD(id, sz, col, bold, align, xtraStyle) { 
  var s = { fontSize: sz || '11px', color: col || '#000000', margin: '3px 0', fontWeight: bold ? 'bold' : 'normal', textAlign: align || 'left', backgroundColor: '00000000' };
  if(xtraStyle) { for(var k in xtraStyle) s[k] = xtraStyle[k]; }
  return T(id, 'label', ui.Label(TXT[LANG][id] || id, s)); 
}
function lblRaw(text, sz, col, bold, align, xtraStyle) { 
  var s = { fontSize: sz || '11px', color: col || '#000000', margin: '3px 0', fontWeight: bold ? 'bold' : 'normal', textAlign: align || 'left', backgroundColor: '00000000' };
  if(xtraStyle) { for(var k in xtraStyle) s[k] = xtraStyle[k]; }
  return ui.Label(text, s); 
}
function sep() { return ui.Label('', { backgroundColor:'#dddddd', height:'1px', margin:'8px 0', stretch:'horizontal', padding:'0' }); }
function selBox(items, val) { return ui.Select({ items:items, value:val, style:{stretch:'horizontal', fontSize:'11px', margin:'2px 0'} }); }

// ======================================================================
// LAYOUT SETUP (ABSOLUTE FLOATING APP)
// ======================================================================
var mainMap = ui.root.widgets().get(0);
ui.root.clear();
ui.root.add(mainMap);

// PENGHAPUSAN TOMBOL DRAWING & TOOLS BAWAAN MAPS
mainMap.setControlVisibility({
  all: false,
  layerList: false,
  zoomControl: true,
  scaleControl: true,
  mapTypeControl: true,
  fullscreenControl: true,
  drawingToolsControl: false // Menghapus ikon tangan, poligon, dll
});
mainMap.style().set({ cursor:'crosshair' });
mainMap.setOptions('HYBRID');
mainMap.setCenter(106.7955, -6.5950, 12);

var empty = ee.Image().byte();


var panelStyle = { position: 'top-left', width: '310px', maxHeight: '75%', padding: '12px', backgroundColor: 'rgba(255,255,255,0.96)', border: '1px solid #999', shown: true };
var leftPanel = ui.Panel({ layout: ui.Panel.Layout.flow('vertical'), style: panelStyle });

var panelStyleRight = { position: 'top-right', width: '320px', maxHeight: '75%', padding: '12px', backgroundColor: 'rgba(255,255,255,0.96)', border: '1px solid #999', shown: false };
var rightPanel = ui.Panel({ layout: ui.Panel.Layout.flow('vertical'), style: panelStyleRight });

var btnToggleLeft = T('btnMenu', 'button', ui.Button({ label: TXT[LANG].btnMenu, style: { margin: '0', fontSize: '11px', fontWeight: 'bold' }, onClick: function() { var s = leftPanel.style().get('shown'); leftPanel.style().set('shown', !s); if (!s) rightPanel.style().set('shown', false); }}));
var leftControl = ui.Panel({ widgets: [btnToggleLeft], style: { position: 'top-left', padding: '0', backgroundColor: '00000000' } });

var btnToggleRight = T('btnDash', 'button', ui.Button({ label: TXT[LANG].btnDash, style: { margin: '0', fontSize: '11px', fontWeight: 'bold' }, onClick: function() { var s = rightPanel.style().get('shown'); rightPanel.style().set('shown', !s); if (!s) leftPanel.style().set('shown', false); }}));
var rightControl = ui.Panel({ widgets: [btnToggleRight], style: { position: 'top-right', padding: '0', backgroundColor: '00000000' } });

var btnCloseLeft = T('btnClose', 'button', ui.Button({ label: TXT[LANG].btnClose, style: { stretch: 'horizontal', color: '#cc0000', margin: '0 0 6px 0', fontSize:'11px' }, onClick: function() { leftPanel.style().set('shown', false); } }));
var btnCloseRight = T('btnClose', 'button', ui.Button({ label: TXT[LANG].btnClose, style: { stretch: 'horizontal', color: '#cc0000', margin: '0 0 6px 0', fontSize:'11px' }, onClick: function() { rightPanel.style().set('shown', false); } }));

// ======================================================================
// TRANSLATION ENGINE & UI BILINGUAL (Panel Kiri Atas Saja)
// ======================================================================
var btnLangEN = ui.Button({label: 'EN', style: {margin: '0 2px', padding: '0', fontSize:'10px', color: '#000'}, onClick: function(){ switchLang('EN'); }});
var btnLangID = ui.Button({label: 'ID', style: {margin: '0 2px', padding: '0', fontSize:'10px', color: '#000', fontWeight: 'bold'}, onClick: function(){ switchLang('ID'); }});
var langPanel = ui.Panel([lblRaw('Language / Bahasa:', '11px', '#666', true), btnLangEN, btnLangID], ui.Panel.Layout.flow('horizontal'), {margin: '0 0 8px 0', backgroundColor: '00000000'});

leftPanel.add(langPanel); 
leftPanel.add(btnCloseLeft);
rightPanel.add(btnCloseRight);

// ======================================================================
// MODAL PANEL (INFO LATAR BELAKANG) - POSISI TENGAH (CENTER)
// ======================================================================
var infoModal = ui.Panel({ layout: ui.Panel.Layout.flow('vertical'), style: { position: 'bottom-center', width: '350px', maxHeight: '90%', padding: '18px', backgroundColor: 'rgba(255,255,255,0.98)', border: '2px solid #121481', shown: false }});
var btnCloseInfo = T('btnClose', 'button', ui.Button({ label: TXT[LANG].btnClose, style: { stretch: 'horizontal', color: '#cc0000', fontSize:'11px', margin: '0 0 10px 0' }, onClick: function() { infoModal.style().set('shown', false); } }));

infoModal.add(btnCloseInfo);
infoModal.add(lblD('modalTitle', '12px', '#121481', true, 'center'));
infoModal.add(sep());
infoModal.add(lblD('modP1', '11px', '#333', false, 'justify'));
infoModal.add(lblD('modP2', '11px', '#333', false, 'justify'));
infoModal.add(lblD('modP3', '11px', '#333', false, 'justify'));

// Formulasi Algoritma
infoModal.add(lblD('modFormTitle', '11px', '#000', true, 'left', {margin: '6px 0 2px 0'}));
infoModal.add(lblD('modForm1', '10px', '#444', false, 'left', {fontFamily: 'monospace'}));
infoModal.add(lblD('modForm2', '10px', '#444', false, 'left', {fontFamily: 'monospace'}));
infoModal.add(lblD('modForm3', '10px', '#444', false, 'left', {fontFamily: 'monospace'}));
infoModal.add(lblD('modForm4', '10px', '#444', false, 'left', {fontFamily: 'monospace'}));
infoModal.add(lblD('modForm5', '10px', '#444', false, 'left', {fontFamily: 'monospace'}));

infoModal.add(lblD('modP4', '11px', '#333', false, 'justify'));

// Link Jurnal Clickable
var sourceLink = ui.Label(TXT[LANG].modSource, { fontSize: '11px', color: '#0055ff', fontWeight: 'bold', margin: '8px 0', textDecoration: 'underline'}, 'https://jpips.fkip.unila.ac.id/index.php/jpg/article/view/21');
langElems.push({id: 'modSource', type: 'label', w: sourceLink});
infoModal.add(sourceLink);

infoModal.add(sep());
infoModal.add(lblD('modFooter1', '10px', '#000', true, 'center'));
infoModal.add(lblD('modFooter2', '10px', '#000', false, 'center'));

mainMap.add(leftControl);
mainMap.add(leftPanel);
mainMap.add(rightControl);
mainMap.add(rightPanel);
mainMap.add(infoModal); 

// ======================================================================
// KONTEN LEFT PANEL (MENU KONTROL)
// ======================================================================
leftPanel.add(lblD('appTitle', '14px', '#121481', true, 'center'));

var btnShowInfo = T('btnInfo', 'button', ui.Button({ 
  label: TXT[LANG].btnInfo, 
  style: { stretch: 'horizontal', margin: '4px 0', fontSize: '11px', color: '#121481', fontWeight: 'bold' },
  onClick: function() {
    leftPanel.style().set('shown', false);  
    rightPanel.style().set('shown', false); 
    infoModal.style().set('shown', true);   
  }
}));
leftPanel.add(btnShowInfo);
leftPanel.add(sep());

leftPanel.add(lblD('step1', '11px', '#000', true));
var selYear = selBox(['2004', '2014', '2024'], '2024');
leftPanel.add(selYear);

leftPanel.add(lblD('step2', '11px', '#000', true));
var paramKeysID = Object.keys(DATA_DICT);
var paramKeysEN = paramKeysID.map(function(k) { return DATA_DICT[k].en_key; });
var selParam = selBox(paramKeysID, paramKeysID[0]); // Default awal otomatis terisi
leftPanel.add(selParam);

leftPanel.add(sep());
var btnRender = T('btnRun', 'button', ui.Button({ label: TXT[LANG].btnRun, style: { stretch: 'horizontal', fontWeight: 'bold', backgroundColor: '#0055ff', color: '#000' }, onClick: runDashboard }));
leftPanel.add(btnRender);
leftPanel.add(lblD('hintRun', '9px', '#666', false));

// ======================================================================
// KONTEN RIGHT PANEL (DASHBOARD & LEGENDA)
// ======================================================================
var dashTitle = lblD('dashTitle', '13px', '#121481', true, 'center');
rightPanel.add(dashTitle);
rightPanel.add(sep());

var lblLegendW = lblD('lblLegend', '11px', '#000', true);
var legendContainer = ui.Panel({ layout: ui.Panel.Layout.flow('vertical'), style: { margin:'0', backgroundColor:'00000000' } });
rightPanel.add(lblLegendW);
rightPanel.add(legendContainer);
rightPanel.add(sep());

var chartContainer = ui.Panel({ layout: ui.Panel.Layout.flow('vertical'), style: { margin:'0', backgroundColor:'00000000' } });
rightPanel.add(chartContainer);

// ======================================================================
// FUNGSI TRANSLASI BILINGUAL
// ======================================================================
function switchLang(l) {
  LANG = l;
  btnLangEN.style().set('fontWeight', l === 'EN' ? 'bold' : 'normal');
  btnLangID.style().set('fontWeight', l === 'ID' ? 'bold' : 'normal');
  
  langElems.forEach(function(e) {
    var text = TXT[LANG][e.id]; if (!text) return;
    if (e.type === 'label') { e.w.setValue(text); } 
    else if (e.type === 'button') { e.w.setLabel(text); } 
  });

  var currentValIdx = l === 'EN' ? paramKeysID.indexOf(selParam.getValue()) : paramKeysEN.indexOf(selParam.getValue());
  if(currentValIdx === -1) currentValIdx = 0; 
  selParam.items().reset(l === 'EN' ? paramKeysEN : paramKeysID);
  selParam.setValue(l === 'EN' ? paramKeysEN[currentValIdx] : paramKeysID[currentValIdx]);
}

// ======================================================================
// FUNGSI UTAMA (RUN DASHBOARD)
// ======================================================================
function roundFeatureCollection(fc) {
  return fc.map(function(f) {
    var luas = ee.Number(f.get('Luas_Ha'));
    var rounded = ee.Algorithms.If(luas.gte(100), luas.round(), luas.multiply(1000).round().divide(1000));
    return f.set('Luas_Ha', rounded);
  });
}

function runDashboard() {
  var year = selYear.getValue();
  var selectedKey = selParam.getValue();
  
  var paramKey = paramKeysID.indexOf(selectedKey) !== -1 ? selectedKey : paramKeysID[paramKeysEN.indexOf(selectedKey)];
  var config = DATA_DICT[paramKey];
  var displayName = LANG === 'EN' ? config.en_key : paramKey;
  
  dashTitle.setValue('ANALYSIS ' + year + ' | ' + displayName.toUpperCase());
  legendContainer.clear();
  chartContainer.clear();
  chartContainer.add(lblRaw('⏳ ' + TXT[LANG].chartLoading, '11px', '#666', false));

  // 1. Render Peta
  var assetId = config.assets[year];
  var fc = ee.FeatureCollection(assetId);
  var img = fc.reduceToImage({ properties: ['gridcode'], reducer: ee.Reducer.first() }).clip(ROI);
  var vis = { min: config.min, max: config.max, palette: config.palette };
  
  mainMap.layers().reset();
  mainMap.addLayer(img, vis, displayName + ' ' + year);
  
  // 2. Render Legenda
  var activeClasses = config.classes[LANG];
  for (var i = 0; i < activeClasses.length; i++) {
    var colorBox = ui.Label({ style: { backgroundColor: '#' + config.palette[i], padding: '8px', margin: '2px 8px 2px 0' } });
    var desc = ui.Label({ value: activeClasses[i], style: { fontSize: '11px', margin: '2px 0' } });
    legendContainer.add(ui.Panel([colorBox, desc], ui.Panel.Layout.flow('horizontal'), {backgroundColor:'00000000', margin:'2px 0'}));
  }

  // 3. Render Bar Chart
  var roundedFC = roundFeatureCollection(fc);
  var barChart = ui.Chart.feature.byFeature({ features: roundedFC, xProperty: config.xProp, yProperties: ['Luas_Ha'] })
    .setChartType('ColumnChart')
    .setOptions({
      title: TXT[LANG].chartTitle + year,
      hAxis: { title: TXT[LANG].hAxisClass, textStyle: { fontSize: 9 } },
      vAxis: { title: TXT[LANG].vAxisHa, textStyle: { fontSize: 10 } },
      colors: ['#0055ff'], legend: { position: 'none' },
      chartArea: {backgroundColor: '#f9f9f9'}
    });
  barChart.style().set({stretch: 'horizontal', height: '220px', margin: '10px 0'});
  
  chartContainer.clear();
  chartContainer.add(barChart);
  
  // 4. Khusus Trend LST/THI/dsb
  if (paramKey !== 'Penggunaan Lahan') {
    chartContainer.add(sep());
    var btnTrend = ui.Button({
      label: TXT[LANG].btnTrend,
      style: { stretch: 'horizontal', fontSize: '11px', color: '#121481', fontWeight: 'bold' },
      onClick: function() { loadTrendChart(paramKey, displayName); }
    });
    chartContainer.add(btnTrend);
    chartContainer.add(lblD('hintTrend', '9px', '#888', false));
  }

  leftPanel.style().set('shown', false);
  rightPanel.style().set('shown', true);
}

// ======================================================================
// LOGIKA KOMPUTASI LANDSAT UNTUK GRAFIK TREN (LAZY LOADING)
// ======================================================================
function processLandsat(collectionId, bands, dateRange, cloudCover, year) {
  var landsat = ee.ImageCollection(collectionId).filterBounds(ROI).filterDate(dateRange[0], dateRange[1]).filter(ee.Filter.lt('CLOUD_COVER', cloudCover)).select(bands);
  var landsat_metadata = landsat.first();
  if (!landsat_metadata) return null;

  var AL = ee.Number(landsat_metadata.get('RADIANCE_ADD_BAND_' + bands[0].slice(1)));
  var ML = ee.Number(landsat_metadata.get('RADIANCE_MULT_BAND_' + bands[0].slice(1)));
  var K1 = ee.Number(landsat_metadata.get('K1_CONSTANT_BAND_' + bands[0].slice(1)));
  var K2 = ee.Number(landsat_metadata.get('K2_CONSTANT_BAND_' + bands[0].slice(1)));

  var landsat_lst = landsat.map(function(image){
    var radiance = image.select(bands[0]).multiply(ML).add(AL);
    return image.expression('((K2 / log((K1 / L) + 1)) - 273.15)', {'L': radiance, 'K1': K1, 'K2': K2}).rename('LST').copyProperties(image, ['system:time_start']);
  });
  var lst_mean = landsat_lst.mean().clip(ROI);

  var landsat_ndvi = landsat.map(function(image) { return image.normalizedDifference([bands[2], bands[1]]).rename('NDVI'); });
  var ndvi_mean = landsat_ndvi.mean().clip(ROI);

  var dem = ee.Image('USGS/SRTMGL1_003').clip(ROI);
  var Ta = lst_mean.expression('2.5701 + (0.9147 * lst) + (-0.0047 * dem)', { 'lst': lst_mean, 'dem': dem }).rename('Ta');
  var RH = lst_mean.expression('112.4677 + (-1.3478 * lst) + (23.1877 * ndvi)', { 'lst': lst_mean, 'ndvi': ndvi_mean }).rename('RH');
  var THI = Ta.expression('Ta - ((0.55 - 0.0055 * RH) * (Ta - 14.5))', { 'Ta': Ta, 'RH': RH }).rename('THI');

  return {
    'Land Surface Temperature (LST)': lst_mean.reduceRegion({reducer: ee.Reducer.mean(), geometry: ROI, scale: 30}).get('LST'),
    'Normalized Difference Vegetation Index (NDVI)': ndvi_mean.reduceRegion({reducer: ee.Reducer.mean(), geometry: ROI, scale: 30}).get('NDVI'),
    'Kelembapan Relatif (RH)': RH.reduceRegion({reducer: ee.Reducer.mean(), geometry: ROI, scale: 30}).get('RH'),
    'Suhu Udara (Ta)': Ta.reduceRegion({reducer: ee.Reducer.mean(), geometry: ROI, scale: 30}).get('Ta'),
    'Temperature Humidity Index (THI)': THI.reduceRegion({reducer: ee.Reducer.mean(), geometry: ROI, scale: 30}).get('THI')
  };
}

function loadTrendChart(paramKey, displayName) {
  var panelIndex = chartContainer.widgets().length() - 2; 
  chartContainer.widgets().set(panelIndex, lblRaw('⏳ Memproses komputasi citra satelit, mohon tunggu...', '11px', '#cc0000', true));

  var data_2004 = processLandsat('LANDSAT/LT05/C02/T1', ['B6', 'B3', 'B4'], ['2004-01-01', '2004-12-31'], 10, '2004');
  var data_2014 = processLandsat('LANDSAT/LC08/C02/T1', ['B10', 'B4', 'B5'], ['2014-01-01', '2014-12-31'], 25, '2014');
  var data_2024 = processLandsat('LANDSAT/LC09/C02/T1', ['B10', 'B4', 'B5'], ['2024-01-01', '2024-12-31'], 10, '2024');

  var chart = ui.Chart.array.values({
    array: ee.Array([data_2004[paramKey], data_2014[paramKey], data_2024[paramKey]]), axis: 0, xLabels: ['2004', '2014', '2024']
  }).setOptions({
    title: TXT[LANG].trendTitle, hAxis: {title: TXT[LANG].hAxisYear}, vAxis: {title: TXT[LANG].vAxisMean},
    colors: ['#FF0000'], lineWidth: 2, pointSize: 5, chartArea: {backgroundColor: '#f9f9f9'}
  });
  chart.style().set({stretch: 'horizontal', height: '180px', margin: '10px 0'});
  
  chartContainer.widgets().set(panelIndex, chart);
}

// Inisialisasi awal ke Bahasa Indonesia
switchLang('EN');