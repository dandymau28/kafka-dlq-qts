const { Kafka } = require('kafkajs')
const config = require('../../config')

const createConsumer = (groupId) => {
    const kafkaClient = new Kafka({
        clientId: config.consumer.clientId,
        brokers: config.consumer.brokers,
        ssl: config.consumer.ssl
    })

    const consumer = kafkaClient.consumer({ groupId: groupId })

    return consumer
}

module.exports = createConsumer