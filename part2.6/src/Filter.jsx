const Filter = ({filter, onFilterChange})=>{
    return(
        <div>
            Filter show with: <input value={filter} onChange={onFilterChange} />
        </div>
    )
}
export default Filter