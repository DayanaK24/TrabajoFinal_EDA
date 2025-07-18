class NodoAVL {
  constructor(valor) {
    this.valor = valor;
    this.altura = 1;
    this.izq = null;
    this.der = null;
    this.x = 0;
    this.y = 0;
  }
}

class ArbolAVL {
  constructor() {
    this.raiz = null;
  }

  insertar(valor) {
    this.raiz = this._insertar(this.raiz, valor);
    dibujar();
  }

  altura(nodo) {
    return nodo ? nodo.altura : 0;
  }

  balance(nodo) {
    return nodo ? this.altura(nodo.izq) - this.altura(nodo.der) : 0;
  }

  rotacionDerecha(y) {
    let x = y.izq;
    let T2 = x.der;
    x.der = y;
    y.izq = T2;
    y.altura = Math.max(this.altura(y.izq), this.altura(y.der)) + 1;
    x.altura = Math.max(this.altura(x.izq), this.altura(x.der)) + 1;
    return x;
  }

  rotacionIzquierda(x) {
    let y = x.der;
    let T2 = y.izq;
    y.izq = x;
    x.der = T2;
    x.altura = Math.max(this.altura(x.izq), this.altura(x.der)) + 1;
    y.altura = Math.max(this.altura(y.izq), this.altura(y.der)) + 1;
    return y;
  }

  _insertar(nodo, valor) {
    if (!nodo) return new NodoAVL(valor);

    if (valor < nodo.valor) nodo.izq = this._insertar(nodo.izq, valor);
    else if (valor > nodo.valor) nodo.der = this._insertar(nodo.der, valor);
    else return nodo;

    nodo.altura = 1 + Math.max(this.altura(nodo.izq), this.altura(nodo.der));
    let balance = this.balance(nodo);

    if (balance > 1 && valor < nodo.izq.valor)
      return this.rotacionDerecha(nodo);
    if (balance < -1 && valor > nodo.der.valor)
      return this.rotacionIzquierda(nodo);
    if (balance > 1 && valor > nodo.izq.valor) {
      nodo.izq = this.rotacionIzquierda(nodo.izq);
      return this.rotacionDerecha(nodo);
    }
    if (balance < -1 && valor < nodo.der.valor) {
      nodo.der = this.rotacionDerecha(nodo.der);
      return this.rotacionIzquierda(nodo);
    }

    return nodo;
  }
}

const arbolAVL = new ArbolAVL();

function insertarAVL() {
  const valor = parseInt(document.getElementById("valor").value);
  if (!isNaN(valor)) {
    arbolAVL.insertar(valor);
    document.getElementById("valor").value = "";
  }
}

function dibujar() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (arbolAVL.raiz) {
    asignarCoordenadas(arbolAVL.raiz, canvas.width / 2, 40, canvas.width / 4);
    dibujarNodo(ctx, arbolAVL.raiz);
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
  ctx.fillStyle = "#6a1b9a";
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "white";
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
