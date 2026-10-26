import darkrai from '@/assets/ancestrals/darkrai.webp';
import dragonite from '@/assets/ancestrals/dragonite.webp';
import giratina from '@/assets/ancestrals/giratina.webp';
import groudon from '@/assets/ancestrals/groudon-shiny.webp';
import cresselia from '@/assets/ancestrals/cresselia.webp';
import kyurem from '@/assets/ancestrals/kyurem.webp';
import latias from '@/assets/ancestrals/latias.webp';
import latios from '@/assets/ancestrals/latios.webp';
import lugia from '@/assets/ancestrals/lugia.webp';
import lugiaShiny from '@/assets/ancestrals/lugia-shiny.webp';
import charizardY from '@/assets/ancestrals/charizard-mega-y.webp';
import charizardX from '@/assets/ancestrals/charizard-mega-x.webp';
import rayquazaShiny from '@/assets/ancestrals/rayquaza-shiny.webp';
import rayquaza from '@/assets/ancestrals/rayquaza.webp';
import reshiram from '@/assets/ancestrals/reshiram.webp';
import zekrom from '@/assets/ancestrals/zekrom.webp';

type Artwork = { src: string; subject: string; reference?: boolean };

// Canonical artwork from the PokeAPI sprites collection. Custom game forms
// use an explicitly identified species reference, not invented official art.
export const ANCESTRAL_ART: Record<string, Artwork> = {
  darkrai: { src: darkrai, subject: 'Darkrai' },
  'dragonite-mg': { src: dragonite, subject: 'Dragonite', reference: true },
  giratina: { src: giratina, subject: 'Giratina' },
  'groudon-shiny': { src: groudon, subject: 'Shiny Groudon' },
  cresselia: { src: cresselia, subject: 'Cresselia' },
  kyurem: { src: kyurem, subject: 'Kyurem' },
  latias: { src: latias, subject: 'Latias', reference: true },
  latios: { src: latios, subject: 'Latios', reference: true },
  'lugia-m-shiny': { src: lugiaShiny, subject: 'Shiny Lugia', reference: true },
  'lugia-shiny-ancestral': { src: lugiaShiny, subject: 'Shiny Lugia', reference: true },
  'mega-charizard': { src: charizardY, subject: 'Mega Charizard Y', reference: true },
  'mega-lugia-ancestral': { src: lugia, subject: 'Lugia', reference: true },
  'mega-charizard-x': { src: charizardX, subject: 'Mega Charizard X' },
  'rayquaza-shiny': { src: rayquazaShiny, subject: 'Shiny Rayquaza' },
  rayquaza: { src: rayquaza, subject: 'Rayquaza' },
  reshiram: { src: reshiram, subject: 'Reshiram' },
  zekrom: { src: zekrom, subject: 'Zekrom' },
};