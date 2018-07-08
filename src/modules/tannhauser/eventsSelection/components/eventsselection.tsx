import * as React from 'react';
import Style from '../style.css';
import * as Model from '../../model';

interface EventsSelectionProps {
  events: Model.Events;
  selectionComplete: (chosen: string[]) => any;
  selectNoEvent: () => any;
}

interface EventsSelectionState {
  [key: string] : boolean;
}

export default class EventsSelection extends React.Component<EventsSelectionProps,EventsSelectionState> {
  constructor(props: EventsSelectionProps) {
    super(props);
    this.resetAllSelections();
  }

  resetAllSelections() {
    let noneSelected = {};
    Object.keys(this.props.events).forEach(key => {
      noneSelected = {
        ...noneSelected,
        [key]: false,
      }
    });
    this.state = noneSelected;
  }

  select(event: string) {
    this.setState({
      ...this.state,
      [event]: !this.state[event],
    });
  }

  getEventKeys() {
    return Object.keys(this.state);
  }

  getSelectedAsStrings() {
    const selected: string[] = [];
    this.getEventKeys().forEach(key => {
      if (this.state[key]) selected.push(key);
    });
    return selected;
  }

  renderEvents() {
    return this.getEventKeys().map(key => {
      const event = this.props.events[key];
      return (
        <div key={key} className={Style.event} onClick={() => this.select(key)} >
          <img src={event.image} alt={event.name} height={100} 
            className={this.state[key] ? Style.selected : Style.unselected} 
          />
          <h3>{event.name}</h3>
        </div>
      );
    });
  }

  render() {
    return (
      <div className={Style.eventsselection}>
        <div>
          <h1>Pick event cards to draw</h1>
          <button onClick={() => this.props.selectionComplete(this.getSelectedAsStrings()) }>Select</button>
          <button onClick={() => this.props.selectNoEvent() }>Don't use event cards</button>
        </div>
        <div className={Style.events} >{this.renderEvents()}</div>
      </div>
    );
  }
}
