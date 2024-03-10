const db = require("./db");
const helper = require("../helper");
const config = require("../config");


async function getAllUser() {
    const rows = await db.query(`SELECT * FROM User  `);
    const data = helper.emptyOrRows(rows);
    return data;
}
async function getUserById(id) {
    const rows = await db.query(`SELECT * FROM User WHERE id = ?`, [id]);
    const data = helper.emptyOrRows(rows);
    return data;
}
async function getUserGoldById(id) {
    const rows = await db.query(`SELECT gold FROM User WHERE id = ? `, [id]);
    const data = helper.emptyOrRows(rows);
    return data;
}
async function updateUserGoldById(id, newGold) {
    const rows = await db.query(`UPDATE User SET gold = ? WHERE id = ?`, [id, newGold]);
    const data = helper.emptyOrRows(rows);
    return data;
}


module.exports = {
    getAllUser,
    getUserById,
    getUserGoldById,
    updateUserGoldById
};
