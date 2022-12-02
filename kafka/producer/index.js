const { Kafka } = require('kafkajs')
const config = require('../../config')

const createProducer = () => {
    const kafkaClient = new Kafka({
        clientId: config.producer.clientId,
        brokers: config.producer.brokers
    })

    const producer = kafkaClient.producer()

    return producer
}

module.exports = createProducer