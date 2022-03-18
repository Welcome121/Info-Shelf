import React, { useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import 'date-fns'
import { useSelector, useDispatch } from 'react-redux' 
import { useForm, Form } from '../../components/useForm'
import Controls from '../../components/controls/Controls'

const priorityItems = [
    {id: '1', title: 'Baixa'},
    {id: '2', title: 'Média'},
    {id: '3', title: 'Alta'},
    {id: '4', title: 'Urgente'},
]

const initialFValues = {
    id_funcionario: '',
    id_cliente: '',
    id_endereco: '',
    id_servico: '',
    prioridade: '1',
    tempo_estimado: '',
    timestamp_inicio: new Date()
}

export default function OrderForm(props) {

    const { newOrder, updateOrder, recordForEdit, setRecordForEdit, openPopup, isEditModal } = props
    const workers = useSelector(state => state.workers.array)
    const customers = useSelector(state => state.customers.array)
    const services = useSelector(state => state.services.array)
    const adresses = useSelector(state => state.adresses.array)

    const validate = (fieldValues = values) => {
        let aux = {...errors}

        if('id_funcionario' in fieldValues)
            aux.id_funcionario = fieldValues.id_funcionario.length != 0 ? "" : "Campo obrigatório"
        if('id_cliente' in fieldValues)
            aux.id_cliente = fieldValues.id_cliente.length != 0 ? "" : "Campo obrigatório"
        if('id_endereco' in fieldValues)
            aux.id_endereco = fieldValues.id_endereco.length != 0 ? "" : "Campo obrigatório"
        if('id_servico' in fieldValues)
            aux.id_servico = fieldValues.id_servico.length != 0 ? "" : "Campo obrigatório"
        if('tempo_estimado' in fieldValues)
            aux.tempo_estimado = (!isNaN(fieldValues.tempo_estimado)) && (fieldValues.tempo_estimado.length != 0) ? "" : "Campo obrigatório. OBS: apenas números inteiros"

        setErrors({
            ...aux
        })

        if(fieldValues == values)
            return Object.values(aux).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(recordForEdit == null){
            if (validate()) newOrder(values)
        }

        if(recordForEdit != null)
            updateOrder(values, recordForEdit.id)
            setRecordForEdit(null)

    }

    useEffect(() => {
        if (recordForEdit != null) {
            setValues({
                id_funcionario: recordForEdit.funcionario.id.toString(),
                id_cliente: recordForEdit.cliente.id.toString(),
                id_endereco: recordForEdit.endereco.id.toString(),
                id_servico: recordForEdit.servico.id.toString(),
                prioridade: recordForEdit.prioridade.toString(),
                tempo_estimado: recordForEdit.tempo_estimado.toString(),
                timestamp_inicio: recordForEdit.timestamp_inicio * 1000
            })
        }

    }, [recordForEdit])

    useEffect(() => {
        if(openPopup === false) {
            console.log('form resetado')
            resetForm()
            setRecordForEdit(null)
        }
    }, [openPopup])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Select
                        name='id_funcionario'
                        label='Funcionário'
                        value={values.id_funcionario}
                        onChange={handleInputChange}
                        options={workers}
                        error={errors.id_funcionario}
                    />
                    <Controls.Select
                        name='id_cliente'
                        label='Cliente'
                        value={values.id_cliente}
                        onChange={handleInputChange}
                        options={customers}
                        error={errors.id_cliente}
                    />
                    <Controls.Select
                        name='id_servico'
                        label='Serviço'
                        value={values.id_servico}
                        onChange={handleInputChange}
                        options={services}
                        error={errors.id_servico}
                    />
                    <Controls.Select
                        name='id_endereco'
                        label='Endereço'
                        value={values.id_endereco}
                        onChange={handleInputChange}
                        options={adresses}
                        error={errors.id_endereco}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.RadioGroup
                        name='prioridade'
                        label='Nível de prioridade'
                        value={values.prioridade}
                        onChange={handleInputChange}
                        items={priorityItems}
                    />
                    <Controls.Input
                        name="tempo_estimado"
                        label="Duração do serviço(minutos)"
                        value={values.tempo_estimado}
                        onChange={handleInputChange}
                        error={errors.tempo_estimado}
                    />
                    <Controls.DatePicker 
                        name="timestamp_inicio"
                        label="Início do serviço"
                        value={values.timestamp_inicio}
                        onChange={handleInputChange}
                    />
                    <div>
                        <Controls.Button
                            type="submit"
                            text={isEditModal? "EDITAR" : "ADICIONAR"}
                        />
                        <Controls.Button
                            color="secondary"
                            text="LIMPAR"
                            onClick={resetForm}
                        />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}