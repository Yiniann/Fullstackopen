const Person=({person,onDelete})=>{
    return(
        <li>
            {person.name} {person.number}
            <button onClick={()=>onDelete(person.id, person.name)}>Delete</button>
        </li>
    )
}
export default Person