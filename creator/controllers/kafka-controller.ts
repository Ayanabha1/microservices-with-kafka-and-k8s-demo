import KafkaConsumer from "../kafka/KafkaConsumer";

class KafkaController {
  async startListening(topics: string[]) {
    try {
      await KafkaConsumer.connect();
      await KafkaConsumer.subscribeToTopic(topics);
    } catch (error) {
      console.error("Error starting Kafka consumer:", error);
    }
  }

  async stopListening() {
    try {
      await KafkaConsumer.disconnect();
    } catch (error) {
      console.error('Error stopping Kafka consumer:', error);
    }
  }
}

export default new KafkaController();
