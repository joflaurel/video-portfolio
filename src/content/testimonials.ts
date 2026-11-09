export interface Testimonial {
  readonly quote: string;
  readonly author: string;
  /** Short line under the name. */
  readonly role: string;
}

/** Client feedback shown on the Work page. Only add messages the client actually sent. */
export const TESTIMONIALS: readonly Testimonial[] = [
  {
    quote: 'Thanks for your great and speedy work this week!',
    author: 'Annabelle',
    role: 'Current client',
  },
  {
    quote: 'The edits look great.',
    author: 'James La Fargue',
    role: 'Current client',
  },
];
