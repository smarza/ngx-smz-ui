export function handleBase64(result: Blob, filename: string): void {
  const url = window.URL.createObjectURL(result); // <-- work with blob directly
  // create hidden dom element (so it works in all browsers)
  const a = document.createElement('a');
  a.setAttribute('style', 'display:none;');
  document.body.appendChild(a);
  // create file, attach to hidden element and open hidden element
  a.href = url;
  a.download = filename.replace(/"/g, '');
  a.click();
}

export function b64toBlob(b64Data: string, contentType: string = '', sliceSize: number = 512): Blob {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, {type: contentType});
  return blob;
}