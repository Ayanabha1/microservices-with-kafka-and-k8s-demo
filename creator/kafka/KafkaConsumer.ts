import { Kafka, Consumer } from "kafkajs";
import creatorService from "../services/creator-service";

const kafkaBrokerList = ["my-cluster-kafka-bootstrap:9092"];

class KafkaConsumer {
  private consumer: Consumer;

  constructor(brokerList: string[], groupId: string) {
    const kafka = new Kafka({
      clientId: "my-consumer",
      brokers: brokerList,
    });

    this.consumer = kafka.consumer({ groupId });
  }

  async connect(): Promise<void> {
    await this.consumer.connect();
  }

  async disconnect(): Promise<void> {
    await this.consumer.disconnect();
  }

  async subscribeToTopic(topics: string[]): Promise<void> {
    for (const topic of topics) {
      await this.consumer.subscribe({ topic, fromBeginning: true });
    }

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const kafkaMessage = {
          topic,
          partition,
          offset: message.offset,
          value: message.value?.toString(),
        };
        console.log("New message from topic", topic, kafkaMessage);
        if (topic === "user-creator-topic") {
          creatorService.addCreator(kafkaMessage.value!);
        }
      },
    });
  }
}

export default new KafkaConsumer(kafkaBrokerList, "my-group");
