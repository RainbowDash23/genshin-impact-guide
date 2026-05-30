import type { Region } from '../../types/quest';
import { EMBLEMS } from '../../assets/index';

export const natlan: Region = {
  id: 'natlan', name: 'Natlan',
  description: 'La tierra de la guerra y el fuego, bajo la protección del Archon Pyro.',
  element: 'pyro', color: '#f97316', accentColor: '#fed7aa',
  emblem: EMBLEMS.natlan,
  zones: ['Children of Echoes', 'Scions of the Canopy', 'Collective of Plenty', 'Nightsoul Basin', 'Abyss of Shrinking Flame'],
  quests: [
    { id: 601, name: 'Los ecos de los ancestros', zone: 'Children of Echoes', location: 'Caverna de los Ancestros', requirements: 'Completar la misión de iniciación en Natlan.', details: 'Los ancianos del clan piden recuperar los tambores rituales robados por Abyss Heralds. Sigue las huellas de fuego por la jungla volcánica hasta el centinela del Abismo.' },
    { id: 602, name: 'Jinetes del Saurio', zone: 'Scions of the Canopy', location: 'Pradera de los Saurios', requirements: 'Completar la misión de los Saurios.', details: 'Tu Saurio compañero está enfermo. El remedio requiere una llama que solo arde en el corazón del volcán activo. Busca al chamán de los animales en las alturas.' },
    { id: 603, name: 'La canción del fuego sagrado', zone: 'Nightsoul Basin', location: 'Cuenca del Alma de la Noche', requirements: 'Completar el arco del Alma de la Noche.', details: 'La fuente del Alma de la Noche está siendo corrompida. Purifica los 5 manantiales de fuego corrupto con el poder Nightsoul antes de que la infección llegue al núcleo.' },
    { id: 604, name: 'Herrero de volcanes', zone: 'Collective of Plenty', location: 'Forja volcánica del Collective', requirements: 'Ninguno.', details: 'Ixchel necesita metal volcánico del nivel más profundo. Desciende por los túneles de magma con el escudo de fuego y recoge las menas antes de la próxima erupción.' },
    { id: 605, name: 'El último guardián', zone: 'Abyss of Shrinking Flame', location: 'Abismo de las Llamas Menguantes', requirements: 'Nivel Aventurero 50+.', details: 'Un guardián pyro lleva siglos solo combatiendo el Abismo. Ayúdalo a completar su misión final y dale el descanso que merece rescatando el artefacto que protege.' },
    { id: 606, name: 'El nido del Saurio rojo', zone: 'Scions of the Canopy', location: 'Cañón al norte de la Pradera', requirements: 'Completar Jinetes del Saurio.', details: 'Un Saurio rojo de especie rara anidó en el cañón. Los cazadores quieren capturarlo. Usa el lenguaje de fuego para ganarte su confianza y protegerlo antes de que lleguen.' },
    { id: 607, name: 'Reliquias del primer fuego', zone: 'Children of Echoes', location: 'Cueva de las Pinturas Antiguas', requirements: 'Ninguno.', details: 'Pinturas muestran el origen del fuego sagrado de Natlan. Lleva a un arqueólogo a los 3 sitios representados para documentar los artefactos y protegerlos del saqueo Fatui.' },
    { id: 608, name: 'Los tambores que guían', zone: 'Nightsoul Basin', location: 'Valle de los Tambores', requirements: 'Ninguno.', details: 'En noches sin luna, ciertos tambores suenan solos. Investiga el fenómeno y descubre que actúan como mapa sonoro hacia una cámara subterránea con la historia de Natlan.' },
    { id: 609, name: 'El río de lava congelada', zone: 'Collective of Plenty', location: 'Río Volcánico del Este', requirements: 'Nivel Aventurero 45+.', details: 'Un río de lava se solidificó cortando el acceso al pueblo del este. Un elemental de hielo del Abismo lo está causando. Localízalo y elimínalo antes de que el bloqueo sea permanente.' },
    { id: 610, name: 'La danza de la victoria', zone: 'Children of Echoes', location: 'Plaza central del clan', requirements: 'Completar al menos 3 misiones de mundo de Natlan.', details: 'El instructor de la danza ceremonial está enfermo. Aprende los pasos de los 4 ancianos del clan y dirige tú mismo la ceremonia anual de la victoria.' },
    { id: 611, name: 'El volcán que recuerda', zone: 'Abyss of Shrinking Flame', location: 'Cráter norte del volcán', requirements: 'Completar El último guardián.', details: 'El cráter norte emite pulsos de luz a intervalos exactos. Descifra el patrón, que resulta ser un código morse antiguo de los primeros habitantes de Natlan enviando un mensaje final.' },
    { id: 612, name: 'Sombras en la forja', zone: 'Collective of Plenty', location: 'Forja del clan Collective', requirements: 'Completar Herrero de volcanes.', details: 'Ixchel descubre que alguien forjó armas falsas con el sello del clan para venderlas en el mercado negro. Investiga los 3 intermediarios y cierra la operación antes de que llegue más metal robado.' },
  ],
};
