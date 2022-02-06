import React from 'react';
import {GoogleMap, withGoogleMap, withScriptjs, Marker} from "react-google-maps";
import '../../../Styles/GlobalComponents/SearchMap.sass'
const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel");
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");


const labelStyle = {
    color: "white",
    backgroundColor: "blue",
    fontSize: "15px",
    padding: "5px",
    borderRadius : "10px 0",
}

class SearchMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isMarkerShown: true,
            markerPosition: {lng: 20, lat: 20},
            markers: this.props.markers
        };
    }

    componentDidMount() {
        console.log("sie");
        console.log(this.state.markers);
    }

    Map = withScriptjs(
        withGoogleMap(props => (
            <GoogleMap
                defaultZoom={3}
                center={{ lat: 50, lng: 20 }}
                onClick={props.onClick}
            >
                {props.children}
            </GoogleMap>
        ))
    );

    markerClickHandler = (id, name, lon, lat) => {
        this.props.changeHandler(id, name, lon, lat)
        this.props.redirect();
    }

    render() {
        return (
            <div id="searchMapWrapper">
                <this.Map {...this.props} onClick={this.onMapClick}>
                    <MarkerClusterer
                        averageCenter
                        enableRetinaIcons
                        gridSize={60}
                    >
                    {this.props.markers.map(elem => {
                        return <MarkerWithLabel
                            onClick = {() => this.markerClickHandler(elem.id, elem.name, elem.lng, elem.lat)}
                            key={elem.id}
                            position={{lng: elem.lng, lat: elem.lat}}
                            labelAnchor={{lng: elem.lng, lat: elem.lat}}
                            labelStyle={labelStyle}
                        >
                            <div>{elem.name}</div>
                        </MarkerWithLabel>
                     })}
                    </MarkerClusterer>
                </this.Map>
            </div>
        )
    }
}

export default SearchMap;