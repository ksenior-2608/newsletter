const { request } = require("express");
const express = require("express");
const md5 = require("md5");
var router = express.Router();

async function unsubscribeUser(hashEmail, listId) {
    try {
        let response = await mailchimp.lists.updateListMember(
            listId,
            hashEmail,
            {
                status: "unsubscribed",
            }
        );
        if (response.status)
            return response.status;
    } catch (e) {
        return e;
    }
}

router.get("/", async function (req, res) {
    let userEmail = req.query.email;
    // console.log(userEmail);
    let listId = process.env.LIST_ID;
    let hashEmail = md5(userEmail);
    // console.log(hashEmail);
    let result = await unsubscribeUser(hashEmail, listId);
    res.send(result);
});

module.exports = router;