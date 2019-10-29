// File created to separate normal business logic from express logic

async function splitPacket(packet) {
    var batteries = packet.split('&')[0].split(',')
    var vitals = packet.split('&')[1].split('/')

    var thermometerPacket = { battery: batteries[0], risk: vitals[0].split('=')[0], raw: vitals[0].split('=')[1] };
    var ecgPacket = { battery: batteries[1], risk: vitals[1].split('=')[0], raw: vitals[1].split('=')[1] };
    var oximeterPacket = { battery: batteries[2], risk: vitals[2].split('=')[0], raw: vitals[2].split('=')[1] };
    var bpmsPacket = { battery: batteries[3], risk: vitals[3].split('=')[0], raw: vitals[3].split('=')[1] };
    var bpmdPacket = { battery: batteries[3], risk: vitals[4].split('=')[0], raw: vitals[4].split('=')[1] };
    var patientRiskPacket = { data: vitals[5], alert: Number(vitals[5]) > 60 ? true : false }

    return [thermometerPacket, ecgPacket, oximeterPacket, bpmsPacket, bpmdPacket, patientRiskPacket];
}

async function emitVitalChannels(socket, array, session) {
    socket.emit('thermometerChannel=' + session, array[0]);
    socket.emit('ecgChannel=' + session, array[1]);
    socket.emit('oximeterChannel=' + session, array[2]);
    socket.emit('bpmsChannel=' + session, array[3]);
    socket.emit('bpmdChannel=' + session, array[4]);
    socket.emit('patientChannel=' + session, array[5]);
}

async function handlePacket(ws,packet, session) {
    var packets = await splitPacket(packet);
    emitVitalChannels(ws, packets, session);
}

module.exports.handlePacket = handlePacket