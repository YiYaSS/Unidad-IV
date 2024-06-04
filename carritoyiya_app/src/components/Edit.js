import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getDoc, updateDoc, doc } from "firebase/firestore"
import { db } from "../firebaseConfig/firebase"

const Edit = () => {
    const [ nombre, setNombre ] = useState('')
    const [ piezas, setPiezas ] = useState(0)
    const [ precio, setPrecio ] = useState(0)
    const [ stock, setStock ] = useState(0)
    const [ talla, setTalla ] = useState('')

    const navigate = useNavigate()    
    const {id} = useParams()

    const update = async (e) => {
        e.preventDefault()
        const product = doc(db, "uniformes", id)
        const data = {nombre: nombre, piezas: piezas, precio: precio, stock: stock, talla: talla}
        await updateDoc(product, data)
        navigate('/')
    }

    const getProductById = async (id) => {
        const product = await getDoc( doc(db, "uniformes", id) )
        if(product.exists()) {
            //console.log(product.data())
            setNombre(product.data().nombre)
            setPiezas(product.data().piezas)
            setPrecio(product.data().precio)
            setStock(product.data().stock)
            setTalla(product.data().talla)
        }else{
            console.log('El producto no existe')
        }
    }

    useEffect( () => {
        getProductById(id)
        // eslint-disable-next-line
    }, [])

    return (
        <div className='container'>
        <div className='row'>
            <div className='col'>
                <h1>Edit Product</h1>
                 <form onSubmit={update}>
                    <div className='mb-3'>
                        <label className='form-label'>Nombre</label>
                        <input
                            value={nombre}
                            onChange={ (e) => setNombre(e.target.value)} 
                            type="text"
                            className='form-control'
                        />
                    </div>
          
                    <div className='mb-3'>
                        <label className='form-label'>Piezas</label>
                        <input
                            value={piezas}
                            onChange={ (e) => setPiezas(e.target.value)} 
                            type="number"
                            className='form-control'
                        />
                    </div> 

                    <div className='mb-3'>
                        <label className='form-label'>Precio</label>
                        <input
                            value={precio}
                            onChange={ (e) => setPrecio(e.target.value)} 
                            type="number"
                            className='form-control'
                        />
                    </div> 

                    <div className='mb-3'>
                        <label className='form-label'>Stock</label>
                        <input
                            value={stock}
                            onChange={ (e)=> setStock(e.target.value)} 
                            type="number"
                            className='form-control'
                        />                 
                    </div>  

                    <div className='mb-3'>
                        <label className='form-label'>Talla</label>
                        <input
                            value={talla}
                            onChange={ (e)=> setTalla(e.target.value)} 
                            type="text"
                            className='form-control'
                        />                 
                    </div>
                    
                    <button type='submit' className='btn btn-primary'>Store</button>
                 </form>   
            </div>
        </div>
    </div> 
  )
}

export default Edit