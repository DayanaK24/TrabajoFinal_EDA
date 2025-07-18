class Nodo {
  constructor(valor) {
    this.valor = valor;
    this.izq = null;
    this.der = null;
    this.x = 0;
    this.y = 0;
  }
}

class ArbolBinario {
  constructor() {
    this.raiz = null;
  }

  insertar(valor) {
    this.raiz = this._insertar(this.raiz, valor);
    dibujar();
  }

  _insertar(nodo, valor) {
    if (nodo == null) return new Nodo(valor);
    if (valor < nodo.valor) nodo.izq = this._insertar(nodo.izq, valor);
    else nodo.der = this._insertar(nodo.der, valor);
    return nodo;
  }
}

const arbol = new ArbolBinario();

function insertarNodo() {
  const valor = parseInt(document.getElementById("valor").value);
  if (!isNaN(valor)) {
    arbol.insertar(valor);
    document.getElementById("valor").value = "";
  }
}

function dibujar() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (arbol.raiz) {
    asignarCoordenadas(arbol.raiz, canvas.width / 2, 40, canvas.width / 4);
    dibujarNodo(ctx, arbol.raiz);
  }
}

function asignarCoordenadas(nodo, x, y, dx) {
  nodo.x = x;
  nodo.y = y;
  if (nodo.izq) asignarCoordenadas(nodo.izq, x - dx, y + 60, dx / 2);
  if (nodo.der) asignarCoordenadas(nodo.der, x + dx, y + 60, dx / 2);
}

function dibujarNodo(ctx, nodo) {
  ctx.beginPath();
  ctx.arc(nodo.x, nodo.y, 20, 0, 2 * Math.PI);
  ctx.fillStyle = "#3498db";
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(nodo.valor, nodo.x, nodo.y);

  if (nodo.izq) {
    ctx.beginPath();
    ctx.moveTo(nodo.x, nodo.y);
    ctx.lineTo(nodo.izq.x, nodo.izq.y);
    ctx.stroke();
    dibujarNodo(ctx, nodo.izq);
  }

  if (nodo.der) {
    ctx.beginPath();
    ctx.moveTo(nodo.x, nodo.y);
    ctx.lineTo(nodo.der.x, nodo.der.y);
    ctx.stroke();
    dibujarNodo(ctx, nodo.der);
  }
}
