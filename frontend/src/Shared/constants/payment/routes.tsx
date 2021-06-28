import React from 'react'

export default Object.freeze({

    HOME: {
        name: 'Home',
        route:'/',
        component: React.lazy( () => import('../../../Pages/Payment/List/Payments').then(({ Payments }) => ({ default: Payments })))
    },

    NEW_PAYMENT: {
        name: 'NewPayment',
        route:'/payment/new',
        component: React.lazy( () => import('../../../Pages/Payment/New/NewPayment').then(({ NewPayment }) => ({ default: NewPayment })))
    },

    PAYMENT: {
        name: 'Payment',
        route: '/payment/:id',
        component: React.lazy( () => import('../../../Pages/Payment/Get/Payment').then(({ Payment }) => ({ default: Payment })))
    },
    
    
});
