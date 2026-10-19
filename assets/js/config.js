/* DEMO: los productos y el envío son de muestra. Contacto, horarios y tarifas: src/data/gym.json. */
window.STUDI_CONFIG = {
  mode: 'demo',
  whatsapp: '', // Código de país + teléfono, solo dígitos. Ejemplo: 34612345678.
  email: '',
  shipping: 4.90,
  products: [
    {id:'proteina',name:'Proteína whey',category:'nutricion',label:'Nutrición',description:'Envase y composición de muestra. Marca, formato e información nutricional por confirmar.',price:29.90,image:'assets/img/tienda.webp',focus:'protein',stock:8},
    {id:'shaker',name:'Shaker de entrenamiento',category:'accesorios',label:'Accesorios',description:'Botella mezcladora de muestra. Capacidad, material y color definitivos por confirmar.',price:9.90,image:'assets/img/tienda.webp',focus:'shaker',stock:12},
    {id:'camiseta',name:'Camiseta de entrenamiento',category:'accesorios',label:'Merchandising',description:'Producto simple de muestra. Un formato único; talla y material por confirmar.',price:19.90,image:'assets/img/tienda.webp',focus:'shirt',stock:6}
  ]
};
