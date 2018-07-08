import * as React from 'react';
import { ActionCreator } from "typescript-fsa";
import * as EventSelection from '../../eventsselection';
import * as TeamSelection from '../../teamselection';
import * as FactionSelection from '../../factionselection';
import * as FactionMat from '../../factionmat';
import Style from '../style.css';
import * as Model from '../../model';

interface MainProps {
  selectedFaction: string;
  selectedCharacters: string[];
  selectedEvents: string[];
  selectFaction: ActionCreator<string>;
  selectCharacters: ActionCreator<string[]>;
  selectEvents: ActionCreator<string[]>;
}

interface MainState {
  optOutFromEvents: boolean;
}

export default class Main extends React.Component<MainProps,MainState> {
  state = { optOutFromEvents: false }

  renderFactionSelection() {
    return <FactionSelection.Component 
              factions={ [Model.Faction.Reich, Model.Faction.Union] } 
              selectionComplete={(selection: string) => this.props.selectFaction(selection)}
            />
  }

  renderTeamSelection() {
    return <TeamSelection.Component 
              faction={ Model.StringToFaction(this.props.selectedFaction) }
              characters={Model.AllCharacters}
              selectionComplete={(selection: string[]) => this.props.selectCharacters(selection)}
            />
  }

  renderEventSelection() {
    return <EventSelection.Component 
              events={ Model.AllEvents }
              selectionComplete={(selection: string[]) => this.props.selectEvents(selection)}
              selectNoEvent={() => this.setState({
                ...this.state,
                optOutFromEvents: false,
              })}
            />
  }

  renderFactionMat() {
    return <FactionMat.Component eventsDeck="Ksiaz" characters={this.props.selectedCharacters} />
  }

  areEventCardsDeclined() {
    return this.state.optOutFromEvents;
  }

  areEventCardsSelected() {
    return this.props.selectedEvents.length > 0;
  }

  areCharactersSelected() {
    return this.props.selectedCharacters.length > 0;
  }

  isFactionSelected() {
    return this.props.selectedFaction.length > 0;
  }

  isEverythingConfigured() {
    let configComplete = false;
    if (this.areCharactersSelected() && this.areEventCardsDeclined()) configComplete = true;
    if (this.areCharactersSelected() && this.areEventCardsSelected()) configComplete = true;
    return configComplete;
  }

  render() {
    let renderComponent = this.renderFactionSelection();
    if (this.isEverythingConfigured()) renderComponent = this.renderFactionMat();
    else if (this.areCharactersSelected()) renderComponent = this.renderEventSelection();
    else if (this.isFactionSelected()) renderComponent = this.renderTeamSelection();
    return (
      <div className={Style.main}>
        { renderComponent }
      </div>
    );
  }
}
