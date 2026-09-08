export const title = 'Eric and Michele';

export const intro = [
  'We are Eric and Michele Dudley. D+D Collective is our family philanthropy, and it is genuinely just the two of us: no staff, no committee, no office.',
  'We do this because the people we have met doing the hardest work are almost never the people with access to capital, and that gap is fixable. Most of what we have learned came from sitting with them, so we try to spend our money and our time in roughly that order of usefulness.',
  'We work in Charlotte, where we live, and in East Africa, where we keep going back.'
];

export interface Person {
  name: string;
  role: string;
  /** Drop a file in public/people/ and set the path here, e.g. /people/michele.jpg */
  photo: string | null;
  photoAlt: string;
  bio: string[];
  markers: string[];
  /** True while the copy is still a placeholder rather than their own words. */
  draft?: boolean;
}

export const michele: Person = {
  name: 'Michele Dudley',
  role: 'Co-founder',
  photo: null,
  photoAlt: 'Michele Dudley',
  bio: [
    'Michele does most of the work of knowing people. The relationships D+D funds through are largely ones she has kept up over years, and the questions she asks founders tend to be the ones nobody else in the room is asking.'
  ],
  markers: [
    'Co-founded BraveWorks, formerly Fashion and Compassion.',
    'Serves on the boards of Be The Bridge, Mesa Global, The Gathering, Women Doing Well, and Thrive Global Project.',
    'Helped establish the Blessing School for the Visually Impaired in Rwanda.'
  ]
};

/**
 * Eric's copy has not been written yet. Rather than invent a biography, this is
 * left as an obvious placeholder so it cannot ship by accident.
 */
export const eric: Person = {
  name: 'Eric Dudley',
  role: 'Co-founder',
  photo: null,
  photoAlt: 'Eric Dudley',
  bio: ['DRAFT — Eric’s introduction goes here, in his own words. Two or three sentences, the same length as Michele’s.'],
  markers: [],
  draft: true
};

export const closing =
  'If you were sent here by one of us, write back to the same address. If you found this some other way, the mission page is the best place to start.';
