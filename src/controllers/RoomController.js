const Database = require("../db/config")

function checkRoom(roomsExtistIds, roomId){
    let isRoom = false
    for(let idRoom of roomsExtistIds){
        if(idRoom.id === Number(roomId)){
            isRoom = true 
        }
    }
    return isRoom
}

module.exports = {
    async create(req, res){
        const db = await Database()
        const { password } = req.body
        let roomId = ''
        let isRoom = true
        while (isRoom) {
            for(let i = 0; i < 6 ; i ++){
                roomId += Math.floor(Math.random() * 10).toString()
            }
            const roomsExtistIds = await db.all(`SELECT id FROM rooms`)

        
        isRoom =  checkRoom(roomsExtistIds, roomId)

            
            if(!isRoom){
                await db.run(`INSERT INTO rooms (
                    id,
                    pass
                )VALUES(
                    ${parseInt(roomId)},
                    ${password}
                )`)
            }else{
                roomId = ''
            }

        }

        await db.close()

        res.redirect(`/room/${roomId}`)
    },
    async open(req, res) {
        const db = await Database()
        const { room } = req.params
        const questions = await db.all(`SELECT * FROM questions WHERE room = ${room} and read = 0`)
        const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${room} and read = 1`)
        await db.close()
        let isNoQuestions = true
        
        if(questions.length == 0 && questionsRead.length == 0){
            isNoQuestions = false
        }

        res.render("room", {roomId: room, questions, questionsRead, isNoQuestions: isNoQuestions})
    },

    async enter(req, res){
        const db = await Database()
        const { roomId } = req.body

        const roomsExtistIds = await db.all(`SELECT id FROM rooms`)

        const isRoom =  checkRoom(roomsExtistIds, roomId)
        
        if(!isRoom){
            res.redirect('/')   
        }else {
            res.redirect(`/room/${roomId}`)
        }
        
    }
}
            
        
       

