#!/bin/bash

# Define variables
OSM_URL="http://download.geofabrik.de/australia-oceania-latest.osm.bz2"
OSM_FILE="/home/ors/files/australia-latest.osm.bz2"
UNPACKED_OSM_FILE="/home/ors/files/australia-latest.osm.pbf"
ORS_CONFIG="/home/ors/config/ors-config.json"

# Create necessary directories
mkdir -p /home/ors/files /home/ors/graphs /home/ors/elevation_cache

# Download OSM data
wget -O $OSM_FILE $OSM_URL

# Decompress the OSM data
bunzip2 $OSM_FILE

# Generate edge mappings
java -Djava.awt.headless=true -jar /home/ors/ors-core/target/ors-core-*-shaded.jar \
  --config $ORS_CONFIG \
  --osm $UNPACKED_OSM_FILE \
  --graphs /home/ors/graphs \
  --elevation_cache /home/ors/elevation_cache