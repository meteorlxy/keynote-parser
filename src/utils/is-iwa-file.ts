const IWA_FILE_DIRECTORY = 'Index/';
const IWA_FILE_EXTENSION = '.iwa';

/**
 * Check if a file is an iwa file
 */
export const isIwaFile = (relativeFilePath: string): boolean =>
  relativeFilePath.startsWith(IWA_FILE_DIRECTORY) &&
  relativeFilePath.endsWith(IWA_FILE_EXTENSION);
