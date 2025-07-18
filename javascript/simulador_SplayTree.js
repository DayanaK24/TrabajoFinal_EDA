class NodoSplay {
  constructor(valor) {
    this.valor = valor;
    this.izq = null;
    this.der = null;
    this.x = 0;
    this.y = 0;
  }
}

class ArbolSplay {
  constructor() {
    this.raiz = null;
  }

  insertar(valor) {
    this.raiz = this._insertar(this.raiz, valor);
    this.raiz = this._splay(this.raiz, valor);
    dibujar();
  }

  _insertar(nodo, valor) {
    if (!nodo) return new NodoSplay(valor);
    if (valor < nodo.valor) nodo.izq = this._insertar(nodo.izq, valor);
    else if (valor > nodo.valor) nodo.der = this._insertar(nodo.der, valor);
    return nodo;
  }

  _splay(nodo, valor) {
    if (!nodo || nodo.valor === valor) return nodo;

    if (valor < nodo.valor) {
      if (!nodo.izq) return nodo;

      if (valor < nodo.izq.valor) {
        nodo.izq.izq = this._splay(nodo.izq.izq, valor);
        nodo = this._rotarDerecha(nodo);
      } else if (valor > nodo.izq.valor) {
        nodo.izq.der = this._splay(nodo.izq.der, valor);
        if (nodo.izq.der) nodo.izq = this._rotarIzquierda(nodo.izq);
      }

      return nodo.izq ? this._rotarDerecha(nodo) : nodo;
    } else {
      if (!nodo.der) return nodo;

      if (valor > nodo.der.valor) {
        nodo.der.der = this._splay(nodo.der.der, valor);
        nodo = this._rotarIzquierda(nodo);
      } else if (valor < nodo.der.valor) {
        nodo.der.izq = this._splay(nodo.der.izq, valor);
        if (nodo.der.izq) nodo.der = this._rotarDerecha(nodo.der);
      }

      return nodo.der ? this._rotarIzquierda(nodo) : nodo;
    }
  }

  _rotarDerecha(y) {
    const x = y.izq;
    y.izq = x.der;
    x.der = y;
    return x;
  }

  _rotarIzquierda(x) {
    const y = x.der;
    x.der = y.izq;
    y.izq = x;
    return y;
  }
}

const arbolSplay = new ArbolSplay();

function insertarSplay() {
  const valor = parseInt(document.getElementById("valor").value);
  if (!isNaN(valor)) {
    arbolSplay.insertar(valor);
    document.getElementById("valor").value = "";
  }
}

function dibujar() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (arbolSplay.raiz) {
    asignarCoordenadas(arbolSplay.raiz, canvas.width / 2, 40, canvas.width / 4);
    dibujarNodo(ctx, arbolSplay.raiz);
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
  ctx.fillStyle = "#e67e22";  // naranja
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
