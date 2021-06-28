import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Loading } from '../../../Shared/components/loading/Loading';
import { newParticipant } from "../../../Services/participant/newParticipant";
import { ResponsePaymentContext } from '../../../Providers/Response/response.payment.provider';

import './index.css'
import { ErrorForm } from '../../../Shared/components/error-form/ErrorForm';
import { ParticipantInterface } from '../../../Interfaces/participant.interface';
import { useParams } from 'react-router-dom';

export const NewParticipant = () => {
    let { id }  = useParams<{ id: string }>();
    
    const {register, handleSubmit, formState: { errors }, reset } = useForm<ParticipantInterface>();
    const { setResponsePayment } = useContext(ResponsePaymentContext);
    // const [ errorsResponse, setErrors ] = useState();
    
    const [ loading, setLoading ] = useState(  false )
    
    const loadingObject = {
        loading,
        message: 'Adding friend.'
    }

    const onSubmit = ( data: any, e: any ) => {
        e.preventDefault();
        setLoading( true );
        setTimeout( async () => {
            try {
                const participantDTO : ParticipantInterface = {
                    payment_id : id,
                    ...data
                }
                const { payment } = await newParticipant( participantDTO );
                setResponsePayment({ data: payment });
                setLoading(false);
                reset();
            }catch( error ){
                console.log( error );
                setLoading(false);
            }
        }, 1500 )
}
    
    return (
        <div className="wrapper">

            { loading && <Loading { ...loadingObject } /> }

            <form 
                className="form fadeIn" 
                onSubmit={ handleSubmit(onSubmit) }
                autoComplete="off"
            >
                <div className="form__group">
                    <input 
                        type="text" 
                        id="name"
                        {...register('name', { required: true } ) }
                        placeholder="e.g. John Doe"
                        className="form__input"
                    />
                    <label 
                        htmlFor="name"
                        className="form__label"> Friend's name 
                    </label>
                    { errors.name && < ErrorForm message="Field required" /> }
                </div> 
            
            <div className="form__group">
                <input 
                    type="text"  
                    {...register("amount", { required: true } ) }
                    placeholder="10"
                    className="form__input"
                />  
                <label 
                    htmlFor="amount"
                    className="form__label"
                    > Amount 
                    </label>
            { errors.amount?.type === 'required' && < ErrorForm message="Field required" /> }
            { errors.amount?.type === 'pattern' && < ErrorForm message="Only number allowed" /> }
            </div>


            <button className="form__button"> Add friend </button>
        </form>
        </div>
    )
}
