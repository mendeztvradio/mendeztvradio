/*
 * MÉNDEZ TV RADIO — CONFIGURACIÓN
 * Edita SOLO los valores entre comillas y vuelve a subir este archivo a GitHub.
 * El enlace de streaming debe ser una URL de AUDIO directa y HTTPS (.mp3, /stream, etc.).
 * NO uses la URL de inicio de sesión de Caster.fm ni tu contraseña.
 */
window.MENDEZ_RADIO_CONFIG = {
  nombre: 'Méndez TV Radio',
  lema: 'La señal que nos conecta',
  ubicacion: 'Méndez · Morona Santiago · Ecuador',
  streaming: '', // EJEMPLO DE FORMATO (NO REAL): 'https://tu-servidor.example.com/stream'
  whatsapp: '593961180749', // WhatsApp conocido para información sobre auspicios; cámbialo si deseas.
  facebook: '', // URL completa de la página de Facebook de Méndez TV.
  instagram: '',
  youtube: '', // URL completa del canal de YouTube.
  correo: '',
  tituloEnVivo: 'Radio online · En directo',
  descripcion: 'Música, entrevistas, información y los mejores programas desde Morona Santiago.',
  programas: [
    { tipo: 'ENTREVISTAS', titulo: 'Guarapo y Chicha', detalle: 'Conversaciones con nuestros protagonistas.' },
    { tipo: 'ACTUALIDAD', titulo: 'Méndez TV Informa', detalle: 'Noticias y novedades de nuestra región.' },
    { tipo: 'MÚSICA', titulo: 'Nuestra programación musical', detalle: 'Los sonidos que nos acompañan.' }
  ]
};
