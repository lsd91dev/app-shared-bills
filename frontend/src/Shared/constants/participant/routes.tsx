import React from 'react'

export default Object.freeze({

    NEW_PARTICIPANT: {
        name: 'NewParticipant',
        route:'/participant/new/:id',
        component: React.lazy( () => import('../../../Pages/Participant/New/NewParticipant').then(({ NewParticipant }) => ({ default: NewParticipant })))
    }
    
});