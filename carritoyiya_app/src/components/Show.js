import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {collection, getDocs, getDoc, deleteDoc, doc} from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'

import Swal from 'sweetalert2'
import  withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

const Show = () => {

    //1.- Configurar los hoods
    const [uniformes, SetProducts] = useState ( [] )

    //2.- Referencias a la BD firestore
    const productsCollection = collection(db, "uniformes")

    //3.- Funcion para mostrar todos los docs
    const getProducts = async () => {
       const data = await getDocs(productsCollection)
       //console.log (data.docs)
       SetProducts(
        data.docs.map(  (doc) => ( {...doc.data(), id:doc.id})) 
       )
       console.log(uniformes)
    }

    //4.- Funcion para eliminar un doc
    const deleteProduct = async (id) => {
        const productDoc = doc(db, "uniformes", id)
        await deleteDoc (productDoc)
        getProducts()
    }

    //5.- Funcion de confirmación para Sweet Alert 2
    const confirmDelete = (id) => {
        MySwal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
              //Funcion eliminar
              deleteProduct(id)
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          })

    }

    //6.- Usamos useEffect
    useEffect (() => {
        getProducts ()
        //eslint-disable-next-line

    }, [] )

    //7.- Devolvemos vista de nuestro componente

  return (
    <>
    <div className='container'>
        <div className='row'>
            <div className='col'>
                <div className="d-grid gap-2">
                    <Link to= "/create" className='btn btn-secondary mt-2 mb-2'>Create</Link>
                </div>

                <table className='table table-dark table-hover'>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Piezas</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Talla</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        { uniformes.map ( (uniforme) => (
                            <tr key={uniforme.id}>
                                <td>{uniforme.nombre}</td>
                                <td>{uniforme.piezas}</td>
                                <td>{uniforme.precio}</td>
                                <td>{uniforme.stock}</td>
                                <td>{uniforme.talla}</td>
                                <td>
                                    <Link to={`/edit/${uniforme.id}`} className= "btn btn-light"><i className="fa-regular fa-pen-to-square"></i></Link>
                                    <button onClick={() => { confirmDelete(uniforme.id) } } className="btn btn-danger"><i className="fa-regular fa-trash-can"></i></button>
                                </td>
                            </tr>
                        )) }

                    </tbody>

                </table>
            </div>
        </div>
    </div>
    </>
  )
}

export default Show
