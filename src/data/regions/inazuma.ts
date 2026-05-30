import type { Region } from '../../types/quest';
import { EMBLEMS } from '../../assets/index';

export const inazuma: Region = {
  id: 'inazuma', name: 'Inazuma',
  description: 'El archipiélago de la eternidad y el rayo, gobernado por la Shogun Electro.',
  element: 'electro', color: '#a78bfa', accentColor: '#ddd6fe',
  emblem: EMBLEMS.inazuma,
  zones: ['Narukami', 'Kannazuka', 'Yashiori', 'Watatsumi', 'Seirai', 'Tsurumi'],
  quests: [
    { id: 301, name: 'El fantasma de Tsurumi', zone: 'Tsurumi', location: 'Isla Tsurumi — muelle', requirements: 'Completar Capítulo II: Acto III.', details: 'Llegas a la niebla perpetua y conoces a Ruu, un niño misterioso. Completa el ritual de 3 santuarios para disipar la niebla y descubrir la trágica historia del pueblo perdido.' },
    { id: 302, name: 'La tormenta de Seirai', zone: 'Seirai', location: 'Isla Seirai — centro', requirements: 'Nivel Aventurero 30+.', details: 'Una tormenta eléctrica permanente bloquea el interior. Activa los 4 pararrayos en el orden indicado en los manuscritos de los templos cercanos para calmarla.' },
    { id: 303, name: 'Los superchefs en Inazuma', zone: 'Narukami', location: 'Mercado de Inazuma City', requirements: 'Completar misiones de los Superchefs en Mondstadt.', details: 'Xudong y Xiangling buscan ingredientes exclusivos. Consigue Padisarah, hierba de crisantemo y pescado eléctrico resolviendo el conflicto con el chef local.' },
    { id: 304, name: 'Pesadillas en Kannazuka', zone: 'Kannazuka', location: 'Tatarasuna — exterior', requirements: 'Completar la cadena de purificación de Tatarasuna.', details: 'Un obrero ve visiones. Con la lupa espiritual investiga los depósitos para descubrir remanentes de energía maligna atrapados en el metal fundido.' },
    { id: 305, name: 'Cartas desde Yashiori', zone: 'Yashiori', location: "Orochi's Bane Island", requirements: 'Derrotar a Orobashi.', details: 'Encuentra 5 cartas esparcidas en la isla. Son mensajes de los guerreros que sellaron a Orobashi hace siglos. Llévalas al santuario para completar el rito.' },
    { id: 306, name: 'Sakura en invierno', zone: 'Narukami', location: 'Santuario del Gran Sakura', requirements: 'Completar purificación del Sakura Divino.', details: 'La miko Atsuko te pide plantar semillas de sakura en 4 lugares. Solo brotan de noche cuando limpias la tierra de impurezas con poder electro.' },
    { id: 307, name: 'El samurái sin clan', zone: 'Yashiori', location: 'Playa sur de Yashiori', requirements: 'Ninguno.', details: 'Un samurái herido perdió la memoria. Visita 4 lugares de Inazuma para recuperar sus recuerdos y enfrenta la verdad sobre por qué fue desterrado.' },
    { id: 308, name: 'La linterna sumergida', zone: 'Watatsumi', location: 'Fondo marino de Watatsumi', requirements: 'Completar exploración básica de Watatsumi.', details: 'Una anciana busca la linterna sagrada de su esposo buceador. Desciende al templo submarino y recupérala antes de que las corrientes la arrastren.' },
    { id: 309, name: 'Oni del Monte Yougou', zone: 'Narukami', location: 'Monte Yougou', requirements: 'Nivel Aventurero 35+.', details: 'Un supuesto demonio habita el monte sagrado. Asciende por caminos prohibidos y descubre que es un guardián olvidado que protege un sello ancestral del Shogunado.' },
    { id: 310, name: 'El barco fantasma de Seirai', zone: 'Seirai', location: 'Costa oeste de Seirai', requirements: 'Completar "La tormenta de Seirai".', details: 'Un barco aparece en la costa solo de noche sin tripulación. Súbete después del ocaso para encontrar el fantasma del capitán y su misión sin completar.' },
    { id: 311, name: 'Los niños de la aldea Konda', zone: 'Narukami', location: 'Aldea Konda', requirements: 'Ninguno.', details: 'Los niños creen que el pozo está embrujado. Investiga y encuentra un mecanismo oculto bajo el pueblo que activa un calabozo secreto del antiguo Shogunado.' },
    { id: 312, name: 'El espejo roto de Tsurumi', zone: 'Tsurumi', location: 'Santuario central de Tsurumi', requirements: 'Completar "El fantasma de Tsurumi".', details: 'Tras disipar la niebla, recoge los 5 fragmentos del espejo sagrado dispersos en la isla. Cada uno revela un recuerdo del día que la isla quedó atrapada en el tiempo.' },
    { id: 313, name: 'El pergamino sellado', zone: 'Kannazuka', location: 'Templo al norte de Kujou Encampment', requirements: 'Ninguno.', details: 'Un pergamino sellado con energía electro bloquea la entrada a una sala. Resuelve el puzzle de las placas conductoras alrededor del templo para romper el sello.' },
    { id: 314, name: 'Memorias del fondo marino', zone: 'Watatsumi', location: 'Cueva submarina de Watatsumi', requirements: 'Completar exploración de Watatsumi.', details: 'Pinturas en una cueva submarina muestran la historia de los Sangonomiya antes de la guerra. Un escriba quiere documentarlas pero no puede bucear. Llévalas en tus notas.' },
  ],
};
