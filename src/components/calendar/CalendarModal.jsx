import React, { useState } from 'react';
import Modal from 'react-modal';
import moment from 'moment';
import DateTimePicker from 'react-datetime-picker';
import './modalStyle.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };
  Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const end = now.clone().add(1,'hours');

export const CalendarModal = () => {
    const [dateStart, setDateStart] = useState(now.toDate());
    const [dateEnd, setDateEnd] = useState(end.toDate());

    const [formValues, setFormValues] = useState({
        title: 'Evento',
        notes:'',
        startDate:now.toDate(),
        endDate:end.toDate()
    })
    const {title, notes, startDate, endDate} = formValues;
    
    const handleInputChange = ({target}) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }
    const closeModal = () => {
    }
    const handleStartDate = (e) =>{
        setDateStart(e);
        setFormValues({
            ...formValues,
            startDate: e
        })
    }
    const handleEndDate = (e) =>{
        setDateEnd(e);
        setFormValues({
            ...formValues,
            endDate: e
        })
    }
    const handleSubmitForm = (e) =>{
        e.preventDefault();
        const momentStart = moment(startDate);
        const momentEnd = moment(endDate);

        if (momentStart.isSameOrAfter(momentEnd)) {
            console.log("error");
            return toast.info('🦄 La fecha final debe ser mayor a la fecha de inicio', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
    }

    return (
        <Modal
          isOpen={true}
        //   onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          closeTimeoutMS={200}
          contentLabel="Example Modal"
          className="modal"
          overlayClassName="modal-fondo"
        > 
            <h1 className='modal-title'> Nuevo evento </h1>
            <hr />
            <form 
                className="container"
                onSubmit={handleSubmitForm}
            >

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={handleStartDate}
                        value={dateStart}
                        maxDate={dateEnd}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={handleEndDate}
                        value={dateEnd}
                        minDate={dateStart}
                        className="form-control"
                    />
                </div>
                    <ToastContainer
                        position="top-center"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className="form-control"
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={handleInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
