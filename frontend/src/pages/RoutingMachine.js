import "leaflet-routing-machine";
import { useEffect , useRef } from "react";
import { useMap } from "react-leaflet";


const RoutingMachine = ({coords}) => {
    const map = useMap();
    const routingControlRef = useRef(null);

    useEffect(() => {
        if(!map || !coords[0] || !coords[1]) return;

        const instance = L.Routing.control({
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
        }).addTo(map);

        routingControlRef.current = instance;

        return () => {
            if (map && routingControlRef.current){
                try{
                    map.removeControl(routingControlRef.current);
                } catch (e){
                    console.warn("Error", e);
                }
            }
        }
    }, [map]);
    
    useEffect(() => {
        if (routingControlRef.current && coords[0] && coords[1]){
            routingControlRef.current.setWaypoints([
                L.latLng(coords[0][0], coords[0][1]),
                L.latLng(coords[1][0], coords[1][1])
            ]);
        }
    }, [coords]);

    return null;
}

export default RoutingMachine;

