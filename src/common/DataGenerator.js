import * as React from "react"

const range = len => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const names = [
  "Mickey Mouse",
  "Bugs Bunny",
  "Homer Simpson",
  "Fred Flintstone",
  "Sponge Bob",
  "Daffy Duck",
  "Charlie Brown",
  "Scooby Doo",
  "Tom Cat",
  "Jerry Mouse",
  "Mighty Mouse",
  "Wile E Coyote",
  "Tweety Bird",
  "Pink Panther",
  "Road Runner",
  "Patrick Star",
  "Roger Rabbit",
  "Papa Smurf",
  "Buzz Lightyear",
]

const newPerson = () => {
  const rand = Math.random()
  const namesIndex = Math.floor(rand * (names.length - 1))
  const firstName = names[namesIndex].split(" ")[0]
  const lastName = names[namesIndex].split(" ")[1]
  return {
    firstName,
    lastName,
    age: Math.floor(rand * 30),
    visits: Math.floor(rand * 100),
    progress: Math.floor(rand * 100),
    status:
      rand > 0.66 ? "relationship" : rand > 0.33 ? "complicated" : "single",
  }
}

export default function MakeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth]
    return range(len).map(d => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }

  return makeDataLevel()
}
