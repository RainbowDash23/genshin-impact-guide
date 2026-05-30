import type { Region } from '../../types/quest';
import { EMBLEMS } from '../../assets/index';

export const mondstadt: Region = {
  id: 'mondstadt', name: 'Mondstadt',
  description: 'La ciudad de la libertad y el viento, protegida por Barbatos.',
  element: 'anemo', color: '#5eead4', accentColor: '#99f6e4',
  emblem: EMBLEMS.mondstadt,
  zones: ['Ciudad de Mondstadt', 'Llanura de Mondstadt', 'Bosque de Wolvendom', 'Monte Dadaupa', 'Isla de Dragonespina'],
  quests: [
    { id: 101, name: 'La lluvia deja espacio al arcoíris', zone: 'Ciudad de Mondstadt', location: 'Herrería de Wagner', requirements: 'Completar Capítulo I: Acto I.', details: 'Wagner te pide minerales especiales de las minas al noroeste. Tras fabricar el objeto, Elzer revela el verdadero propósito de la encomienda.' },
    { id: 102, name: 'El libro de Ella', zone: 'Ciudad de Mondstadt', location: 'Biblioteca de la Iglesia de Favonius', requirements: 'Hablar con Lisa al menos una vez.', details: 'Lisa necesita recuperar libros prestados de 3 aldeanos. Algunos se negarán a devolverlos voluntariamente.' },
    { id: 103, name: 'Secretos de la fortaleza Stormterror', zone: 'Isla de Dragonespina', location: 'Entrada de la fortaleza', requirements: 'Completar "Oda al viento y la libertad".', details: 'Activa 3 pilares de viento en el orden correcto para revelar una entrada secreta y un diario de un antiguo Caballero.' },
    { id: 104, name: 'Una promesa entre veteranos', zone: 'Llanura de Mondstadt', location: 'Puesto exterior de los Caballeros', requirements: 'Nivel de Aventurero 20+.', details: 'El anciano Artur rastrea a su compañero de armas por el bosque Wolvendom. La búsqueda revela secretos del pasado de los Caballeros de Favonius.' },
    { id: 105, name: 'Flores para el Dios del Viento', zone: 'Monte Dadaupa', location: 'Santuario de Barbatos', requirements: 'Ninguno. Solo exploración.', details: 'Recoge 5 ofrendas florales guardadas por guardianes elementales alrededor del Monte Dadaupa y activa el altar central.' },
    { id: 106, name: 'La balada del cazador caído', zone: 'Bosque de Wolvendom', location: 'Cueva al este de Wolvendom', requirements: 'Completar "En el nombre del viento".', details: 'Rastrea las notas de un cazador desaparecido que observó a un lobo de hierro. Descubre la conexión entre la criatura y el Archon Anemo.' },
    { id: 107, name: 'El molino de viento abandonado', zone: 'Llanura de Mondstadt', location: 'Molino al noroeste', requirements: 'Ninguno. Exploración.', details: 'El molino dejó de funcionar. Dentro encontrarás cristales de hielo que bloquean los engranajes y ocultan algo mucho más antiguo.' },
    { id: 108, name: 'El cuaderno de bocetos de Flora', zone: 'Ciudad de Mondstadt', location: 'Tienda de flores de Flora', requirements: 'Hablar con Flora varias veces.', details: 'Flora perdió sus bocetos en los campos cercanos. Uno de ellos es un dibujo especial para su madre enferma que debes recuperar antes de que llueva.' },
    { id: 109, name: 'Los fantasmas de Windrise', zone: 'Llanura de Mondstadt', location: 'Árbol Windrise', requirements: 'Visitar Windrise por primera vez.', details: 'Luces extrañas rodean el árbol sagrado de noche. Son Seelies atrapadas que no pueden regresar a sus pedestales por un sello corrupto.' },
    { id: 110, name: 'Recetas del pasado', zone: 'Ciudad de Mondstadt', location: 'Restaurante Good Hunter', requirements: 'Ninguno.', details: 'Sara quiere recuperar una receta antigua pero los ingredientes ya no se cultivan. Un anciano campesino guarda semillas históricas en su granja abandonada.' },
    { id: 111, name: 'La leyenda del caballero oscuro', zone: 'Isla de Dragonespina', location: 'Ruinas al sur de Dragonespina', requirements: 'Nivel Aventurero 25+.', details: 'Una armadura antigua en las ruinas contiene un espíritu enlazado. Fue un caballero que traicionó a los suyos por amor. Completa su misión pendiente para liberarlo.' },
    { id: 112, name: 'El puente roto de Springvale', zone: 'Llanura de Mondstadt', location: 'Aldea Springvale', requirements: 'Ninguno.', details: 'El puente que conecta Springvale con las granjas del norte está dañado. Los Hilichurls robaron las vigas. Recupéralas y ayuda al carpintero a repararlo.' },
    { id: 113, name: 'El vino perdido de Diluc', zone: 'Ciudad de Mondstadt', location: "Bodega de Angel's Share", requirements: 'Visitar la taberna de noche.', details: 'Un cargamento de Dandelion Wine desapareció en ruta desde Liyue. Investiga la ruta comercial y descubre si fueron Hilichurls o algo más organizado.' },
    { id: 114, name: 'Susurros del viento en la catedral', zone: 'Ciudad de Mondstadt', location: 'Catedral de la Iglesia de Favonius', requirements: 'Completar misión principal de Mondstadt.', details: 'Una novicia escucha voces en la catedral vacía de madrugada. Investiga y descubre que son mensajes cifrados dejados por un infiltrado Fatui hace décadas.' },
  ],
};
