const d = document;

export default function upload(files, input) {
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

  const progressUpload = (file) => {
    const $progress = d.createElement("progress"),
      $p = d.createElement("p"),
      $div = d.getElementById("progress");

    $progress.value = 0;
    $progress.max = 100;
    $progress.classList.add("progress");

    $div.appendChild($progress);
    $div.appendChild($p);

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.addEventListener("progress", (e) => {
      let progress = parseInt((e.loaded * 100) / e.total);
      $progress.value = progress;
      $p.innerHTML = `tu archivo ${file.name} -- ${progress}%`;
    });
    fileReader.addEventListener("loadend", (e) => {
      uploader(file);
      setTimeout(() => {
        $div.removeChild($progress);
        $div.removeChild($p);
        input.value = "";
      }, 3000);
    });
  };

  files.forEach((el) => progressUpload(el));
}
