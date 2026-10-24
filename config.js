/*
 * MÉNDEZ TV RADIO — CONFIGURACIÓN
 * Edita SOLO los valores entre comillas y vuelve a subir este archivo a GitHub.
 * Versión SonicPanel: señal HTTPS pública con reproductor HTML5 personalizado.
 * Jamás coloques contraseñas de emisión o panel en estos archivos públicos.
 */
window.MENDEZ_RADIO_CONFIG = {
  nombre: 'Méndez TV Radio',
  lema: 'La señal que nos conecta',
  ubicacion: 'Méndez · Morona Santiago · Ecuador',
  // URL PÚBLICA DIRECTA DE REPRODUCCIÓN SONICPANEL (NO DE EMISIÓN):
  streaming: 'https://radiostreaming.pro/8462/stream',
  whatsapp: '593961180749', // WhatsApp conocido para información sobre auspicios; cámbialo si deseas.
  facebook: '', // URL completa de la página de Facebook de Méndez TV.
  instagram: '',
  youtube: '', // URL completa del canal de YouTube.
  correo: '',
  tituloEnVivo: 'Méndez TV Radio · En vivo',
  descripcion: 'Música, entrevistas, información y los mejores programas desde Morona Santiago.',
  programas: [
    { tipo: 'ENTREVISTAS', titulo: 'Guarapo y Chicha', detalle: 'Conversaciones con nuestros protagonistas.' },
    { tipo: 'ACTUALIDAD', titulo: 'Méndez TV Informa', detalle: 'Noticias y novedades de nuestra región.' },
    { tipo: 'MÚSICA', titulo: 'Nuestra programación musical', detalle: 'Los sonidos que nos acompañan.' }
  ]
};
