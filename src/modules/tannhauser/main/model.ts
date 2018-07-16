import * as Model from '../model';

export interface TannhauserState {
  selectedFaction: string;
  selectedCharacters: string[];
  selectedEvents: string[];
  selectedPacks: string[];
  selectedDeckSetup: Model.DeckSetup;
  optOutFromEvents: boolean;
  showHelp: boolean;
}
