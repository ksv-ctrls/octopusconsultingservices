export async function preloadFrames(frameCount, pathFn, onProgress) {
  const frames = Array.from({ length: frameCount }, (_, i) => i + 1);
  let loadedCount = 0;

  const promises = frames.map((index) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = pathFn(index);

      img.onload = async () => {
        try {
          await img.decode();
        } catch (e) {
          console.error("Decode error for frame", index, e);
        }
        loadedCount++;
        if (onProgress) onProgress(Math.floor((loadedCount / frameCount) * 100));
        resolve(img);
      };

      img.onerror = () => {
        console.error("Missing frame", img.src);
        loadedCount++;
        if (onProgress) onProgress(Math.floor((loadedCount / frameCount) * 100));
        resolve(img); // resolve gracefully
      };
    });
  });

  return Promise.all(promises);
}
