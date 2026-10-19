/* S1 compacto → giro → apertura del mismo logotipo. Sin partículas ni capas fantasma. */
(() => {
  'use strict';
  const data = window.STUDI1_LOGO_DATA;
  if (!data || !data.regions) return;
  const { width: W, height: H, regions } = data;
  const clamp = value => Math.max(0, Math.min(1, value));
  const ease = value => { const x = clamp(value); return x*x*x*(x*(x*6-15)+10); };
  const lerp = (a, b, t) => a+(b-a)*t;

  function piece(ctx, image, polygon, sx, sy, x, y, alpha = 1) {
    if (alpha <= 0 || sx <= 0 || sy <= 0) return;
    ctx.save();
    ctx.globalAlpha *= alpha;
    ctx.translate(x, y);
    ctx.scale(sx, sy);
    ctx.beginPath();
    polygon.forEach(([px, py], i) => {
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(image, 0, 0, W, H);
    ctx.restore();
  }

  function draw(ctx, milliseconds, image) {
    if (!image) return;
    const t = Math.max(0, milliseconds/1000);
    ctx.clearRect(0, 0, W, H);
    // El final usa exactamente la imagen completa: ninguna capa queda encima.
    if (t >= 3.4) { ctx.drawImage(image, 0, 0, W, H); return; }

    const opening = ease((t-2.05)/.8);
    const secondary = ease((t-2.85)/.55);
    const scale = lerp(.64, 1, opening);
    const left = lerp(data.monogram.left, 0, opening);
    const right = lerp(data.monogram.right, 0, opening);
    const top = lerp(data.monogram.top, 0, opening);
    // Cuatro vueltas; la velocidad y la aceleración llegan suavemente a cero.
    const rotation = 8*Math.PI*ease((t-.2)/1.45);
    const entrance = lerp(.72, 1, ease(t/.35));
    ctx.save();
    ctx.globalAlpha = ease(t/.12);
    ctx.translate(W/2, H/2);
    ctx.rotate(rotation);
    ctx.scale(entrance, entrance);
    ctx.translate(-W/2, -H/2);

    // La S y el 1 son los del PNG oficial. El centro se abre entre ellos;
    // cada región tiene una máscara complementaria y conserva su textura.
    piece(ctx, image, regions.s, scale, scale, left, top);
    piece(ctx, image, regions.one, scale, scale, right, top);
    if (opening > 0) {
      const edgeLeft = left + data.seams.left*scale;
      const edgeRight = right + data.seams.right*scale;
      const middleScale = (edgeRight-edgeLeft)/(data.seams.right-data.seams.left);
      piece(ctx, image, regions.middle, middleScale, scale,
        edgeLeft-data.seams.left*middleScale, top, ease((t-2.05)/.15));
    }
    piece(ctx, image, regions.secondary, 1, 1, 0, 0, secondary);
    ctx.restore();
  }

  window.STUDI1_LOGO_MORPH = {
    width: W, height: H,
    naturalWidth: data.naturalWidth, naturalHeight: data.naturalHeight, draw
  };
})();
