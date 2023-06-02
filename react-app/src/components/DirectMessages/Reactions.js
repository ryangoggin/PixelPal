import './DirectMessages.css'



export default function DMReactions({reactions}) {


  return (
    <>
      {reactions.map((reaction) => {
        return (
        <>
        <div className='reactions-each-container'
        key={`reaction${reaction.id}`}
        // onClick={+reaction.userId === +sessionUser?.id ? () => { deleteReaction(reaction.id, msg.id) } : () => { addReaction(reaction.emojiId, msg.id, sessionUser?.id) }}
        >
          {String.fromCodePoint(reaction.emoji.url)}
        </div>
      </>
        )
      })}
    </>

  )
}
