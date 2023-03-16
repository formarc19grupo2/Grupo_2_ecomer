const {writeUsersJson} = require("../database")

module.exports = {
    index: (req, res) => {
        return res.render("admin/adminIndex", {
            session: req.session,
        })
    }
}