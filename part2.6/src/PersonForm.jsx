const PersonForm =({newName,newNumber,onSubmit,onNumberChange,onNameChange})=>{
    return(
        <form onSubmit={onSubmit}>
            <div>
                name:<input value={newName} onChange={onNameChange}/>
            </div>
            <div>
                number: <input value={newNumber} onChange={onNumberChange}/>
            </div>
            <div>
            <button type="submit">save</button>
            </div>
        </form>
    )
}
export default PersonForm