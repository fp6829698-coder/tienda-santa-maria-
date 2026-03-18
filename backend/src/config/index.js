module.exports = {
  development: {
    PORT: process.env.PORT || 3000,
    FRONTEND_URL: 'http://localhost:8000',
    JWT_SECRET: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production',
    JWT_EXPIRE: process.env.JWT_EXPIRE || '7d',
    BCRYPT_ROUNDS: 12,
    RATE_LIMIT_WINDOW: 15 * 60 * 1000, // 15 minutes
    RATE_LIMIT_MAX: 100
  },
  
  production: {
    PORT: process.env.PORT || 3000,
    FRONTEND_URL: process.env.FRONTEND_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRE: process.env.JWT_EXPIRE || '7d',
    BCRYPT_ROUNDS: 12,
    RATE_LIMIT_WINDOW: 15 * 60 * 1000,
    RATE_LIMIT_MAX: 100
  },
  
  test: {
    PORT: 3001,
    FRONTEND_URL: 'http://localhost:8000',
    JWT_SECRET: 'test-jwt-secret',
    JWT_EXPIRE: '1h',
    BCRYPT_ROUNDS: 4,
    RATE_LIMIT_WINDOW: 60 * 1000, // 1 minute
    RATE_LIMIT_MAX: 1000
  }
};
