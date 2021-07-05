const express = require("express");
var router = express.Router();

async function addUser(subscribingUser, listId) {
    try {
        let response = await mailchimp.lists.addListMember(
            listId,
            {
                email_address: subscribingUser.email,
                status: "subscribed",
                merge_fields: {
                    FNAME: subscribingUser.firstName,
                    LNAME: subscribingUser.lastName,
                    ADDRESS: subscribingUser.address,
                    PHONE: subscribingUser.phone,
                }
            },
        );
        if (response)
            return response.id;
    } catch (e) {
        return e;
    }
}


router.post("/", async function (req, res) {
    // console.log(req.body);
    let subscribingUser = {
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
    }
    // console.log(subscribingUser);
    let listId = process.env.LIST_ID;
    let result = await addUser(subscribingUser, listId);
    res.send(result);
});

module.exports = router;
