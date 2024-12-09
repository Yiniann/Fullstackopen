import axios from 'axios'
const baseUrl ='http://203.55.176.209:3001/persons'

const getAll =()=>{
    const request = axios.get(baseUrl)
    return request.then(res=>res.data)
}

const create =(personObject)=>{
    const request = axios.post(baseUrl,personObject)
    return request.then(res=>res.data)
}

const update =(id,personObject)=>{
    const request = axios.put(`${baseUrl}/${id}`,personObject)
    return request.then(res=>res.data)
}
const deletePerson =(id)=>{
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(()=>{
        console.log(`Deleted person with id: ${id}`)
    })
}

export default{getAll, create, update, deletePerson}