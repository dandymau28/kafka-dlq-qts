const config = {
    consumer: {
        clientId: "consumerDLQ",
        brokers: ['192.168.1.119:9092'],
        ssl: false,
        groupId: 'qts-dlq'
    },
    producer: {
        clientId:"producerDLQ",
        brokers: ['192.168.1.119:9092']
    },
    kafkaTopic: {
        dlq: "failed-inform-qts"
    },
    database: {

    }
}

module.exports = config