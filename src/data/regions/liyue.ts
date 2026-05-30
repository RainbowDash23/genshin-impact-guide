import type { Region } from '../../types/quest';
import { EMBLEMS } from '../../assets/index';

export const liyue: Region = {
  id: 'liyue', name: 'Liyue',
  description: 'El puerto del comercio y la roca, bajo la guía de Morax el Archon Geo.',
  element: 'geo', color: '#fbbf24', accentColor: '#fde68a',
  emblem: EMBLEMS.liyue,
  zones: ['Puerto Liyue', 'Montañas Qingce', 'Aldea Qingce', 'Sima de Sal', 'Wuwang Hill', 'Tianqiu Valley'],
  quests: [
    { id: 201, name: 'El adivino de los sueños', zone: 'Puerto Liyue', location: 'Muelle del Puerto Liyue', requirements: 'Completar Capítulo I: Acto II.', details: 'Un anciano vende predicciones en el muelle. Síguelo de noche hacia las ruinas del norte para descubrir si sus profecías son reales o una trampa.' },
    { id: 202, name: 'Jade imperial', zone: 'Montañas Qingce', location: 'Tienda de Xingxi', requirements: 'Hablar con Xingxi al menos una vez.', details: 'Xingxi necesita jade de primer nivel urgente. Escala las montañas, derrota a los guardianes y trae las gemas sin dañarlas.' },
    { id: 203, name: 'La abuela Ruoxin', zone: 'Aldea Qingce', location: 'Aldea Qingce (centro)', requirements: 'Ninguno.', details: 'La abuela Ruoxin perdió su caja de recuerdos en el terremoto. Busca los fragmentos dispersos y reconstruye el cofre con las cartas de su nieto.' },
    { id: 204, name: 'Los espíritus de Wuwang Hill', zone: 'Wuwang Hill', location: 'Colina Wuwang (centro)', requirements: 'Nivel Aventurero 25+.', details: 'Visiones fantasmales en la colina. Usa un espejo de jade en los 5 altares para revelar la verdad sobre los Millelith caídos que protegen el lugar.' },
    { id: 205, name: 'Tianqiu: La torre olvidada', zone: 'Tianqiu Valley', location: 'Ruinas de Tianqiu', requirements: 'Ninguno. Alta dificultad.', details: 'Tres torres sellan un calabozo. Activa los mecanismos en el orden exacto indicado por los símbolos del suelo para abrir la cámara central.' },
    { id: 206, name: 'Sal y nostalgia', zone: 'Sima de Sal', location: 'Entrada principal de la Sima', requirements: 'Haber visitado la Sima de Sal.', details: 'Un minero busca el reloj de su difunto padre en las vetas abandonadas. Explora los túneles inferiores esquivando bestias minerales y gas venenoso.' },
    { id: 207, name: 'El mercader de medianoche', zone: 'Puerto Liyue', location: 'Mercado de Liyue (solo de noche)', requirements: 'Visitar el mercado de noche.', details: 'Un mercader que solo aparece de noche vende objetos imposibles. Síguelo al cerrar y descubre que es un espíritu Adepti que prueba la avaricia humana.' },
    { id: 208, name: 'La poeta del acantilado', zone: 'Montañas Qingce', location: 'Acantilado norte de Qingce', requirements: 'Ninguno.', details: 'Una joven escribe poemas en el borde de un acantilado esperando a alguien. Busca pistas sobre el destino de esa persona en las aldeas cercanas.' },
    { id: 209, name: 'El dragón de jade dormido', zone: 'Montañas Qingce', location: 'Cueva del Dragón de Jade', requirements: 'Nivel Aventurero 30+.', details: 'Activa los 4 faros geo alrededor de la cueva para despertar el espíritu de jade y resolver el misterio de su maldición centenaria.' },
    { id: 210, name: 'Los niños perdidos de Qingce', zone: 'Aldea Qingce', location: 'Sur de Aldea Qingce', requirements: 'Ninguno.', details: 'Tres niños desaparecieron explorando ruinas cercanas. Encuéntralos antes del anochecer, cuando los Hilichurls toman el control del área.' },
    { id: 211, name: 'El reloj de sol roto', zone: 'Puerto Liyue', location: 'Plaza central de Liyue', requirements: 'Ninguno.', details: 'El histórico reloj de sol dejó de funcionar. El artesano responsable es demasiado anciano para repararlo solo. Consigue los materiales y ayúdalo.' },
    { id: 212, name: 'Fantasmas en la mina de sal', zone: 'Sima de Sal', location: 'Mina norte de la Sima', requirements: 'Completar exploración inicial de la Sima.', details: 'Los mineros escuchan voces en el tercer nivel. Con una linterna especial descubre que son ecos de trabajadores atrapados que buscan llevar cartas a sus familias.' },
    { id: 213, name: 'El encargo del alquimista', zone: 'Puerto Liyue', location: 'Laboratorio de Albedo (temporal)', requirements: 'Completar misiones de Albedo en Mondstadt.', details: 'Albedo dejó un encargo para recoger muestras de terreno geo en 4 puntos distintos de Liyue. Las muestras deben tomarse en un orden específico marcado en su diario.' },
    { id: 214, name: 'La danza del dragón dorado', zone: 'Puerto Liyue', location: 'Puerto Liyue (festival)', requirements: 'Durante el Festival de los Faroles o sin requisito fuera de evento.', details: 'Un anciano coreógrafo quiere revivir la danza tradicional del dragón para el puerto pero su discípulo desapareció. Búscalo y descubre que abandonó la danza por deudas de juego.' },
  ],
};
