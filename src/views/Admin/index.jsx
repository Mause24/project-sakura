import { Delete, Edit, FormatTextdirectionLToR } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import DataTable from '../../components/UI/DataTable'
import Input from '../../components/UI/Input'
import Select from '../../components/UI/Select'
import '../../styles/Admin.css'
import { isEmpty } from '../../utils/object'
import { dataBase } from '../firebase'

const Admin = () => {
    const INITIAL_STATE = {
        categoria: {},
        tipo: {},
        descripcion: '',
        ubicacion: '',
        fecha: new Date(),
    }
    const DATABASE = '123456789';

    const [form, setForm] = useState(INITIAL_STATE)
    const [id, setId] = useState(-1)
    const [metodo, setMetodo] = useState("")
    const [db, setDb] = useState(
        {
            categoriaBD: [
                {
                    label: 'Mantenimiento de Inmuebles',
                    value: 1,
                    tipos: [
                        {
                            label: 'Baños',
                            value: 1
                        },
                        {
                            label: 'Cielo Raso',
                            value: 2
                        },
                        {
                            label: 'Eléctrico',
                            value: 3
                        },
                        {
                            label: 'Pared',
                            value: 4
                        },
                        {
                            label: 'Puerta',
                            value: 5
                        },
                    ]
                },
                {
                    label: 'Mantenimiento de muebles',
                    value: 2,
                    tipos: [
                        {
                            label: 'Aire acondicionado',
                            value: 1
                        },
                        {
                            label: 'Archivador',
                            value: 2
                        },
                        {
                            label: 'Puesto de trabajo',
                            value: 3
                        },
                        {
                            label: 'Silla',
                            value: 4
                        },
                    ]
                },
                {
                    label: 'Servicios',
                    value: 3,
                    tipos: [
                        {
                            label: 'Aseo',
                            value: 1
                        },
                        {
                            label: 'Transporte',
                            value: 2
                        },
                        {
                            label: 'Vigilancia',
                            value: 3
                        },
                    ]
                },
            ],
            data: [],
            header: [
                {
                    label: 'CATEGORIA',
                    value: 'categoria'
                },
                {
                    label: 'DESCRIPCION',
                    value: 'descripcion'
                },
                {
                    label: 'FECHA',
                    value: 'fecha'
                },
                {
                    label: 'TIPO',
                    value: 'tipo'
                },
                {
                    label: 'UBICACION',
                    value: 'ubicacion'
                },
                {
                    label: 'ACCIONES',
                    value: 'z'
                },
            ]
        }
    )
    const postRegistro = async () => {
        try {
            const nuevoRegistro = {
                categoria: form.categoria.label,
                tipo: form.tipo.label,
                descripcion: form.descripcion,
                ubicacion: form.ubicacion,
                fecha: form.fecha.toString(),
            }
            const dato = await dataBase.collection(DATABASE).add(nuevoRegistro);
            if (dato) {
                console.log("HA SIDO CREADO!");
                setForm(INITIAL_STATE)
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = name => e => {
        if (name === 'categoria') {
            setForm({ ...form, [name]: db.categoriaBD.find(item => item.value === +e.target.value) });
        }
        else if (name === 'tipo') {
            setForm({ ...form, [name]: form.categoria.tipos.find(item => item.value === +e.target.value) });
        } else {
            setForm({ ...form, [name]: e.target.value });
            console.log(form);
        }
        console.log(form);
    }

    const handleForm = (id, metodo) => {
        setMetodo(metodo)
        setId(id)
        getRegistro(id)
    }

    const obtenerDatos = async () => {
        try {
            const data = await dataBase.collection(DATABASE).get();
            const arrayData = data.docs.map((doc) => ({
                ...doc.data(),
                x:
                    <div className='container__buttons'>
                        <button className='admin__btn btn--warning' onClick={() => handleForm(doc.id, 'PUT')}>
                            <Edit />
                        </button>
                        <button className='admin__btn btn--danger' onClick={() => deleteRegistro(doc.id)}>
                            <Delete />
                        </button>
                    </div>
            }));
            setDb({ ...db, data: arrayData });
        } catch (error) {
            console.log(error);
        }
    };

    const putRegistro = async () => {
        try {
            const body = modelarDatos()
            const datos = await dataBase.collection(DATABASE).doc(id).update(body);
            Swal.fire('OK!', 'SE HA ACTUALIZADO CORRECTAMENTE', 'success')
            window.location.reload();
            setId(-1)
        } catch (error) {
            console.error(error);
        }
    }

    const deleteRegistro = async (id) => {
        try {
          await dataBase.collection(DATABASE).doc(id).delete();
          Swal.fire('OK!', 'SE HA ELIMINADO CORRECTAMENTE', 'success')
          setId(-1)
          window.location.reload();
        } catch (error) {
          console.log(error);
        }
      };


    const getRegistro = async (ide) => {
        try {
            const registro = await (await dataBase.collection(DATABASE).doc(ide).get()).data();
            const categoria = db.categoriaBD.find(item => item.label === registro.categoria)
            setForm({
                categoria: categoria,
                tipo: categoria.tipos.find(item=>item.label===registro.tipo),
                descripcion: registro.descripcion,
                ubicacion: registro.ubicacion,
                fecha: registro.fecha,
            })
        } catch (error) {
            console.error(error);
        }

    }

    const modelarDatos = () => ({
        categoria: form.categoria.label,
        tipo: form.tipo.label,
        descripcion: form.descripcion,
        ubicacion: form.ubicacion,
        fecha: form.fecha,
    })

    useEffect(() => {
        obtenerDatos()
    }, [])

    return (
        <div className='admin'>
            <div className='admin__content'>
                <h3>Registrar</h3>
                <Select
                    id='categoria'
                    className={'input--select'}
                    defaultOption='Seleccione una opcion'
                    onChange={handleChange('categoria')}
                    value={form.categoria}
                    disabled={metodo === 'GET'}
                    options={db.categoriaBD}
                />
                <Select
                    id='tipo'
                    className={'input--select'}
                    defaultOption='Seleccione una opcion'
                    onChange={handleChange('tipo')}
                    value={form.tipo}
                    options={!isEmpty(form.categoria) ? form.categoria.tipos : []}
                    disabled={isEmpty(form.categoria) || metodo === 'GET'}
                />
                <h3>Adicionales</h3>
                <Input
                    id={'descripcion'}
                    className={'input--text'}
                    placeholder={'Descripcion'}
                    type={'text'}
                    disabled={metodo === 'GET'}
                    value={form.descripcion}
                    onChange={handleChange('descripcion')}
                />
                <Input
                    id={'ubicacion'}
                    placeholder={'Ubicacion'}
                    className={'input--text'}
                    type={'text'}
                    value={form.ubicacion}
                    disabled={metodo === 'GET'}
                    onChange={handleChange('ubicacion')}
                />
                <Input
                    id={'fecha'}
                    className={'input--text'}
                    type={'date'}
                    disabled={metodo === 'GET'}
                    value={form.fecha}
                    onChange={handleChange('fecha')}
                />
                <Input
                    id={'registrar'}
                    className={'input--btn'}
                    type={'button'}
                    disabled={metodo === 'GET'}
                    value={metodo === 'PUT' ? 'Actualizar' : 'Registrar'}
                    onClick={() => metodo === 'PUT' ? putRegistro() : postRegistro()}
                />
                {
                    db.data.length !== 0 &&
                    <div style={{ width: '100%', marginTop: '10px' }}>
                        <DataTable
                            headers={db.header}
                            data={db.data}
                        />
                    </div>
                }
            </div>
        </div>
    )
}

export default Admin