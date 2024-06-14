import { Kafka, Producer, RecordMetadata } from "kafkajs";

const brokerList = ["my-cluster-kafka-bootstrap:9092"];

class KafkaProducer {
  private static instance: KafkaProducer;
  private producer;
  constructor(brokerList: string[]) {
    const kafka = new Kafka({
      clientId: "my-producer",
      brokers: brokerList,
    });

    this.producer = kafka.producer();
  }

  static getInstance(): KafkaProducer {
    if (!KafkaProducer.instance) {
      KafkaProducer.instance = new KafkaProducer(brokerList);
    }
    return KafkaProducer.instance;
  }

  async sendMessage(
    topic: string,
    message: string
  ): Promise<RecordMetadata[] | void> {
    try {
      await this.producer.connect();
      console.log("Producer connected");

      const res = await this.producer.send({
        topic,
        messages: [{ value: message }],
      });
      console.log("Message sent successfully");

      return res;
    } catch (error) {
      console.log("USER PRODUCER ERROR:", error);
    } finally {
      await this.producer.disconnect();
    }
  }
}

export default KafkaProducer.getInstance();
