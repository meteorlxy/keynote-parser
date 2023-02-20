import get from 'lodash.get';
import messageTypeProtoNameMap from '#proto/message-type-proto-name-map';
import proto from '#proto/proto';

/**
 * Get the proto class for the given message info.
 */
export const getMessageProto = (
  messageInfo: proto.TSP.IMessageInfo,
): {
  messageProtoName: string;
  messageProto: protobuf.Type;
} => {
  const messageProtoName = messageTypeProtoNameMap[messageInfo.type];
  const messageProto = get(proto, messageProtoName) as protobuf.Type;
  if (!messageProto) {
    throw new Error(`Unknown message type: ${JSON.stringify(messageInfo)}`);
  }
  return {
    messageProtoName,
    messageProto,
  };
};
