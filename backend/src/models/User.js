const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

class User {
  constructor() {
    this.users = new Map();
    this.initializeDefaultUsers();
  }

  initializeDefaultUsers() {
    // Usuarios predefinidos para demostración
    const defaultUsers = [
      {
        id: 1,
        email: 'fernandoperezgestion225@gmail.com',
        name: 'Fernando Pérez',
        role: 'admin',
        password: 'admin123', // En producción usar hash
        verified: true,
        createdAt: new Date()
      },
      {
        id: 2,
        email: 'maria@email.com',
        name: 'María García',
        role: 'cliente',
        password: 'cliente123', // En producción usar hash
        verified: true,
        createdAt: new Date()
      }
    ];

    defaultUsers.forEach(user => {
      this.users.set(user.email, {
        ...user,
        password: bcrypt.hashSync(user.password, config[process.env.NODE_ENV || 'development'].BCRYPT_ROUNDS)
      });
    });
  }

  async findByEmail(email) {
    return this.users.get(email) || null;
  }

  async findById(id) {
    for (const [email, user] of this.users.entries()) {
      if (user.id === id) return user;
    }
    return null;
  }

  async create(userData) {
    const newUser = {
      id: Date.now(),
      email: userData.email,
      name: userData.name,
      role: 'cliente',
      password: bcrypt.hashSync(userData.password, config[process.env.NODE_ENV || 'development'].BCRYPT_ROUNDS),
      verified: false,
      createdAt: new Date()
    };

    this.users.set(newUser.email, newUser);
    return newUser;
  }

  async validatePassword(plainPassword, hashedPassword) {
    return bcrypt.compareSync(plainPassword, hashedPassword);
  }

  generateToken(user) {
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    };

    return jwt.sign(payload, config[process.env.NODE_ENV || 'development'].JWT_SECRET, {
      expiresIn: config[process.env.NODE_ENV || 'development'].JWT_EXPIRE
    });
  }

  async verifyToken(token) {
    try {
      return jwt.verify(token, config[process.env.NODE_ENV || 'development'].JWT_SECRET);
    } catch (error) {
      return null;
    }
  }

  getAll() {
    return Array.from(this.users.values()).map(({ password, ...user }) => user);
  }

  async update(id, updateData) {
    for (const [email, user] of this.users.entries()) {
      if (user.id === id) {
        const updatedUser = { ...user, ...updateData };
        this.users.set(email, updatedUser);
        return updatedUser;
      }
    }
    return null;
  }

  async delete(id) {
    for (const [email, user] of this.users.entries()) {
      if (user.id === id) {
        this.users.delete(email);
        return true;
      }
    }
    return false;
  }
}

module.exports = new User();
