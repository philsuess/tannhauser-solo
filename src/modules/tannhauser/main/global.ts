// defines the assumptions about how this module is embedded into the global application
import { TannhauserState } from "./model";
export const NAME = "tannhauser";

// we assume that the global state contains this module's state under the name 'reactreduxjoke'
// this is necessary for the redux containers to work properly
export interface GlobalState {
  [NAME]: TannhauserState;
}
