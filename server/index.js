const express = require("express")
const http = require("http")
const socketio = require("socket.io")
const cors = require("cors")

const app = express()
app.use(cors())
const server = http.createServer(app)

server.listen(3001, () => {
    console.log(`Server is running on`)
})

const io = socketio(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	}
})

app.use(cors())

io.on("connection", (socket) => {
	console.log(`${socket.id} has joined the server`);

	socket.on("disconnect", () => {
		console.log("User disconnected", socket.id)
	}),

	socket.on("unoCreateRoom", () => {
//		console.log(`User ${userName} created a room`)
		
	})
// Change param with spread operator for better readability
	socket.on("chameleonCreateRoom", (param) => {
		console.log(`${param.userName}/ ${socket.id} created a room ${param.gameId}`)

		function createRoom(userId, userName, gameId) {
			let roomData = {
				gameId: gameId,
				user1: 
				{
					userId: userId,
					userName: userName,
				}
			}
		return roomData
		}

		let roomData = createRoom(socket.id, param.userName, param.gameId)
		console.log(roomData)
		socket.emit("create", roomData)
		socket.join(param.gameId)
	})

	socket.on("chameleonJoinRoom", ([gameId, userName]) => {
		console.log(`${userName}/ ${socket.id} joined room ${gameId}`)
		socket.join(gameId)
		socket.to(gameId).emit("requestRoomData", {
			userName: userName,
			userId: socket.id,
			gameId: gameId  //vllt gameId Rauslassen, weil unnötig
		})
	})

	socket.on("sendRoomDataServer", (roomData) => {
		console.log(`The Game ID is ${roomData.gameId}`)
		console.log(`The Game Master is ${roomData.user1.userName}/${roomData.user1.userId}`)
		roomData.users.map((user) => {
			console.log(`${user.userName}/${user.userId} has joined the room`)
		})
		socket.to(roomData.gameId).emit("receiveRoomData", roomData)
	})

	socket.on("chameleonInitPlayers", (data) => {
		console.log(`All the Players joined room ${data.gameId}`)
		console.log(`The topic is ${data.topic} and the chameleon is ${data.chameleonPlayer}`)
		socket.broadcast.to(data.gameId).emit("chameleonReceivePlayers", data)
	})

	socket.on("chameleonUpdateGameStateServer", (data) => {
		console.log(`the clue is ${data.wordClue} the box is ${data.isChecked? "checked":"unchecked"} and the player is ${data.currentUser.userName}`)
		io.to(data.gameId).emit("chameleonUpdateGameState", data)
	})

	socket.on("chameleonUpdateTopicServer", (data) => {
		console.log(`The new topic is ${data.currentTopic}`)
		socket.broadcast.to(data.gameId).emit("chameleonUpdateTopic", data.currentTopic)
	})

	socket.on("chameleonUpdateVoteServer", (data) => {
		console.log(`${data.currentUser.userName} voted for ${data.playerVote}`)
		io.to(data.gameId).emit("chameleonUpdateVote", data)
	})

	socket.on("chameleonNextRoundServer", (data) => {
		console.log(data.scores)
		console.log(data.topic)
		io.to(data.gameId).emit("chameleonNextRound", (data))
	})
})
