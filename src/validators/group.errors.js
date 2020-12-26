'use strict';

let message

function GroupErrors() {    
    message = ''
}

GroupErrors.prototype.Group = (array) => {

    for(let i=0; i < array.length; i++) {
        message = message + array[i].message        
    }

    return message
}

module.exports = GroupErrors;