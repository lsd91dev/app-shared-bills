import { ReactElement } from 'react'

export const Balance = ( { balance }: any): ReactElement => {
    return (
        <div>
            <h3> General balance </h3> 
            { balance.map( ( item : any, key : any ) => {
               return  (
                   <div key={ key }> 
                       <p> { item.name }  <span> { item.balance } </span> </p>
                   </div>
               );
            })}
        </div>
    )
}
