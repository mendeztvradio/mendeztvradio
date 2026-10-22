/*
 * MÉNDEZ TV RADIO — CONFIGURACIÓN
 * Edita SOLO los valores entre comillas y vuelve a subir este archivo a GitHub.
 * Con Caster.fm GRATIS usa casterPublicToken (token PÚBLICO del panel).
 * La URL directa de audio está reservada para planes de pago.
 * No copies contraseña de emisión ni token PRIVADO a archivos de GitHub.
 */
window.MENDEZ_RADIO_CONFIG = {
  nombre: 'Méndez TV Radio',
  lema: 'La señal que nos conecta',
  ubicacion: 'Méndez · Morona Santiago · Ecuador',
  // COPIA SOLAMENTE EL TOKEN PUBLICO DE CASTER.FM ENTRE ESTAS COMILLAS:
  casterPublicToken: '29c3e09f-d985-4e95-ae89-b10549ab4a51',
  // Opcional: ID del canal desde Caster.fm (puedes dejarlo vacío si solo tienes uno).
  casterChannelId: '',
  // Solo para otro proveedor que entregue URL de audio HTTPS pública:
  streaming: '',
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
