// @webtoon/psd
// Copyright 2021-present NAVER WEBTOON
// MIT License

import {
  AdditionalLayerInfo,
  BlendMode,
  ChannelBytes,
  ChannelKind,
  Clipping,
  EngineData,
  GroupDivider,
} from "../../interfaces";

export interface LayerRecord {
  name: string;
  channelInformation: [ChannelKind, number][];
  top: number;
  left: number;
  bottom: number;
  right: number;
  hidden: boolean;
  transparencyLocked: boolean;
  opacity: number;
  clipping: Clipping;
  blendMode: BlendMode;
  additionalLayerInfos: AdditionalLayerInfo[];
  // The following properties are extracted from the additionalLayerInfos field
  // for easy access
  /** If defined, divider type for "group divider" layers. */
  dividerType?: GroupDivider;
  /** If defined, contains the text of a Text Layer. */
  layerText?: string;
  /** If defined, containts extra text properties */
  engineData?: EngineData;
}

export type LayerChannels = Map<ChannelKind, ChannelBytes>;

export interface Frame {
  startIndex: number;
  groupId: number;
  parentGroupId: number;
  layerRecord?: LayerRecord;
}

export interface LayerProperties {
  name: string;
  top: number;
  left: number;
  bottom: number;
  right: number;
  hidden: boolean;
  transparencyLocked: boolean;
  opacity: number;
  clippingMask: Clipping;
  blendMode: BlendMode;
  groupId?: number;
  /** Text content of text layers */
  text?: string;
  /** Text properties */
  textProperties?: EngineData;
}

export const createLayerProperties = (
  name: string,
  layerRecord: LayerRecord,
  groupId?: number
): LayerProperties => {
  const {
    top,
    left,
    bottom,
    right,
    opacity,
    clipping: clippingMask,
    hidden,
    transparencyLocked,
    blendMode,
    layerText,
    engineData,
  } = layerRecord;

  return {
    name,
    top,
    left,
    bottom,
    right,
    opacity,
    clippingMask,
    hidden,
    transparencyLocked,
    blendMode,
    groupId,
    text: layerText,
    textProperties: engineData,
  };
};
