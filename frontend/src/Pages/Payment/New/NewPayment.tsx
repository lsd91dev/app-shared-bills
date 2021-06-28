import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';

import { PaymentInterface } from '../../../Interfaces/payment.interface';
import { Loading } from '../../../Shared/components/loading/Loading';
import { newPayment } from "../../../Services/payment/newPayment";
import { ResponsePaymentContext } from '../../../Providers/Response/response.payment.provider';

import './index.css'
import { ErrorForm } from '../../../Shared/components/error-form/ErrorForm';

export const NewPayment = () => {
    const {register, handleSubmit, formState: { errors }, reset } = useForm<PaymentInterface>();
    const { setResponsePayment } = useContext(ResponsePaymentContext);
    // const [ errorsResponse, setErrors ] = useState();
    
    const [ loading, setLoading ] = useState(  false )
    
    const loadingObject = {
        loading,
        message: 'Saving new payment.'
    }

    const onSubmit = ( data: any, e: any ) => {
        e.preventDefault();
        setLoading( true );
        setTimeout( async () => {
            try {
                const { payment } = await newPayment( data );
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
                        id="owner_payment"
                        {...register('owner_payment', { required: true } ) }
                        placeholder="e.g. John Doe"
                        className="form__input"
                    />
                    <label 
                        htmlFor="name"
                        className="form__label"> Payment's owner 
                    </label>
                    { errors.owner_payment && < ErrorForm message="Field required" /> }
                </div> 
            
                
            <div className="form__group">
                <input 
                    type="text" 
                    id="description"
                    {...register("description")}
                    placeholder="Dinner"
                    className="form__input"
                />
                <label 
                    htmlFor="description"
                    className="form__label"
                    > Description 
                </label>
                
            </div>
            
            <div className="form__group">
                <input 
                    type="text"  
                    {...register("total_amount", { required: true } ) }
                    placeholder="10"
                    className="form__input"
                />  
                <label 
                    htmlFor="amount"
                    className="form__label"
                    > Amount 
                    </label>
            { errors.total_amount?.type === 'required' && < ErrorForm message="Field required" /> }
            { errors.total_amount?.type === 'pattern' && < ErrorForm message="Only number allowed" /> }
            </div>


            <button className="form__button"> Submit </button>
        </form>
        </div>
    )
}
