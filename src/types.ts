import type proto from '../proto/proto';

export type IwaData = Record<string, IwaArchiveInfoData>;

export interface IwaArchiveInfoData {
  archiveInfo: proto.TSP.ArchiveInfo;
  messages: IwaMessageInfoData[];
}

export interface IwaMessageInfoData<T = unknown> {
  message: T;
  messageProtoName: string;
}
