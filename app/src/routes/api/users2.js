const express = require("express");
const router = express.Router();
const usersApiController = require("../../controllers/api/usersApi");

// Ruta para obtner todos os usuários
router.get("/api/users", usersApiController.getUsers);

// Rota para obter um usuário pelo ID
router.get("/api/users/:id", usersApiController.getUserById);

// Ruta para adicionar un nuevo usuario
/*router.post("/api/users", usersApiController.addUser);

// Ruta para actualizar un usuário existente
router.put("/api/users/:id", usersApiController.updateUser);

// Ruta para borrar um usuário
router.delete("/api/users/:id", usersApiController.deleteUser);
*/
module.exports = router;
