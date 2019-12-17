// File created to separate normal business logic from express logic

async function emitVitalChannels(socket, packet, session) {
    socket.emit('thermometerChannel=' + session, packet['ThermometerPacket']);
    socket.emit('ecgChannel=' + session,  packet['EcgPacket']);
    socket.emit('oximeterChannel=' + session,  packet['OximeterPacket']);
    // socket.emit('bpmsChannel=' + session, packet['BpmsPacket'] );
    // socket.emit('bpmdChannel=' + session,  packet['ThermometerPacket']);
    socket.emit('patientChannel=' + session,  packet['PatientPacket']);
}

async function handlePacket(ws,packet, session) {    
    emitVitalChannels(ws, packet, session);
}

module.exports.handlePacket = handlePacket