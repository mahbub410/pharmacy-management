import {eventBus } from "./eventBus"

export const showErrorMsg = (msg) => {

    let errorMessage = msg || 'Something went wrong..!!'
    if (msg.response) {
        errorMessage = msg.response.data.message;
    }
    eventBus.emit("toast", {
        type: "Error",
        message: errorMessage,
    });
}

export const showSuccessMsg = (msg) => {

    let successMessage = msg || 'Something went wrong..!!'
    if (msg.data) {
        successMessage = msg.data.message;
    }
    eventBus.emit("toast", {
        type: "Success",
        message: successMessage,
    });
}