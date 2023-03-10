import type proto from '../proto/proto';

export interface IwaData {
  [archiveInfoIdentifier: string]: IwaArchiveInfoData;
}

export interface IwaArchiveInfoData {
  archiveInfo: proto.TSP.ArchiveInfo;
  messages: IwaMessageInfoData[];
}

export interface IwaMessageInfoData<T = unknown> {
  messageProtoName: string;
  message: T;
}
