const { REACT_APP_URL } = process.env;

export const listPayments = async ( signal : any ) => {
        const response = await fetch(`${ REACT_APP_URL }/payment`, signal);
        return response.json();
}