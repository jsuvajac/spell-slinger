import React from "react"

export default function SpellTemplate({ pageContext: { spell } }) {
  return (
    <section>
      <h3>{spell['Name']}</h3>
      <p>{spell['Level']}</p>
      <p>{spell['Casting time']}</p>
      <p>{spell['Range']}</p>
      <p>{spell['Components']}</p>
      <p>{spell['Duration']}</p>
      <p>{spell['Text']}</p>
      <p>{spell['Page']}</p>
      <p>{spell['Class']}</p>
    </section>
  )
}