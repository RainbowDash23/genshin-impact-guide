import type { Region } from '../../types/quest';
import { EMBLEMS } from '../../assets/index';

export const fontaine: Region = {
  id: 'fontaine', name: 'Fontaine',
  description: 'La nación de la justicia y el agua, presidida por Focalors la Archon Hydro.',
  element: 'hydro', color: '#38bdf8', accentColor: '#bae6fd',
  emblem: EMBLEMS.fontaine,
  zones: ['Corte de Fontaine', 'Opera Epiclese', 'Meropide', 'Salacia Plain', 'Beryl Region'],
  quests: [
    { id: 501, name: 'Misterio en la Opera', zone: 'Opera Epiclese', location: 'Opera Epiclese — camerinos', requirements: 'Completar Capítulo IV: Acto II.', details: 'Un cantante desaparece antes del estreno. Interroga a los artistas y busca pistas en el foso del escenario. Alguien del Fatui quería silenciarlo antes de su aria.' },
    { id: 502, name: 'La lente submarina', zone: 'Salacia Plain', location: 'Fondo marino de Salacia', requirements: 'Nivel Aventurero 40+.', details: 'Un investigador perdió su lente especial en las profundidades. Revela inscripciones antiguas en las rocas del fondo. Recupérala antes de que el Fatui llegue primero.' },
    { id: 503, name: 'El reloj del maestro relojero', zone: 'Corte de Fontaine', location: 'Taller de Relojes — calle principal', requirements: 'Ninguno.', details: 'Guillame necesita engranajes de talleres abandonados. Las piezas están custodiadas por autómatas que se reactivaron durante la revolución industrial de Fontaine.' },
    { id: 504, name: 'Cartas de los ahogados', zone: 'Beryl Region', location: 'Costa de Beryl', requirements: 'Completar exploración costera.', details: 'Seis botellas con mensajes de marineros naufragados hace 200 años. Lleva las cartas al memorial marino para completar el rito de despedida de sus familias.' },
    { id: 505, name: 'El automaton rebelde', zone: 'Corte de Fontaine', location: 'Fábrica Industrial de Fontaine', requirements: 'Completar Capítulo IV: Acto II.', details: 'Un autómaton desarrolló consciencia y se niega a trabajar. Decide si reportarlo para ser desmantelado o ayudarlo a escapar hacia la región submarina.' },
    { id: 506, name: 'Los caballos de mar gigantes', zone: 'Salacia Plain', location: 'Cueva submarina central', requirements: 'Ninguno.', details: 'Una investigadora estudia los caballos de mar gigantes. Márcalos en las profundidades sin asustarlos, usando las corrientes a tu favor para acercarte.' },
    { id: 507, name: 'El teatro del juicio', zone: 'Corte de Fontaine', location: 'Teatro de Fontaine — exterior', requirements: 'Nivel Aventurero 38+.', details: 'Un antiguo teatro fue escenario de un juicio fraudulento. Activa los archivos holográficos en cada butaca para reconstruir la escena y descubrir al verdadero culpable.' },
    { id: 508, name: 'La sirena de piedra', zone: 'Beryl Region', location: 'Arrecife de Beryl', requirements: 'Exploración del arrecife.', details: 'Una estatua de sirena tiene inscripciones que cambian con la marea. Visítala en 3 momentos del día distintos y combina los mensajes para hallar el mapa de un tesoro hundido.' },
    { id: 509, name: 'El ingeniero excéntrico', zone: 'Corte de Fontaine', location: 'Laboratorio subterráneo', requirements: 'Ninguno.', details: 'Un inventor construyó una máquina que predice el clima. Para calibrarla, recoge muestras de agua en 4 puntos distintos del reino y analiza las variables.' },
    { id: 510, name: 'Memorias del río subterráneo', zone: 'Meropide', location: 'Río subterráneo de Meropide', requirements: 'Acceder a la prisión de Meropide.', details: 'Un prisionero anciano vio algo imposible en el río. Investiga las corrientes y descubre un corredor secreto conectado con los archivos históricos de Fontaine.' },
    { id: 511, name: 'El protocolo olvidado', zone: 'Corte de Fontaine', location: 'Archivo judicial de Fontaine', requirements: 'Completar Capítulo IV: Acto I.', details: 'Un archivero descubre una ley obsoleta que podría exonerar a tres personas en prisión. Busca los registros originales del caso antes de que sean destruidos.' },
    { id: 512, name: 'La balada del buzo perdido', zone: 'Salacia Plain', location: 'Campamento de los buzos', requirements: 'Ninguno.', details: 'Un buzo experimentado no regresó de su última inmersión. Su compañera te pide que desciendas al punto más profundo del Salacia para encontrar señales de lo que ocurrió.' },
  ],
};
