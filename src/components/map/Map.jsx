import React, { useEffect, useRef, useState } from 'react'
import ReactDOMServer from 'react-dom/server'
import L from 'leaflet'

import 'leaflet-control-geocoder'
import 'leaflet-control-geocoder/dist/Control.Geocoder.css'

import 'leaflet.locatecontrol'
import 'leaflet.locatecontrol/dist/L.Control.Locate.css'

import 'leaflet-routing-machine'
import '../../assets/css/routingControl.css'

import '@geoman-io/leaflet-geoman-free'
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css'

import 'leaflet-dialog'
import '../../assets/css/dialog.css'

import '../../assets/css/OSMBuildings.css'

const OSMBuildings = window.OSMBuildings

const Map = () => {
  // State:
  const [startPoint, setStartPoint] = useState([38.996874, -77.027574])
  const [endPoint, setEndPoint] = useState([38.897327, -77.020961])

  // Refs:
  const refs = {
    mapRef: useRef(null),
    mapTileCssRef: useRef(null),
    tileRef: useRef(null),
    topoTileRef: useRef(null),
    layersControlRef: useRef(null),
    zoomControlRef: useRef(null),
    locateControlRef: useRef(null),
    scaleRef: useRef(null),
    buildingsRef: useRef(null),
    dialogRef: useRef(null),
    geoCoderRef: useRef(null),
    routingControlRef: useRef(null),
  }

  // Base tile for the map:
  refs.tileRef.current = L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
  )
  refs.topoTileRef.current = L.tileLayer(
    'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    {
      attribution:
        'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
    }
  )

  // Map Creation:
  useEffect(() => {
    const mapParams = {
      center: L.latLng(38.9907, -77.0261),
      zoom: 16,
      zoomControl: false,
      maxBounds: L.latLngBounds(L.latLng(-150, -240), L.latLng(150, 240)),
      closePopuponClick: false,
      layers: [refs.tileRef.current],
    }

    // Map Instance:
    refs.mapRef.current = L.map('map', mapParams)

    // 3D Buildings:
    refs.buildingsRef.current = new OSMBuildings(refs.mapRef.current).load(
      'https://{s}.data.osmbuildings.org/0.2/anonymous/tile/{z}/{x}/{y}.json'
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //Map Events:
  useEffect(() => {
    refs.mapRef.current.on('locationfound', (event) => {
      setStartPoint([event.latlng.lat, event.latlng.lng])
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Controls:
  useEffect(() => {
    const base = {
      OpenStreetMap: refs.tileRef.current,
      [`OpenStreetMap - Topo`]: refs.topoTileRef.current,
    }

    // Create the layer control:
    refs.layersControlRef.current = L.control
      .layers(base, {})
      .addTo(refs.mapRef.current)
    //
    // Add a zoom control:
    refs.zoomControlRef.current = L.control
      .zoom({ position: 'topright' })
      .addTo(refs.mapRef.current)
    //

    // Locate User Control:
    refs.locateControlRef.current = L.control
      .locate({ position: 'topright' })
      .addTo(refs.mapRef.current)
    //

    // Search geocoder:
    refs.geoCoderRef.current = L.Control.geocoder()
      .addTo(refs.mapRef.current)
      .on('markgeocode', function (e) {
        // console.log(e)
        setEndPoint([e.geocode.center.lat, e.geocode.center.lng])
      })
    //

    // Geoman:
    refs.mapRef.current.pm.addControls({
      position: 'topright',
      drawCircle: false,
      oneBlock: true,
    })
    //

    // Scale:
    refs.scaleRef.current = L.control.scale().addTo(refs.mapRef.current)
    //

    // Routing window:
    refs.routingControlRef.current = L.Routing.control({
      position: 'topleft',
      lineOptions: {
        styles: [
          {
            color: '#002984',
          },
        ],
      },
      waypoints: [startPoint, endPoint],
    }).addTo(refs.mapRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Set routing waypoints:
  useEffect(() => {
    if (refs.routingControlRef.current) {
      refs.routingControlRef.current.setWaypoints([startPoint, endPoint])
    }
  }, [refs.routingControlRef, startPoint, endPoint])

  // Dialog box:
  useEffect(() => {
    const dialogOptions = {
      size: [400, 400],
      mizSize: [100, 100],
      maxSize: [500, 500],
      anchor: [200, 375],
      position: 'topleft',
      initOpen: true,
    }
    refs.dialogRef.current = L.control
      .dialog(dialogOptions)
      .setContent(
        ReactDOMServer.renderToString(
          <div style={{ alignText: 'center' }}>
            <h1>
              Hello! I'm Josh, a web developer from Silver Spring, MD. Welcome
              to my portfolio!
            </h1>
            <div></div>
            <h3>
              To the left, you can find all the important links. Head to
              LinkedIn to see my work history, Medium to read some articles I've
              written, and Stack Blitz to see some live demos!
            </h3>
            <hr />
            <h3>
              This map was built using the awesome, lightweight, and open-source
              Leaflet.js. It has a bunch of features, so feel free to play
              around!
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 auto' }}>
              <li>
                <strong>Location</strong>: Click the single button with the
                point marker icon to find your location. This will also set your
                location as the start point for the routing feature!
              </li>
              <br />
              <li>
                <strong>Geocoding</strong>: Click the button with the magnifying
                glass icon to search for a location. This will also set the end
                point for the routing feature!
              </li>
              <br />
              <li>
                <strong>Routing</strong>: Initially set to show directions
                between the AFI Theatre in Silver Spring, MD and the Verizon
                Center in Washington, DC. You can set the start/end points by
                dragging the markers to the desired points on the map. You can
                also set your location as the start point with the location
                button to the right, then search for and set the endpoint with
                the search button.
              </li>
              <br />
              <li>
                <strong>Toolbar</strong>: A toolbar that allows the user to draw
                and edit layers, layer snapping, layer dragging, and layer
                removal.
              </li>
            </ul>
          </div>
        )
      )
      .addTo(refs.mapRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div
        id='map'
        style={{
          overflow: 'hidden',
          width: '100%',
          height: '100%',
        }}
        ref={refs.mapTileCssRef}
      />
    </>
  )
}

export default Map
