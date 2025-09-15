const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const Post = require('../models/post');
const fs = require('fs');
const path = require('path');

async function seed() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/js-mini';
  await mongoose.connect(mongoUri);

  await Post.deleteMany({});

  const titles = [
    'I built a startup generator that only suggests taco apps',
    'My regex learned to love (and also to hate) JSON',
    'Today I finally understood event loop... I think',
    'Deployed on Friday, achieved inner peace by Monday',
    'Dark mode increased my productivity by 42.7%',
    'We pivoted from AI to IA and raised $10M',
    'My linter writes better code than me',
    'Docker inside Docker inside… help',
    'I used map instead of forEach and now I am Senior',
    'Accidentally created a feature, PM called it “innovation”',
    'I benchmarked semicolons; they are fast;',
    'Our MVP is just a spreadsheet with delusions of grandeur',
    'The monorepo found religion and became a monolith',
    'Ship fast, break fast, nap faster',
    'I optimized a query and my coffee got cold',
    'Mentored a junior; got mentored back',
    'Added tests; bugs got scared and left',
    'Rate limited by my own API… as a treat',
    'We A/B tested meetings; B stands for “Bye”',
    'My standup was horizontal today'
  ];

  const usernames = [
    'byteBard', 'startupSquirrel', 'nullPointerPoet', 'grepGandalf', 'semverSam',
    'yakShaver9000', 'asyncAstronaut', 'cacheCow', 'mergeWizard', 'deployDolphin',
    'lintLlama', 'regexRaccoon', 'monolithMarmoset', 'pivotPenguin', 'featureFerret',
    'consoleKoala', 'npmNarwhal', 'routerRaven', 'crunchyCron', 'kebabCaseKite'
  ];

  const docs = titles.map((t) => ({
    title: t,
    votes: Math.floor(Math.random() * 500) + 1,
    username: `u/${usernames[Math.floor(Math.random() * usernames.length)]}`
  }));
  const inserted = await Post.insertMany(docs);
  const first = inserted[0];

  console.log(`Seeded ${inserted.length} posts.`);
  console.log('Primary post:', { id: first._id.toString(), title: first.title, votes: first.votes });
  // Write the Post ID into frontend .env for convenience
  try {
    const envPath = path.resolve(__dirname, '../../../frontend/.env');
    const content = `REACT_APP_POST_ID=${first._id.toString()}\n`;
    fs.writeFileSync(envPath, content, { encoding: 'utf8' });
    console.log('Wrote frontend/.env with REACT_APP_POST_ID');
  } catch (e) {
    console.warn('Could not write frontend/.env:', e.message);
  }
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});


