const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { User } = require("../../database/models");
const fs = require('fs');

module.exports = {
  getUsers: (req, res) => {
    User.findAndCountAll()
      .then((result) => {
        const users = result.rows.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          detail: `/api/users/${user.id}`
        }));
        res.json({
          count: result.count,
          users: users
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: "Error retrieving users" });
      });
  },

  getUserById: (req, res) => {
    const userId = req.params.id;

    User.findByPk(userId, { attributes: { exclude: ["password", "category"] } })
      .then((user) => {
        if (user) {
          const { id, name, email, avatar } = user;
          console.log(user.avatar)
          const profileImageUrl = `/api/users/${userId}/${user.avatar}`;
          res.json({
            id: id,
            name: name,
            email: email,
            profileImageUrl: profileImageUrl
          });
        } else {
          res.status(404).json({ error: "User not found" });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: "Error retrieving user" });
      });
  },

  getUserProfileImage: (req, res) => {
    const userId = req.params.id;

    User.findByPk(userId, { attributes: ["avatar"] })
      .then((user) => {
        if (user) {
          const profileImagePath = `./public/images/avatar/${user.avatar}`;
          fs.readFile(profileImagePath, (err, data) => {
            if (err) {
              console.log(err);
              res.status(500).json({ error: "Error retrieving profile image" });
            } else {
              res.writeHead(200, { "Content-Type": "image/jpeg" });
              res.end(data);
            }
          });
        } else {
          res.status(404).json({ error: "User not found" });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: "Error retrieving user" });
      });
  },

  
};
