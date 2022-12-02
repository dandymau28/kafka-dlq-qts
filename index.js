const { default: axios } = require('axios');
const config = require('./config')
const consumerDLQ = require('./kafka/consumer')(config.consumer.groupId)
const producerDLQ = require('./kafka/producer')()

const start = async() => {
    try {
        await startDLQ(config.kafkaTopic.dlq);
    } catch(err) {
        console.error(err)
    }
}

const startDLQ = async(topic, fromBeginning = false) => {

    await consumerDLQ.connect();
    await producerDLQ.connect();

    await consumerDLQ.subscribe({
        topic: topic,
        fromBeginning: fromBeginning
    })

    await consumerDLQ.run({
        eachMessage: ({ topic, partition, message }) => {
            let { body, endpoint, header, try_count = 0 } = JSON.parse(message.value)

            axios.post(endpoint, body, { headers: header })
            .then(result =>{
                console.log(result.status)
            })
            .catch(async(err) => {
                console.log(err.message, err.response.body)

                let message = {
                    body,
                    endpoint,
                    header,
                    try_count: try_count + 1
                }

                await producerDLQ.send({
                    topic: config.kafkaTopic.dlq,
                    messages: [
                        {
                            value: JSON.stringify(message)
                        }
                    ]
                })
            })
        }
    })

    consumerDLQ.on('consumer.connect', () => {
        console.log('consumer connected');
    })

}

start();