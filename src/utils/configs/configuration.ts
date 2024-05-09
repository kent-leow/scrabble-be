export default () => ({
  DATABASE_URL:
    process.env.DATABASE_URL || 'mongodb://localhost:27017/scrabble',
  ALLOWED_HOSTS: process.env.ALLOWED_HOSTS || 'http://localhost:3001',
});
