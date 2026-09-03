import apple from '../assets/art/pieces/apple.jpg'
import frog from '../assets/art/pieces/frog-canvas.jpg'
import eye from '../assets/art/pieces/eye-study.jpg'
import coffee from '../assets/art/pieces/coffee-pour.jpg'
import lemons from '../assets/art/pieces/lemons-canvas.jpg'
import lilies from '../assets/art/pieces/water-lilies.jpg'
import cottage from '../assets/art/pieces/cottage-watercolor.jpg'
import portrait from '../assets/art/pieces/portrait-sketch.jpg'

export interface ArtPiece {
  id: string
  title: string
  medium: string
  note: string
  image: string
}

export const artPieces: ArtPiece[] = [
  {
    id: 'eye',
    title: 'Study of an Eye',
    medium: 'Digital painting',
    note: 'Practicing what light does when it has something to reflect.',
    image: eye,
  },
  {
    id: 'lilies',
    title: 'Water Lilies',
    medium: 'Digital painting',
    note: 'A small homage to Monet, done on a tablet instead of a pond-side easel.',
    image: lilies,
  },
  {
    id: 'apple',
    title: 'Still Life No. 1',
    medium: 'Digital painting',
    note: 'A study in light and shadow — sometimes the simplest subject is the hardest to get right.',
    image: apple,
  },
  {
    id: 'coffee',
    title: 'Pour Over',
    medium: 'Digital illustration',
    note: 'Some mornings are just about the ritual.',
    image: coffee,
  },
  {
    id: 'frog',
    title: 'Smoke Break',
    medium: 'Acrylic on canvas, mini',
    note: 'A tiny, ridiculous painting for the days that need a little humor.',
    image: frog,
  },
  {
    id: 'lemons',
    title: 'Lemons',
    medium: 'Acrylic on canvas, mini',
    note: 'Painted in an afternoon, mostly for the color.',
    image: lemons,
  },
  {
    id: 'cottage',
    title: 'Countryside Cottage',
    medium: 'Watercolor',
    note: 'Slower medium, slower pace — the opposite of a Figma file.',
    image: cottage,
  },
  {
    id: 'portrait',
    title: 'Portrait Study',
    medium: 'Pencil on paper',
    note: 'A character study, more caricature than likeness.',
    image: portrait,
  },
]
