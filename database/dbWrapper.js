const { Client } = require('pg')


class dataBaseWrapper {

    async connect() {
        await this.client.connect()
        console.log('Connected!')
    }

    async getRelCosData(session) {
        var res = this.client.query(`select timeinserted, reliability, cost from relialibilitycostdata where sessionId = ${session} and timeinserted >= (select now() - INTERVAL '30 min');`)
        return res;
    }

    async insertRelCosData(session, dateString, reliability, cost) {
        var res = this.client.query(`insert into relialibilitycostdata(sessionId,timeInserted,reliability, cost) values (${session},\'${dateString}\', ${reliability}, ${cost});`)
        return res;
    }

    async cleanDatabase() {
        var res = this.client.query(`delete from relialibilitycostdata where timeinserted < (select now() - INTERVAL '30 min');`)
        return res;
    }

    async diconnect() {
        await this.client.end()
        console.log('Disconnected!')
    }

    constructor() {
        this.client = new Client(
            {
                connectionString: 'postgres://cayegnvuirvtld:043bb26d5bf8b80c7854230931506a9ecd9f247e10f307f8fb582e6622d969a8@ec2-54-83-202-132.compute-1.amazonaws.com:5432/d9pd86lrfc5jc',
                ssl: true,
            }
        );        
    }

    
}

module.exports.dataBaseWrapper = dataBaseWrapper;