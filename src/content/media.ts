/**
 * All imagery, one place. Every image here is TEMPORARY generated art
 * direction (Canva AI, provenance embedded in each file), labelled "Mood
 * image" wherever it appears. None is product photography, none shows
 * packaging, and the people are not customers.
 * REPLACE WITH FINAL NOOMI PHOTOGRAPHY (>= 2400px on the short side).
 */
import heroStill from '../assets/campaign/hero-4x5.jpg';
import serum from '../assets/campaign/serum.jpg';
import skinDroplet from '../assets/campaign/skin-droplet.jpg';
import cream from '../assets/campaign/cream.jpg';
import creamHand from '../assets/campaign/cream-hand.jpg';
import textures from '../assets/campaign/textures.jpg';
import condensation from '../assets/campaign/condensation.jpg';
import gettingReady from '../assets/campaign/getting-ready.jpg';
import monsoon from '../assets/campaign/monsoon.jpg';
import portrait from '../assets/campaign/portrait.jpg';

export type Img = { src: ImageMetadata; alt: string };

/**
 * The hero. `still` is the photograph (and the poster of any film).
 * `film`: drop a 5–8 s campaign loop (muted, no text, same 4:5 framing) into
 * public/film/ and point these at it; the hero swaps it in with no layout
 * change. null until a real film exists: nothing is faked.
 */
export const hero: { still: Img; film: { webm: string | null; mp4: string | null } | null } = {
  still: { src: heroStill, alt: 'A clear drop of serum resting against a swirl of white cream on wet navy glass, in cool blue light.' },
  film: null,
};
export type ProductMedia = { primary: Img; secondary: Img };

export const productMedia: Record<string, ProductMedia> = {
  'calm-serum': {
    primary: { src: serum, alt: 'Clear liquid pooling into glossy droplets on a deep blue surface.' },
    secondary: { src: skinDroplet, alt: 'Close-up of skin in cool blue light, a single clear droplet on the cheek.' },
  },
  'barrier-repair-cream': {
    primary: { src: cream, alt: 'A thick whipped cream swirl in cool blue light.' },
    secondary: { src: creamHand, alt: 'A dab of white cream on the back of a hand.' },
  },
};

export const world = {
  textures: { src: textures, alt: 'A clear gel swipe beside a thick white cream swipe on a glossy powder-blue surface.' },
  condensation: { src: condensation, alt: 'Beads of water on cool blue glass.' },
  gettingReady: { src: gettingReady, alt: 'A young woman in a white t-shirt touching a drop of clear liquid to her cheek, smiling, in soft morning light.' },
  monsoon: { src: monsoon, alt: 'A young woman by a rain-streaked window at night, city lights blurred behind her.' },
  portrait: { src: portrait, alt: 'Side profile of a young woman, eyes closed, skin lit in cool blue light.' },
} satisfies Record<string, Img>;
