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
  optOutFromEvents: boolean;
  showHelp: boolean;
  selectFaction: ActionCreator<string>;
  selectCharacters: ActionCreator<{characters: string[], packs: string[]}>;
  selectEvents: ActionCreator<string[]>;
  toggleOptOutFromEvents: ActionCreator<boolean>;
  toggleShowHelp: ActionCreator<boolean>;
}

export default class Main extends React.Component<MainProps> {
  renderFactionSelection() {
    const bgg = "https://boardgamegeek.com/";
    const dansBlog = "https://boardgamegeek.com/blog/5464/creating-solo-play-tannhauser-game";
    return <div className={Style.splash}>
      <p>Play Tannhäuser solo or co-op and let your enemies be controlled by the AI system created by Dan Manning.
        Find more ressources and the solo rules in his <a href={dansBlog}>blog</a> on <a href={bgg}>boardgamegeek</a>.
      </p>
      <p>Looking for a quick <a href="#" onClick={() => this.props.toggleShowHelp(true)}>overwiew</a> for 
        this app?
      </p>
      <FactionSelection.Component 
        factions={ [Model.Faction.Reich, Model.Faction.Union] } 
        selectionComplete={(selection: string) => this.props.selectFaction(selection)}
      />
    </div>;
  }

  renderTeamSelection() {
    return <TeamSelection.Component 
              faction={ Model.StringToFaction(this.props.selectedFaction) }
              characters={Model.AllCharacters}
              selectionComplete={(selection) => this.props.selectCharacters(selection)}
            />;
  }

  setUseEventCards(useEvents: boolean) {
    this.props.toggleOptOutFromEvents(!useEvents);
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
    return this.props.optOutFromEvents;
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

  renderOverview() {
    return <button onClick={() => this.props.toggleShowHelp(false)}>Close overwiew</button>
  }

  render() {
    let renderComponent = this.renderFactionSelection();
    if (this.props.showHelp) renderComponent = this.renderOverview();
    else if (this.isEverythingConfigured()) renderComponent = this.renderFactionMat();
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
