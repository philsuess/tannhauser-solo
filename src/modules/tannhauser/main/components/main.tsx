import * as React from 'react';
import { ActionCreator } from "typescript-fsa";
import ScrollIntoView from 'react-scroll-into-view';
import * as EventSelection from '../../eventsselection';
import * as TeamSelection from '../../teamselection';
import * as FactionSelection from '../../factionselection';
import * as FactionMat from '../../factionmat';
import * as MixedDeckMat from '../../mixeddeckmat';
import Style from '../style.css';
import * as Model from '../../model';
import ThLogo from '../../img/tannhauser-logo.png';
import FactionSelectionHelp from '../../img/help/factionSelection.gif';
import TeamSelectionHelp from '../../img/help/teamSelection.gif';
import EventSelectionHelp from '../../img/help/eventsSelection.gif';
import FactionMatHelp from '../../img/help/factionMat.gif';

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

  renderMixedDeckMat() {
    return <MixedDeckMat.Component
      events={this.props.selectedEvents} 
      characters={this.props.selectedCharacters} 
      packs={this.props.selectedPacks}
      numCharacterCardsBeforeReshuffle={5}
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
    return <div className={Style.splash}>
        <div>
          <h2>These animations of how to use the individual parts
         of the app show all available features. Drop me 
         a <a href="https://boardgamegeek.com/user/philsuess">personal message on bgg</a> if
         you have suggestions for improvement.</h2>
        </div>
        <div>
         <h2 className={Style.hashLink} onClick={() => this.props.toggleShowHelp(false)}><u>Close help screen</u></h2>
        </div>
        <div className={Style.helpSection} id="HelpQuickAccess">
          <h2 className={Style.hashLink}><ScrollIntoView selector="#factionSelectionHelp" >
            <u>Faction selection</u></ScrollIntoView></h2>
          <h2 className={Style.hashLink}><ScrollIntoView selector="#teamSelectionHelp" >
            <u>Team selection</u></ScrollIntoView></h2>
          <h2 className={Style.hashLink}><ScrollIntoView selector="#eventSelectionHelp" >
            <u>Event selection</u></ScrollIntoView></h2>
          <h2 className={Style.hashLink}><ScrollIntoView selector="#factionMatHelp" >
            <u>Main play screen</u></ScrollIntoView></h2>
        </div>
        <div className={Style.helpSection} id="factionSelectionHelp">
          <h2>Faction selection: pick what faction your enemies belong to
          <br/><span className={Style.hashLink}><ScrollIntoView selector="#HelpQuickAccess">
            <u>Back to top</u></ScrollIntoView></span>
          </h2>
          <img src={FactionSelectionHelp} />
        </div>
        <div className={Style.helpSection} id="teamSelectionHelp">
          <h2>Team selection: choose enemies and (optionally), their equipment packs. The chosen packs 
            will be displayed in the main playing screen to help you identify the correct part of the AI cards.
            <br/><span className={Style.hashLink}><ScrollIntoView selector="#HelpQuickAccess">
            <u>Back to top</u></ScrollIntoView></span>
          </h2>
          <img src={TeamSelectionHelp} />
        </div>
        <div className={Style.helpSection} id="eventSelectionHelp">
          <h2>Event cards selection: Choose which event cards deck to construct, or elect to play without
          <br/><span className={Style.hashLink}><ScrollIntoView selector="#HelpQuickAccess">
            <u>Back to top</u></ScrollIntoView></span>
          </h2>
          <img src={EventSelectionHelp} />
        </div>
        <div className={Style.helpSection} id="factionMatHelp">
          <h2>Main play screen: use the quick access links at the top of the page to jump to the corresponding decks
          <br/><span className={Style.hashLink}><ScrollIntoView selector="#HelpQuickAccess">
            <u>Back to top</u></ScrollIntoView></span>
          </h2>
          <img src={FactionMatHelp} />
        </div>
      </div>
  }

  render() {
    let renderComponent = this.renderFactionSelection();
    if (this.props.showHelp) renderComponent = this.renderOverview();
    else if (this.isEverythingConfigured()) renderComponent = this.renderMixedDeckMat(); //this.renderFactionMat();
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
