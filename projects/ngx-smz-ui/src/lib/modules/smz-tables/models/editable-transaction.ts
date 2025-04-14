export interface SmzTransaction {
  transactionId: string;
  dispatchAction: any;
  status: 'created' | 'dispatched' | 'success' | 'failure';
  success: () => void;
  failure: (errors: string[]) => void;
}