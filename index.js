// device info + timestamp
function generateUUID() {
  const storedUUID = localStorage.getItem("persistentUUID");
  if (storedUUID) {
    return storedUUID;
  }

  const userAgent = navigator.userAgent;
  const screenResolution = `${screen.width}x${screen.height}`;
  const language = navigator.language;
  const combined = userAgent + screenResolution + language;

  const timestamp = Date.now();
  let uuid = userAgent + screenResolution + language + timestamp;
  console.log(1);
  // console.log(uuid, timestamp);
  uuid += timestamp;
  console.log(uuid);
  var hexHash = CryptoJS.SHA1(uuid).toString(CryptoJS.enc.Hex);
  console.log(hexHash);
  localStorage.setItem("persistentUUID", hexHash);
  return hexHash;
}

//
const fingerprintjsFun = async () => {
  try {
    const FingerprintJS = await import(
      "https://openfpcdn.io/fingerprintjs/v4"
    );

    const fp = await FingerprintJS.load();
    const result = await fp.get();

    const visitorId = result.visitorId;
    console.log(visitorId);

    return visitorId;
  } catch (error) {
    console.error("Error generating visitor ID:", error);
    return null;
  }
};

document.getElementById("generate-btn").addEventListener("click", async  () => {
  const uuid = generateUUID();
  const visitorId = await fingerprintjsFun();

  document.getElementById(
    "output"
  ).innerHTML = `Fingerprint ID: ${visitorId} <br><br>`; 
  document.getElementById("output").innerHTML += `UUID: ${uuid} `;
  console.log(1, visitorId);

});