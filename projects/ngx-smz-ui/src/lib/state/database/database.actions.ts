export namespace DatabaseActions {
    export class Clear {
        public static readonly type = '[Database State] Clear';
    }

    export class Restore {
        public static readonly type = '[Database State] Restore';
    }
}