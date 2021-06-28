import { ParticipantInterface } from "../../Interfaces/participant.interface";
const { REACT_APP_URL } = process.env;

export const newParticipant = async ( participant  : ParticipantInterface ) => {
        const response = await fetch(`${ REACT_APP_URL }/participant/new`, getRequestOptions('POST', participant ) );
        return response.json();
}


const getRequestOptions = (method: string, payload: any): {} => {
    return {
        method,
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify( payload )
    }
}