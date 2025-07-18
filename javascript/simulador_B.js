class NodoB {
  constructor() {
    this.claves = [];
    this.hijos = [];
    this.esHoja = true;
    this.x = 0;
    this.y = 0;
  }

  insertarEnNodo(valor) {
    let i = 0;
    while (i < this.claves.length && valor > this.claves[i]) i++;
    this.claves.splice(i, 0, valor);
  }
}

class ArbolB {
  constructor(orden = 3) {
    this.raiz = new NodoB();
    this.orden = orden;
  }

  insertar(valor) {
    let raiz = this.raiz;
    if (raiz.claves.length === this.orden - 1) {
      let nuevaRaiz = new NodoB();
      nuevaRaiz.esHoja = false;
      nuevaRaiz.hijos.push(raiz);
      this.dividirHijo(nuevaRaiz, 0);
      this.insertarNoLleno(nuevaRaiz, valor);
      this.raiz = nuevaRaiz;
    } else {
      this.insertarNoLleno(raiz, valor);
    }
    dibujar();
  }

  dividirHijo(padre, i) {
    let y = padre.hijos[i];
    let z = new NodoB();
    z.esHoja = y.esHoja;

    let mid = Math.floor((this.orden - 1) / 2);
    let claveMediana = y.claves[mid];

    z.claves = y.claves.splice(mid + 1);
    let clavesMedianas = y.claves.splice(mid);

    if (!y.esHoja) {
      z.hijos = y.hijos.splice(mid + 1);
    }

    padre.claves.splice(i, 0, claveMediana);
    padre.hijos.splice(i + 1, 0, z);
  }

  insertarNoLleno(nodo, valor) {
    let i = nodo.claves.length - 1;

    if (nodo.esHoja) {
      nodo.insertarEnNodo(valor);
    } else {
      while (i >= 0 && valor < nodo.claves[i]) i--;
      i++;
      if (nodo.hijos[i].claves.length === this.orden - 1) {
        this.dividirHijo(nodo, i);
        if (valor > nodo.claves[i]) i++;
      }
      this.insertarNoLleno(nodo.hijos[i], valor);
    }
  }
}

const arbolB = new ArbolB();

function insertarB() {
  const valor = parseInt(document.getElementById("valor").value);
  if (!isNaN(valor)) {
    arbolB.insertar(valor);
    document.getElementById("valor").value = "";
  }
}

function dibujar() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (arbolB.raiz) {
    asignarCoordenadas(arbolB.raiz, canvas.width / 2, 40, canvas.width / 4);
    dibujarNodo(ctx, arbolB.raiz);
  }
}

function asignarCoordenadas(nodo, x, y, dx) {
  nodo.x = x;
  nodo.y = y;
  let hijos = nodo.hijos.length;
  for (let i = 0; i < hijos; i++) {
    asignarCoordenadas(nodo.hijos[i], x - dx + (2 * dx * i) / (hijos - 1 || 1), y + 80, dx / 1.5);
  }
}

function dibujarNodo(ctx, nodo) {
  const espaciado = 30;
  let anchoTotal = nodo.claves.length * espaciado;

  ctx.beginPath();
  ctx.rect(nodo.x - anchoTotal / 2, nodo.y - 20, anchoTotal, 40);
  ctx.fillStyle = "#2980b9";
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (let i = 0; i < nodo.claves.length; i++) {
    ctx.fillText(nodo.claves[i], nodo.x - anchoTotal / 2 + espaciado / 2 + i * espaciado, nodo.y);
  }

  for (let hijo of nodo.hijos) {
    ctx.beginPath();
    ctx.moveTo(nodo.x, nodo.y + 20);
    ctx.lineTo(hijo.x, hijo.y - 20);
    ctx.stroke();
    dibujarNodo(ctx, hijo);
  }
}
