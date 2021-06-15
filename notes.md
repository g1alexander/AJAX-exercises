# Ejercicios de Ajax

### **Notas:** ejercicio 1 - sitio en ajax

- Para poner un container en el sitio no hay necesidad de hacerlo section por section, puedes solo poner una clase y delimitar cualquiera que desees
- me falta estudiar mas css :)
- El profe lo hizo con **XMLHtppRequest**, yo lo hice con **fetch()**
- me puede ahorrar los id de los menu para el **evento click** trayendo todos los menu atraves de su clase y/o propiedad

---

### **Notas:** ejercicio 2 - funcion **"include"** de php con js

- En esta oportunidad segui el tutorial del profe **Jon** ya que hizo una mini libreria muy practica
- Algo que podria adiccionar es remplazar el **XMLHtppRequest** por **fetch()**
- tengo un mini bug en la parte del responsive (menu burger) no me cambia las clases

---

### **Notas:** ejercicio 3 - subir archivos por medio de ajax

- para subir archivos por medio de **ajax** no es necesario poner un **form** con un input basta
- el profe jon volvio a usar el **XMLHttpRequest()** reto: pasar a **fetch**

---

### **Notas:** ejercicio 4 - barra de progreso en subir archivos por medio de ajax

- para hacer una barra de progreso en js lo hacemos atraves de un objecto llamado **fileReader** este recibe un **readAsDataURL** (que es el archivo que subamos al servidor)
- Ademas recibe dos eventos un es **progress** en el cual heremos la iteracion para mostrar la barra de progreso
- el segundo evento es **loadend** el cual lo usamos para subir el archivo al servidor

---

### **Notas:** ejercicio 5 - Drap-drop por medio de ajax

- para hacer un **drap-drop** reutilizamos todo el codigo del ejercio 3 y 4 y luego solo cambiamos el evento de envio a **Ajax** ya no sera un evento de tipo **submit** (en este caso se uso el **change**) sino que utilizamos la Api de js para drap-drop
  ```js
  document.addEventListener("dragover", (e) => {});
  document.addEventListener("dragleave", (e) => {});
  document.addEventListener("drop", (e) => {});
  ```
  - el 1 y 2 evento lo usamos para hacer una mejor intereancion del usuario(ux de usuario)
  - el 3 se cuando alguien lanza de archivo y es en el donde hacemos la funcion de subir el archivo al servidor

---

### **Notas:** ejercicio 6 - Envio de formulario por medio de un api (formsubmit.co)

- Para enviar los datos de un formulario generalmente hago esto:
  ```js
  const res = await fetch("urlll", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: form.nombre.value,
      email: form.correo.value,
      asunto: form.asunto.value,
      message: form.comentarios.value,
    }),
  });
  const json = await res.json();
  ```
  - Todo ese **body** me lo puedo ahorrar poniendo el codigo de abajo y esto ya toma todos los valores que hay en el formulario y los envia, amazing :)
  ```js
  {
    body: new FormData(nombre_formulario);
  }
  ```

---

### **Notas:** ejercicio 7 - Envio de formulario por medio de php 
- para subir datos desde el frontend al backend es muy important configurar los **cors** y las **headers** estas configuraciones hay que hacerlas porque la configuracion por defecto solo permite que se realicen peticones **HTTP** en el servidor en que se encuentre y no desde otros servidores
- **Notas de PHP**
  - se puede enviar HTML al correo 
  - la funcion **mail()** solo se envia si esta en un servidor
  - los **headers** se configuran asi:
  ```php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Content-type: application/json");
  ``` 
  - la funcion **$_SERVER["HTTP_HOST"]** me permite saber el nombre del servidor