const initState = {
    credential: {
        username: "",
        role: "",
        session: false,
    },
    customer_info: {
        fullname: "",
        address: "",
        district: "",
        city: "",
        postal_code: "",
        phone: "",
        email: "",
    }
}

export default ( state = initState, action ) => {
    switch (action.type) {
        case 'session/retrieve':

            const { sessionCredential, customer_info } = action.payload;

            if( sessionCredential.role === "user" ){
                return { ...state, credential : sessionCredential, customer_info: customer_info };
            }else{
                return { ...state, credential : sessionCredential };
            }
            return state;

            break;
        default:
            return state;
    }
}
