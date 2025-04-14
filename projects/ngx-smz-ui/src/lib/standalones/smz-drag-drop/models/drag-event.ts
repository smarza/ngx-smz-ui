export interface SmzDragEventData {
  data: any;
  oldOrder: number;
  newOrder: number;
  event?: any;
}

export interface SmzDragEvent {
  context: SmzDragEventData;
  allowedScopes: string[];
  blockedScopes: string[];

}