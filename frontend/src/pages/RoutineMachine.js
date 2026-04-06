import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

const createRoutineMachineLayer = ({coords}) => {
    const instance = L.routing.control({
        waypoints: [
            L.latLng(coords[0][0], coords[0][1]),
            L.latLng(coords[1][0], coords[1][1])
        ],
        lineOptions: {
            styles: [{ color: "#6FA1EC", weight: 4 }]
        },
        show: false,
        addWaypoints: false,
        routeWhileDragging: true,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        showAlternatives: false
    });
    return instance;
}

const RoutingMachine = createControlComponent(createRoutineMachineLayer);
export default RoutingMachine;

