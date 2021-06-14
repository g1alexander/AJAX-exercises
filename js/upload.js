export default function upload(files) {
  const uploader = (file) => {
    const xhr = new XMLHttpRequest(),
      formData = new FormData();

    formData.append("file", file);

    xhr.addEventListener("readystatechange", (e) => {
      if (xhr.readyState !== 4) return;
      if (xhr.status >= 200 && xhr.status < 300) {
        const json = JSON.parse(xhr.responseText);
        console.log(json);
      } else {
        let error = xhr.statusText || "error f";
        console.error(`Ha ocurrido un error ${xhr.status}: ${error}`);
      }
    });

    xhr.open("POST", "./php/upload.php");
    xhr.setRequestHeader("enc-type", "multipart/form-data");
    xhr.send(formData);
  };

  files.forEach((el) => uploader(el));
}
