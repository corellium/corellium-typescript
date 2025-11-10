export class CorelliumSDKError extends Error {
  errorID: string;
  field?: string | null;

  constructor(data: RawSDKError) {
    super(data.error)
    this.errorID = data.errorID;
    this.field = data.field;
  }
}

export interface RawSDKError {
  error: string;
  errorID: string;
  field?: string | null;
}

export interface RawMissingFirmwareAssetError extends RawSDKError {
  missingFwAssets: string[];
  projectId: string;
}

export class MissingFirmwareAssetError extends CorelliumSDKError {
  missingFwAssets: string[];
  projectId: string;

  constructor(data: RawMissingFirmwareAssetError) {
    super(data as RawSDKError);
    this.missingFwAssets = data.missingFwAssets;
    this.projectId = data.projectId;
  }
}
