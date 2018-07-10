import * as React from 'react';
import { ActionCreator } from "typescript-fsa";
import * as EventSelection from '../../eventsselection';
import * as TeamSelection from '../../teamselection';
import * as FactionSelection from '../../factionselection';
import * as FactionMat from '../../factionmat';
import Style from '../style.css';
import * as Model from '../../model';
import ThLogo from '../../img/tannhauser-logo.png';

interface MainProps {
  selectedFaction: string;
  selectedCharacters: string[];
  selectedPacks: string[];
  selectedEvents: string[];
  selectFaction: ActionCreator<string>;
  selectCharacters: ActionCreator<{characters: string[], packs: string[]}>;
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
            />;
  }

  renderTeamSelection() {
    return <TeamSelection.Component 
              faction={ Model.StringToFaction(this.props.selectedFaction) }
              characters={Model.AllCharacters}
              selectionComplete={(selection) => this.props.selectCharacters(selection)}
            />;
  }

  setUseEventCards(useEvents: boolean) {
    this.setState({
      ...this.state,
      optOutFromEvents: !useEvents,
    });
  }

  selectEvents(selection: string[]) {
    this.setUseEventCards(true);
    this.props.selectEvents(selection);
  }

  renderEventSelection() {
    return <EventSelection.Component 
              events={ Model.AllEvents }
              selectionComplete={(selection: string[]) => this.selectEvents(selection)}
              selectNoEvent={() => this.setUseEventCards(false)}
            />;
  }

  renderFactionMat() {
    return <FactionMat.Component 
      events={this.props.selectedEvents} 
      characters={this.props.selectedCharacters} 
      packs={this.props.selectedPacks}
    />;
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

  renderHeader() {
    return <div className={Style.banner}><img src={ThLogo} /></div>
  }

  render() {
    let renderComponent = this.renderFactionSelection();
    if (this.isEverythingConfigured()) renderComponent = this.renderFactionMat();
    else if (this.areCharactersSelected()) renderComponent = this.renderEventSelection();
    else if (this.isFactionSelected()) renderComponent = this.renderTeamSelection();
    return (
      <div className={Style.main}>
        { !this.isEverythingConfigured() && this.renderHeader() }
        { renderComponent }
      </div>
    );
  }
}
