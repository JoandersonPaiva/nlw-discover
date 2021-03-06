const Database = require('../db/config')
module.exports = {
    async index(req, res){
        const db = await Database()
        const {
            roomId,
            questionId,
            action
        }= req.params
        const { password } = req.body

        const verifyRoom = await db.get(`SELECT * FROM rooms WHERE id= ${roomId}`)
        if(verifyRoom.pass === password){
            if(action === "delete"){
                await db.run(`DELETE FROM questions WHERE id = ${questionId}`)
            }else if(action === "check"){
                await db.run(`UPDATE questions SET read = 1 WHERE id = ${questionId}`)
            }
        }else {
            res.render('passincorrect', {roomId})
        }


        res.redirect(`/room/${roomId}`)
    },
    async create(req, res){
        const db = await Database()
        const { question } = req.body
        const { room } = req.params

        await db.run(`INSERT INTO questions(
            title,
            room,
            read
        )VALUES(
            "${question}",
            ${room},
            0
        )`)
        res.redirect(`/room/${room}`)
    }
}