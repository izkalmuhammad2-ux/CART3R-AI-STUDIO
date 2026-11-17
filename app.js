const $ = (id) => document.getElementById(id);
const tabs = [...document.querySelectorAll(".tab")];
tabs.forEach(tab => tab.addEventListener("click", () => {
  tabs.forEach(t => t.classList.toggle("active", t === tab));
  document.querySelectorAll(".view").forEach(v => v.classList.add("hidden"));
  $("view-" + tab.dataset.view).classList.remove("hidden");
}));

$("makePrompt").addEventListener("click", () => {
  const description = $("prompt").value.trim();
  if (!description) { alert("Tulis deskripsi gambar terlebih dahulu."); return; }
  const result = `${description}. Gaya: ${$("style").value}. Rasio: ${$("ratio").value}. Detail tinggi, komposisi rapi, pencahayaan seimbang, kualitas profesional.`;
  $("promptResult").textContent = result;
});
$("copyPrompt").addEventListener("click", async () => {
  const value = $("promptResult").textContent;
  try { await navigator.clipboard.writeText(value); alert("Prompt berhasil disalin."); }
  catch { alert("Salin teks prompt secara manual."); }
});

let currentImage = null;
$("photoInput").addEventListener("change", event => {
  const file = event.target.files?.[0];
  if (!file) return;
  if (!file.type.startsWith("image/")) { alert("Pilih file gambar."); return; }
  if (file.size > 12 * 1024 * 1024) { alert("Ukuran maksimal foto adalah 12 MB."); return; }
  if (currentImage) URL.revokeObjectURL(currentImage);
  currentImage = URL.createObjectURL(file);
  $("photoPreview").src = currentImage;
  $("photoPreview").hidden = false;
  $("emptyPreview").hidden = true;
  applyFilters();
});
function applyFilters() {
  const b = $("brightness").value, c = $("contrast").value, s = $("saturation").value;
  $("brightnessValue").textContent = b + "%";
  $("contrastValue").textContent = c + "%";
  $("saturationValue").textContent = s + "%";
  $("photoPreview").style.filter = `brightness(${b}%) contrast(${c}%) saturate(${s}%)`;
}
["brightness","contrast","saturation"].forEach(id => $(id).addEventListener("input", applyFilters));
$("resetFilters").addEventListener("click", () => {
  $("brightness").value = 100; $("contrast").value = 100; $("saturation").value = 100; applyFilters();
});
$("downloadPhoto").addEventListener("click", async () => {
  if (!$("photoPreview").src || $("photoPreview").hidden) { alert("Pilih foto terlebih dahulu."); return; }
  const img = $("photoPreview");
  const canvas = document.createElement("canvas");
  const maxSide = 2400, scale = Math.min(1, maxSide / Math.max(img.naturalWidth, img.naturalHeight));
  canvas.width = Math.round(img.naturalWidth * scale); canvas.height = Math.round(img.naturalHeight * scale);
  const ctx = canvas.getContext("2d");
  ctx.filter = `brightness(${$("brightness").value}%) contrast(${$("contrast").value}%) saturate(${$("saturation").value}%)`;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/jpeg", .92));
  if (!blob) { alert("Gagal membuat gambar."); return; }
  const url = URL.createObjectURL(blob), a = document.createElement("a");
  a.href = url; a.download = "cart3r-edited-photo.jpg"; a.click(); URL.revokeObjectURL(url);
});
$("saveEndpoint").addEventListener("click", () => {
  const value = $("apiEndpoint").value.trim();
  if (value && !/^https:\/\/|^http:\/\/localhost/.test(value)) { alert("Gunakan HTTPS, atau localhost saat pengembangan."); return; }
  localStorage.setItem("cart3r_endpoint", value);
  $("endpointStatus").textContent = value ? "Alamat backend tersimpan di perangkat ini." : "Alamat backend dikosongkan.";
});
$("apiEndpoint").value = localStorage.getItem("cart3r_endpoint") || "";
if ($("apiEndpoint").value) $("endpointStatus").textContent = "Alamat backend tersimpan di perangkat ini.";
