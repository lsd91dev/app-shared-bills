const { REACT_APP_URL } = process.env;

export const getPayment = async ( id: string, signal : any ) => {
    const response = await fetch(`${ REACT_APP_URL }/payment/${ id }`, signal); 
    return response.json();
}