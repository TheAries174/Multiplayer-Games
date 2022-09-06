import React from 'react'
import Table from "rc-table"

const ChameleonTable = (props) => {
const columns = [
    {
      title: "Player",
      dataIndex: "player",
      key: "player",
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
    },
    {
      title: "Word",
      dataIndex: "word",
      key: "word",
    },
    {
      title: "Ready",
      dataIndex: "ready",
      key: "ready",
    },
    {
      title: "Vote",
      dataIndex: "vote",
      key: "vote",
    }
  ]

  let isAllPlayerReadyVoted =  props.votes.every( (obj) => obj.vote !== "")
  let isAllPlayerReadyWords = props.words.every( (obj) => obj.word !== "") && props.playerReady.every( (obj) => obj.ready ===true)
  const data = []
  
  for (let i=0; i<props.users.length; i++) {  
    data.push({
      player: props.users[i].userName===props.currentUser.userName 
        ? `${props.users[i].userName} (You)`: props.users[i].userName,
      score: props.scores[i].score,
      word: isAllPlayerReadyWords ? props.words[i].word : "***", 
      vote: isAllPlayerReadyVoted ? props.votes[i].vote : "",
      ready: (props.playerReady[i].ready===true ? "\u2713": "x") + (props.votes[i].vote !== "" ? "\u2713" : ""),
      key: i,
    })
  }
  return(
    <Table 
      columns={columns}
      data={data}
      tableLayout="auto"
    />
  )
}

export default ChameleonTable
