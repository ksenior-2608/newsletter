const express = require("express");
const md5 = require("md5");
var router = express.Router();

async function findUser(hashEmail, listId) {
    try {
        let response = await mailchimp.lists.getListMember(
            listId,
            hashEmail,
        );
        if (response)
            return response.status;
    } catch (e) {
        return e;
    }
}

router.get("/", async function (req, res) {
    let userEmail = req.query.email;
    userEmail = userEmail.toLowerCase();
    let listId = process.env.LIST_ID;
    // console.log(listId);
    let hashEmail = md5(userEmail);
    // console.log(hashEmail);
    let result = await findUser(hashEmail, listId);
    res.send(result);
});

module.exports = router;