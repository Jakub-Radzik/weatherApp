import React from 'react';
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps";

class NewMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isMarkerShown: false,
            markerPosition: null
        };
    }

    onMapClick = e =>
        this.setState({
            markerPosition: { lat: this.props.lat, lng: this.props.lon },
            isMarkerShown: true
        });

    Map = withScriptjs(
        withGoogleMap(props => (
            <GoogleMap
                defaultZoom={12}
                center={{ lat: this.props.lat, lng: this.props.lon }}
                onClick={props.onClick}
            >
                {props.children}
            </GoogleMap>
        ))
    );

    render() {
        return (
            <div id="mapWrapper">
                <this.Map {...this.props} onClick={this.onMapClick}>
                    {this.state.isMarkerShown && (
                        <Marker position={this.state.markerPosition} />
                    )}
                </this.Map>
            </div>
        )
    }
}

export default React.memo(NewMap);