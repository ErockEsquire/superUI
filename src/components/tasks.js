import React, { useState  } from 'react'
import Map from './map'

export function Tasks ({ scooters, position }) {

  const [scooter, setScooter] = useState(scooters[0])

  console.log(scooter.coords)
  return (
    <section className="tasklist">
      <Tasklist scooters={scooters} setScooter={setScooter}/>
      <div className="scooter">
        <Task scooter={scooter}/>
      </div>
    </section>
  )
}

export function Tasklist ({ scooters, setScooter }) {

  const [sort, setSort] = useState("des")

  const renderScooters = (scooters) => {
    let sorted = scooters.sort((a, b) => b.priority - a.priority)
    if (sort === "asc") {
      sorted = scooters.sort((a, b) => a.priority - b.priority)
    }
    return sorted.map((scooter, index) => <Row key={index} scooter={scooter} setScooter={setScooter}/>)
  }

  const handleSort = () => {
    if (sort === "des") {
      setSort("asc")
    } else if (sort === "asc") {
      setSort("des")
    }
  }

  return (
    <div>
      <table className="task-table">
        <tbody>
          <tr className="task-table__row head">
            <th className="task-table__row__elem name">Name</th>
            <th className="task-table__row__elem issue">Issue</th>
            <th className="task-table__row__elem priority" onClick={() => handleSort()}>Priority
            <svg className={sort === "des" ? "down":"up"} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-down" class="svg-inline--fa fa-caret-down fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path></svg>
            </th>
            <th className="task-table__row__elem note">Note</th>
            <th className="task-table__row__elem location" onClick={() => setSort("location")}>Location</th>
          </tr>
          {renderScooters(scooters)}
        </tbody>
      </table>
    </div>
  )
}

const Row = ({ scooter, setScooter }) => {

  const { name, issue, priority, note, location } = scooter

  return (
    <tr className="task-table__row" onClick={() => setScooter(scooter)}>
      <td className="task-table__row__elem detail name">{name}</td>
      <td className="task-table__row__elem detail issue">{issue}</td>
      <td className="task-table__row__elem detail priority">{priority}</td>
      <td className="task-table__row__elem detail note">{note}</td>
      <td className="task-table__row__elem detail location">{location}</td>
    </tr>
  )
}

const Task = ({ scooter }) => {
  return (
    <div className="task">
      <h2>{scooter.name}</h2>
      <p>{scooter.issue}</p>
      <p>{scooter.note}</p>
      <p>{scooter.priority}</p>
      <p>{scooter.location}</p>
    </div>
  )
}