import bcrypt from 'bcryptjs'
const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync('pass1234', 10),
    isAdmin: true,
    role: 'admin'
  },
  {
    name: "Susan Yinna",
    email: "susan@example.com",
    password: bcrypt.hashSync('pass1234', 10),
    isAdmin: false,
    role: 'user'
  },
  {
    name: "Jane Doe",
    email: "jane@example.com",
    password: bcrypt.hashSync('pass1234', 10),
    isAdmin: false,
    role: 'user'
  },
  {
    name: "Laura Green",
    email: "laura@example.com",
    password: bcrypt.hashSync('pass1234', 10),
    isAdmin: false,
    role: 'user'
  },
]

export default users