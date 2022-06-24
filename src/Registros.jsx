import React from 'react'
import { db } from '../firebase'
const categorias = [
  {
    "nombre": "Mantenimiento Inmuebles",
    "reporte": ["Baños", "Cielo raso", "Electrico", "Pared", "Puerta"]
  },
  {
    "nombre": "Mantenimiento Muebles",
    "reporte": ["Aire acondicionado", "Archivador", "Puesto de trabajo", "Silla"]
  },
  {
    "nombre": "Servicios",
    "reporte": ["Aseo", "Transporte", "Vigilancia"]
  }
]
const Registros = (props) => {
  const [Modo, setModo] = React.useState('-1')
  const [Cateria1, setCategoria1] = React.useState('')
  const [reporte1, setReporte1] = React.useState('')
  const [Ubicacion, setUbicacion] = React.useState('')
  const [descripcion, setDescripcion] = React.useState('')
  const [fecha, setFecha] = React.useState('')
  const [id, setId] = React.useState('')
  const [lista, setLista] = React.useState([])
  const [modoEdicion, setModoEdicion] = React.useState(false)
  const [error, setError] = React.useState(null)
  React.useEffect(() => {
    const obtenerDatos = async () => {
      try {

        const data = await db().collection(props.user.email).get()
        const ArryData = data.docs.map(doc => ({
          id: doc.id, ...doc.data()
        }))
        console.log(ArryData)
        setLista(ArryData)
      } catch (error) {
        console.log(error)
      }
    }
    obtenerDatos()
  }, [])
  const guardarDatos = async (e) => {
    e.preventDefault()
    if (!Cateria1.trim()) {
      setError('Escoja una categoria')
      return
    }
    if (!reporte1.trim()) {
      setError('Escoja un reporte')
      return
    }
    if (!descripcion.trim()) {
      setError('Ingrese una descripcion')
      return
    }
    if (!Ubicacion.trim()) {
      setError('Ingrese la ubicacion')
      return
    }
    if (!fecha.trim()) {
      setError('Ingrese una fecha')
      return
    }
    try {

      const nuevoUsuario = { Cateria1, reporte1, descripcion, Ubicacion, fecha }
      const dato = await db().collection(props.user.email).add(nuevoUsuario)
      setLista([
        ...lista, { ...nuevoUsuario, id: dato.id }
      ])
    } catch (error) {
      console.log(error)
    }
    setCategoria1('')
    setReporte1('')
    setDescripcion('')
    setUbicacion('')
    setFecha('')
    setError('')
  }
  const HandlerCargar = function (e) {
    const opcion = e.target.value;
    console.log(opcion)
    setModo(opcion)
  }
  const HandlerCargarCategoria = function (e) {
    const op = e.target.value;
    console.log(op)
    setCategoria1(op)
  }
  const HandlerCargarReporte = function (e) {
    const option = e.target.value;
    console.log(option)
    setReporte1(option)
  }
  const editar = (elemento) => {
    setModoEdicion(true)//cambiar modo edicion a verdadero
    //se actualiza estados para que los datos aparezcan en input
    setCategoria1(elemento.Cateria1)
    setReporte1(elemento.reporte1)
    setDescripcion(elemento.descripcion)
    setUbicacion(elemento.Ubicacion)
    setFecha(elemento.fecha)
    setId(elemento.id)

  }
  const editarDatos = async (e) => {
    e.preventDefault()
    if (!Cateria1.trim()) {
      setError('Escoja una categoria')
      return
    }
    if (!reporte1.trim()) {
      setError('Escoja un reporte')
      return
    }
    if (!descripcion.trim()) {
      setError('Ingrese una descripcion')
      return
    }
    if (!Ubicacion.trim()) {
      setError('Ingrese la ubicacion')
      return
    }
    if (!fecha.trim()) {
      setError('Ingrese una fecha')
      return
    }
    try {
      await db().collection(props.user.email).doc(id).update({
        Cateria1, reporte1, descripcion, Ubicacion, fecha
      })
      const listaEditada = lista.map(
        (elemento) => elemento.id === id ? { id: id, Cateria1: Cateria1, reporte1: reporte1, descripcion: descripcion, Ubicacion: Ubicacion, fecha: fecha } :
          elemento)
      //listar con los valores nuevos...lista nueva
      setLista(listaEditada)
    } catch (error) {
      setCategoria1('')
      setReporte1('')
      setDescripcion('')
      setUbicacion('')
      setFecha('')
      setError('')
    }

  }
  const eliminarDato = async (id) => {
    await db().collection(props.user.email).doc(id).delete()

    const listaFiltrada = lista.filter((elemento) => elemento.id !== id)
    setLista(listaFiltrada)
  }
  return (
    <div className='row justify-content-center'>
      <div className="col-12 col-sm-10 col-md-6 col-xl-4">



        <form onSubmit={modoEdicion ? editarDatos : guardarDatos}>
          {
            error && (<div className='alert alert-danger'>
              {error}
            </div>)
          }
          <h4 className="text-center mb-3">{
            modoEdicion ? 'Editar Datos' : 'Registrar'
          }</h4>
          <select className="form-select mb-3" name="Categorias" id="SelCategorias" onClick={HandlerCargar} onClickCapture={HandlerCargarCategoria}>
            <option value={-1}> Selecione un reporte</option>
            {
              categorias.map((item, i) => (
                <option key={"categoria" + i} value={i}>{item.nombre}</option>
              ))
            }
          </select>


          <h4 className="text-center mb-3">Reporte</h4>
          <select className="form-select mb-3" name="Articulos" id="SelArticulos" onClickCapture={HandlerCargarReporte}>
            {
              Modo > -1 &&
              (categorias[Modo].reporte.map((item, i) => (
                <option key={"reporte" + i} value={item}>{item}</option>

              )))
            }
          </select>
          <h4 className="text-center mb-3">Adicionales</h4>
          <input type="text"
            className='form-control mb-3'
            placeholder='Descripción de la solicitud'
            onChange={(e) => { setDescripcion(e.target.value) }}
          />
          <input type="text"
            className='form-control mb-3'
            placeholder='Ubicación dentro de la empresa'
            onChange={(e) => { setUbicacion(e.target.value) }}
          />
          <input type="date"
            className='form-control mb-3'
            placeholder='Fecha de la solicitud'
            onChange={(e) => { setFecha(e.target.value) }}
          />
          <button className="btn btn-primary mb-3" type="submit">Registrar</button>
        </form>

      </div>
      <h4 className='text-center'>Lista de reportes</h4>
      <ul className="list-group">
        {
          lista.length === 0 ? <li className="list-group-item">No existen Usuarios</li> :
            (
              lista.map((elemento) => (
                <li className="list-group-item" key={elemento.id}><span className="lead">
                  {elemento.Cateria1}{' '} {elemento.reporte1} {elemento.descripcion} {elemento.Ubicacion} {elemento.fecha}
                </span>
                  <button className="btn btn-success btn-sm mx-2 float-end"
                    onClick={() => editar(elemento)}
                  >Editar</button>
                  <button className="btn btn-danger btn-sm mx-2 float-end"
                    onClick={() => eliminarDato(elemento.id)}
                  >Eliminar</button>
                </li>
              ))
            )
        }
      </ul>
    </div>
  )
}

export default Registros