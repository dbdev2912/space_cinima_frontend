const initState = {
    data: "del co gi ca",
}

export default ( state = initState, action ) => {
    switch (action.type) {
        case 'noop':
            console.log("Nothing");
            return state;
            break;
        default:
            return state;
    }
}
